const darkModeButton = document.querySelector(".dark-mode-button"); // la lunita basicamente
const body = document.querySelector(".body");

// Agregar el evento al botón para alternar el tema
darkModeButton.addEventListener("click", ()=>{
    body.classList.toggle("dark-mode");
});

// Deslizamiento por links internos
function navigateSection(event) {
    event.preventDefault();
    const target = event.target.getAttribute('href');
    document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
}
