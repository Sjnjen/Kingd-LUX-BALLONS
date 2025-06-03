document.addEventListener('DOMContentLoaded', function() {
    // Calculate total when options are selected
    const form = document.getElementById('appointmentForm');
    const totalAmount = document.getElementById('totalAmount');
    const discountNote = document.getElementById('discountNote');
    
    // Get all radio inputs that affect pricing
    const priceInputs = document.querySelectorAll('input[type="radio"][data-price]');
    const discountInputs = document.querySelectorAll('input[type="radio"][data-discount]');
    
    // Add event listeners to all price-affecting inputs
    priceInputs.forEach(input => {
        input.addEventListener('change', calculateTotal);
    });
    
    discountInputs.forEach(input => {
        input.addEventListener('change', calculateTotal);
    });
    
    // Initial calculation
    calculateTotal();
    
    function calculateTotal() {
        let subtotal = 0;
        
        // Calculate subtotal from all selected price options
        document.querySelectorAll('input[type="radio"][data-price]:checked').forEach(input => {
            subtotal += parseInt(input.dataset.price) || 0;
        });
        
        // Apply discount if any
        const discountInput = document.querySelector('input[type="radio"][data-discount]:checked');
        let discount = 0;
        let discountText = '';
        
        if (discountInput) {
            discount = parseInt(discountInput.dataset.discount) || 0;
            if (discount > 0) {
                discountText = ` (${discount}% discount applied)`;
            }
        }
        
        const discountAmount = subtotal * (discount / 100);
        const total = subtotal - discountAmount;
        
        // Update the display
        totalAmount.textContent = total.toFixed(2);
        discountNote.textContent = `Subtotal: R${subtotal.toFixed(2)}${discountText}`;
    }
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Calculate total again to be sure
        calculateTotal();
        data.total = document.getElementById('totalAmount').textContent;
        
        // Prepare the message for WhatsApp
        let whatsappMessage = `New Appointment Booking:\n\n`;
        whatsappMessage += `Name: ${data.name}\n`;
        whatsappMessage += `Email: ${data.email}\n`;
        whatsappMessage += `Phone: ${data.phone}\n`;
        whatsappMessage += `Preferred Date: ${data.date}\n\n`;
        
        whatsappMessage += `Service Details:\n`;
        whatsappMessage += `- Block Size: ${data.blockSize}\n`;
        whatsappMessage += `- Length: ${data.length}\n`;
        whatsappMessage += `- Style: ${data.style}\n`;
        whatsappMessage += `- Color: ${data.color}\n`;
        whatsappMessage += `- Hair Length: ${data.hairLength}\n`;
        whatsappMessage += `- Curls: ${data.curls}\n`;
        whatsappMessage += `- Curl Method: ${data.curlMethod}\n`;
        whatsappMessage += `- Client Status: ${data.clientStatus}\n\n`;
        whatsappMessage += `Total: R${data.total}\n\n`;
        whatsappMessage += `Please confirm this appointment.`;
        
        // Encode the message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Send to WhatsApp
        window.open(`https://wa.me/27630104524?text=${encodedMessage}`, '_blank');
        
        // Prepare email subject and body
        const emailSubject = `New Booking from ${data.name}`;
        const emailBody = whatsappMessage.replace(/\n/g, '%0D%0A');
        
        // Send to owner's email
        window.open(`mailto:sachah456@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${emailBody}`);
        
        // Send confirmation to client
        const clientEmailSubject = `Your Appointment with SHA DOES HAIR`;
        const clientEmailBody = `Dear ${data.name},%0D%0A%0D%0AThank you for booking with SHA DOES HAIR!%0D%0A%0D%0AWe have received your request for:%0D%0ADate: ${data.date}%0D%0ATotal: R${data.total}%0D%0A%0D%0AWe will contact you shortly to confirm your appointment.%0D%0A%0D%0ABest regards,%0D%0ASHA DOES HAIR`;
        
        window.open(`mailto:${data.email}?subject=${encodeURIComponent(clientEmailSubject)}&body=${clientEmailBody}`);
        
        // Show confirmation to user
        alert('Your booking has been submitted! We have sent you a confirmation email and will contact you shortly.');
        
        // Reset form
        form.reset();
        calculateTotal();
    });
    
    // Add floating animation to elements
    const floatingElements = document.querySelectorAll('.option-group, .gallery-item, .submit-btn');
    floatingElements.forEach((el, index) => {
        el.classList.add('floating');
        el.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Set minimum date to today for date picker
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;
    
    // Add hover effects to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item, .video-container video');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05)';
            item.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
        });
    });
});