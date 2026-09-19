// =========================
// MOBILE MENU
// =========================

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

menuButton.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});


// Close mobile menu after clicking a link

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});


// =========================
// CONTACT FORM (DIRECT EMAIL SUBMISSION)
// =========================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        formMessage.style.color = "red";
        formMessage.textContent = "Please fill in all required fields.";
        return;
    }

    formMessage.style.color = "#555";
    formMessage.textContent = "Sending your enquiry...";

    // FormData object banakar Web3Forms API par send kar rahe hain
    const formData = new FormData(contactForm);

    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
    })
    .then(async (response) => {
        let json = await response.json();
        if (response.status === 200) {
            formMessage.style.color = "green";
            formMessage.textContent = "Thank you! Your enquiry has been sent successfully to Melt Magic Solutions.";
            contactForm.reset();
        } else {
            formMessage.style.color = "red";
            formMessage.textContent = json.message || "Something went wrong. Please try again.";
        }
    })
    .catch(error => {
        formMessage.style.color = "red";
        formMessage.textContent = "Failed to send message. Please check your internet connection.";
    });
});


// =========================
// CURRENT YEAR
// =========================

document.getElementById("year").textContent =
    new Date().getFullYear();


// =========================
// SIMPLE SCROLL ANIMATION
// =========================

const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    {
        threshold: 0.1
    }
);

sections.forEach(section => {
    observer.observe(section);
});
