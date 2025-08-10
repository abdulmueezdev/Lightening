# 🧪 StormWatch Pre-Deployment Test Checklist

## ✅ **Code Verification (Already Done)**

### **1. Environment Variables Fixed**
- ✅ Added `import 'dotenv/config';` to server/index.ts
- ✅ .env file contains correct API keys
- ✅ Cross-env installed for Windows compatibility

### **2. Server Configuration Fixed**
- ✅ Host binding changed to "127.0.0.1" for Windows
- ✅ Port 5000 configured correctly
- ✅ Express server setup complete

### **3. API Integration Ready**
- ✅ OpenWeatherMap API key configured
- ✅ Mapbox API key configured
- ✅ API routes properly set up

## 🚀 **Manual Testing Steps**

### **Step 1: Start the Server**
```bash
# Open a NEW terminal/PowerShell window
cd C:\Users\Shapatar\Downloads\Compressed\StormWatch
npm run dev
```

### **Step 2: Test Basic Functionality**
1. **Open Browser**: Go to http://localhost:5000
2. **Check Main Page**: Should show StormWatch dashboard
3. **Verify Map**: Mapbox map should load
4. **Test Search**: Try searching for a city
5. **Check Weather**: Weather data should display

### **Step 3: Test API Endpoints**
Test these URLs in your browser:
- http://localhost:5000/api/weather/London
- http://localhost:5000/api/cities/search?q=New York
- http://localhost:5000/api/reverse-geocode?lat=40.7128&lon=-74.0060

## 🎯 **Expected Results**

### **✅ Success Indicators:**
- Server starts without errors
- Main page loads completely
- Map renders with Mapbox
- City search shows suggestions
- Weather data displays correctly
- No "API key not configured" errors
- Theme toggle works
- Responsive design works

### **❌ Failure Indicators:**
- Server won't start
- "API key not configured" errors
- Map doesn't load
- Search doesn't work
- Console errors in browser

## 🔧 **If Testing Fails**

### **Issue 1: Server Won't Start**
**Solution**: 
- Restart terminal
- Check Node.js installation
- Run: `node -v` and `npm -v`

### **Issue 2: API Key Errors**
**Solution**:
- Verify .env file exists
- Check API key values
- Restart server after changes

### **Issue 3: Map Not Loading**
**Solution**:
- Check Mapbox API key
- Verify internet connection
- Check browser console for errors

## 🚀 **Vercel Deployment Readiness**

### **✅ Ready for Deployment When:**
- [ ] Server starts successfully
- [ ] All API endpoints work
- [ ] Frontend loads without errors
- [ ] Map renders correctly
- [ ] Search functionality works
- [ ] No console errors

### **📁 Files Ready for Deployment:**
- ✅ vercel.json (deployment config)
- ✅ package.json (dependencies)
- ✅ .env (environment variables)
- ✅ All source code files

## 🎉 **Deployment Steps**

### **1. Test Locally First**
```bash
npm run dev
# Test all functionality
```

### **2. Deploy to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Import your repository
3. Add environment variables
4. Deploy

### **3. Post-Deployment Testing**
- Test all features on live site
- Verify API endpoints work
- Check mobile responsiveness
- Monitor for errors

---

## 📊 **Test Results Summary**

**Status**: Ready for testing and deployment
**Issues Fixed**: Environment variables, server configuration
**Next Step**: Manual testing, then Vercel deployment

---

*Your StormWatch project is prepared and ready for testing!* 