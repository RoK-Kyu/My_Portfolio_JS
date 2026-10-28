# Bryan Balallo Portfolio — JavaScript Edition

A separate enhanced edition of the dark portfolio, using HTML, CSS, and a small JavaScript file. All seven supplied images are unchanged. No frameworks, external fonts, installations, or build commands are needed.

**This edition does not meet the school assignment’s no-JavaScript requirement. Use the separate CSS-only portfolio package for that submission.**

## Open the website

1. Extract the ZIP file.
2. Open the `personal-portfolio-scroll-v3` folder.
3. Double-click `index.html` to open it in a browser.

Keep `index.html`, `style.css`, `script.js`, and the `assets` folder together.

## Included files

- `index.html`: all page content, navigation, project details, and links.
- `style.css`: colors, typography, layout, responsive rules, hover effects, and focus states.
- `script.js`: scroll-triggered reveals, card staggering, pointer highlights, and portrait tilt.
- `assets/images/`: your portrait, three CampusFlow screenshots, and three Orbit Planner screenshots.
- `README.md`: this editing and publishing guide; it is not required to run the site.

The resume is linked to your existing resume website, so the portfolio itself needs only one HTML file.

## Edit later

- **Hero introduction:** open `index.html`, search for `EDIT HERO INTRODUCTION`, and replace the bracketed text in the next paragraph (`class="hero-intro"`). It is the only intentional content placeholder.
- **Content and links:** edit the corresponding section in `index.html`. Each section has a named ID, such as `projects`, `education`, or `contact`.
- **Colors:** edit the custom properties in `:root` at the beginning of `style.css`.
- **Images:** replace an image in `assets/images/` while preserving its filename, or update its `src` and screenshot link in `index.html`. Update the alt text and width/height attributes if the image changes.
- **Portrait crop:** change `object-position` in `.portrait-image img`. The original image file is preserved.

Project screenshots open at their original resolution in a new tab when selected. CampusFlow's supplied navigation image has an older scan-related label; its caption identifies it as an earlier interface, while the project description describes the current GPS-based version.

## Publish on GitHub Pages

1. Sign in to GitHub and create a new public repository, for example `personal-portfolio`.
2. Choose **Add file → Upload files** (or the upload option on a new empty repository).
3. Upload the **contents** of the extracted `personal-portfolio-scroll-v3` folder. `index.html` must be at the repository's top level, beside `style.css`, `script.js`, and `assets/`. Do not upload the ZIP or place the whole project inside another folder.
4. Commit the uploaded files to `main`.
5. Open the repository's **Settings → Pages**.
6. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
7. Select **main** and **/(root)**, then click **Save**.
8. Wait for publishing to finish. Open the website URL shown in Pages settings.

If your repository is named `personal-portfolio`, your expected website address is `https://rok-kyu.github.io/personal-portfolio/`. It becomes available only after you publish it. No build command or code changes are needed.

Official guide: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## School submission

After publishing, record a short walkthrough of the website and post it to your TikTok account. Submit your TikTok post link and GitHub repository link as required by your teacher; include the live GitHub Pages link too so the website is easy to open.

The downloadable package does not publish to your GitHub or TikTok accounts.

## Scroll animation edition — version 3

Open this edition’s `index.html` in Chrome, Edge, Firefox, or Safari, then scroll down. A floating **Animations: On** button shows that the new script has loaded. If it reads **Animations: Off**, click it to enable the full effects for this visit. The default follows the device’s reduced-motion preference.

- Section headings rise into view with a soft blur-to-sharp transition.
- Text panels slide in from opposing sides.
- Skills, achievements, and contact cards appear in a staggered perspective sequence.
- CampusFlow screenshots rise and tilt into place, then drift gently as you scroll.
- Orbit Planner screenshots enter with a perspective zoom.
- The education timeline fills as you scroll through it.
- A thin progress bar and active navigation indicator follow your position.
- Entrances reset well outside the viewport so they replay when you return to a section.
- Pointer highlights and portrait tilt remain available on mouse devices.

The toggle turns movement off immediately and exposes all content. Keyboard focus also reveals the focused block. JavaScript never adds hidden states unless it initializes successfully. Without JavaScript, the portfolio remains readable and its ordinary links work.

### If you still see the old version

1. Extract the entire latest ZIP into a new folder.
2. Open that folder’s `index.html`, not an older copy or the ZIP preview.
3. Make sure `script.js` and `style.css` are beside it. The Animation button should be visible.
4. For a hosted site, replace all three files together and refresh with **Ctrl+F5**. Asset version tags also help avoid cached files.
5. If the button says Off, click it to turn the scroll effects on.

Edit section **19. Scroll choreography** in `style.css` for distances, perspective, blur, and duration. Edit `register()` calls and `update()` in `script.js` for stagger groups, reveal positions, replay boundaries, and screenshot drift. There are no external animation libraries or build requirements.

## Verification

Checked local image paths, alt text, section anchors, unique IDs, balanced markup, external-link attributes, and the local script reference. The stylesheet includes layouts for desktop, tablet, and phone widths, along with reduced-motion preferences and visible keyboard focus.

Verified in a live Chrome preview: scroll-triggered visibility, card stagger delays, reset on return to the top, the On/Off control, and no horizontal overflow at the tested desktop width. Other browsers and physical mobile devices were not tested.
