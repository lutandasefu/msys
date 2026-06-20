# Msysintertech Website

Modern, responsive business website for **Msysintertech** — telecoms and IT solutions provider.

## Pages

| File | Description |
|---|---|
| `index.html` | Homepage with hero, services overview, quote form, testimonials |
| `services.html` | All services overview |
| `telecoms.html` | Telecoms service page |
| `it-support.html` | IT Support service page |
| `voip.html` | VoIP Solutions + phone product cards |
| `wireless.html` | Wireless networking service page |
| `cloud-pabx.html` | Cloud Hosted PABX service page |
| `about.html` | About us, team, values, certifications |
| `quote.html` | Request a Quotation form |
| `contact.html` | Contact page with form and details |

## File Structure

```
msysintertech/
├── index.html
├── services.html
├── telecoms.html
├── it-support.html
├── voip.html
├── wireless.html
├── cloud-pabx.html
├── about.html
├── quote.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/          ← add your images here
```

## Customisation Checklist

### 1. Replace Placeholders
- **Logo**: Replace the `M` letter logo with your actual logo image in the `.navbar__logo-img` element across all pages
- **Phone number**: Search and replace `+27 00 000 0000` with your real number
- **Email**: Replace `info@msysintertech.co.za` with your actual email
- **Address**: Update on `contact.html`
- **Images**: All image placeholders are marked — replace the placeholder `<div>` blocks with `<img>` tags pointing to your photos
- **Team names**: Update `about.html` with real names and photos
- **Social links**: Update LinkedIn, Facebook, Twitter links in each footer

### 2. Add Your Images
Place images in the `/images/` folder and update references. Recommended images:
- `hero.jpg` — Hero section background or feature photo (1200×900px)
- `telecoms.jpg` — Telecoms service feature (800×600px)
- `it-support.jpg` — IT support feature (800×600px)
- `voip.jpg` — VoIP feature (800×600px)
- `wireless.jpg` — Wireless feature (800×600px)
- `cloud-pabx.jpg` — Cloud PABX feature (800×600px)
- `team-*.jpg` — Team member headshots (400×400px square)
- `logo.svg` — Your logo file

### 3. Connect the Forms
The quote and contact forms currently show a success message after a timeout (demo only). To make them actually send:

**Option A — EmailJS (free, no backend needed):**
```html
<script src="https://cdn.emailjs.com/dist/email.min.js"></script>
```
Then update the form submit handler in `js/main.js`.

**Option B — Formspree:**
Change the form `action` attribute:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option C — Netlify Forms:**
Add `data-netlify="true"` to each form if hosting on Netlify.

### 4. Google Maps
On `contact.html`, replace the map placeholder `<div>` with your Google Maps embed `<iframe>`.

### 5. Update Pricing
Review and update all pricing in `voip.html`, `it-support.html`, and `cloud-pabx.html` to match your actual rates.

## Hosting on GitHub Pages

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to `main` branch, root folder
4. Your site will be live at `https://yourusername.github.io/repository-name/`

For a custom domain (`www.msysintertech.co.za`):
1. Add a `CNAME` file to the repo root containing your domain
2. Update DNS records at your domain registrar

## Brand Colours

| Name | Hex |
|---|---|
| Deep Violet | `#40345f` |
| Violet Dark | `#2b2240` |
| Amber | `#ff8d17` |
| White | `#ffffff` |
| Black | `#0a0a0a` |

## Fonts Used

- **Syne** — Display/headings (loaded from Google Fonts)
- **Inter** — Body text (loaded from Google Fonts)

Both load automatically via the `@import` in `css/style.css`. No installation needed.

## Browser Support

Tested and compatible with Chrome, Firefox, Safari, Edge (all modern versions). Mobile responsive down to 320px.
