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

	// Expandable text functionality
		$(document).on('click', '.read-more-btn', function() {
			console.log('jQuery: Read more button clicked'); // Debug log
			var $btn = $(this);
			var $container = $btn.closest('.description-container');
			var $text = $container.find('.description-text');
			
			console.log('jQuery Button:', $btn); // Debug log
			console.log('jQuery Text element:', $text); // Debug log
			
			if ($text.hasClass('expanded')) {
				$text.removeClass('expanded');
				$btn.text('Read More');
				console.log('jQuery: Collapsed text'); // Debug log
			} else {
				$text.addClass('expanded');
				$btn.text('Read Less');
				console.log('jQuery: Expanded text'); // Debug log
			}
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

// Fallback vanilla JavaScript for read more functionality (outside jQuery wrapper)
document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM Content Loaded - Setting up vanilla JS event listeners');
	console.log('jQuery available:', typeof $ !== 'undefined');
	console.log('Number of read-more buttons found:', document.querySelectorAll('.read-more-btn').length);
	console.log('Number of description containers found:', document.querySelectorAll('.description-container').length);
	
	document.addEventListener('click', function(e) {
		console.log('Click detected on:', e.target);
		if (e.target.classList.contains('read-more-btn')) {
			console.log('Vanilla JS: Read more button clicked');
			const btn = e.target;
			const container = btn.closest('.description-container');
			const text = container ? container.querySelector('.description-text') : null;
			
			console.log('Vanilla JS Button:', btn);
			console.log('Vanilla JS Container:', container);
			console.log('Vanilla JS Text element:', text);
			
			if (!container) {
				console.error('Container not found!');
				return;
			}
			
			if (!text) {
				console.error('Text element not found!');
				return;
			}
			
			if (text.classList.contains('expanded')) {
				text.classList.remove('expanded');
				btn.textContent = 'Read More';
				console.log('Vanilla JS: Collapsed text');
			} else {
				text.classList.add('expanded');
				btn.textContent = 'Read Less';
				console.log('Vanilla JS: Expanded text');
			}
		}
	});
});

// Global function for inline onclick (backup method)
function toggleReadMore(btn) {
	console.log('toggleReadMore function called');
	const container = btn.closest('.description-container');
	const text = container ? container.querySelector('.description-text') : null;
	
	console.log('Button:', btn);
	console.log('Container:', container);
	console.log('Text element:', text);
	
	if (!container || !text) {
		console.error('Could not find required elements');
		return;
	}
	
	if (text.classList.contains('expanded')) {
		text.classList.remove('expanded');
		btn.textContent = 'Read More';
		console.log('Collapsed text');
	} else {
		text.classList.add('expanded');
		btn.textContent = 'Read Less';
		console.log('Expanded text');
	}
}