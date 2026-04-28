# CPHIMS Quiz - Setup and Deployment Guide

Welcome! This guide will help you set up and deploy the CPHIMS Self-Assessment Quiz to make it permanently available online.

## Quick Start

### Option 1: Deploy with Vercel (Recommended - 2 minutes)

1. **Create a GitHub account** (if you don't have one): https://github.com/signup
2. **Fork or create a repository** with this project code
3. **Go to Vercel**: https://vercel.com/signup
4. **Click "New Project"**
5. **Import your GitHub repository**
6. **Click "Deploy"** - that's it!

Your site will be live in seconds at a URL like: `https://cphims-quiz.vercel.app`

### Option 2: Deploy with Netlify (2 minutes)

1. **Create a GitHub repository** with this project
2. **Go to Netlify**: https://netlify.com/signup
3. **Click "New site from Git"**
4. **Connect your GitHub account**
5. **Select your repository**
6. **Build settings are pre-configured** - just click "Deploy site"

Your site will be live at a URL like: `https://cphims-quiz.netlify.app`

### Option 3: Deploy with GitHub Pages (Free, 5 minutes)

1. **Create a GitHub repository** with this project
2. **Go to Settings → Pages**
3. **Select "Deploy from a branch"**
4. **Choose `main` branch and `/root` directory**
5. **Click "Save"**

Your site will be live at: `https://yourusername.github.io/cphims-quiz`

## Detailed Setup Instructions

### Prerequisites

- Node.js (v16+)
- pnpm package manager
- A GitHub account (for easy deployment)
- A code editor (VS Code recommended)

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/cphims-quiz.git
   cd cphims-quiz
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Start development server**:
   ```bash
   pnpm dev
   ```

4. **Open in browser**: http://localhost:5173

### Building for Production

```bash
pnpm build
```

This creates optimized files in the `dist/` folder ready for deployment.

## Deployment Platforms Comparison

| Platform | Cost | Setup Time | Custom Domain | Auto-Deploy | Best For |
|----------|------|-----------|---|---|---|
| **Vercel** | Free tier | 2 min | Yes | Yes | Easiest, best performance |
| **Netlify** | Free tier | 2 min | Yes | Yes | Great UX, good features |
| **GitHub Pages** | Free | 5 min | Yes | Yes | Simple, no external account |
| **AWS S3** | Pay-as-you-go | 10 min | Yes | Manual | Enterprise, high traffic |
| **Traditional Server** | Varies | 15 min | Yes | Manual | Full control |

## Step-by-Step: Deploy to Vercel

1. **Push code to GitHub**:
   ```bash
   git remote add origin https://github.com/yourusername/cphims-quiz.git
   git branch -M main
   git push -u origin main
   ```

2. **Sign up for Vercel**: https://vercel.com/signup

3. **Import project**:
   - Click "New Project"
   - Select "Import Git Repository"
   - Paste your GitHub repo URL
   - Click "Import"

4. **Configure build settings**:
   - Framework: Vite
   - Build Command: `pnpm build`
   - Output Directory: `dist`
   - (These should auto-detect)

5. **Deploy**:
   - Click "Deploy"
   - Wait 30-60 seconds
   - Your site is live!

6. **Add custom domain** (optional):
   - Go to Project Settings → Domains
   - Add your domain
   - Follow DNS instructions

## Step-by-Step: Deploy to Netlify

1. **Push code to GitHub** (same as Vercel)

2. **Sign up for Netlify**: https://netlify.com/signup

3. **Create new site**:
   - Click "New site from Git"
   - Select GitHub
   - Authorize Netlify
   - Choose your repository

4. **Configure build**:
   - Build command: `pnpm build`
   - Publish directory: `dist`
   - (Pre-configured in netlify.toml)

5. **Deploy**:
   - Click "Deploy site"
   - Wait for build to complete
   - Your site is live!

## Step-by-Step: Deploy to GitHub Pages

1. **Create GitHub repository**:
   - Go to https://github.com/new
   - Name it `cphims-quiz`
   - Create repository

2. **Push code**:
   ```bash
   git remote add origin https://github.com/yourusername/cphims-quiz.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Select "Deploy from a branch"
   - Choose `main` branch
   - Choose `/root` directory
   - Click "Save"

4. **Wait for deployment**:
   - GitHub will build and deploy automatically
   - Check "Actions" tab for progress
   - Site will be at: `https://yourusername.github.io/cphims-quiz`

## Customization Before Deployment

### Change Quiz Title
Edit `index.html`:
```html
<title>Your Custom Title</title>
```

### Add More Questions
Edit `src/cphims_questions.json` and add new questions following the existing format.

### Customize Colors
Edit `src/style.css` and modify CSS variables:
```css
:root {
  --primary: #2563eb;      /* Main color */
  --success: #10b981;      /* Correct answer color */
  --danger: #ef4444;       /* Wrong answer color */
}
```

### Add Analytics
Add to `index.html` before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

## Troubleshooting

### Build fails locally
```bash
# Clear cache and reinstall
pnpm install
pnpm build
```

### Site shows blank page after deployment
- Check browser console (F12) for errors
- Verify all files uploaded to `dist/`
- Try clearing browser cache (Ctrl+Shift+Delete)

### Quiz questions don't load
- Verify `cphims_questions.json` is in `dist/assets/`
- Check network tab in DevTools
- Ensure JSON is valid

### Styling looks broken
- Clear browser cache
- Check CSS file is loaded in DevTools
- Verify CSS file size is reasonable

## Maintenance

### Update Quiz Questions
1. Edit `src/cphims_questions.json`
2. Run `pnpm build`
3. Commit and push changes
4. Deployment platforms auto-deploy

### Monitor Performance
- Use Lighthouse (Chrome DevTools)
- Check platform analytics
- Monitor error rates

### Backup Your Work
```bash
git push origin main  # Always push to GitHub
```

## Next Steps

1. **Deploy your site** using one of the methods above
2. **Share the URL** with colleagues and students
3. **Monitor usage** with analytics
4. **Gather feedback** and improve questions
5. **Keep it updated** with latest CPHIMS content

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **GitHub Pages Docs**: https://pages.github.com
- **CPHIMS Info**: https://www.himss.org/certifications/cphims/

## Questions?

For technical issues:
1. Check the README.md
2. Review DEPLOYMENT.md
3. Check platform-specific documentation
4. Review browser console for errors

---

**Happy deploying! Your CPHIMS quiz will be live in minutes.** 🚀
