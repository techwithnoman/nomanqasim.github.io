# M Noman Qasim — Portfolio Website

A dark, premium single-page portfolio built with plain **HTML, CSS and JavaScript**.
No frameworks, no build step — ready to drag onto Netlify.

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
2. Put it in:
   ```
   portfolio\assets\images\
   ```
3. Refresh the page.

Recommended: a portrait crop (4:5) or square, roughly 900 × 1100 px, under 300 KB.
The image is cropped from the top-centre, so keep the face in the upper half.

## 2. Preview locally

- **Quickest:** double-click `portfolio\index.html`.
- **With the contact form and fonts behaving normally:**
  ```powershell
  npx serve portfolio
  ```
  then open the URL it prints.

On localhost the contact form shows a "Preview mode" notice instead of submitting.
It starts working after the site is deployed to Netlify.

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

## 4. Deploy to Netlify

**Option A — drag & drop (fastest)**

1. Go to <https://app.netlify.com/drop>
2. Drag the **`portfolio`** folder (the one containing `index.html`) onto the page.
3. You get a live URL immediately. Rename it under **Site configuration → Change site name**.

**Option B — GitHub (auto-deploy on every push)**

1. Push this folder to a GitHub repository.
2. Netlify → **Add new site → Import an existing project**.
3. Choose the repo. Build command: *leave empty*. Publish directory: `.`
4. Deploy — every push updates the site automatically.

`netlify.toml` already sets the publish directory and a few security headers.

## 5. Contact form

The form uses **Netlify Forms** — no backend or third-party account needed.

- It has `data-netlify="true"` and a hidden `form-name` field.
- Netlify detects the form on the first deploy. Check **Site → Forms** to confirm.
- Submissions appear in the Netlify dashboard; add email notifications there.
- On success, visitors land on `thank-you.html`.
- Free plan: 100 submissions per month.
- A honeypot field blocks basic spam bots.

If you ever move off Netlify, switch the form to Formspree/EmailJS or a custom backend.

## 6. Notes

- The TallyReel entry is described honestly as **product exploration and AI output
  evaluation**, matching your brief — not as a project you developed.
- Your photo and CV are already included. Project links and social URLs are wired up.
- Reduced-motion preferences, keyboard focus styles and labels are included.
- All links open in a new tab where appropriate (`rel="noopener"`).

## 7. After deploying

- Open the site on your phone and test the menu, buttons and form.
- Add the live URL to your GitHub profile, LinkedIn and CV.
- Update `og:image` in `index.html` to the full URL (e.g.
  `https://your-site.netlify.app/assets/images/og-image.png`) for correct social previews.
