// COMPLETE Mobile JavaScript extracted from working index.html

// Sticky header functionality - matches main script behavior exactly
window.addEventListener('scroll', function() {
    var stickyHeader = document.querySelector('.sticky-header');
    
    if (window.pageYOffset >= 150) {
        stickyHeader.classList.add('show');
        document.body.classList.add('sticky-active');
    } else {
        stickyHeader.classList.remove('show');
        document.body.classList.remove('sticky-active');
    }
});

// Testimonial modal functionality
function toggleText(element) {
    var testBox = element.closest('.test-box');
    var authorImage = testBox.querySelector('.author-image img').src;
    var authorName = testBox.querySelector('h4').textContent;
    var fullText = testBox.querySelector('.text').textContent;
    
    // Create modal
    var modal = document.createElement('div');
    modal.className = 'testimonial-modal';
    modal.innerHTML = `
        <div class="testimonial-modal-content">
            <span class="close">&times;</span>
            <div class="modal-author-image">
                <img src="${authorImage}" alt="${authorName}">
            </div>
            <h3>${authorName}</h3>
            <div class="modal-text">${fullText}</div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // Close modal functionality
    var closeBtn = modal.querySelector('.close');
    closeBtn.onclick = function() {
        document.body.removeChild(modal);
    }
    
    modal.onclick = function(event) {
        if (event.target === modal) {
            document.body.removeChild(modal);
        }
    }
}
