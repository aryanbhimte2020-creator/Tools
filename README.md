# Multi-Tools Hub - 100+ Free Online Tools

A comprehensive collection of 100+ free online tools built with HTML, CSS (Bootstrap), and Vanilla JavaScript. Each tool is modular and fully responsive.

## 🚀 Quick Start

### Option 1: Using Python HTTP Server (Recommended)
1. **Start the server:**
   ```bash
   # Windows (PowerShell)
   .\start-server.ps1
   
   # Windows (Command Prompt)
   start-server.bat
   
   # Or directly with Python
   python server.py
   ```

2. **Open your browser and go to:**
   - Main page: http://localhost:8000/index.html
   - Test page: http://localhost:8000/test.html

### Option 2: Using Live Server (VS Code Extension)
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html` and select "Open with Live Server"

### Option 3: Using Node.js http-server
```bash
# Install http-server globally
npm install -g http-server

# Start the server
http-server -p 8000
```

## 🛠️ Available Tools

### Currently Implemented:
- ✅ **Word Counter** - Count words, characters, sentences, and paragraphs
- ✅ **JSON Formatter** - Format, validate, and beautify JSON data
- ✅ **BMI Calculator** - Calculate Body Mass Index with health recommendations
- ✅ **Password Generator** - Generate secure passwords with customizable options

### Coming Soon (90+ more tools):
- Image converters (PNG, JPG, WebP, etc.)
- SEO tools (Meta tag generator, keyword analyzer)
- Text utilities (Case converter, text reverser)
- Developer tools (Base64 encoder, URL encoder)
- Calculators (Age calculator, percentage calculator)
- Unit converters (Length, weight, temperature)
- Security tools (Hash generator, encryption tools)
- Social media tools (Hashtag generator, post scheduler)

## 📁 Project Structure

```
tools/
├── index.html              # Main homepage
├── test.html               # Test page for debugging
├── server.py               # Python HTTP server
├── start-server.bat        # Windows batch file
├── start-server.ps1        # PowerShell script
├── css/
│   └── style.css           # Main stylesheet
├── js/
│   ├── main.js             # Core JavaScript
│   ├── word-counter.js     # Word counter tool
│   ├── json-formatter.js   # JSON formatter tool
│   ├── bmi-calculator.js   # BMI calculator tool
│   └── password-generator.js # Password generator tool
├── word-counter.html       # Word counter page
├── json-formatter.html     # JSON formatter page
├── bmi-calculator.html     # BMI calculator page
├── password-generator.html # Password generator page
├── sitemap.xml            # SEO sitemap
├── robots.txt             # SEO robots file
└── README.md              # This file
```

## 🔧 Features

- **Fully Responsive** - Works on all devices
- **Modular Design** - Each tool in separate files
- **Fast Loading** - Minimal external dependencies
- **SEO Optimized** - Meta tags, sitemap, robots.txt
- **Ad Ready** - Integrated ad spaces for monetization
- **Search Functionality** - Real-time tool search
- **Dynamic Content** - Header/footer loaded dynamically
- **Modern UI** - Bootstrap 5 with custom styling

## 🎨 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom styling with Bootstrap 5
- **Vanilla JavaScript (ES6+)** - No frameworks
- **Bootstrap 5** - Responsive grid and components
- **Font Awesome** - Icons
- **Local Storage** - Data persistence

## 🐛 Troubleshooting

### "File not found" Error
If you're getting "File not found" errors:

1. **Don't open HTML files directly** - Use a local server instead
2. **Use the provided server scripts** - They handle path resolution correctly
3. **Check the test page** - http://localhost:8000/test.html shows resource loading status

### Common Issues:

1. **Python not found:**
   ```bash
   # Try these alternatives:
   python3 server.py
   py server.py
   ```

2. **Port 8000 already in use:**
   - Edit `server.py` and change `PORT = 8000` to another port
   - Or kill the process using port 8000

3. **CSS/JS not loading:**
   - Make sure you're using a local server (not opening files directly)
   - Check the test page for resource loading status

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🔒 Security

- All tools run client-side
- No data sent to external servers
- Local storage used for user preferences
- HTTPS recommended for production

## 📈 Performance

- Minimal external dependencies
- Optimized CSS and JavaScript
- Lazy loading for future tools
- Compressed assets for production

## 🚀 Deployment

### Static Hosting (Netlify, Vercel, GitHub Pages)
1. Upload all files to your hosting provider
2. Set `index.html` as the default page
3. Configure custom domain (optional)

### Traditional Web Server
1. Upload files to your web server
2. Ensure proper file permissions
3. Configure server for single-page routing (if needed)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your tool following the existing pattern
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Use the test page to verify resource loading
3. Open an issue with detailed error information

---

**Happy coding! 🎉**
