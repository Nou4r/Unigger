const lightToggle = document.getElementById("light-toggle");
const themeIcon = document.getElementById("theme-icon");

lightToggle.addEventListener("change", toggle);

function toggle() {
    const root = document.documentElement;
    root.classList.toggle("light-mode");

    const isLightMode = root.classList.contains("light-mode");
    localStorage.setItem("lightMode", isLightMode);
    if (isLightMode) {
        themeIcon.setAttribute("class", "fa-solid fa-sun fa-lg");
    } else {
        themeIcon.setAttribute("class", "fa-solid fa-moon fa-lg");
    }
}

function initialize() {
    const root = document.documentElement;
    const savedPreference = localStorage.getItem("lightMode");

    if (savedPreference === "true") {
        root.classList.add("light-mode");
        lightToggle.checked = true;
        themeIcon.setAttribute("class", "fa-solid fa-sun fa-lg");
    } else {
        themeIcon.setAttribute("class", "fa-solid fa-moon fa-lg");
    }
}

initialize();
