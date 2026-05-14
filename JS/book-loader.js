import { extraVolumes, getVolumeDescription, getVolumeTitle } from "./book-data.js";

const params = new URLSearchParams(window.location.search);
const volume = extraVolumes.find((item) => item.id === Number(params.get("id"))) || extraVolumes[0];
const title = getVolumeTitle(volume);
const description = getVolumeDescription(volume);

document.title = `Volumen ${volume.roman} - ${title} | Lord of Mysteries`;

const metaDescription = document.querySelector('meta[name="description"]');
if (metaDescription) {
  metaDescription.content = `Lord of Mysteries - Volumen ${volume.roman}`;
}

const headerTitle = document.querySelector("[data-reader-title]");
if (headerTitle) {
  headerTitle.textContent = `Volumen ${volume.roman}: ${title}`;
}

const infoTitle = document.querySelector("[data-reader-info-title]");
if (infoTitle) {
  infoTitle.textContent = `Sobre el Volumen ${volume.roman}`;
}

const infoText = document.querySelector("[data-reader-description]");
if (infoText) {
  infoText.textContent = description;
}

const viewer = document.querySelector("[data-book-viewer]");
if (viewer) {
  viewer.dataset.pdf = `pdfs/${volume.pdf}`;
}

await import("./book-viewer.js");
