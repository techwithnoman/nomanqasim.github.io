# M Noman Qasim — Portfolio Website

A dark, premium single-page portfolio built with plain **HTML, CSS and JavaScript**.
No frameworks, no build step — ready for GitHub Pages, Netlify or any static host.

## Files

```
index.html                 Main portfolio page
thank-you.html             Optional standalone confirmation page (not used by the form)
netlify.toml               Netlify settings (publish root + security headers)
assets/
  styles.css               All styling and responsive rules
  app.js                   Nav, animations, scroll progress, form logic
  M-Noman-Qasim-CV.pdf     Downloadable CV
  images/
    og-image.png           Social sharing image
    favicon.svg            Browser icon
    tallyreel-cover.svg    TallyReel project cover art
    tech-visual.svg        Hero tech illustration (laptop with code)
README.md
```

## 1. Hero visual

The hero uses a custom **tech illustration** instead of a photo:
**`assets/images/tech-visual.svg`** — a dark laptop with glowing code, circuit lines and
floating developer icons.

- Desktop: a large rounded card in the hero's right column.
- Phones (640 px and below): a **compact 100px circular badge** in the same flex row as the
  name, vertically centred with it.

To use a different image later, replace `tech-visual.svg` or update the two `src` values in
`index.html`. A square SVG or PNG works best (800 × 800 or larger, under 300 KB).

## 2. Preview locally

- **Quickest:** double-click `index.html`.
- **With the contact form and fonts behaving normally:**
  ```powershell
  npx serve .
  ```
  then open the URL it prints.

The contact form is frontend-only, so it works locally too: enter a name and message,
click **Send message**, then choose WhatsApp or Gmail.

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

The form is **frontend-only** — no backend, no FormSubmit, no activation email.

1. The visitor enters their **name** and **idea/message**.
2. Clicking **Send message** reveals two buttons: **WhatsApp** and **Gmail**.
3. **WhatsApp** opens `wa.me/923141626594` with a prefilled message.
4. **Gmail** opens Gmail compose to `nomanqasim.work@gmail.com` with the subject and
   message prefilled.
5. The visitor presses send inside WhatsApp or Gmail.

The message is built as:

```
Hi Noman, I'm {name}.

{message}
```

Because the visitor sends from their own WhatsApp/Gmail account, replies come straight
back to them. Editing either field after the buttons appear resets the composer.
The direct email link below the form remains available as a fallback.

## 6. Notes

- The TallyReel entry is described honestly as **product exploration and AI output
  evaluation**, matching your brief — not as a project you developed.
- Your CV is already included, and the hero uses a custom tech illustration. Project links and social URLs are wired up.
- Reduced-motion preferences, keyboard focus styles and labels are included.
- All links open in a new tab where appropriate (`rel="noopener"`).

## 7. After deploying

- Open the site on your phone and test the menu, buttons and form.
- Test both send buttons: WhatsApp should open with the prefilled message, and Gmail
  should open a compose window.
- Add the live URL to your GitHub profile, LinkedIn and CV.
- Update `og:image` in `index.html` to the full URL (e.g.
  `https://techwithnoman.github.io/nomanqasim.github.io/assets/images/og-image.png`)
  for correct social previews.
