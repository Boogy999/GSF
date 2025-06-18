// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Donation amount selection
document.querySelectorAll('.donation-amount').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.donation-amount').forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Form validation
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        if (isValid) {
            // Show loading overlay
            const loadingOverlay = document.createElement('div');
            loadingOverlay.className = 'loading-overlay';
            loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
            document.body.appendChild(loadingOverlay);
            
            // Simulate form submission
            setTimeout(() => {
                loadingOverlay.remove();
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for your submission!';
                form.appendChild(successMessage);
                
                // Reset form
                form.reset();
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }, 1500);
        }
    });
});

// Add error styles to form inputs
const style = document.createElement('style');
style.textContent = `
    .form-input.error,
    .form-select.error,
    .form-textarea.error {
        border-color: var(--secondary-red);
    }
    
    .success-message {
        margin-top: 1rem;
        padding: 1rem;
        background-color: var(--secondary-green);
        color: white;
        border-radius: 0.375rem;
        text-align: center;
    }
`;
document.head.appendChild(style); 