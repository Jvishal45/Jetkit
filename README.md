# JetKit — free online tools

A responsive static website with:
- QR code generator (uses QRCode.js from cdnjs)
- Image compressor (Canvas API)
- Image resizer (Canvas API)
- About, Privacy, Terms, Contact pages
- `robots.txt` and `sitemap.xml`

## Test locally
Open `index.html` in a browser. The QR generator requires an internet connection to load QRCode.js from cdnjs. Image tools run client-side in a modern browser.

## Publish free with GitHub Pages
1. Create/sign in to a GitHub account at https://github.com/.
2. Create a **public** repository named `jetkit`.
3. Upload all files in this folder to the repository root (not a nested folder).
4. In the repository, open **Settings → Pages**.
5. Under build and deployment, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
6. Wait for GitHub Pages to publish. The address should look like `https://YOUR-USERNAME.github.io/jetkit/`.
7. Replace `YOUR-USERNAME` in `index.html` canonical URL, `robots.txt`, and `sitemap.xml` with your actual GitHub username. Commit the changes.
8. Open every page on mobile and desktop; test QR download, image compression and image resizing.
9. Add the final sitemap URL to Google Search Console after verifying site ownership.

## Before applying for AdSense
- Replace the placeholder contact details with a real monitored email address.
- Update the canonical URL and sitemap to your actual public URL.
- Review privacy and terms text so it accurately describes your actual site, hosting, and any services you add.
- Test all tools and fix errors.
- Add genuinely useful original content and clear navigation. Avoid publishing thin or automatically generated pages made only to show ads.
- Do not add fake ad code. Apply through AdSense and use only the code/instructions supplied by Google if approved.
- GitHub Pages is static hosting, not a guarantee of AdSense approval. Check current Google policies and eligibility before relying on monetization.

## Notes
- No analytics or AdSense code is included.
- Image files selected for compression/resizing are processed in the browser.
- QR text is processed by the QR library in the browser, but the library itself is downloaded from a third-party CDN.
- This is starter code, not legal advice or a guarantee of search rankings, indexing, or earnings.
