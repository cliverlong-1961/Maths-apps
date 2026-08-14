#!/usr/bin/env python3
"""
add_feedback_widget.py

Walks a repo (default: current directory) and inserts the Firebase +
feedback-widget <script> snippet into every .html file that doesn't
already have it, right before </body>. Relative paths to the
Feedback_code folder are computed automatically based on each file's
depth in the tree.

Usage (from inside the repo root):
    python add_feedback_widget.py                # do it for real
    python add_feedback_widget.py --dry-run       # preview only, no writes
    python add_feedback_widget.py --root "C:\\path\\to\\Maths-apps"

Safe to re-run: files that already reference feedback-widget.js are
skipped automatically.
"""

import argparse
import os
from pathlib import Path

# Folder (relative to repo root) that holds firebase-config.js / feedback-widget.js
FEEDBACK_FOLDER_NAME = "Feedback_code"

# Folders to never touch/walk into
SKIP_DIRS = {".git", "node_modules", FEEDBACK_FOLDER_NAME, "dist", "build", ".vercel"}

MARKER = "feedback-widget.js"  # presence of this string = already installed


def build_snippet(rel_prefix: str) -> str:
    """rel_prefix is e.g. '.' or '..' or '../..' — the path from the html
    file's folder up to the repo root (where Feedback_code lives)."""
    fb = f"{rel_prefix}/{FEEDBACK_FOLDER_NAME}"
    return (
        "\n"
        '    <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>\n'
        '    <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js"></script>\n'
        "\n"
        f'    <script src="{fb}/firebase-config.js"></script>\n'
        f'    <script src="{fb}/feedback-widget.js"></script>\n'
    )


def relative_prefix(html_file: Path, repo_root: Path) -> str:
    """Return './' style prefix from html_file's directory back to repo_root."""
    depth = len(html_file.parent.relative_to(repo_root).parts)
    if depth == 0:
        return "."
    return "/".join([".."] * depth)


def process_file(html_file: Path, repo_root: Path, dry_run: bool) -> str:
    text = html_file.read_text(encoding="utf-8", errors="ignore")

    if MARKER in text:
        return "skip (already present)"

    if "</body>" not in text:
        return "skip (no </body> tag found)"

    rel_prefix = relative_prefix(html_file, repo_root)
    snippet = build_snippet(rel_prefix)

    # Insert right before the last </body>
    idx = text.rfind("</body>")
    new_text = text[:idx] + snippet + text[idx:]

    if not dry_run:
        html_file.write_text(new_text, encoding="utf-8")

    return f"updated (prefix '{rel_prefix}')"


def main():
    parser = argparse.ArgumentParser(description="Insert feedback widget snippet into all HTML files.")
    parser.add_argument("--root", default=".", help="Path to repo root (default: current directory)")
    parser.add_argument("--dry-run", action="store_true", help="Preview changes without writing any files")
    args = parser.parse_args()

    repo_root = Path(args.root).resolve()
    if not repo_root.is_dir():
        print(f"ERROR: root path does not exist: {repo_root}")
        return

    if not (repo_root / FEEDBACK_FOLDER_NAME).is_dir():
        print(f"WARNING: '{FEEDBACK_FOLDER_NAME}' folder not found under {repo_root}. "
              f"Continuing anyway, but check the folder name/location.")

    html_files = []
    for dirpath, dirnames, filenames in os.walk(repo_root):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS and not d.startswith(".")]
        for fname in filenames:
            if fname.lower().endswith(".html"):
                html_files.append(Path(dirpath) / fname)

    if not html_files:
        print("No .html files found.")
        return

    print(f"{'DRY RUN — ' if args.dry_run else ''}Found {len(html_files)} .html file(s) under {repo_root}\n")

    updated = skipped = 0
    for f in sorted(html_files):
        result = process_file(f, repo_root, args.dry_run)
        rel = f.relative_to(repo_root)
        print(f"  {rel}: {result}")
        if result.startswith("updated"):
            updated += 1
        else:
            skipped += 1

    print(f"\nDone. {updated} file(s) {'would be ' if args.dry_run else ''}updated, {skipped} skipped.")
    if args.dry_run:
        print("Re-run without --dry-run to apply changes.")


if __name__ == "__main__":
    main()
