// Word Counter Tool JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('textInput');
    const clearBtn = document.getElementById('clearBtn');
    const copyBtn = document.getElementById('copyBtn');
    
    // Statistics elements
    const wordCount = document.getElementById('wordCount');
    const charCount = document.getElementById('charCount');
    const charNoSpaceCount = document.getElementById('charNoSpaceCount');
    const sentenceCount = document.getElementById('sentenceCount');
    const paragraphCount = document.getElementById('paragraphCount');
    const readingTime = document.getElementById('readingTime');
    const readingLevel = document.getElementById('readingLevel');
    const commonWords = document.getElementById('commonWords');
    const textSummary = document.getElementById('textSummary');

    // Initialize tool
    initializeWordCounter();

    function initializeWordCounter() {
        // Add event listeners
        textInput.addEventListener('input', updateStatistics);
        textInput.addEventListener('paste', updateStatistics);
        clearBtn.addEventListener('click', clearText);
        copyBtn.addEventListener('click', copyText);

        // Add sample text for demonstration
        textInput.placeholder = "Paste or type your text here...\n\nExample: This is a sample text. It contains multiple sentences and paragraphs. You can use this tool to count words, characters, sentences, and paragraphs in your content.";
    }

    function updateStatistics() {
        const text = textInput.value;
        
        // Basic counts
        const words = countWords(text);
        const characters = countCharacters(text);
        const charactersNoSpaces = countCharactersNoSpaces(text);
        const sentences = countSentences(text);
        const paragraphs = countParagraphs(text);
        const readingTimeMinutes = calculateReadingTime(words);

        // Update display
        wordCount.textContent = words.toLocaleString();
        charCount.textContent = characters.toLocaleString();
        charNoSpaceCount.textContent = charactersNoSpaces.toLocaleString();
        sentenceCount.textContent = sentences.toLocaleString();
        paragraphCount.textContent = paragraphs.toLocaleString();
        readingTime.textContent = readingTimeMinutes;

        // Update reading level
        updateReadingLevel(text);

        // Update detailed analysis
        updateCommonWords(text);
        updateTextSummary(text, words, sentences, paragraphs);
    }

    function countWords(text) {
        if (!text.trim()) return 0;
        
        // Remove extra whitespace and split by spaces
        const words = text.trim().split(/\s+/);
        return words.length;
    }

    function countCharacters(text) {
        return text.length;
    }

    function countCharactersNoSpaces(text) {
        return text.replace(/\s/g, '').length;
    }

    function countSentences(text) {
        if (!text.trim()) return 0;
        
        // Split by sentence endings (.!?) followed by space or end of string
        const sentences = text.split(/[.!?]+(?=\s|$)/);
        return sentences.filter(sentence => sentence.trim().length > 0).length;
    }

    function countParagraphs(text) {
        if (!text.trim()) return 0;
        
        // Split by double line breaks or single line breaks
        const paragraphs = text.split(/\n\s*\n/);
        return paragraphs.filter(paragraph => paragraph.trim().length > 0).length;
    }

    function calculateReadingTime(wordCount) {
        // Average reading speed: 200-250 words per minute
        const wordsPerMinute = 225;
        const minutes = Math.ceil(wordCount / wordsPerMinute);
        return minutes;
    }

    function updateReadingLevel(text) {
        if (!text.trim()) {
            readingLevel.textContent = 'Beginner';
            readingLevel.className = 'badge bg-success fs-6';
            return;
        }

        const words = text.split(/\s+/);
        const sentences = text.split(/[.!?]+(?=\s|$)/).filter(s => s.trim().length > 0);
        
        if (words.length === 0 || sentences.length === 0) {
            readingLevel.textContent = 'Beginner';
            readingLevel.className = 'badge bg-success fs-6';
            return;
        }

        // Calculate average sentence length
        const avgSentenceLength = words.length / sentences.length;
        
        // Determine reading level based on sentence complexity
        let level, badgeClass;
        
        if (avgSentenceLength < 10) {
            level = 'Beginner';
            badgeClass = 'badge bg-success fs-6';
        } else if (avgSentenceLength < 15) {
            level = 'Intermediate';
            badgeClass = 'badge bg-warning text-dark fs-6';
        } else if (avgSentenceLength < 20) {
            level = 'Advanced';
            badgeClass = 'badge bg-info fs-6';
        } else {
            level = 'Expert';
            badgeClass = 'badge bg-danger fs-6';
        }

        readingLevel.textContent = level;
        readingLevel.className = badgeClass;
    }

    function updateCommonWords(text) {
        if (!text.trim()) {
            commonWords.innerHTML = '<p class="text-muted">Start typing to see word frequency...</p>';
            return;
        }

        // Get word frequency
        const wordFreq = getWordFrequency(text);
        
        if (Object.keys(wordFreq).length === 0) {
            commonWords.innerHTML = '<p class="text-muted">No words found...</p>';
            return;
        }

        // Sort by frequency and get top 10
        const sortedWords = Object.entries(wordFreq)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10);

        let html = '<div class="row">';
        sortedWords.forEach(([word, count]) => {
            html += `
                <div class="col-6 mb-2">
                    <div class="d-flex justify-content-between">
                        <span class="fw-bold">${word}</span>
                        <span class="badge bg-primary">${count}</span>
                    </div>
                </div>
            `;
        });
        html += '</div>';

        commonWords.innerHTML = html;
    }

    function getWordFrequency(text) {
        // Remove punctuation and convert to lowercase
        const cleanText = text.toLowerCase().replace(/[^\w\s]/g, '');
        const words = cleanText.split(/\s+/).filter(word => word.length > 2);
        
        const frequency = {};
        words.forEach(word => {
            frequency[word] = (frequency[word] || 0) + 1;
        });
        
        return frequency;
    }

    function updateTextSummary(text, wordCount, sentenceCount, paragraphCount) {
        if (!text.trim()) {
            textSummary.innerHTML = '<p class="text-muted">Analysis will appear here...</p>';
            return;
        }

        const avgWordsPerSentence = sentenceCount > 0 ? (wordCount / sentenceCount).toFixed(1) : 0;
        const avgWordsPerParagraph = paragraphCount > 0 ? (wordCount / paragraphCount).toFixed(1) : 0;
        const avgSentencesPerParagraph = paragraphCount > 0 ? (sentenceCount / paragraphCount).toFixed(1) : 0;

        const summary = `
            <ul class="list-unstyled">
                <li><strong>Average words per sentence:</strong> ${avgWordsPerSentence}</li>
                <li><strong>Average words per paragraph:</strong> ${avgWordsPerParagraph}</li>
                <li><strong>Average sentences per paragraph:</strong> ${avgSentencesPerParagraph}</li>
                <li><strong>Text density:</strong> ${getTextDensity(text)}</li>
                <li><strong>Estimated reading time:</strong> ${calculateReadingTime(wordCount)} minutes</li>
            </ul>
        `;

        textSummary.innerHTML = summary;
    }

    function getTextDensity(text) {
        const words = text.split(/\s+/).length;
        const characters = text.replace(/\s/g, '').length;
        
        if (words === 0) return 'N/A';
        
        const avgWordLength = (characters / words).toFixed(1);
        
        if (avgWordLength < 4) return 'Low (simple vocabulary)';
        if (avgWordLength < 6) return 'Medium (moderate vocabulary)';
        return 'High (complex vocabulary)';
    }

    function clearText() {
        textInput.value = '';
        updateStatistics();
        MultiTools.showNotification('Text cleared!', 'info');
    }

    function copyText() {
        if (!textInput.value.trim()) {
            MultiTools.showNotification('No text to copy!', 'warning');
            return;
        }
        
        textInput.select();
        textInput.setSelectionRange(0, 99999); // For mobile devices
        
        try {
            document.execCommand('copy');
            MultiTools.showNotification('Text copied to clipboard!', 'success');
        } catch (err) {
            MultiTools.copyToClipboard(textInput.value);
        }
    }

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to copy
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            copyText();
        }
        
        // Ctrl/Cmd + Backspace to clear
        if ((e.ctrlKey || e.metaKey) && e.key === 'Backspace') {
            e.preventDefault();
            clearText();
        }
    });

    // Auto-resize textarea
    textInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 400) + 'px';
    });

    // Add word count to textarea placeholder
    textInput.addEventListener('focus', function() {
        if (!this.value) {
            this.placeholder = "Start typing to see real-time statistics...\n\nTip: Use Ctrl+Enter to copy text, Ctrl+Backspace to clear.";
        }
    });
});
