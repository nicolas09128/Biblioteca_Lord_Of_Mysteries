import { extraVolumes, getVolumeDescription, getVolumeTitle, volumes } from "./book-data.js";

const library = document.querySelector("[data-library]");

if (library) {
  const existingCards = library.querySelectorAll(".libro-card");

  existingCards.forEach((card, index) => {
    const volume = volumes[index];
    if (!volume) {
      return;
    }

    const number = card.querySelector(".libro-numero");
    const title = card.querySelector(".libro-titulo");
    const description = card.querySelector(".libro-descripcion");

    if (number) {
      number.textContent = `Volumen ${volume.roman}`;
    }
    if (title) {
      title.textContent = getVolumeTitle(volume);
    }
    if (description) {
      description.textContent = getVolumeDescription(volume);
    }
  });

  const fragment = document.createDocumentFragment();

  for (const volume of extraVolumes) {
    const card = document.createElement("article");
    card.className = "libro-card";

    const title = getVolumeTitle(volume);
    const description = getVolumeDescription(volume);
    const url = `libros/Lector.html?id=${volume.id}`;

    card.innerHTML = `
      <div class="libro-numero">Volumen ${volume.roman}</div>
      <h2 class="libro-titulo">${title}</h2>
      <p class="libro-descripcion">${description}</p>
      <a href="${url}" class="libro-link" target="main_frame">Abrir Grimorio</a>
    `;

    fragment.appendChild(card);
  }

  library.appendChild(fragment);
}
