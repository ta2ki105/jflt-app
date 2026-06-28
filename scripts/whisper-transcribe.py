"""
Batch-transcribe audio files with OpenAI Whisper (local, offline, free).

Usage:
    python scripts/whisper-transcribe.py <input_dir> [--model medium] [--out <dir>]

Inputs : any audio/video files (mp3, wav, m4a, mp4, ...) in <input_dir>.
Outputs: for each input file <name>.<ext>, writes
           <out>/<name>.txt   - plain transcript
           <out>/<name>.json  - full result incl. timestamps & confidence

Recommended model for noisy iPad-app re-recordings: 'medium' (good balance).
Use 'large' for max accuracy (~3x slower).

First run downloads the model weights to ~/.cache/whisper (one-time).
"""

import argparse
import json
import sys
from pathlib import Path

try:
    import whisper
except ImportError:
    print("ERROR: openai-whisper is not installed.")
    print("Install with:  pip install openai-whisper")
    print("You also need ffmpeg installed. On Windows: winget install Gyan.FFmpeg")
    sys.exit(1)

AUDIO_EXTS = {".mp3", ".wav", ".m4a", ".mp4", ".flac", ".ogg", ".webm", ".aac"}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("input_dir", help="Directory containing audio files")
    ap.add_argument("--model", default="medium",
                    choices=["tiny", "base", "small", "medium", "large"],
                    help="Whisper model size (default: medium)")
    ap.add_argument("--out", default=None,
                    help="Output directory (default: <input_dir>/transcripts)")
    ap.add_argument("--language", default="en",
                    help="Audio language code (default: en)")
    args = ap.parse_args()

    in_dir = Path(args.input_dir)
    if not in_dir.is_dir():
        print(f"ERROR: not a directory: {in_dir}")
        sys.exit(1)

    out_dir = Path(args.out) if args.out else (in_dir / "transcripts")
    out_dir.mkdir(parents=True, exist_ok=True)

    files = sorted(p for p in in_dir.iterdir()
                   if p.is_file() and p.suffix.lower() in AUDIO_EXTS)
    if not files:
        print(f"No audio files found in {in_dir}")
        print(f"Supported extensions: {', '.join(sorted(AUDIO_EXTS))}")
        return

    print(f"Loading Whisper '{args.model}' model (first run downloads ~1.5GB)...")
    model = whisper.load_model(args.model)

    print(f"Transcribing {len(files)} file(s) -> {out_dir}\n")
    for i, src in enumerate(files, 1):
        print(f"[{i}/{len(files)}] {src.name}")
        try:
            result = model.transcribe(
                str(src),
                language=args.language,
                verbose=False,
                fp16=False,  # CPU-friendly; remove if you have a CUDA GPU
            )
        except Exception as e:
            print(f"  FAILED: {e}")
            continue

        text_path = out_dir / f"{src.stem}.txt"
        json_path = out_dir / f"{src.stem}.json"
        text_path.write_text(result["text"].strip() + "\n", encoding="utf-8")
        json_path.write_text(
            json.dumps(result, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
        preview = result["text"].strip()[:120].replace("\n", " ")
        print(f"  -> {text_path.name}  ({preview}{'...' if len(result['text']) > 120 else ''})")

    print(f"\nDone. Transcripts in: {out_dir}")
    print("Review each .txt manually — military jargon (FOB, grid coords, etc.) may need correction.")


if __name__ == "__main__":
    main()
