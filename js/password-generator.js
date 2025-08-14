// Password Generator Tool JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const passwordDisplay = document.getElementById('passwordDisplay');
    const generatedPassword = document.getElementById('generatedPassword');
    const characterCount = document.getElementById('characterCount');
    const strengthMeter = document.getElementById('strengthMeter');
    const strengthText = document.getElementById('strengthText');
    const copyBtn = document.getElementById('copyBtn');
    
    // Input elements
    const passwordLength = document.getElementById('passwordLength');
    const lengthValue = document.getElementById('lengthValue');
    const uppercase = document.getElementById('uppercase');
    const lowercase = document.getElementById('lowercase');
    const numbers = document.getElementById('numbers');
    const symbols = document.getElementById('symbols');
    const excludeSimilar = document.getElementById('excludeSimilar');
    const excludeAmbiguous = document.getElementById('excludeAmbiguous');
    const passwordCount = document.getElementById('passwordCount');
    
    // Buttons
    const generateBtn = document.getElementById('generateBtn');
    const regenerateBtn = document.getElementById('regenerateBtn');
    const clearBtn = document.getElementById('clearBtn');
    
    // History
    const passwordHistory = document.getElementById('passwordHistory');
    
    // Password history array
    let passwordHistoryArray = [];
    
    // Initialize tool
    initializePasswordGenerator();

    function initializePasswordGenerator() {
        // Add event listeners
        generateBtn.addEventListener('click', generatePassword);
        regenerateBtn.addEventListener('click', generatePassword);
        clearBtn.addEventListener('click', clearHistory);
        copyBtn.addEventListener('click', copyPassword);
        
        // Length slider
        passwordLength.addEventListener('input', updateLengthValue);
        
        // Character type validation
        [uppercase, lowercase, numbers, symbols].forEach(checkbox => {
            checkbox.addEventListener('change', validateCharacterTypes);
        });
        
        // Load history from localStorage
        loadPasswordHistory();
        
        // Set initial length value
        updateLengthValue();
        
        // Validate initial character types
        validateCharacterTypes();
    }

    function updateLengthValue() {
        lengthValue.textContent = passwordLength.value;
    }

    function validateCharacterTypes() {
        const hasUppercase = uppercase.checked;
        const hasLowercase = lowercase.checked;
        const hasNumbers = numbers.checked;
        const hasSymbols = symbols.checked;
        
        if (!hasUppercase && !hasLowercase && !hasNumbers && !hasSymbols) {
            // If no character types selected, enable lowercase by default
            lowercase.checked = true;
            MultiTools.showNotification('At least one character type must be selected. Enabled lowercase letters.', 'warning');
        }
    }

    function generatePassword() {
        const length = parseInt(passwordLength.value);
        const count = parseInt(passwordCount.value);
        
        // Validate character types
        validateCharacterTypes();
        
        // Generate passwords
        const passwords = [];
        for (let i = 0; i < count; i++) {
            const password = createPassword(length);
            passwords.push(password);
        }
        
        // Display first password
        displayPassword(passwords[0]);
        
        // Add to history
        passwords.forEach(password => {
            addToHistory(password);
        });
        
        // Show notification
        if (count === 1) {
            MultiTools.showNotification('Password generated successfully!', 'success');
        } else {
            MultiTools.showNotification(`${count} passwords generated successfully!`, 'success');
        }
    }

    function createPassword(length) {
        let charset = '';
        
        // Build character set based on selected options
        if (uppercase.checked) {
            charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        if (lowercase.checked) {
            charset += 'abcdefghijklmnopqrstuvwxyz';
        }
        if (numbers.checked) {
            charset += '0123456789';
        }
        if (symbols.checked) {
            charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        }
        
        // Remove similar characters if requested
        if (excludeSimilar.checked) {
            charset = charset.replace(/[l1IO0]/g, '');
        }
        
        // Remove ambiguous characters if requested
        if (excludeAmbiguous.checked) {
            charset = charset.replace(/[{}[\]|\\/]/g, '');
        }
        
        // Ensure charset is not empty
        if (charset === '') {
            charset = 'abcdefghijklmnopqrstuvwxyz';
        }
        
        // Generate password
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        
        return password;
    }

    function displayPassword(password) {
        generatedPassword.textContent = password;
        
        // Update character count
        const charTypes = analyzePassword(password);
        characterCount.innerHTML = `
            <strong>Characters:</strong> ${password.length} | 
            <strong>Uppercase:</strong> ${charTypes.uppercase} | 
            <strong>Lowercase:</strong> ${charTypes.lowercase} | 
            <strong>Numbers:</strong> ${charTypes.numbers} | 
            <strong>Symbols:</strong> ${charTypes.symbols}
        `;
        
        // Update strength
        updatePasswordStrength(password);
        
        // Show copy button
        copyBtn.style.display = 'block';
        
        // Update display styling
        passwordDisplay.className = 'password-display';
        const strength = getPasswordStrength(password);
        passwordDisplay.classList.add(strength);
    }

    function analyzePassword(password) {
        return {
            uppercase: (password.match(/[A-Z]/g) || []).length,
            lowercase: (password.match(/[a-z]/g) || []).length,
            numbers: (password.match(/[0-9]/g) || []).length,
            symbols: (password.match(/[^A-Za-z0-9]/g) || []).length
        };
    }

    function updatePasswordStrength(password) {
        const strength = getPasswordStrength(password);
        const score = getPasswordScore(password);
        
        // Update strength meter
        strengthMeter.className = 'strength-meter';
        strengthMeter.classList.add(`strength-${strength}`);
        
        // Update strength text
        let strengthLabel, badgeClass;
        switch (strength) {
            case 'weak':
                strengthLabel = 'Weak Password';
                badgeClass = 'bg-danger';
                break;
            case 'medium':
                strengthLabel = 'Medium Password';
                badgeClass = 'bg-warning text-dark';
                break;
            case 'strong':
                strengthLabel = 'Strong Password';
                badgeClass = 'bg-success';
                break;
            default:
                strengthLabel = 'Very Strong Password';
                badgeClass = 'bg-success';
        }
        
        strengthText.textContent = strengthLabel;
        strengthText.className = `badge fs-6 ${badgeClass}`;
    }

    function getPasswordStrength(password) {
        const score = getPasswordScore(password);
        
        if (score < 30) return 'weak';
        if (score < 60) return 'medium';
        if (score < 80) return 'strong';
        return 'strong'; // Very strong
    }

    function getPasswordScore(password) {
        let score = 0;
        
        // Length contribution
        if (password.length >= 8) score += 10;
        if (password.length >= 12) score += 10;
        if (password.length >= 16) score += 10;
        if (password.length >= 20) score += 10;
        
        // Character variety contribution
        const charTypes = analyzePassword(password);
        if (charTypes.uppercase > 0) score += 10;
        if (charTypes.lowercase > 0) score += 10;
        if (charTypes.numbers > 0) score += 10;
        if (charTypes.symbols > 0) score += 10;
        
        // Complexity contribution
        if (password.length >= 12 && charTypes.uppercase > 0 && charTypes.lowercase > 0 && charTypes.numbers > 0) score += 10;
        if (password.length >= 16 && charTypes.uppercase > 0 && charTypes.lowercase > 0 && charTypes.numbers > 0 && charTypes.symbols > 0) score += 10;
        
        // Penalty for repetitive patterns
        if (/(.)\1{2,}/.test(password)) score -= 10;
        if (/(.)(.)\1\2/.test(password)) score -= 10;
        
        return Math.max(0, Math.min(100, score));
    }

    function addToHistory(password) {
        // Add to array
        passwordHistoryArray.unshift(password);
        
        // Keep only last 50 passwords
        if (passwordHistoryArray.length > 50) {
            passwordHistoryArray = passwordHistoryArray.slice(0, 50);
        }
        
        // Save to localStorage
        savePasswordHistory();
        
        // Update display
        updatePasswordHistory();
    }

    function updatePasswordHistory() {
        if (passwordHistoryArray.length === 0) {
            passwordHistory.innerHTML = '<p class="text-muted">Generated passwords will appear here...</p>';
            return;
        }
        
        let html = '';
        passwordHistoryArray.forEach((password, index) => {
            const strength = getPasswordStrength(password);
            const strengthClass = strength === 'weak' ? 'text-danger' : strength === 'medium' ? 'text-warning' : 'text-success';
            
            html += `
                <div class="history-item" onclick="copyHistoryPassword('${password}')">
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="text-truncate me-2">${password}</span>
                        <small class="${strengthClass}">${strength}</small>
                    </div>
                </div>
            `;
        });
        
        passwordHistory.innerHTML = html;
    }

    function copyHistoryPassword(password) {
        MultiTools.copyToClipboard(password);
        MultiTools.showNotification('Password copied from history!', 'success');
    }

    function copyPassword() {
        const password = generatedPassword.textContent;
        if (password && password !== 'Click "Generate Password" to create a password') {
            MultiTools.copyToClipboard(password);
            MultiTools.showNotification('Password copied to clipboard!', 'success');
        } else {
            MultiTools.showNotification('No password to copy!', 'warning');
        }
    }

    function clearHistory() {
        passwordHistoryArray = [];
        savePasswordHistory();
        updatePasswordHistory();
        MultiTools.showNotification('Password history cleared!', 'info');
    }

    function savePasswordHistory() {
        try {
            localStorage.setItem('passwordHistory', JSON.stringify(passwordHistoryArray));
        } catch (e) {
            console.warn('Could not save password history to localStorage');
        }
    }

    function loadPasswordHistory() {
        try {
            const saved = localStorage.getItem('passwordHistory');
            if (saved) {
                passwordHistoryArray = JSON.parse(saved);
                updatePasswordHistory();
            }
        } catch (e) {
            console.warn('Could not load password history from localStorage');
            passwordHistoryArray = [];
        }
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Space bar to generate
        if (e.code === 'Space' && e.target === document.body) {
            e.preventDefault();
            generatePassword();
        }
        
        // Ctrl/Cmd + Enter to generate
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            generatePassword();
        }
        
        // Ctrl/Cmd + C to copy
        if ((e.ctrlKey || e.metaKey) && e.key === 'C') {
            e.preventDefault();
            copyPassword();
        }
    });

    // Auto-generate on option changes
    [passwordLength, uppercase, lowercase, numbers, symbols, excludeSimilar, excludeAmbiguous].forEach(element => {
        element.addEventListener('change', function() {
            // Auto-generate if a password is already displayed
            if (generatedPassword.textContent && generatedPassword.textContent !== 'Click "Generate Password" to create a password') {
                setTimeout(generatePassword, 100);
            }
        });
    });

    // Add helpful tooltips
    passwordLength.title = 'Drag to adjust password length (8-64 characters)';
    uppercase.title = 'Include uppercase letters A-Z';
    lowercase.title = 'Include lowercase letters a-z';
    numbers.title = 'Include numbers 0-9';
    symbols.title = 'Include special symbols !@#$%^&*';
    excludeSimilar.title = 'Exclude similar-looking characters (l, 1, I, O, 0)';
    excludeAmbiguous.title = 'Exclude ambiguous characters ({}, [], |, \, /)';
});

// Global function for copying from history (needed for onclick handlers)
window.copyHistoryPassword = function(password) {
    MultiTools.copyToClipboard(password);
    MultiTools.showNotification('Password copied from history!', 'success');
};
