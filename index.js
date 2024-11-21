// JavaScript for Sticky Header and Menu Toggle

// Selecting elements from the DOM
const header = document.querySelector("header");
const menuIcon = document.querySelector("#menu-icon");
const navList = document.querySelector('.navlist');

// Variables to store state
let lastScrollY = 0; // Track last scroll position
const debounceDelay = 100; // Delay for debouncing scroll events
let debounceTimer = null;

// Function to handle sticky header on scroll
const handleStickyHeader = () => {
    const currentScrollY = window.scrollY;

    // Check if we scrolled more than 120px and the scroll direction is down
    if (currentScrollY > 120 && currentScrollY > lastScrollY) {
        header.classList.add('sticky');  // Add sticky class for background change
    } else {
        header.classList.remove('sticky'); // Remove sticky class
    }

    // Update last scroll position
    lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
};

// Function to toggle the menu
const toggleMenu = () => {
    // Toggle classes to animate the menu and icon
    menuIcon.classList.toggle('bx-x');
    navList.classList.toggle('active');
};

// Debounced Scroll Function to improve performance
const debouncedScroll = () => {
    // If debounce timer exists, clear it
    if (debounceTimer) {
        clearTimeout(debounceTimer);
    }
    
    // Set a new debounce timer
    debounceTimer = setTimeout(() => {
        handleStickyHeader();
    }, debounceDelay);
};

// Window Scroll Event - Debounced
window.addEventListener("scroll", debouncedScroll);

// Window Click Event to close the menu on outside click
window.addEventListener("click", (e) => {
    // Check if the click is outside the menu and the menu is open
    if (!menuIcon.contains(e.target) && !navList.contains(e.target) && navList.classList.contains('active')) {
        menuIcon.classList.remove('bx-x');
        navList.classList.remove('active');
    }
});

// Click Event on Menu Icon
menuIcon.addEventListener("click", (e) => {
    e.stopPropagation();  // Prevent event bubbling up
    toggleMenu();  // Toggle the menu on click
});

// Function to handle the active class for scroll navigation highlighting
const handleActiveLink = () => {
    const links = document.querySelectorAll('.navlist li a');
    const scrollPosition = window.scrollY;

    links.forEach(link => {
        const section = document.querySelector(link.hash);
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            // If the scroll position is within the section, make it active
            if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        }
    });
};

// Window Scroll Event to handle active link and sticky header
window.addEventListener("scroll", () => {
    handleActiveLink();
    debouncedScroll();
});

// Smooth scroll behavior for anchor links
document.querySelectorAll('.navlist li a').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();

        // Get the target element's offset
        const targetId = anchor.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - 50,  // Adjust scroll to align at the top
            behavior: 'smooth'
        });
    });
});
