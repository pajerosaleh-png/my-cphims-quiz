# CPHIMS Quiz - Deployment Guide

This guide provides step-by-step instructions for deploying the CPHIMS Self-Assessment Quiz to various hosting platforms.

## Prerequisites

Before deploying, ensure you have:
1. Built the project: `pnpm build`
2. Verified the build output in the `dist/` directory
3. An account with your chosen hosting provider

## Deployment Options

### Option 1: Vercel (Recommended - Easiest)

Vercel is a modern hosting platform with automatic deployments and excellent performance.

**Steps:**
1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to project directory: `cd cphims-quiz`
3. Deploy: `vercel`
4. Follow the prompts to connect your GitHub/GitLab account
5. Your site will be live at a Vercel URL

**Advantages:**
- Automatic deployments from Git
- Free tier available
- Global CDN
- Automatic HTTPS
- Environment variables support

### Option 2: Netlify

Netlify offers continuous deployment and excellent developer experience.

**Steps:**
1. Build the project: `pnpm build`
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect your repository
5. Build command: `pnpm build`
6. Publish directory: `dist`
7. Click "Deploy site"

**Advantages:**
- Easy Git integration
- Free tier with generous limits
- Automatic HTTPS
- Form handling capabilities
- Analytics included

### Option 3: GitHub Pages

Deploy directly from your GitHub repository.

**Steps:**
1. Create a GitHub repository
2. Push your code to the repository
3. Go to Settings → Pages
4. Select "Deploy from a branch"
5. Choose `main` branch and `/root` directory
6. Click "Save"

**Configuration needed:**
Add to `vite.config.ts`:
```typescript
export default {
  base: '/cphims-quiz/', // Replace with your repo name
}
```

**Advantages:**
- Free hosting
- Integrated with GitHub
- No external account needed
- Good for open-source projects

### Option 4: AWS S3 + CloudFront

For enterprise-grade hosting with advanced features.

**Steps:**
1. Create an S3 bucket
2. Enable static website hosting
3. Upload contents of `dist/` folder
4. Create CloudFront distribution pointing to S3
5. Configure domain name (optional)

**Advantages:**
- Highly scalable
- Pay-as-you-go pricing
- Advanced security options
- Global content delivery

### Option 5: Traditional Web Server

Deploy to your own server or shared hosting.

**Steps:**
1. Build the project: `pnpm build`
2. Connect via FTP/SSH to your server
3. Upload contents of `dist/` folder to web root
4. Ensure `.htaccess` is configured for SPA routing (if using Apache)
5. Test the deployment

**Apache .htaccess configuration:**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Nginx configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /var/www/cphims-quiz/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Post-Deployment Checklist

After deploying, verify:

- [ ] Site loads without errors
- [ ] All quiz questions display correctly
- [ ] Answer selection works
- [ ] Submit button functions properly
- [ ] Results page displays correctly
- [ ] Restart quiz button works
- [ ] Responsive design works on mobile
- [ ] Dark mode works (if system supports it)
- [ ] Page loads quickly
- [ ] HTTPS is enabled (if applicable)
- [ ] Custom domain is configured (if applicable)

## Performance Optimization

### Lighthouse Audit
Run Lighthouse audit to verify performance:
1. Open your deployed site in Chrome
2. Press F12 to open DevTools
3. Go to Lighthouse tab
4. Click "Analyze page load"

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 90+

### Caching Strategy
Configure caching headers for optimal performance:
- HTML files: No cache (or short cache)
- CSS/JS files: Long cache (1 year) with hash in filename
- Images: Long cache (1 month)

## Custom Domain Setup

### For Vercel:
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### For Netlify:
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Update DNS records

### For GitHub Pages:
1. Add CNAME file to repository root with your domain
2. Update DNS CNAME record to point to GitHub Pages

## Monitoring and Maintenance

### Analytics
Consider adding analytics to track usage:
- Google Analytics
- Vercel Analytics
- Netlify Analytics

### Updates
To update the quiz:
1. Make changes to source files
2. Run `pnpm build`
3. Redeploy (automatic with Git-based platforms)

### Backups
- Keep your source code in Git
- Regularly backup your questions JSON file
- Store deployment credentials securely

## Troubleshooting

### Site shows blank page
- Check browser console for errors
- Verify all files uploaded correctly
- Check that `index.html` is in root directory

### Quiz questions don't load
- Verify `cphims_questions.json` is included in build
- Check network tab in DevTools for failed requests
- Ensure JSON file path is correct

### Styling looks broken
- Clear browser cache (Ctrl+Shift+Delete)
- Verify CSS files are loaded
- Check for CORS issues

### Mobile layout broken
- Test in Chrome DevTools mobile view
- Verify viewport meta tag in HTML
- Check CSS media queries

## Support

For deployment issues:
1. Check platform-specific documentation
2. Review browser console for error messages
3. Test locally with `pnpm preview`
4. Check network requests in DevTools

---

**Last Updated**: April 2026
