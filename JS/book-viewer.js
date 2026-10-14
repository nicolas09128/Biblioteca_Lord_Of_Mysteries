import * as pdfjsLib from "../vendor/pdfjs/pdf.min.mjs";
import { getVolumeDescription, getVolumeTitle, volumes } from "./book-data.js";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "../vendor/pdfjs/pdf.worker.min.mjs",
  import.meta.url
).toString();

const viewer = document.querySelector("[data-book-viewer]");

if (viewer) {
  const volume = volumes.find((item) => item.id === Number(viewer.dataset.volumeId));

  if (volume) {
    document.title = `Volumen ${volume.roman} - ${getVolumeTitle(volume)} | Lord of Mysteries`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = `Lord of Mysteries - Volumen ${volume.roman}`;
    }

    const headerTitle = document.querySelector(".libro-titulo-header");
    if (headerTitle) {
      headerTitle.innerHTML = `
        <span class="titulo-decoracion">✦</span>
        Volumen ${volume.roman}: ${getVolumeTitle(volume)}
        <span class="titulo-decoracion">✦</span>
      `;
    }

    const infoTitle = document.querySelector(".info-titulo");
    if (infoTitle) {
      infoTitle.textContent = `Sobre el Volumen ${volume.roman}`;
    }

    const infoText = document.querySelector(".info-texto");
    if (infoText) {
      infoText.textContent = getVolumeDescription(volume);
    }
  }

  const pdfUrl = viewer.dataset.pdf;
  const leftCanvas = viewer.querySelector("[data-page-left]");
  const leftWrap = leftCanvas.closest(".book-page");
  const rightWrap = viewer.querySelector(".book-page-right");
  const spine = viewer.querySelector(".book-spine");
  const status = viewer.querySelector("[data-book-status]");
  const progress = viewer.querySelector("[data-book-progress]");
  const prevButton = viewer.querySelector("[data-book-prev]");
  const nextButton = viewer.querySelector("[data-book-next]");
  const zoomInButton = viewer.querySelector("[data-book-zoom-in]");
  const zoomOutButton = viewer.querySelector("[data-book-zoom-out]");
  const pageInput = viewer.querySelector("[data-book-page]");
  const pageTotal = viewer.querySelector("[data-book-total]");
  const cornerPrev = viewer.querySelector("[data-corner-prev]");
  const cornerNext = viewer.querySelector("[data-corner-next]");
  const cornerNextSingle = viewer.querySelector("[data-corner-next-single]");
  const compactViewportQuery = window.matchMedia("(max-width: 768px)");

  let pdf = null;
  let currentPage = 1;
  // En móviles se parte de una escala de lectura cómoda. Se puede ampliar
  // todavía más con el botón +.
  let zoom = compactViewportQuery.matches ? 1.5 : 1;
  let renderToken = 0;
  let isAnimating = false;
  let renderQueue = Promise.resolve();

  // El lector se muestra siempre como una página para priorizar la legibilidad.
  const step = () => 1;

  viewer.classList.add("is-single-page");

  const setStatus = (message) => {
    status.textContent = message;
  };

  const clampPage = (page) => {
    if (!pdf) {
      return 1;
    }
    const max = pdf.numPages;
    const clamped = Math.min(Math.max(page, 1), max);
    return clamped;
  };

  const renderPage = async (pageNumber, canvas, token) => {
    const page = await pdf.getPage(pageNumber);
    const shell = viewer.querySelector(".book-pages");
    const stage = viewer.querySelector(".book-stage");
    // Al ampliar en móvil, el contenedor puede crecer para permitir el
    // desplazamiento horizontal. El ancho de referencia debe seguir siendo
    // el de la pantalla para no ampliar de nuevo en cada renderizado.
    const availableWidth = Math.min(shell.clientWidth, stage.clientWidth);
    const firstViewport = page.getViewport({ scale: 1 });
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2.5);
    const horizontalCropRatio = 0;
    const readableWidth = firstViewport.width * (1 - horizontalCropRatio * 2);
    const scale = Math.max(0.5, (availableWidth / readableWidth) * zoom);
    const viewport = page.getViewport({ scale });
    const horizontalCrop = viewport.width * horizontalCropRatio;
    const canvasWidth = viewport.width - horizontalCrop * 2;
    const context = canvas.getContext("2d");

    canvas.width = Math.floor(canvasWidth * pixelRatio);
    canvas.height = Math.floor(viewport.height * pixelRatio);
    canvas.style.width = `${Math.floor(canvasWidth)}px`;
    canvas.style.height = `${Math.floor(viewport.height)}px`;

    context.setTransform(pixelRatio, 0, 0, pixelRatio, -horizontalCrop * pixelRatio, 0);
    const renderTask = page.render({ canvasContext: context, viewport });
    await renderTask.promise;

    if (token !== renderToken) {
      return;
    }

    // Cada página nueva empieza desde el margen de lectura, evitando que una
    // posición horizontal previa la deje visualmente desplazada en móvil.
    if (compactViewportQuery.matches) {
      stage.scrollLeft = 0;
    }

    canvas.dataset.pageNumber = pageNumber;
  };

  const updateControls = () => {
    const pagesShown = `${currentPage}`;

    pageInput.value = currentPage;
    pageTotal.textContent = `/ ${pdf.numPages}`;
    progress.value = currentPage;
    progress.max = pdf.numPages;
    prevButton.disabled = currentPage <= 1;
    nextButton.disabled = currentPage >= pdf.numPages;
    cornerPrev.disabled = currentPage <= 1;
    cornerNext.disabled = currentPage >= pdf.numPages;
    cornerNextSingle.disabled = currentPage >= pdf.numPages;
    zoomOutButton.disabled = zoom <= 0.75;
    zoomInButton.disabled = zoom >= (compactViewportQuery.matches ? 2 : 1.5);
    setStatus(`Pagina ${pagesShown} de ${pdf.numPages}`);
  };

  const renderSpreadNow = async () => {
    if (!pdf) {
      return;
    }

    const token = ++renderToken;
    currentPage = clampPage(currentPage);
    viewer.classList.add("is-loading");
    setStatus("Cargando paginas...");

    try {
      await renderPage(currentPage, leftCanvas, token);

      rightWrap.hidden = true;
      spine.hidden = true;
      cornerNextSingle.hidden = false;

      if (token === renderToken) {
        updateControls();
      }
    } catch (error) {
      if (error?.name !== "RenderingCancelledException") {
        console.error(error);
        setStatus("No se pudo cargar el libro.");
      }
    } finally {
      if (token === renderToken) {
        viewer.classList.remove("is-loading");
      }
    }
  };

  const renderSpread = () => {
    renderQueue = renderQueue.catch(() => {}).then(renderSpreadNow);
    return renderQueue;
  };

  const goToPage = (page) => {
    currentPage = clampPage(page);
    renderSpread();
  };

  const turnPage = (direction) => {
    if (isAnimating || viewer.classList.contains("is-loading")) {
      return;
    }

    const nextPage = clampPage(currentPage + direction * step());
    if (nextPage === currentPage) {
      return;
    }

    const animatedPage = direction > 0 && !rightWrap.hidden ? rightWrap : leftWrap;
    const animationClass = direction > 0 ? "is-turning-forward" : "is-turning-back";
    const singleTurn = true;

    isAnimating = true;
    animatedPage.classList.toggle("is-single-turn", singleTurn);
    animatedPage.classList.add(animationClass);
    viewer.classList.add("is-page-turning");

    window.setTimeout(() => {
      animatedPage.classList.remove(animationClass);
      animatedPage.classList.remove("is-single-turn");
      viewer.classList.remove("is-page-turning");
      isAnimating = false;
      goToPage(nextPage);
    }, 280);
  };

  prevButton.addEventListener("click", () => turnPage(-1));
  nextButton.addEventListener("click", () => turnPage(1));
  cornerPrev.addEventListener("click", () => turnPage(-1));
  cornerNext.addEventListener("click", () => turnPage(1));
  cornerNextSingle.addEventListener("click", () => turnPage(1));
  zoomOutButton.addEventListener("click", () => {
    zoom = Math.max(0.75, Math.round((zoom - 0.1) * 10) / 10);
    renderSpread();
  });
  zoomInButton.addEventListener("click", () => {
    const maxZoom = compactViewportQuery.matches ? 2 : 1.5;
    zoom = Math.min(maxZoom, Math.round((zoom + 0.1) * 10) / 10);
    renderSpread();
  });
  progress.addEventListener("input", (event) => goToPage(Number(event.target.value)));
  pageInput.addEventListener("change", (event) => goToPage(Number(event.target.value)));
  window.addEventListener("keydown", (event) => {
    if (event.target.matches("input, textarea, select")) {
      return;
    }

    if (event.key === "ArrowLeft") {
      turnPage(-1);
    }
    if (event.key === "ArrowRight") {
      turnPage(1);
    }
  });

  let resizeTimer = null;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(renderSpread, 180);
  });

  pdfjsLib
    .getDocument(pdfUrl)
    .promise.then((document) => {
      pdf = document;
      pageInput.max = pdf.numPages;
      renderSpread();
    })
    .catch((error) => {
      console.error(error);
      setStatus("No se pudo abrir el PDF local.");
    });
}
