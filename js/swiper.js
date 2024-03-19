
let swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

document.addEventListener("DOMContentLoaded", function () {
  // Obtener todas las opciones principales con desplegables
  const opcionesConDesplegable = document.querySelectorAll(".opcion-con-desplegable");

  // Agregar evento de clic a cada opción principal
  opcionesConDesplegable.forEach(function (opcion) {
    opcion.addEventListener("click", function () {
      // Obtener el desplegable asociado a la opción
      const desplegable = opcion.querySelector(".desplegable");

      // Alternar la clase "hidden" para mostrar u ocultar el desplegable
      desplegable.classList.toggle("hidden");
    })
  })
});