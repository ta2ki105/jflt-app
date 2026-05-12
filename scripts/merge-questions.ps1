# merge-questions.ps1
# Merge new question file into target per level, with proper bracket-depth
# tracking that ignores brackets inside string literals.

param(
  [Parameter(Mandatory)][string]$SourceFile,
  [Parameter(Mandatory)][string]$TargetFile
)

function Get-LevelArrayContent {
  param([string]$Text, [int]$Level)

  $startPattern = "(?m)^\s*${Level}:\s*\["
  $startMatch = [regex]::Match($Text, $startPattern)
  if (-not $startMatch.Success) { return $null }

  $contentStart = $startMatch.Index + $startMatch.Length
  $depth = 1
  $inString = $false
  $escape = $false
  $pos = $contentStart

  while ($pos -lt $Text.Length) {
    $ch = $Text[$pos]
    if ($escape) {
      $escape = $false
    } elseif ($ch -eq '\') {
      $escape = $true
    } elseif ($ch -eq '"') {
      $inString = -not $inString
    } elseif (-not $inString) {
      if ($ch -eq '[') { $depth++ }
      elseif ($ch -eq ']') {
        $depth--
        if ($depth -eq 0) {
          return @{
            Content = $Text.Substring($contentStart, $pos - $contentStart)
            CloseIndex = $pos
            OpenIndex = $contentStart
          }
        }
      }
    }
    $pos++
  }
  return $null
}

$srcBytes = [IO.File]::ReadAllBytes($SourceFile)
$srcText = [Text.Encoding]::UTF8.GetString($srcBytes)
$tgtBytes = [IO.File]::ReadAllBytes($TargetFile)
$tgtText = [Text.Encoding]::UTF8.GetString($tgtBytes)

Write-Host "===== MERGE START =====" -ForegroundColor Cyan
Write-Host ("Source: " + $SourceFile) -ForegroundColor Gray
Write-Host ("Target: " + $TargetFile) -ForegroundColor Gray
Write-Host ""

# Process levels in REVERSE order so earlier inserts do not shift later indices
for ($lv = 4; $lv -ge 1; $lv--) {
  $newSection = Get-LevelArrayContent -Text $srcText -Level $lv
  if (-not $newSection) {
    Write-Host ("L{0}: not found in source - skip" -f $lv) -ForegroundColor Gray
    continue
  }

  $newContent = $newSection.Content.Trim()
  if ([string]::IsNullOrWhiteSpace($newContent)) {
    Write-Host ("L{0}: source is empty - skip" -f $lv) -ForegroundColor Gray
    continue
  }

  $newQCount = ([regex]::Matches($newContent, 'topic:\s*"').Count)

  $tgtSection = Get-LevelArrayContent -Text $tgtText -Level $lv
  if (-not $tgtSection) {
    Write-Host ("L{0}: not found in target - skip" -f $lv) -ForegroundColor Yellow
    continue
  }

  $tgtContent = $tgtSection.Content.TrimEnd()

  $separator = ""
  if ($tgtContent -and -not $tgtContent.EndsWith(",")) {
    $separator = ","
  }

  $mergedContent = $tgtContent + $separator + "`n" + $newContent + "`n  "

  $before = $tgtText.Substring(0, $tgtSection.OpenIndex)
  $after = $tgtText.Substring($tgtSection.CloseIndex)
  $tgtText = $before + "`n" + $mergedContent + $after

  Write-Host ("L{0}: +{1} questions appended" -f $lv, $newQCount) -ForegroundColor Green
}

[IO.File]::WriteAllText($TargetFile, $tgtText, (New-Object Text.UTF8Encoding $false))

Write-Host ""
Write-Host "===== MERGE COMPLETE =====" -ForegroundColor Cyan

$finalText = [Text.Encoding]::UTF8.GetString([IO.File]::ReadAllBytes($TargetFile))
Write-Host ""
Write-Host "Final per-level counts:" -ForegroundColor Cyan
for ($lv = 1; $lv -le 4; $lv++) {
  $sec = Get-LevelArrayContent -Text $finalText -Level $lv
  if ($sec) {
    $count = ([regex]::Matches($sec.Content, 'topic:\s*"').Count)
    Write-Host ("  L{0}: {1}" -f $lv, $count)
  }
}
$total = ([regex]::Matches($finalText, 'topic:\s*"').Count)
Write-Host ("  Total: " + $total) -ForegroundColor Green
