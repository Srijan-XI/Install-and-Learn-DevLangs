// Popup functionality
(function() {
	const popup = document.getElementById('dev-popup');
	const closeBtn = document.getElementById('close-popup');
	const dontShowCheckbox = document.getElementById('dont-show-again');
	const storageKey = 'hide-dev-popup';

	// Check if user has chosen to hide the popup
	const shouldHide = localStorage.getItem(storageKey);
	
	if (!shouldHide) {
		// Show popup after a short delay
		setTimeout(() => {
			popup.classList.add('show');
		}, 500);
	}

	// Close popup handler
	function closePopup() {
		popup.classList.remove('show');
		
		// Save preference if checkbox is checked
		if (dontShowCheckbox.checked) {
			localStorage.setItem(storageKey, 'true');
		}
	}

	closeBtn.addEventListener('click', closePopup);
	
	// Close on overlay click
	popup.addEventListener('click', (e) => {
		if (e.target === popup) {
			closePopup();
		}
	});

	// Close on Escape key
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && popup.classList.contains('show')) {
			closePopup();
		}
	});
})();
