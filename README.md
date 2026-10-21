# M Noman Qasim — Portfolio Website

A dark, premium single-page portfolio built with plain **HTML, CSS and JavaScript**.
No frameworks, no build step — ready for GitHub Pages, Netlify or any static host.

## Files

```
index.html                 Main portfolio page
thank-you.html             Confirmation page after the contact form
netlify.toml               Netlify settings (publish root + security headers)
assets/
  styles.css               All styling and responsive rules
  app.js                   Nav, animations, scroll progress, form logic
  M-Noman-Qasim-CV.pdf     Downloadable CV
  images/
    og-image.png           Social sharing image
    favicon.svg            Browser icon
    tallyreel-cover.svg    TallyReel project cover art
    profile-placeholder.svg
    noman.jpg              Your portrait (900 × 900, compressed)
README.md
```

## 1. Your photo

Your portrait is already saved as **`assets/images/noman.jpg`** and appears in the hero.
The page applies a subtle desaturation and dark vignette so the purple studio background
sits comfortably inside the dark emerald theme.

On phones (640 px and below) the portrait switches to a **compact circular avatar** that sits
in the same flex row as the name and is vertically centred with it, so it no longer pushes the
content down the page.

To replace it later:

1. Save the new photo as **`noman.jpg`**
2. Put it in `assets/images/`
3. Refresh the page.

Recommended: a portrait crop (4:5) or square, roughly 900 × 1100 px, under 300 KB.
The image is cropped from the top-centre, so keep the face in the upper half.

## 2. Preview locally

- **Quickest:** double-click `index.html`.
- **With the contact form and fonts behaving normally:**
  ```powershell
  npx serve .
  ```
  then open the URL it prints.

On localhost the contact form shows a "Preview mode" notice instead of submitting.
It starts working as soon as the site is live on GitHub Pages, Netlify or another host.

## 3. What to edit

| Content | Where |
| --- | --- |
| Name, role, intro | `index.html` — hero section |
| About text, interests, journey | `index.html` — `#about` |
| Projects | `index.html` — `#projects` |
| Skills and learning list | `index.html` — `#skills` |
| Email / WhatsApp / social links | `index.html` — contact + footer |
| Colours and typography | `assets/styles.css` — `:root` variables |
| CV download | Replace `assets/M-Noman-Qasim-CV.pdf` (keep the same filename) |
| Social sharing image | Replace `assets/images/og-image.png` |

Contact details currently used:

- Email: `nomanqasim.work@gmail.com`
- WhatsApp: `+92 314 1626594` (`wa.me/923141626594`)
- GitHub: `https://github.com/techwithnoman`
- LinkedIn: `https://www.linkedin.com/in/m-noman-qasim-0768b33a1`

## 4. Deploy

### GitHub Pages (current setup)

1. Repository: `techwithnoman/nomanqasim.github.io`
2. Replace `index.html`, `thank-you.html`, `README.md`, `netlify.toml` and the
   `assets/` folder at the repository root.
3. Commit to the `main` branch — GitHub Pages publishes automatically.
4. Live URL: <https://techwithnoman.github.io/nomanqasim.github.io/>

### Netlify (optional)

1. Go to <https://app.netlify.com/drop> and drag this folder (the one containing
   `index.html`) onto the page, or import the GitHub repository.
2. Build command: *leave empty*. Publish directory: `.`
3. `netlify.toml` already sets the publish directory and a few security headers.

The site works the same on both hosts; the contact form described below is host-independent.

## 5. Contact form

The form uses **FormSubmit.co**, so it works on GitHub Pages and any other static host.

- The form action is `https://formsubmit.co/nomanqasim.work@gmail.com`.
- JavaScript posts to the FormSubmit **AJAX** endpoint, so visitors stay on the page and
  see a success or error note.
- **One-time activation:** the first submission sends an activation email to
  `nomanqasim.work@gmail.com`. Open it and click the activation link. Until then the form
  shows an "open a pre-filled email" fallback so no message is lost.
- After activation, submissions arrive in the inbox. Replying to the email goes back to
  the visitor's address.
- The hidden `_honey` field is a honeypot; `_captcha` is disabled to keep the form simple.
- `thank-you.html` is the no-JavaScript fallback. The hidden `_next` field points to its
  full GitHub Pages URL — update it if the domain ever changes.
- No backend, account or deployment configuration is required.

## 6. Notes

- The TallyReel entry is described honestly as **product exploration and AI output
  evaluation**, matching your brief — not as a project you developed.
- Your photo and CV are already included. Project links and social URLs are wired up.
- Reduced-motion preferences, keyboard focus styles and labels are included.
- All links open in a new tab where appropriate (`rel="noopener"`).

## 7. After deploying

- Open the site on your phone and test the menu, buttons and form.
- Submit the form once and click the FormSubmit activation link sent to your inbox.
- Add the live URL to your GitHub profile, LinkedIn and CV.
- Update `og:image` in `index.html` to the full URL (e.g.
  `https://techwithnoman.github.io/nomanqasim.github.io/assets/images/og-image.png`)
  for correct social previews.
