// BMI Calculator Tool JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const ageInput = document.getElementById('age');
    const heightUnit = document.getElementById('heightUnit');
    const weightUnit = document.getElementById('weightUnit');
    const calculateBtn = document.getElementById('calculateBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    const bmiResult = document.getElementById('bmiResult');
    const bmiValue = document.getElementById('bmiValue');
    const bmiCategory = document.getElementById('bmiCategory');
    const healthTips = document.getElementById('healthTips');

    // Unit system radio buttons
    const metricRadio = document.getElementById('metric');
    const imperialRadio = document.getElementById('imperial');

    // Initialize tool
    initializeBmiCalculator();

    function initializeBmiCalculator() {
        // Add event listeners
        calculateBtn.addEventListener('click', calculateBMI);
        resetBtn.addEventListener('click', resetForm);
        
        // Unit system change listeners
        metricRadio.addEventListener('change', updateUnits);
        imperialRadio.addEventListener('change', updateUnits);

        // Auto-calculate on input change
        heightInput.addEventListener('input', autoCalculate);
        weightInput.addEventListener('input', autoCalculate);
        ageInput.addEventListener('input', autoCalculate);

        // Set initial units
        updateUnits();
    }

    function updateUnits() {
        if (metricRadio.checked) {
            heightUnit.textContent = 'cm';
            weightUnit.textContent = 'kg';
            heightInput.placeholder = 'Height in cm';
            weightInput.placeholder = 'Weight in kg';
        } else {
            heightUnit.textContent = 'ft';
            weightUnit.textContent = 'lbs';
            heightInput.placeholder = 'Height in ft';
            weightInput.placeholder = 'Weight in lbs';
        }
    }

    function autoCalculate() {
        // Auto-calculate if both height and weight are provided
        if (heightInput.value && weightInput.value) {
            setTimeout(calculateBMI, 500); // Small delay to avoid too frequent calculations
        }
    }

    function calculateBMI() {
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);
        const age = parseInt(ageInput.value) || 0;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const unitSystem = document.querySelector('input[name="unitSystem"]:checked').value;

        // Validate inputs
        if (!height || !weight || height <= 0 || weight <= 0) {
            MultiTools.showNotification('Please enter valid height and weight values.', 'warning');
            return;
        }

        // Convert to metric if using imperial units
        let heightInMeters, weightInKg;
        
        if (unitSystem === 'imperial') {
            // Convert feet to meters
            heightInMeters = height * 0.3048;
            // Convert pounds to kilograms
            weightInKg = weight * 0.453592;
        } else {
            // Convert cm to meters
            heightInMeters = height / 100;
            weightInKg = weight;
        }

        // Calculate BMI
        const bmi = weightInKg / (heightInMeters * heightInMeters);
        
        // Display result
        displayBMIResult(bmi, age, gender);
    }

    function displayBMIResult(bmi, age, gender) {
        // Format BMI to 1 decimal place
        const formattedBMI = bmi.toFixed(1);
        
        // Determine BMI category and styling
        const category = getBMICategory(bmi);
        const categoryClass = getBMICategoryClass(category);
        
        // Update BMI value display
        bmiValue.textContent = formattedBMI;
        bmiValue.className = `bmi-result ${categoryClass}`;
        
        // Update category display
        bmiCategory.textContent = category;
        bmiCategory.className = `bmi-category ${categoryClass.replace('bmi-', 'text-')}`;
        
        // Update health tips
        updateHealthTips(bmi, age, gender);
        
        // Show result
        bmiResult.style.display = 'block';
        
        // Scroll to result
        bmiResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function getBMICategory(bmi) {
        if (bmi < 18.5) {
            return 'Underweight';
        } else if (bmi >= 18.5 && bmi < 25) {
            return 'Normal Weight';
        } else if (bmi >= 25 && bmi < 30) {
            return 'Overweight';
        } else {
            return 'Obese';
        }
    }

    function getBMICategoryClass(category) {
        switch (category) {
            case 'Underweight':
                return 'bmi-underweight';
            case 'Normal Weight':
                return 'bmi-normal';
            case 'Overweight':
                return 'bmi-overweight';
            case 'Obese':
                return 'bmi-obese';
            default:
                return 'bmi-normal';
        }
    }

    function updateHealthTips(bmi, age, gender) {
        let tips = '';
        const category = getBMICategory(bmi);
        
        switch (category) {
            case 'Underweight':
                tips = `
                    <h5><i class="fas fa-exclamation-triangle text-info me-2"></i>Underweight - Health Tips</h5>
                    <ul>
                        <li><strong>Increase caloric intake:</strong> Add 500-1000 calories per day to gain weight safely</li>
                        <li><strong>Eat nutrient-dense foods:</strong> Focus on healthy fats, proteins, and complex carbohydrates</li>
                        <li><strong>Strength training:</strong> Build muscle mass through resistance exercises</li>
                        <li><strong>Regular meals:</strong> Eat 5-6 smaller meals throughout the day</li>
                        <li><strong>Consult a professional:</strong> Speak with a dietitian or healthcare provider</li>
                    </ul>
                `;
                break;
                
            case 'Normal Weight':
                tips = `
                    <h5><i class="fas fa-check-circle text-success me-2"></i>Normal Weight - Maintenance Tips</h5>
                    <ul>
                        <li><strong>Maintain balanced diet:</strong> Continue eating a variety of nutritious foods</li>
                        <li><strong>Regular exercise:</strong> Aim for 150 minutes of moderate activity per week</li>
                        <li><strong>Monitor weight:</strong> Check your weight regularly to maintain healthy range</li>
                        <li><strong>Stress management:</strong> Practice stress-reduction techniques</li>
                        <li><strong>Regular check-ups:</strong> Schedule annual health examinations</li>
                    </ul>
                `;
                break;
                
            case 'Overweight':
                tips = `
                    <h5><i class="fas fa-exclamation-triangle text-warning me-2"></i>Overweight - Weight Management Tips</h5>
                    <ul>
                        <li><strong>Caloric deficit:</strong> Reduce daily intake by 500-750 calories for gradual weight loss</li>
                        <li><strong>Increase activity:</strong> Aim for 30-60 minutes of exercise most days</li>
                        <li><strong>Portion control:</strong> Use smaller plates and measure portions</li>
                        <li><strong>Whole foods:</strong> Focus on vegetables, fruits, lean proteins, and whole grains</li>
                        <li><strong>Professional guidance:</strong> Consider working with a nutritionist or personal trainer</li>
                    </ul>
                `;
                break;
                
            case 'Obese':
                tips = `
                    <h5><i class="fas fa-exclamation-triangle text-danger me-2"></i>Obese - Health Improvement Tips</h5>
                    <ul>
                        <li><strong>Medical consultation:</strong> Speak with healthcare professionals about weight loss options</li>
                        <li><strong>Structured program:</strong> Consider medically supervised weight loss programs</li>
                        <li><strong>Gradual changes:</strong> Start with small, sustainable lifestyle modifications</li>
                        <li><strong>Support system:</strong> Join support groups or work with a health coach</li>
                        <li><strong>Regular monitoring:</strong> Track progress and adjust strategies as needed</li>
                    </ul>
                `;
                break;
        }
        
        // Add age and gender specific recommendations
        if (age > 0) {
            tips += `<p class="mt-3"><strong>Age-specific note:</strong> BMI interpretation may vary for ${age}-year-old ${gender}s. Consult with a healthcare provider for personalized advice.</p>`;
        }
        
        healthTips.innerHTML = tips;
    }

    function resetForm() {
        heightInput.value = '';
        weightInput.value = '';
        ageInput.value = '';
        bmiResult.style.display = 'none';
        
        // Reset radio buttons to default
        metricRadio.checked = true;
        document.getElementById('male').checked = true;
        updateUnits();
        
        MultiTools.showNotification('Form reset successfully!', 'info');
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Enter key to calculate
        if (e.key === 'Enter') {
            e.preventDefault();
            calculateBMI();
        }
        
        // Ctrl/Cmd + R to reset
        if ((e.ctrlKey || e.metaKey) && e.key === 'R') {
            e.preventDefault();
            resetForm();
        }
    });

    // Input validation
    heightInput.addEventListener('input', function() {
        const value = parseFloat(this.value);
        if (value < 0) {
            this.value = '';
            MultiTools.showNotification('Height cannot be negative!', 'warning');
        }
    });

    weightInput.addEventListener('input', function() {
        const value = parseFloat(this.value);
        if (value < 0) {
            this.value = '';
            MultiTools.showNotification('Weight cannot be negative!', 'warning');
        }
    });

    ageInput.addEventListener('input', function() {
        const value = parseInt(this.value);
        if (value < 0 || value > 120) {
            this.value = '';
            MultiTools.showNotification('Please enter a valid age (1-120)!', 'warning');
        }
    });

    // Add helpful tooltips
    heightInput.title = 'Enter your height in the selected unit system';
    weightInput.title = 'Enter your weight in the selected unit system';
    ageInput.title = 'Your age helps provide more accurate health recommendations';
});
