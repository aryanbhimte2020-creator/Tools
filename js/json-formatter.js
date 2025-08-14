// JSON Formatter Tool JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const jsonInput = document.getElementById('jsonInput');
    const formatBtn = document.getElementById('formatBtn');
    const minifyBtn = document.getElementById('minifyBtn');
    const clearBtn = document.getElementById('clearBtn');
    const copyBtn = document.getElementById('copyBtn');
    const indentSize = document.getElementById('indentSize');
    const sortKeys = document.getElementById('sortKeys');
    const syntaxHighlight = document.getElementById('syntaxHighlight');
    
    const validationResult = document.getElementById('validationResult');
    const jsonStats = document.getElementById('jsonStats');

    // Initialize tool
    initializeJsonFormatter();

    function initializeJsonFormatter() {
        // Add event listeners
        jsonInput.addEventListener('input', validateJson);
        jsonInput.addEventListener('paste', validateJson);
        formatBtn.addEventListener('click', formatJson);
        minifyBtn.addEventListener('click', minifyJson);
        clearBtn.addEventListener('click', clearJson);
        copyBtn.addEventListener('click', copyJson);
        indentSize.addEventListener('change', validateJson);
        sortKeys.addEventListener('change', validateJson);
        syntaxHighlight.addEventListener('change', validateJson);

        // Add placeholder text
        jsonInput.textContent = '';
        jsonInput.setAttribute('data-placeholder', 'Paste your JSON here...\n\nExample: {"name": "John", "age": 30, "city": "New York"}');
        
        // Show placeholder
        showPlaceholder();
    }

    function showPlaceholder() {
        if (!jsonInput.textContent.trim()) {
            jsonInput.textContent = jsonInput.getAttribute('data-placeholder');
            jsonInput.classList.add('text-muted');
        }
    }

    function hidePlaceholder() {
        if (jsonInput.textContent === jsonInput.getAttribute('data-placeholder')) {
            jsonInput.textContent = '';
            jsonInput.classList.remove('text-muted');
        }
    }

    function validateJson() {
        hidePlaceholder();
        const jsonText = jsonInput.textContent.trim();
        
        if (!jsonText) {
            validationResult.innerHTML = '<p class="text-muted">Enter JSON to validate...</p>';
            jsonStats.innerHTML = '<p class="text-muted">Statistics will appear here...</p>';
            return;
        }

        try {
            const parsed = JSON.parse(jsonText);
            const isValid = true;
            
            // Update validation result
            validationResult.innerHTML = `
                <div class="success-line">
                    <i class="fas fa-check-circle text-success me-2"></i>
                    <strong>Valid JSON</strong>
                    <br>
                    <small class="text-muted">JSON is properly formatted and valid.</small>
                </div>
            `;

            // Update statistics
            updateStatistics(parsed);

            // Apply syntax highlighting if enabled
            if (syntaxHighlight.checked) {
                applySyntaxHighlighting();
            }

        } catch (error) {
            const isValid = false;
            
            // Update validation result with error details
            validationResult.innerHTML = `
                <div class="error-line">
                    <i class="fas fa-exclamation-triangle text-danger me-2"></i>
                    <strong>Invalid JSON</strong>
                    <br>
                    <small class="text-muted">Error: ${error.message}</small>
                </div>
            `;

            jsonStats.innerHTML = '<p class="text-muted">Cannot calculate statistics for invalid JSON.</p>';
        }
    }

    function formatJson() {
        const jsonText = jsonInput.textContent.trim();
        
        if (!jsonText) {
            MultiTools.showNotification('No JSON to format!', 'warning');
            return;
        }

        try {
            const parsed = JSON.parse(jsonText);
            const indent = indentSize.value === 'tab' ? '\t' : ' '.repeat(parseInt(indentSize.value));
            const formatted = JSON.stringify(parsed, null, indent);
            
            jsonInput.textContent = formatted;
            
            if (syntaxHighlight.checked) {
                applySyntaxHighlighting();
            }
            
            MultiTools.showNotification('JSON formatted successfully!', 'success');
            validateJson();
            
        } catch (error) {
            MultiTools.showNotification('Invalid JSON: ' + error.message, 'danger');
        }
    }

    function minifyJson() {
        const jsonText = jsonInput.textContent.trim();
        
        if (!jsonText) {
            MultiTools.showNotification('No JSON to minify!', 'warning');
            return;
        }

        try {
            const parsed = JSON.parse(jsonText);
            const minified = JSON.stringify(parsed);
            
            jsonInput.textContent = minified;
            
            if (syntaxHighlight.checked) {
                applySyntaxHighlighting();
            }
            
            MultiTools.showNotification('JSON minified successfully!', 'success');
            validateJson();
            
        } catch (error) {
            MultiTools.showNotification('Invalid JSON: ' + error.message, 'danger');
        }
    }

    function clearJson() {
        jsonInput.textContent = '';
        validationResult.innerHTML = '<p class="text-muted">Enter JSON to validate...</p>';
        jsonStats.innerHTML = '<p class="text-muted">Statistics will appear here...</p>';
        showPlaceholder();
        MultiTools.showNotification('JSON cleared!', 'info');
    }

    function copyJson() {
        const jsonText = jsonInput.textContent.trim();
        
        if (!jsonText || jsonText === jsonInput.getAttribute('data-placeholder')) {
            MultiTools.showNotification('No JSON to copy!', 'warning');
            return;
        }

        MultiTools.copyToClipboard(jsonText);
    }

    function updateStatistics(obj) {
        const stats = analyzeJson(obj);
        
        const statsHtml = `
            <ul class="list-unstyled">
                <li><strong>Total keys:</strong> ${stats.totalKeys}</li>
                <li><strong>Nested objects:</strong> ${stats.nestedObjects}</li>
                <li><strong>Arrays:</strong> ${stats.arrays}</li>
                <li><strong>String values:</strong> ${stats.strings}</li>
                <li><strong>Number values:</strong> ${stats.numbers}</li>
                <li><strong>Boolean values:</strong> ${stats.booleans}</li>
                <li><strong>Null values:</strong> ${stats.nulls}</li>
                <li><strong>Max depth:</strong> ${stats.maxDepth}</li>
            </ul>
        `;
        
        jsonStats.innerHTML = statsHtml;
    }

    function analyzeJson(obj, depth = 0) {
        let stats = {
            totalKeys: 0,
            nestedObjects: 0,
            arrays: 0,
            strings: 0,
            numbers: 0,
            booleans: 0,
            nulls: 0,
            maxDepth: depth
        };

        if (Array.isArray(obj)) {
            stats.arrays++;
            obj.forEach(item => {
                const itemStats = analyzeJson(item, depth + 1);
                mergeStats(stats, itemStats);
            });
        } else if (obj !== null && typeof obj === 'object') {
            stats.nestedObjects++;
            Object.keys(obj).forEach(key => {
                stats.totalKeys++;
                const valueStats = analyzeJson(obj[key], depth + 1);
                mergeStats(stats, valueStats);
            });
        } else {
            if (typeof obj === 'string') stats.strings++;
            else if (typeof obj === 'number') stats.numbers++;
            else if (typeof obj === 'boolean') stats.booleans++;
            else if (obj === null) stats.nulls++;
        }

        return stats;
    }

    function mergeStats(target, source) {
        Object.keys(source).forEach(key => {
            if (key === 'maxDepth') {
                target[key] = Math.max(target[key], source[key]);
            } else {
                target[key] += source[key];
            }
        });
    }

    function applySyntaxHighlighting() {
        const text = jsonInput.textContent;
        const highlighted = highlightJson(text);
        
        // Temporarily remove event listener to prevent infinite loop
        jsonInput.removeEventListener('input', validateJson);
        jsonInput.innerHTML = highlighted;
        jsonInput.addEventListener('input', validateJson);
    }

    function highlightJson(jsonString) {
        return jsonString
            .replace(/(".*?":)/g, '<span class="syntax-key">$1</span>')
            .replace(/(".*?")/g, '<span class="syntax-string">$1</span>')
            .replace(/\b(true|false)\b/g, '<span class="syntax-boolean">$1</span>')
            .replace(/\b(null)\b/g, '<span class="syntax-null">$1</span>')
            .replace(/\b(\d+\.?\d*)\b/g, '<span class="syntax-number">$1</span>');
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to format
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            formatJson();
        }
        
        // Ctrl/Cmd + Shift + M to minify
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'M') {
            e.preventDefault();
            minifyJson();
        }
        
        // Ctrl/Cmd + Backspace to clear
        if ((e.ctrlKey || e.metaKey) && e.key === 'Backspace') {
            e.preventDefault();
            clearJson();
        }
    });

    // Focus handling
    jsonInput.addEventListener('focus', function() {
        hidePlaceholder();
    });

    jsonInput.addEventListener('blur', function() {
        if (!this.textContent.trim()) {
            showPlaceholder();
        }
    });
});

// Sample JSON functions (global scope for onclick handlers)
function loadSample(type) {
    const jsonInput = document.getElementById('jsonInput');
    
    let sampleJson = '';
    
    switch(type) {
        case 'simple':
            sampleJson = `{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "active": true,
  "skills": ["JavaScript", "Python", "React"]
}`;
            break;
            
        case 'complex':
            sampleJson = `{
  "user": {
    "id": 12345,
    "profile": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "+1-555-123-4567",
      "address": {
        "street": "123 Main St",
        "city": "New York",
        "state": "NY",
        "zipCode": "10001",
        "country": "USA"
      }
    },
    "preferences": {
      "theme": "dark",
      "notifications": {
        "email": true,
        "sms": false,
        "push": true
      },
      "language": "en-US"
    },
    "subscriptions": [
      {
        "id": "sub_001",
        "plan": "premium",
        "startDate": "2024-01-01",
        "endDate": "2024-12-31",
        "features": ["unlimited", "priority", "support"]
      },
      {
        "id": "sub_002",
        "plan": "basic",
        "startDate": "2024-06-01",
        "endDate": "2024-11-30",
        "features": ["standard", "email"]
      }
    ]
  },
  "metadata": {
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-15T12:30:45Z",
    "version": "1.0.0"
  }
}`;
            break;
            
        case 'array':
            sampleJson = `[
  {
    "id": 1,
    "name": "Product A",
    "price": 29.99,
    "category": "Electronics",
    "inStock": true,
    "tags": ["new", "featured", "electronics"],
    "ratings": [4.5, 4.2, 4.8, 4.0, 4.7]
  },
  {
    "id": 2,
    "name": "Product B",
    "price": 49.99,
    "category": "Books",
    "inStock": false,
    "tags": ["bestseller", "books"],
    "ratings": [4.1, 3.9, 4.3, 4.5]
  },
  {
    "id": 3,
    "name": "Product C",
    "price": 19.99,
    "category": "Clothing",
    "inStock": true,
    "tags": ["sale", "clothing", "fashion"],
    "ratings": [3.8, 4.0, 4.2, 3.9, 4.1, 4.3]
  }
]`;
            break;
    }
    
    jsonInput.textContent = sampleJson;
    jsonInput.classList.remove('text-muted');
    
    // Trigger validation and formatting
    const event = new Event('input');
    jsonInput.dispatchEvent(event);
    
    // Format the JSON
    setTimeout(() => {
        const formatBtn = document.getElementById('formatBtn');
        formatBtn.click();
    }, 100);
}
