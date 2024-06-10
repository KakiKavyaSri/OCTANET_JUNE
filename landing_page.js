document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners or any JavaScript code here
    console.log('DOM fully loaded and parsed');

    // Search button functionality
    const searchButton = document.querySelector('.search-bar button');
    const searchInput = document.querySelector('.search-bar input');

    searchButton.addEventListener('click', function() {
        const query = searchInput.value;
        console.log('Search query:', query);
        // Add your search functionality here
    });

    // View All buttons functionality
    const viewAllButtons = document.querySelectorAll('.view-all-button');

    viewAllButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('View All clicked');
            // Add your navigation or functionality here
        });
    });

    // Login button functionality
    const loginButton = document.querySelector('.auth-buttons a[href="#"]');
    loginButton.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('Login clicked');
        // Add your login functionality here
    });

    // Sign Up button functionality
    const signUpButton = document.querySelector('.auth-buttons a[href="#"]');
    signUpButton.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('Sign Up clicked');
        // Add your sign-up functionality here
    });
});
