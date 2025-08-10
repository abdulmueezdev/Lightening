# StormWatch Deployment Guide

## 🚀 **Deploy Your StormWatch Application**

### **Option 1: Vercel (Recommended - Easiest)**

#### **Step 1: Prepare for Deployment**
```bash
# Build the project
npm run build
```

#### **Step 2: Deploy to Vercel**
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository or upload files
4. Configure environment variables:
   ```
   VITE_MAPBOX_API_KEY=pk.eyJ1IjoiYWJkdWxtdWVlejAwNyIsImEiOiJjbWRveGE0NDEwOGYwMm1zYmxhaW12dWRiIn0.i8Peh6ZJARKFgZUg8ofWQg
   VITE_OPENWEATHERMAP_API_KEY=e36640b2f1281a978cba1eed5f75b82d
   ```
5. Deploy!

#### **Step 3: Configure Backend**
- Deploy backend to [Railway](https://railway.app) or [Render](https://render.com)
- Update frontend API calls to use your backend URL

---

### **Option 2: Netlify**

#### **Step 1: Build and Deploy**
```bash
npm run build
```

#### **Step 2: Deploy to Netlify**
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your `dist` folder
3. Configure environment variables in Netlify dashboard
4. Your site will be live at `https://your-site.netlify.app`

---

### **Option 3: Render (Full-Stack)**

#### **Step 1: Prepare Repository**
1. Ensure your repository is on GitHub
2. Add a `render.yaml` file:

```yaml
services:
  - type: web
    name: stormwatch-backend
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: VITE_MAPBOX_API_KEY
        value: pk.eyJ1IjoiYWJkdWxtdWVlejAwNyIsImEiOiJjbWRveGE0NDEwOGYwMm1zYmxhaW12dWRiIn0.i8Peh6ZJARKFgZUg8ofWQg
      - key: VITE_OPENWEATHERMAP_API_KEY
        value: e36640b2f1281a978cba1eed5f75b82d

  - type: web
    name: stormwatch-frontend
    env: static
    buildCommand: npm run build
    staticPublishPath: ./dist/public
```

#### **Step 2: Deploy**
1. Go to [render.com](https://render.com)
2. Connect your GitHub repository
3. Render will automatically deploy both frontend and backend

---

### **Option 4: Railway (Full-Stack)**

#### **Step 1: Deploy Backend**
1. Go to [railway.app](https://railway.app)
2. Create new project from GitHub
3. Add environment variables
4. Deploy

#### **Step 2: Deploy Frontend**
1. Create another Railway project for frontend
2. Configure build settings
3. Deploy

---

## 🔧 **Environment Variables**

### **Required Variables**
```bash
VITE_MAPBOX_API_KEY=pk.eyJ1IjoiYWJkdWxtdWVlejAwNyIsImEiOiJjbWRveGE0NDEwOGYwMm1zYmxhaW12dWRiIn0.i8Peh6ZJARKFgZUg8ofWQg
VITE_OPENWEATHERMAP_API_KEY=e36640b2f1281a978cba1eed5f75b82d
```

### **Optional Variables**
```bash
DATABASE_URL=postgresql://username:password@localhost:5432/storm_watch_sky
NODE_ENV=production
PORT=5000
```

---

## 📊 **Performance Optimization**

### **Before Deployment**
1. **Optimize Images**: Compress and resize images
2. **Minify Code**: Ensure production build is minified
3. **Enable Caching**: Configure proper cache headers
4. **CDN**: Use a CDN for static assets

### **Monitoring**
1. **Uptime Monitoring**: Set up alerts for downtime
2. **Performance Monitoring**: Track page load times
3. **Error Tracking**: Monitor for JavaScript errors
4. **Analytics**: Track user engagement

---

## 🔒 **Security Checklist**

### **Pre-Deployment**
- [ ] **API Keys**: Never commit API keys to repository
- [ ] **Environment Variables**: Use secure environment variable storage
- [ ] **HTTPS**: Ensure all connections use HTTPS
- [ ] **CORS**: Configure proper CORS settings
- [ ] **Input Validation**: Validate all user inputs
- [ ] **Rate Limiting**: Implement API rate limiting

### **Post-Deployment**
- [ ] **SSL Certificate**: Verify SSL is working
- [ ] **Security Headers**: Add security headers
- [ ] **Regular Updates**: Keep dependencies updated
- [ ] **Backup Strategy**: Implement data backup

---

## 🌐 **Custom Domain Setup**

### **Vercel**
1. Go to project settings
2. Add custom domain
3. Update DNS records
4. Wait for propagation

### **Netlify**
1. Go to domain settings
2. Add custom domain
3. Configure DNS
4. Enable HTTPS

---

## 📱 **Mobile Optimization**

### **Testing**
- [ ] **Responsive Design**: Test on various screen sizes
- [ ] **Touch Interactions**: Ensure touch-friendly UI
- [ ] **Performance**: Test on slower devices
- [ ] **Offline Support**: Consider PWA features

---

## 🎯 **SEO Optimization**

### **Meta Tags**
```html
<meta name="description" content="Real-time weather monitoring and lightning strike alerts">
<meta name="keywords" content="weather, lightning, storm, monitoring, alerts">
<meta property="og:title" content="StormWatch - Weather & Lightning Monitoring">
<meta property="og:description" content="Monitor weather conditions and lightning strikes in real-time">
```

### **Sitemap**
- Generate sitemap.xml
- Submit to search engines
- Monitor search performance

---

## 📈 **Analytics Setup**

### **Google Analytics**
1. Create Google Analytics account
2. Add tracking code to your app
3. Set up goals and events
4. Monitor user behavior

### **Performance Monitoring**
1. Set up Core Web Vitals monitoring
2. Track page load times
3. Monitor API response times
4. Set up alerts for performance issues

---

## 🚨 **Troubleshooting**

### **Common Issues**
1. **Build Failures**: Check Node.js version and dependencies
2. **API Errors**: Verify environment variables are set
3. **CORS Issues**: Configure proper CORS settings
4. **Performance Issues**: Optimize images and code

### **Support Resources**
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app)

---

*Your StormWatch application is ready for deployment! Choose the platform that best fits your needs.* 