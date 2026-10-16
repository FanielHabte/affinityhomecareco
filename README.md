# Affinity Home Care website

A static, six-page website for Affinity Home Care: plain HTML, CSS, and JavaScript, with no build step and no dependencies. Open `index.html` in a browser to preview it, or upload the whole folder to any static host.

## Pages

| File | Page | Main action |
| --- | --- | --- |
| `index.html` | Home | Find care · Become a host provider |
| `families.html` | For Families & Case Managers | Request a consultation (plus a text link for case-manager referrals) |
| `providers.html` | Become a Provider | Start your application |
| `services.html` | Services | Talk with us |
| `about.html` | About | Get in touch |
| `contact.html` | Contact | Send message |

Links into the contact page pre-select the form's topic: `contact.html#care`, `#referral`, `#provider`, `#other`.

## Folder layout

```
index.html, families.html, providers.html, services.html, about.html, contact.html
assets/css/styles.css     design tokens (colors, fonts) at the top, then layout and components
assets/js/main.js         mobile menu + contact form (form settings at the top)
assets/images/            photos and favicon
```

## Design rules (Sage & Linen)

- Neutrals carry the page: linen background `#F4F3EE`, white surfaces, deep green-black text `#1F2A24`.
- Forest green `#2E5B45` is only for buttons and the primary path.
- Pale sage `#E4EBE3` marks the single "next step" panel on each page.
- Slate blue `#2F4B66` is only for the license badge.
- Type: Newsreader (headings) and Outfit (body) from Google Fonts.

All colors are variables at the top of `assets/css/styles.css`.

## Before launch

1. **Contact details.** Replace `(720) 555-1234`, `+17205551234`, and `hello@affinityhomecare.co` in every HTML file and in `assets/js/main.js`. Add real office hours on `contact.html`.
2. **Photos.** The current photos are free stock photos from Pexels (see credits below), used as stand-ins. Replace them with real photos of Affinity providers, residents, and staff, taken with signed photo-release consent, before launch. Keep the same file names and the pages update automatically.
3. **Confirm the facts.** Waivers accepted, ages served, and support needs served (see the open questions in the design document).
4. **Contact form.** In `assets/js/main.js`, set `FORM_ENDPOINT = "/"` to use Netlify Forms (the form already has `data-netlify="true"` and a spam honeypot), or set it to a Formspree URL. Until then the form runs in preview mode and sends nothing.
5. **Deploy.** For example, drag the folder into Netlify, then connect the domain in Netlify's domain settings.
6. **After launch.** Submit the site to Google Search Console, add `og:url` / canonical tags with the final domain, and add a privacy policy page.

## Photo credits (Pexels, free to use)

| File | Pexels photo ID |
| --- | --- |
| home-hero.jpg | 4058053 |
| home-step-know.jpg | 9870141 |
| home-step-match.jpg | 5737833 |
| home-step-support.jpg | 7446609 |
| home-choice-care.jpg | 7403030 |
| home-choice-provider.jpg | 11483618 |
| families-hero.jpg | 7403052 |
| families-fit.jpg | 4058222 |
| providers-hero.jpg | 6231744 |
| providers-walk.jpg | 5163635 |
| services-host-home.jpg | 7446752 |
| services-personal-assistance.jpg | 9016818 |
| services-respite.jpg | 8111328 |
| about-team.jpg | 7551752 |
| about-community.jpg | 4056609 |
| contact-coordinator.jpg | 12903198 |

Each photo can be found at `https://www.pexels.com/photo/<ID>/`. The people shown are stock models, not Affinity providers or residents.
