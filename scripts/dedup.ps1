# dedup.ps1 - JFLT question duplicate detection helpers
# ----------------------------------------------------------------------------
# Usage:
#   . .\scripts\dedup.ps1                    # load functions
#   Get-Topics src\reading-complete.js
#   Copy-TopicsToClipboard src\reading-complete.js
#   Find-DuplicateTopics src\new.js src\reading-complete.js
#   Find-SimilarQuestions src\reading-complete.js
#   Find-DuplicateOptions src\reading-complete.js
#   Show-TopicHistogram src\reading-complete.js
#   Invoke-DedupAudit src\new.js src\reading-complete.js
# ----------------------------------------------------------------------------

function _ReadFileText {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "File not found: $Path"
  }
  $bytes = [System.IO.File]::ReadAllBytes($Path)
  return [System.Text.Encoding]::UTF8.GetString($bytes)
}

function _ExtractMatches {
  param([string]$Path, [string]$Pattern)
  $text = _ReadFileText $Path
  return [regex]::Matches($text, $Pattern) |
    ForEach-Object { $_.Groups[1].Value }
}

# 1. Get topic list
function Get-Topics {
  param([Parameter(Mandatory)][string]$Path)
  return _ExtractMatches -Path $Path -Pattern 'topic:\s*"([^"]+)"'
}

# 2. Copy topics to clipboard (for prompt injection)
function Copy-TopicsToClipboard {
  param([Parameter(Mandatory)][string]$Path)
  $topics = Get-Topics -Path $Path | ForEach-Object { "- $_" }
  $topics | Set-Clipboard
  Write-Host ("[OK] " + $topics.Count + " topics copied to clipboard") -ForegroundColor Green
}

# 3. Show topic histogram
function Show-TopicHistogram {
  param([Parameter(Mandatory)][string]$Path, [int]$Top = 20)
  $topics = Get-Topics -Path $Path
  Write-Host ("Total topics: " + $topics.Count) -ForegroundColor Cyan
  Write-Host ""
  Write-Host ("Most frequent keywords (top " + $Top + "):") -ForegroundColor Cyan
  $topics |
    ForEach-Object {
      [regex]::Matches($_, '\b[A-Za-z]{4,}\b') |
        ForEach-Object { $_.Value.ToLower() }
    } |
    Group-Object | Sort-Object Count -Descending |
    Select-Object -First $Top |
    Format-Table Count, Name -AutoSize
}

# 4. Find topic duplicates between two files
function Find-DuplicateTopics {
  param(
    [Parameter(Mandatory)][string]$NewFile,
    [Parameter(Mandatory)][string]$ExistingFile
  )

  $existing = Get-Topics -Path $ExistingFile
  $new = Get-Topics -Path $NewFile

  Write-Host "===== Topic Duplicate Check =====" -ForegroundColor Cyan
  Write-Host ("Existing: " + $existing.Count + " topics") -ForegroundColor Gray
  Write-Host ("New     : " + $new.Count + " topics") -ForegroundColor Gray
  Write-Host ""

  # Exact match
  $exactDupes = $new | Where-Object { $existing -contains $_ }
  if ($exactDupes) {
    Write-Host ("[FAIL] Exact match topics: " + $exactDupes.Count) -ForegroundColor Red
    $exactDupes | ForEach-Object { Write-Host ("  - " + $_) }
  } else {
    Write-Host "[OK] No exact match topics" -ForegroundColor Green
  }
  Write-Host ""

  # Case/punctuation insensitive
  $normalize = { param($s) ($s -replace '[^\w\s]', '').ToLower().Trim() }
  $existingNorm = $existing | ForEach-Object { & $normalize $_ }
  $newNorm = $new | ForEach-Object { & $normalize $_ }
  $caseDupes = @()
  for ($i = 0; $i -lt $new.Count; $i++) {
    if (($existingNorm -contains $newNorm[$i]) -and ($existing -notcontains $new[$i])) {
      $caseDupes += $new[$i]
    }
  }
  if ($caseDupes) {
    Write-Host ("[WARN] Case/punctuation similar topics: " + $caseDupes.Count) -ForegroundColor Yellow
    $caseDupes | ForEach-Object { Write-Host ("  - " + $_) }
  } else {
    Write-Host "[OK] No case-similar topics" -ForegroundColor Green
  }
  Write-Host ""

  # Internal duplicates within new file
  $internal = $new | Group-Object | Where-Object Count -gt 1
  if ($internal) {
    Write-Host ("[FAIL] Internal duplicates in new file: " + $internal.Count) -ForegroundColor Red
    $internal | ForEach-Object { Write-Host ("  - " + $_.Name + " (" + $_.Count + "x)") }
  } else {
    Write-Host "[OK] No internal duplicates in new file" -ForegroundColor Green
  }
}

# 5. Detect similar questions (first 5 words match)
function Find-SimilarQuestions {
  param([Parameter(Mandatory)][string]$Path)
  $questions = _ExtractMatches -Path $Path -Pattern 'question:\s*"([^"]+)"'

  Write-Host "===== Similar Question Check =====" -ForegroundColor Cyan
  Write-Host ("Total questions: " + $questions.Count) -ForegroundColor Gray
  Write-Host ""

  $grouped = $questions |
    ForEach-Object {
      $q = $_
      $words = $q -split '\s+' | Select-Object -First 5
      $key = ($words -join ' ').ToLower() -replace '[^\w\s]', ''
      [PSCustomObject]@{ Key = $key; Full = $q }
    } |
    Group-Object Key | Where-Object Count -gt 1

  if (-not $grouped) {
    Write-Host "[OK] No questions with similar opening" -ForegroundColor Green
    return
  }

  Write-Host ("[WARN] " + $grouped.Count + " groups with similar question opening") -ForegroundColor Yellow
  foreach ($g in $grouped) {
    Write-Host ""
    Write-Host ("  [" + $g.Count + " items]: '" + $g.Name + "'") -ForegroundColor Yellow
    $g.Group | ForEach-Object { Write-Host ("    - " + $_.Full) -ForegroundColor Gray }
  }
}

# 6. Detect duplicate option sets
function Find-DuplicateOptions {
  param([Parameter(Mandatory)][string]$Path)
  $text = _ReadFileText $Path
  $allMatches = [regex]::Matches($text, 'options:\s*\[([^\]]+)\]')
  $optSets = $allMatches | ForEach-Object {
    ($_.Groups[1].Value -replace '\s+', ' ').Trim()
  }

  Write-Host "===== Duplicate Options Check =====" -ForegroundColor Cyan
  Write-Host ("Total options sets: " + $optSets.Count) -ForegroundColor Gray
  Write-Host ""

  $grouped = $optSets | Group-Object | Where-Object Count -gt 1
  if (-not $grouped) {
    Write-Host "[OK] No duplicate option sets" -ForegroundColor Green
    return
  }

  Write-Host ("[WARN] " + $grouped.Count + " duplicate option set groups") -ForegroundColor Yellow
  foreach ($g in $grouped) {
    $preview = $g.Name.Substring(0, [Math]::Min(100, $g.Name.Length))
    Write-Host ("  [" + $g.Count + "x]: " + $preview + "...") -ForegroundColor Gray
  }
}

# 7. All-in-one audit
function Invoke-DedupAudit {
  param(
    [Parameter(Mandatory)][string]$NewFile,
    [Parameter(Mandatory)][string]$ExistingFile
  )
  Write-Host "================================================" -ForegroundColor Cyan
  Write-Host (" Dedup Audit: " + (Split-Path $NewFile -Leaf)) -ForegroundColor Cyan
  Write-Host "================================================" -ForegroundColor Cyan
  Write-Host ""
  Find-DuplicateTopics -NewFile $NewFile -ExistingFile $ExistingFile
  Write-Host ""
  Find-SimilarQuestions -Path $NewFile
  Write-Host ""
  Find-DuplicateOptions -Path $NewFile
}

# Cross-file question check (Reading vs Listening)
function Find-CrossFileQuestions {
  param(
    [Parameter(Mandatory)][string]$FileA,
    [Parameter(Mandatory)][string]$FileB
  )
  $qa = _ExtractMatches -Path $FileA -Pattern 'question:\s*"([^"]+)"' | Sort-Object -Unique
  $qb = _ExtractMatches -Path $FileB -Pattern 'question:\s*"([^"]+)"' | Sort-Object -Unique

  Write-Host "===== Cross-File Question Check =====" -ForegroundColor Cyan
  Write-Host ("File A: " + (Split-Path $FileA -Leaf) + " (" + $qa.Count + " questions)") -ForegroundColor Gray
  Write-Host ("File B: " + (Split-Path $FileB -Leaf) + " (" + $qb.Count + " questions)") -ForegroundColor Gray
  Write-Host ""

  $shared = $qa | Where-Object { $qb -contains $_ }
  if ($shared) {
    Write-Host ("[FAIL] Shared questions: " + $shared.Count) -ForegroundColor Red
    $shared | ForEach-Object { Write-Host ("  - " + $_) }
  } else {
    Write-Host "[OK] No shared questions across files" -ForegroundColor Green
  }
}

Write-Host "[OK] dedup.ps1 loaded" -ForegroundColor Green
Write-Host "Available functions:" -ForegroundColor Cyan
Write-Host "  Get-Topics PATH"
Write-Host "  Copy-TopicsToClipboard PATH"
Write-Host "  Show-TopicHistogram PATH [-Top N]"
Write-Host "  Find-DuplicateTopics NEW EXISTING"
Write-Host "  Find-SimilarQuestions PATH"
Write-Host "  Find-DuplicateOptions PATH"
Write-Host "  Find-CrossFileQuestions FILE_A FILE_B"
Write-Host "  Invoke-DedupAudit NEW EXISTING        <- one-shot full audit"
