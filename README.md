# Abarie.com Website

Nigeria's Rib-Cracker — Official Comedian & Compere Website

## 📁 Folder Structure

```
abarie-website/
├── index.html              ← Homepage
├── portfolio.html          ← Full portfolio
├── book-me.html            ← Booking enquiry form
├── tickets.html            ← Tickets (Flutterwave)
├── testimonials.html       ← Testimonials
├── contacts.html           ← Contact page
├── css/
│   └── style.css           ← All styles
├── js/
│   └── main.js             ← All JavaScript
├── images/
│   ├── hero/               ← Hero slideshow images (abarie-hero-1.jpg, etc.)
│   ├── shows/              ← Show/event photography
│   ├── posters/            ← Show posters (sfsg1.jpg, sfsg2.jpg, sfsg3.jpg, etc.)
│   └── gallery/            ← General gallery / video thumbnails
└── README.md
```

## 🖼️ Adding Images

Drop images into the correct folder, then update the HTML comments:

### Hero slideshow (index.html)
- `images/hero/abarie-hero-1.jpg` — Main performer photo
- `images/hero/abarie-hero-2.jpg` — Second performer photo
- `images/hero/sfsg2-poster.jpg`  — SFSG 2.0 poster
- `images/hero/abarie-stage.jpg`  — On-stage photo

### Show posters (events carousel)
- `images/posters/sfsg3.jpg`
- `images/posters/sfsg2.jpg`
- `images/posters/sfsg1.jpg`
- `images/posters/mudiaga.jpg`

### YouTube thumbnails (past events slider)
- `images/gallery/sfsg2-wide.jpg`
- `images/gallery/mudiaga.jpg`
- `images/gallery/sfsg1-1.jpg`

To activate an image, find the placeholder block in the HTML and swap:
```html
<!-- BEFORE (placeholder) -->
<div class="hero-slide-placeholder">...</div>

<!-- AFTER (real image) -->
<img src="images/hero/abarie-hero-1.jpg" alt="Abarie.com performer"/>
```

## 🚀 Deployment — GitHub + Cloudflare Pages

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit — Abarie.com website"
git remote add origin https://github.com/YOUR_USERNAME/abarie-website.git
git push -u origin main
```

### Step 2: Deploy on Cloudflare Pages
1. Go to https://pages.cloudflare.com
2. Click **Create a project** → **Connect to Git**
3. Select your GitHub repo
4. Build settings:
   - **Framework preset:** None
   - **Build command:** (leave empty)
   - **Build output directory:** `/` (root)
5. Click **Save and Deploy**

### Step 3: Custom Domain (when acquired)
In Cloudflare Pages → Custom domains → Add `abarie.com`

## 💳 Flutterwave Integration

When the Flutterwave payment link is ready:
1. Open `tickets.html`
2. Find the `buyTicket()` function in the `<script>` tag
3. Replace the `prompt()` with:
```javascript
function buyTicket() {
  window.open('YOUR_FLUTTERWAVE_PAYMENT_LINK', '_blank');
}
```

Or use the Flutterwave inline payment SDK:
```html
<script src="https://checkout.flutterwave.com/v3.js"></script>
```

## 📱 Social Media Links (all verified)
| Platform | URL |
|----------|-----|
| Instagram | https://www.instagram.com/abarie.com_/ |
| Facebook | https://www.facebook.com/Abariedotcomcomedy/ |
| YouTube | https://www.youtube.com/channel/UCqwQwJ-pYK1hlrEjAmgbw4Q |
| TikTok | https://www.tiktok.com/@abarie.com |
| WhatsApp | https://wa.me/2347031557062 |
| Email | Abariedaniel212@gmail.com |

## ✅ Checklist Before Going Live
- [ ] Add real performer photos to `images/hero/`
- [ ] Add show posters to `images/posters/`
- [ ] Add video thumbnails to `images/gallery/`
- [ ] Add Flutterwave payment link to `tickets.html`
- [ ] Update TikTok handle if different from `@abarie.com`
- [ ] Remove "DEMO" references if any remain
- [ ] Test all forms on mobile
- [ ] Test all social links
- [ ] Connect custom domain on Cloudflare

---
Built for **Abarie.com Entertainment** · Lagos, Nigeria
