# 🚀 Vercel Deployment Checklist for StormWatch

## ✅ **Pre-Deployment Verification**

### **1. Local Testing**
- [ ] **Server Running**: `npm run dev` starts successfully
- [ ] **Main Page**: http://localhost:5000 loads correctly
- [ ] **API Endpoints**: All API calls return data (not "API key not configured")
- [ ] **Environment Variables**: `.env` file contains correct API keys
- [ ] **Build Process**: `npm run build` completes without errors

### **2. Code Quality**
- [ ] **No Console Errors**: Browser console shows no errors
- [ ] **API Integration**: Weather data loads and displays
- [ ] **Map Functionality**: Mapbox map renders correctly
- [ ] **Search Feature**: City search with autocomplete works
- [ ] **Theme Toggle**: Dark/light mode switching works
- [ ] **Responsive Design**: Works on mobile and desktop

## 🔧 **Vercel Deployment Steps**

### **Step 1: Prepare Repository**
```bash
# Ensure all files are committed
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### **Step 2: Deploy to Vercel**
1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login** with GitHub account
3. **Click "New Project"**
4. **Import Repository**: Select your StormWatch repository
5. **Configure Project Settings**:
   - Framework Preset: `Other`
   - Root Directory: `./` (root of project)
   - Build Command: `npm run build`
   - Output Directory: `dist/public`
   - Install Command: `npm install`

### **Step 3: Environment Variables**
In Vercel dashboard, add these environment variables:
```
VITE_MAPBOX_API_KEY=pk.eyJ1IjoiYWJkdWxtdWVlejAwNyIsImEiOiJjbWRveGE0NDEwOGYwMm1zYmxhaW12dWRiIn0.i8Peh6ZJARKFgZUg8ofWQg
VITE_OPENWEATHERMAP_API_KEY=e36640b2f1281a978cba1eed5f75b82d
```

### **Step 4: Deploy**
1. **Click "Deploy"**
2. **Wait for build to complete**
3. **Check deployment logs for any errors**

## 🧪 **Post-Deployment Testing**

### **1. Basic Functionality**
- [ ] **Homepage Loads**: Main page displays correctly
- [ ] **No 404 Errors**: All routes work properly
- [ ] **API Calls**: Weather data loads from deployed API
- [ ] **Map Renders**: Mapbox map displays correctly
- [ ] **Search Works**: City search functionality works

### **2. API Endpoints**
Test these URLs on your deployed site:
- [ ] `https://your-domain.vercel.app/api/weather/London`
- [ ] `https://your-domain.vercel.app/api/cities/search?q=New York`
- [ ] `https://your-domain.vercel.app/api/reverse-geocode?lat=40.7128&lon=-74.0060`

### **3. User Experience**
- [ ] **Loading States**: Spinners and loading indicators work
- [ ] **Error Handling**: Graceful error messages
- [ ] **Responsive Design**: Works on mobile devices
- [ ] **Performance**: Page loads within 3 seconds
- [ ] **Real-time Features**: Lightning alerts update

## 🔍 **Troubleshooting Common Issues**

### **Issue 1: API Key Not Configured**
**Solution**: 
- Verify environment variables in Vercel dashboard
- Check that variable names match exactly
- Redeploy after adding environment variables

### **Issue 2: Build Failures**
**Solution**:
- Check Node.js version compatibility
- Ensure all dependencies are in package.json
- Review build logs for specific errors

### **Issue 3: CORS Errors**
**Solution**:
- Verify API routes are properly configured
- Check that frontend and backend URLs match
- Ensure proper CORS headers are set

### **Issue 4: Map Not Loading**
**Solution**:
- Verify Mapbox API key is correct
- Check browser console for API errors
- Ensure Mapbox account has proper permissions

## 📊 **Performance Optimization**

### **Before Deployment**
- [ ] **Image Optimization**: Compress and resize images
- [ ] **Code Splitting**: Implement lazy loading
- [ ] **Caching**: Configure proper cache headers
- [ ] **Minification**: Ensure production build is minified

### **After Deployment**
- [ ] **Page Speed**: Test with Google PageSpeed Insights
- [ ] **Core Web Vitals**: Monitor performance metrics
- [ ] **Error Tracking**: Set up error monitoring
- [ ] **Analytics**: Configure user analytics

## 🔒 **Security Checklist**

- [ ] **HTTPS**: Verify SSL certificate is active
- [ ] **API Keys**: Ensure keys are not exposed in frontend
- [ ] **Environment Variables**: Properly configured in Vercel
- [ ] **Input Validation**: All user inputs are validated
- [ ] **CORS**: Proper cross-origin resource sharing

## 📱 **Mobile Testing**

- [ ] **iOS Safari**: Test on iPhone/iPad
- [ ] **Android Chrome**: Test on Android devices
- [ ] **Touch Interactions**: Verify touch-friendly UI
- [ ] **Performance**: Test on slower devices
- [ ] **Offline Behavior**: Test with poor connectivity

## 🎯 **SEO & Analytics**

- [ ] **Meta Tags**: Proper title and description
- [ ] **Open Graph**: Social media sharing works
- [ ] **Sitemap**: Generate and submit sitemap
- [ ] **Google Analytics**: Track user behavior
- [ ] **Search Console**: Monitor search performance

## 📈 **Monitoring Setup**

- [ ] **Uptime Monitoring**: Set up alerts for downtime
- [ ] **Error Tracking**: Monitor JavaScript errors
- [ ] **Performance Monitoring**: Track page load times
- [ ] **User Analytics**: Monitor user engagement
- [ ] **API Monitoring**: Track API response times

## 🚨 **Emergency Procedures**

### **If Deployment Fails**
1. Check Vercel build logs
2. Verify environment variables
3. Test locally first
4. Rollback to previous version if needed

### **If Site Goes Down**
1. Check Vercel status page
2. Verify API keys are still valid
3. Check for rate limiting issues
4. Contact Vercel support if needed

---

## 🎉 **Success Criteria**

Your StormWatch deployment is successful when:
- ✅ All pages load without errors
- ✅ Weather data displays correctly
- ✅ Map renders and is interactive
- ✅ City search works with autocomplete
- ✅ Theme toggle functions properly
- ✅ Mobile responsive design works
- ✅ API endpoints return data
- ✅ Performance is acceptable (< 3s load time)

---

*Use this checklist to ensure a smooth deployment to Vercel!* 