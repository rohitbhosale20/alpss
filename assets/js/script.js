'use strict';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});

// Subs Form Submission

document.addEventListener('DOMContentLoaded', function () {
			const form = document.getElementById('subscribe-form');
			form.addEventListener('submit', function (event) {
				event.preventDefault();
				const formData = new FormData(form);
				const formObject = {};
				formData.forEach((value, key) => {
					formObject[key] = value;
				});

				console.log('Form Data:', formObject);
				fetch(form.action, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formObject),
				})
					.then((response) => {
						if (response.ok) {
							console.log('Subscription successful!');
							document.getElementById('subscribeMessage').textContent =
								'Thank you for subscribing!';
							form.reset();
						} else {
							console.error('Subscription failed:', response.statusText);
							document.getElementById('subscribeMessage').textContent =
								'There was an error subscribing. Please try again.';
						}
					})
					.catch((error) => {
						console.error('Error:', error);
						document.getElementById('subscribeMessage').textContent =
							'There was an error subscribing. Please try again.';
					});
			});
		});

    // contact us form submission

    		document.addEventListener('DOMContentLoaded', function () {
			const form = document.getElementById('contact-us-form');
			const preloader = document.querySelector('.preload[data-preaload]');
			form.addEventListener('submit', function (event) {
				event.preventDefault();
				preloader.style.display = 'flex';
				const formData = new FormData(form);
				const formObject = {};
				formData.forEach((value, key) => {
					formObject[key] = value;
				});

				console.log('Form Data:', formObject); 
				fetch(form.action, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formObject),
				})
					.then((response) => {
						preloader.style.display = 'none';

						if (response.ok) {
							console.log('Form submitted successfully!');
							document.getElementById('formMessage').textContent =
								'Form submitted successfully!';
							form.reset();
						} else {
							console.error('Form submission failed:', response.statusText);
							document.getElementById('formMessage').textContent =
								'There was an error submitting the form. Please try again.';
						}
					})
					.catch((error) => {
						preloader.style.display = 'none';

						console.error('Error:', error);
						document.getElementById('formMessage').textContent =
							'There was an error submitting the form. Please try again.';
					});
			});
		});


    // Cookies

    		function setCookie(name, value, days) {
			let expires = "";
			if (days) {
				let date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				expires = "; expires=" + date.toUTCString();
			}
			document.cookie = name + "=" + (value || "") + expires + "; path=/";
		}

		function getCookie(name) {
			let nameEQ = name + "=";
			let ca = document.cookie.split(';');
			for (let i = 0; i < ca.length; i++) {
				let c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
			}
			return null;
		}

		function acceptCookies() {
			console.log("Cookie consent given");
			setCookie('cookieConsent', 'true', 365);
			document.getElementById('cookiePolicy').style.display = 'none';
		}

		if (getCookie('cookieConsent') !== 'true') {
			document.getElementById('cookiePolicy').style.display = 'block';
		}

    // Redirect User to Choose Form

    document.addEventListener('DOMContentLoaded', function () {
			const planLinks = document.querySelectorAll('.choose-plan-link');
			planLinks.forEach(link => {
				link.addEventListener('click', function (event) {
					event.preventDefault();
					const selectedPlan = this.getAttribute('data-plan');
					window.location.href = `choose-plan.html?chosenPlan=${selectedPlan}`;
				});
			});
		});