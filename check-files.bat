@echo off
echo Checking Multi-Tools Hub Files...
echo.
echo ========================================
echo FILE STRUCTURE CHECK
echo ========================================
echo.

set "missing=0"

echo Checking main files...
if exist "index.html" (
    echo [✓] index.html
) else (
    echo [✗] index.html - MISSING
    set /a missing+=1
)

if exist "index-standalone.html" (
    echo [✓] index-standalone.html
) else (
    echo [✗] index-standalone.html - MISSING
    set /a missing+=1
)

if exist "test.html" (
    echo [✓] test.html
) else (
    echo [✗] test.html - MISSING
    set /a missing+=1
)

echo.
echo Checking tool files...
if exist "word-counter.html" (
    echo [✓] word-counter.html
) else (
    echo [✗] word-counter.html - MISSING
    set /a missing+=1
)

if exist "word-counter-standalone.html" (
    echo [✓] word-counter-standalone.html
) else (
    echo [✗] word-counter-standalone.html - MISSING
    set /a missing+=1
)

if exist "json-formatter.html" (
    echo [✓] json-formatter.html
) else (
    echo [✗] json-formatter.html - MISSING
    set /a missing+=1
)

if exist "bmi-calculator.html" (
    echo [✓] bmi-calculator.html
) else (
    echo [✗] bmi-calculator.html - MISSING
    set /a missing+=1
)

if exist "password-generator.html" (
    echo [✓] password-generator.html
) else (
    echo [✗] password-generator.html - MISSING
    set /a missing+=1
)

echo.
echo Checking CSS folder...
if exist "css" (
    echo [✓] css folder
    if exist "css\style.css" (
        echo [✓] css\style.css
    ) else (
        echo [✗] css\style.css - MISSING
        set /a missing+=1
    )
) else (
    echo [✗] css folder - MISSING
    set /a missing+=1
)

echo.
echo Checking JS folder...
if exist "js" (
    echo [✓] js folder
    if exist "js\main.js" (
        echo [✓] js\main.js
    ) else (
        echo [✗] js\main.js - MISSING
        set /a missing+=1
    )
    if exist "js\word-counter.js" (
        echo [✓] js\word-counter.js
    ) else (
        echo [✗] js\word-counter.js - MISSING
        set /a missing+=1
    )
    if exist "js\json-formatter.js" (
        echo [✓] js\json-formatter.js
    ) else (
        echo [✗] js\json-formatter.js - MISSING
        set /a missing+=1
    )
    if exist "js\bmi-calculator.js" (
        echo [✓] js\bmi-calculator.js
    ) else (
        echo [✗] js\bmi-calculator.js - MISSING
        set /a missing+=1
    )
    if exist "js\password-generator.js" (
        echo [✓] js\password-generator.js
    ) else (
        echo [✗] js\password-generator.js - MISSING
        set /a missing+=1
    )
) else (
    echo [✗] js folder - MISSING
    set /a missing+=1
)

echo.
echo ========================================
echo SUMMARY
echo ========================================
echo.

if %missing%==0 (
    echo [✓] All files are present! The website should work correctly.
    echo.
    echo RECOMMENDED NEXT STEPS:
    echo 1. Double-click open-standalone.bat to open the website
    echo 2. Or open index-standalone.html directly in your browser
    echo 3. Use test.html to verify all resources load correctly
) else (
    echo [✗] %missing% file(s) are missing!
    echo.
    echo TROUBLESHOOTING:
    echo 1. Make sure you're in the correct folder
    echo 2. Check if any files were moved or deleted
    echo 3. Re-download the project if needed
    echo 4. Check TROUBLESHOOTING.md for more help
)

echo.
echo ========================================
echo QUICK LINKS
echo ========================================
echo.
echo To open the website:
echo - open-standalone.bat (recommended)
echo - index-standalone.html (direct)
echo.
echo To test resources:
echo - test.html
echo.
echo For help:
echo - TROUBLESHOOTING.md
echo - README.md
echo.
pause
