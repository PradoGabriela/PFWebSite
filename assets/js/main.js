/*
	Miniport by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('#nav a, .scrolly').scrolly({
			speed: 1000,
			offset: function() { return $nav.height(); }
		});

})(jQuery);

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
	const form = document.getElementById('contact-form');
	const messageDiv = document.getElementById('form-message');
	const submitBtn = document.getElementById('submit-btn');

	if (form) {
		form.addEventListener('submit', async function(e) {
			e.preventDefault();
			
			// Show loading state
			const originalText = submitBtn.value;
			submitBtn.value = 'Sending...';
			submitBtn.disabled = true;
			messageDiv.style.display = 'none';

			try {
				const formData = new FormData(form);
				const response = await fetch('/contact', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: new URLSearchParams(formData)
				});

				const result = await response.json();

				// Show message
				messageDiv.style.display = 'block';
				messageDiv.innerHTML = result.message;
				
				if (result.success) {
					messageDiv.style.backgroundColor = '#d4edda';
					messageDiv.style.color = '#155724';
					messageDiv.style.borderColor = '#c3e6cb';
					form.reset(); // Clear form on success
				} else {
					messageDiv.style.backgroundColor = '#f8d7da';
					messageDiv.style.color = '#721c24';
					messageDiv.style.borderColor = '#f5c6cb';
				}

				// Scroll to message
				messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

			} catch (error) {
				console.error('Form submission error:', error);
				messageDiv.style.display = 'block';
				messageDiv.innerHTML = 'An error occurred. Please try again later.';
				messageDiv.style.backgroundColor = '#f8d7da';
				messageDiv.style.color = '#721c24';
				messageDiv.style.borderColor = '#f5c6cb';
			} finally {
				// Reset button
				submitBtn.value = originalText;
				submitBtn.disabled = false;
			}
		});
	}
});

// Read More functionality
document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM Content Loaded - Setting up read more functionality');
	console.log('Number of read-more buttons found:', document.querySelectorAll('.read-more-btn').length);
	console.log('Number of description containers found:', document.querySelectorAll('.description-container').length);
	
	// Add event listeners to all read more buttons
	document.addEventListener('click', function(e) {
		if (e.target.classList.contains('read-more-btn')) {
			console.log('Read more button clicked');
			
			try {
				const btn = e.target;
				const container = btn.closest('.description-container');
				const text = container ? container.querySelector('.description-text') : null;
				
				console.log('Button:', btn);
				console.log('Container:', container);
				console.log('Text element:', text);
				
				if (!container || !text) {
					console.error('Could not find required elements');
					console.error('Container found:', !!container);
					console.error('Text found:', !!text);
					return;
				}
				
				// Toggle the expanded class
				const parentBox = text.closest('.box.style2');
				
				if (text.classList.contains('expanded')) {
					text.classList.remove('expanded');
					if (parentBox) parentBox.classList.remove('expanded-content');
					btn.textContent = 'Read More';
					console.log('Collapsed text - removed expanded class');
					
					// Smooth scroll to button after collapse
					setTimeout(() => {
						btn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
					}, 300);
				} else {
					text.classList.add('expanded');
					if (parentBox) parentBox.classList.add('expanded-content');
					btn.textContent = 'Read Less';
					console.log('Expanded text - added expanded class');
					
					// Small delay to let expansion start, then scroll to show full content
					setTimeout(() => {
						const rect = container.getBoundingClientRect();
						const isVisible = rect.bottom <= window.innerHeight;
						if (!isVisible) {
							container.scrollIntoView({ behavior: 'smooth', block: 'end' });
						}
					}, 100);
				}
				
				// Log current classes and computed styles for debugging
				console.log('Current text classes:', text.className);
				console.log('Computed max-height:', window.getComputedStyle(text).maxHeight);
				
			} catch (error) {
				console.error('Error in read more functionality:', error);
			}
		}
	});
});

// Global function for backward compatibility (if needed)
function toggleReadMore(btn) {
	console.log('toggleReadMore function called (deprecated - use event listeners instead)');
	
	try {
		const container = btn.closest('.description-container');
		const text = container ? container.querySelector('.description-text') : null;
		const parentBox = text ? text.closest('.box.style2') : null;
		
		if (!container || !text) {
			console.error('Could not find required elements');
			return;
		}
		
		if (text.classList.contains('expanded')) {
			text.classList.remove('expanded');
			if (parentBox) parentBox.classList.remove('expanded-content');
			btn.textContent = 'Read More';
		} else {
			text.classList.add('expanded');
			if (parentBox) parentBox.classList.add('expanded-content');
			btn.textContent = 'Read Less';
		}
		
	} catch (error) {
		console.error('Error in toggleReadMore:', error);
	}
}