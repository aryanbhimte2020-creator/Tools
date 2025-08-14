# Multi-Tools Website Server Starter
# Run this script to start the local development server

Write-Host "🚀 Starting Multi-Tools Website Server..." -ForegroundColor Green
Write-Host ""

try {
    python server.py
}
catch {
    Write-Host "❌ Error: Python not found or server failed to start" -ForegroundColor Red
    Write-Host "Please make sure Python is installed and in your PATH" -ForegroundColor Yellow
    Write-Host "You can also try: python3 server.py" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
