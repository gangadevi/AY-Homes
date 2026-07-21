async function loadComponent(id, file) {
  const response = await fetch(file);
  const data = await response.text();
  document.getElementById(id).innerHTML = data;

  if (id === "header") {
    initMenu();
  }
}

function initMenu() {
  const menuBtn = document.getElementById("menuBtn");
  const offcanvasEl = document.getElementById("menuOffcanvas");
  const header = document.querySelector(".custom-header");

  if (!menuBtn || !offcanvasEl || !header) return;

  offcanvasEl.addEventListener("shown.bs.offcanvas", () => {
    menuBtn.innerHTML = "✕";
  });

  offcanvasEl.addEventListener("hidden.bs.offcanvas", () => {
    menuBtn.innerHTML = "☰";
  });

  // Header scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// Counter Animation starts

const counters = document.querySelectorAll(".counter");

const startCounter = (counter) => {
  const target = +counter.getAttribute("data-target");
  let count = 0;

  const updateCounter = () => {
    const increment = Math.max(1, Math.ceil(target / 300));

    if (count < target) {
      count += increment;
      counter.innerText = count > target ? target : count;
      setTimeout(updateCounter, 30);
    } else if (target === 10) {
      counter.innerText = target + "k+";
    } else {
      counter.innerText = target + "+";
    }
  };

  updateCounter();
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.5,
  },
);

counters.forEach((counter) => {
  observer.observe(counter);
});

// *************** page animations ends*************** //

// Enquiry Modal Logic

document.addEventListener("DOMContentLoaded", function () {
    
    const enquiryModalElement  = document.getElementById("enquiryModal");
    if(enquiryModalElement ){
      const enquiryModal = new bootstrap.Modal(enquiryModalElement );

      // Show immediately on page load
      enquiryModal.show();

      // After the modal is closed, show it again after 30 seconds
      enquiryModalElement.addEventListener("hidden.bs.modal", function () {
          setTimeout(() => {
              enquiryModal.show();
          }, 30000); // 30 seconds
      });
    }
  const form = document.getElementById("contactForm");

// Clear errors and restrict input while typing
if (form) {
  form.addEventListener("input", function (e) {

      if (e.target.id === "name") {
          e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
          document.getElementById("nameError").textContent = "";
      }

      if (e.target.id === "email") {
          document.getElementById("emailError").textContent = "";
      }

      if (e.target.id === "phone") {
          e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
          document.getElementById("phoneError").textContent = "";
      }

      if (e.target.id === "message") {
          document.getElementById("messageError").textContent = "";
      }

  });


  form.addEventListener("submit", function (e) {
    e.preventDefault();

    //  alert("Submit works!");
    // Get values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    // Clear previous errors
    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("phoneError").textContent = "";
    document.getElementById("messageError").textContent = "";

    let isValid = true;

    // Name
    if (name === "") {
      document.getElementById("nameError").textContent = "Name is required";
      isValid = false;
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
      document.getElementById("emailError").textContent = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      document.getElementById("emailError").textContent = "Invalid email";
      isValid = false;
    }

    // Phone
    const phoneRegex = /^[6-9]\d{9}$/;

    if (phone === "") {
      document.getElementById("phoneError").textContent = "Phone is required";
      isValid = false;
    } else if (!phoneRegex.test(phone)) {
      document.getElementById("phoneError").textContent =
        "Enter a valid 10-digit phone number";
      isValid = false;
    }

    // Message
    if (message === "") {
      document.getElementById("messageError").textContent =
        "Message is required";
      isValid = false;
    }

    if (isValid) {
      const params = {
        from_name: name,
        from_email: email,
        phone: phone,
        message: message,
      };

      emailjs
        .send("service_7igma8g", "template_pn4b23r", params)
        .then(function () {
          alert("Email sent successfully!");
          document.getElementById("contactForm").reset();

          // Close the modal
          const modalElement = document.getElementById("enquiryModal");
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal.hide();
        })
        .catch(function (error) {
          console.log(error);
          alert("Failed to send email.");
        });
    }
  });
}

  const tabs = document.querySelectorAll(".tab-btn");
        const projects = document.querySelectorAll(".project-item");

        tabs.forEach(tab => {

            tab.addEventListener("click", () => {

                tabs.forEach(btn => btn.classList.remove("active"));
                tab.classList.add("active");

                const filter = tab.dataset.filter;

                projects.forEach(project => {

                    if (filter === "all") {
                        project.style.display = "block";
                    }
                    else if (project.classList.contains(filter)) {
                        project.style.display = "block";
                    }
                    else {
                        project.style.display = "none";
                    }

                });

            });

        });



// carousel 

  const heroCarousel = document.querySelector("#heroCarousel");

   if (heroCarousel) {
    new bootstrap.Carousel(heroCarousel, {
        interval: 5000, // 5 seconds
        ride: "carousel",
        pause: false,
        wrap: true
    });
  }

});

loadComponent("header", "header.html");
loadComponent("footer", "footer.html");
