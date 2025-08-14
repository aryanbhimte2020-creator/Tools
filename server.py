#!/usr/bin/env python3
"""
Simple HTTP Server for Multi-Tools Website
Run this script to serve the website locally and avoid path resolution issues.
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

# Configuration
PORT = 8000
DIRECTORY = os.getcwd()

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Add CORS headers for development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def main():
    # Change to the script's directory
    os.chdir(DIRECTORY)
    
    # Create server
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        print(f"🚀 Multi-Tools Website Server Started!")
        print(f"📁 Serving files from: {DIRECTORY}")
        print(f"🌐 Open your browser and go to: http://localhost:{PORT}")
        print(f"📄 Main page: http://localhost:{PORT}/index.html")
        print(f"🛠️  Available tools:")
        print(f"   - Word Counter: http://localhost:{PORT}/word-counter.html")
        print(f"   - JSON Formatter: http://localhost:{PORT}/json-formatter.html")
        print(f"   - BMI Calculator: http://localhost:{PORT}/bmi-calculator.html")
        print(f"   - Password Generator: http://localhost:{PORT}/password-generator.html")
        print(f"\n⏹️  Press Ctrl+C to stop the server")
        
        # Try to open the main page in the default browser
        try:
            webbrowser.open(f'http://localhost:{PORT}/index.html')
        except:
            pass
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print(f"\n🛑 Server stopped by user")
            httpd.shutdown()

if __name__ == "__main__":
    main()
