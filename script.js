let slideIndex = 0;
const slides = document.querySelector('.slides');
const totalSlides = slides.children.length;

function changeSlide(direction) {
    slideIndex += direction;
    if (slideIndex >= totalSlides) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = totalSlides - 1;
    }
    slides.style.transform = `translateX(-${slideIndex * 100}%)`;
}

// Automatically switch slides every 5 seconds
setInterval(() => {
    changeSlide(1);
}, 5000);

// Dropdown logic for click-based toggle
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownMenu = document.querySelector('.dropdown-menu');

dropdownBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor behavior
    dropdownMenu.style.display = (dropdownMenu.style.display === 'block') ? 'none' : 'block';
});

// Close the dropdown if clicked outside
window.addEventListener('click', function(event) {
    if (!dropdownBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = 'none';
    }
});


// Modal Logic
const modal = document.getElementById("loginModal");
const loginBtn = document.getElementById("loginBtn");
const closeBtn = document.querySelector(".close");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const modalTitle = document.getElementById("modalTitle");
const toggleText = document.getElementById("toggleText");
const ctaBtn = document.getElementById("cta-btn");

// Show modal when login button is clicked
loginBtn.addEventListener("click", function() {
    modal.style.display = "block";
    loginForm.style.display = "block"; // Ensure login form is visible
    registerForm.style.display = "none"; // Hide register form by default
    modalTitle.innerText = "Login to Recipe Heaven"; // Set the title to Login
    updateToggleText("Don't have an account?", "Register here");
});

ctaBtn.addEventListener("click", function() {
    modal.style.display = "block";
    loginForm.style.display = "block"; // Ensure login form is visible
    registerForm.style.display = "none"; // Hide register form by default
    modalTitle.innerText = "Login to Recipe Heaven"; // Set the title to Login
    updateToggleText("Don't have an account?", "Register here");
});
// Close modal when close button is clicked
closeBtn.addEventListener("click", function() {
    modal.style.display = "none";
});

// Close modal when clicking outside of modal
window.addEventListener("click", function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

// Function to switch between Login and Register forms
function toggleForms() {
    if (loginForm.style.display === "none") {
        // If the Register form is showing, switch to Login
        registerForm.style.display = "none";
        loginForm.style.display = "block";
        modalTitle.innerText = "Login to Recipe Heaven";
        updateToggleText("Don't have an account?", "Register here");
    } else {
        // If the Login form is showing, switch to Register
        loginForm.style.display = "none";
        registerForm.style.display = "block";
        modalTitle.innerText = "Register for Recipe Heaven";
        updateToggleText("Already have an account?", "Login here");
    }
}

// Function to update the toggle text and reattach the event listener
function updateToggleText(text, linkText) {
    toggleText.innerHTML = `${text} <a href='#' id='toggleForm'>${linkText}</a>`;
    
    // Re-attach the event listener to the new link
    document.getElementById("toggleForm").addEventListener("click", function(event) {
        event.preventDefault();
        toggleForms();
    });
}

//constructor for new recipe
function recipeCreation(name,instructions,ingredients,rating,){
    this.name = name;
    this.rating =rating;
    this.instructions = instructions;
    this.ingredients = ingredients;


}

const recipeForm = document.getElementById("recipeForm");

recipeForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData(recipeForm);

    // Send data to server
    try {
        const response = await fetch("/api/recipes", {
            method: "POST",
            body: formData
        });
        const result = await response.json();
        
        if (response.ok) {
            alert("Recipe added successfully!");
            recipeForm.reset();
            closeRecipeModal();
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while adding the recipe.");
    }
});

// Function to open and close recipe modal
function openRecipeModal() {
    document.getElementById("recipeModal").style.display = "block";
}

function closeRecipeModal() {
    document.getElementById("recipeModal").style.display = "none";
}

const website ={
    name: "ReciprWebsite",
    rating:7,
    authors: ['jane','doe']
}
const obj = {
    foo: 'bar',
    [Symbol('id')]: 0,
    __proto__ : website
};

console.log(obj);
console.log(Object.keys(obj));
console.log(Object.values(obj));
console.log(Object.entries(obj));
console.log(obj.name);