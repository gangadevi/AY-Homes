async function loadComponent(id, file) {
    const response = await fetch(file);
    const data = await response.text();
    document.getElementById(id).innerHTML = data;


    if (id === "header") {
        initMenu();
    }
}

function initMenu() {
    console.log("Menu initialized");
    const menuBtn = document.getElementById("menuBtn");
    const offcanvasEl = document.getElementById("menuOffcanvas");

    if (!menuBtn || !offcanvasEl) return;

    offcanvasEl.addEventListener("shown.bs.offcanvas", () => {
        menuBtn.innerHTML = "✕";
    });

    offcanvasEl.addEventListener("hidden.bs.offcanvas", () => {
        menuBtn.innerHTML = "☰";
    });
}

// Counter Animation starts

const counters = document.querySelectorAll('.counter');

const startCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    let count = 0;

    const updateCounter = () => {
        const increment = Math.max(1, Math.ceil(target / 300));

        if (count < target) {
            count += increment;
            counter.innerText = count > target ? target : count;
            setTimeout(updateCounter, 30); 
        }else if(target === 10){
            counter.innerText = target + 'k+';
        }else {
            counter.innerText = target + '+';
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
        threshold: 0.5
    }
);

counters.forEach((counter) => {
    observer.observe(counter);
});

// *************** page animations ends*************** //

// Enquiry Modal Logic

document.addEventListener("DOMContentLoaded", function () {

    if (!sessionStorage.getItem("enquiryShown")) {

        setTimeout(function () {

            const enquiryModal = new bootstrap.Modal(
                document.getElementById("enquiryModal")
            );

            enquiryModal.show();

            sessionStorage.setItem("enquiryShown", "true");

        }, 4000);

    }

});

loadComponent("header", "header.html");
loadComponent("footer", "footer.html");