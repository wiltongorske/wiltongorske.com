# Wilton Gorske

![Wilton Gorske portrait](images/linkedinprofile.jpg)

A small, fully static personal website originally designed in Webflow and adapted for GitHub Pages. The site presents Wilton Gorske's background in marketing, art direction, and digital strategy through a minimalist homepage, a portfolio-style work gallery, and a public keys/contact verification page, all delivered as a lightweight static site with HTML, CSS, and JavaScript.

## What This Repo Contains

- A responsive personal site with a homepage, selected work page, and public keys page.
- A portfolio gallery built from static images and styling transferred from the original Webflow design.
- SEO-friendly metadata, structured data, sitemap, and robots configuration for static hosting.
- A GitHub Pages-friendly setup with no build step and no framework dependency.

## Built With

- HTML5
- CSS3
- Vanilla JavaScript
- Webflow-designed source layout, adapted for static hosting
- GitHub Pages for deployment

## Project Structure

```text
.
├── index.html                  # Homepage content, metadata, and Person schema
├── work.html                   # Portfolio gallery page
├── keys.html                   # Public keys and contact verification page
├── 404.html                    # Static not-found page
├── css/
│   ├── normalize.css           # CSS reset from the export
│   ├── webflow.css             # Base styles carried over from the Webflow export
│   ├── wilton-gorske.webflow.css # Site-specific styles transferred from Webflow
│   └── site.css                # Shared custom fixes and accessibility helpers
├── js/
│   ├── webflow.js              # Webflow runtime/interactions
│   └── site.js                 # Shared custom behavior
├── images/                     # Portfolio, profile, and site image assets
├── fonts/                      # Locally hosted font assets
├── robots.txt                  # Crawl directives
├── sitemap.xml                 # Search engine sitemap
└── .github/workflows/
    └── deploy-pages.yml        # GitHub Pages deployment workflow
```

## Local Preview

Because the site is fully static, you can open `index.html` directly in a browser or serve the repository with any simple static file server.

Example:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## Notes

- The site was originally designed in Webflow, then cleaned up and adapted into a lightweight GitHub Pages-friendly static repo.
- The repository stays intentionally lightweight: no package manager, no bundler, and no framework layer.
- The current canonical and sitemap URLs assume the production domain is `https://wiltongorske.com`.
- This README was created with help from an LLM.
