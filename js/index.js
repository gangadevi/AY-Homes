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

loadComponent("header", "header.html");
loadComponent("footer", "footer.html");