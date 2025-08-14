# Troubleshooting Guide - Multi-Tools Hub

## 🚨 Common Issues and Solutions

### 1. "File not found" or "ERR_FILE_NOT_FOUND" Error

**Problem:** You're getting file not found errors when trying to open the website.

**Solutions:**

#### Option A: Use Standalone Version (Recommended)
1. **Double-click** `open-standalone.bat` to open the standalone version
2. **Or manually open** `index-standalone.html` in your browser
3. This version works without any server and includes all content directly

#### Option B: Check File Structure
Make sure your folder structure looks like this:
```
tools/
├── index.html
├── index-standalone.html          ← Use this for no-server setup
├── word-counter.html
├── word-counter-standalone.html   ← Use this for no-server setup
├── json-formatter.html
├── bmi-calculator.html
├── password-generator.html
├── test.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── word-counter.js
│   ├── json-formatter.js
│   ├── bmi-calculator.js
│   └── password-generator.js
├── open-website.bat
├── open-standalone.bat           ← Use this for no-server setup
└── README.md
```

### 2. CSS/JavaScript Not Loading

**Problem:** The website opens but looks unstyled or JavaScript doesn't work.

**Solutions:**
1. **Use the standalone version** - `index-standalone.html` includes everything directly
2. **Check the test page** - Open `test.html` to see which resources are loading
3. **Verify file paths** - Make sure `css/style.css` and `js/` folder exist

### 3. Python/Node.js Not Installed

**Problem:** You can't run the server because Python or Node.js isn't installed.

**Solutions:**
1. **Use standalone version** - No server required!
2. **Install Python** (optional):
   - Download from https://python.org
   - Or install from Microsoft Store
3. **Install Node.js** (optional):
   - Download from https://nodejs.org

### 4. Tools Not Working

**Problem:** Individual tools don't function properly.

**Solutions:**
1. **Use standalone tool versions**:
   - `word-counter-standalone.html`
   - `json-formatter-standalone.html` (when created)
   - `bmi-calculator-standalone.html` (when created)
   - `password-generator-standalone.html` (when created)

2. **Check browser console** for JavaScript errors:
   - Press F12 to open developer tools
   - Look at the Console tab for error messages

### 5. Links Not Working

**Problem:** Navigation links between pages don't work.

**Solutions:**
1. **Use standalone versions** - All links in standalone versions work without server
2. **Check file names** - Make sure all HTML files exist
3. **Use relative paths** - Don't move files to different folders

## 🔧 Quick Fixes

### For Immediate Use (No Server Required):
1. **Double-click** `open-standalone.bat`
2. **Or open** `index-standalone.html` directly in your browser
3. **Use** `word-counter-standalone.html` for the word counter tool

### For Testing:
1. **Open** `test.html` to check if all resources load correctly
2. **Look for** green checkmarks indicating successful loading
3. **If any fail**, check the file paths mentioned in the error

### For Development:
1. **Install Python** if you want to use the server version
2. **Use VS Code** with Live Server extension
3. **Use any local server** of your choice

## 📁 File Descriptions

### Main Files:
- `index.html` - Main page (requires server for dynamic loading)
- `index-standalone.html` - Main page (works without server)
- `test.html` - Test page to check resource loading

### Tool Files:
- `word-counter.html` - Word counter tool (requires server)
- `word-counter-standalone.html` - Word counter tool (no server needed)
- `json-formatter.html` - JSON formatter tool
- `bmi-calculator.html` - BMI calculator tool
- `password-generator.html` - Password generator tool

### Script Files:
- `open-website.bat` - Opens main page
- `open-standalone.bat` - Opens standalone version (recommended)
- `server.py` - Python server (requires Python)
- `start-server.bat` - Starts Python server
- `start-server.ps1` - PowerShell script to start server

### Resource Files:
- `css/style.css` - Main stylesheet
- `js/main.js` - Core JavaScript functionality
- `js/word-counter.js` - Word counter functionality
- `js/json-formatter.js` - JSON formatter functionality
- `js/bmi-calculator.js` - BMI calculator functionality
- `js/password-generator.js` - Password generator functionality

## 🎯 Recommended Workflow

### For Users (No Technical Knowledge):
1. **Double-click** `open-standalone.bat`
2. **Use** the tools directly in your browser
3. **No installation** or server setup required

### For Developers:
1. **Use standalone versions** for immediate testing
2. **Install Python** for server development
3. **Use VS Code** with Live Server for development

## 🆘 Still Having Issues?

If you're still experiencing problems:

1. **Check the test page** - `test.html` will show exactly what's working
2. **Verify all files exist** - Make sure no files are missing
3. **Try a different browser** - Chrome, Firefox, Edge, Safari
4. **Check file permissions** - Make sure files aren't read-only
5. **Disable antivirus temporarily** - Some antivirus software blocks local files

## 📞 Support

If none of these solutions work:
1. **Check the test page** first
2. **Note the exact error message**
3. **Check which files are missing** (if any)
4. **Try the standalone versions** before asking for help

---

**Remember:** The standalone versions (`*-standalone.html`) work without any server or installation!
