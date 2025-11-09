# Countdown Website (for your date)

This is a small, responsive static website that shows a countdown to a target date (for example: your date with your girlfriend). It's intentionally simple so you can customize it quickly.

How it works
- index.html contains the UI and default target date.
- styles.css contains styling.
- script.js contains the countdown logic and small confetti celebration when the countdown reaches zero.

Quick usage
1. Edit the target date:
   - Open `index.html` and find the countdown container:
     `<div id="countdown" data-target="2026-02-14T20:00:00">`
   - Replace the `data-target` value with your target date/time in ISO-like format `YYYY-MM-DDTHH:MM:SS` (seconds optional).
   - Or open the page with a URL parameter: `?date=2025-12-31T23:59` (example).

2. Test locally:
   - Open `index.html` in your browser.

3. Deploy on GitHub Pages:
   - Commit these files to the repository root on the `main` branch.
   - Go to GitHub → Settings → Pages → Source → choose `main` branch and root `/ (root)`.
   - Save — your site will be published at `https://<your-username>.github.io/<repo>/` (might take a minute).

Customization ideas
- Change colors in `styles.css`.
- Replace the title and messages in `index.html`.
- Add a background image.
- Add a picture or message to show after the countdown ends.
- Add an audible chime by playing an audio file on finish (optional — mind autoplay rules).

If you want, I can:
- Add automatic deployment via GitHub Actions.
- Make a tiny admin UI so you and your girlfriend can change the date without editing files.
- Add a custom shareable image and Open Graph tags for nicer links.

Enjoy and let me know what style or extras you'd like!