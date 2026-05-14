# 📚 Biblioteca Personal - Lord of Mysteries

## ✨ Descripción

Biblioteca web personal con estilo **Misticismo Victoriano** inspirada en la novela "Lord of Mysteries". Diseñada con una atmósfera gótica-steampunk que evoca las brumosas calles de Tingen y Backlund.

## 🎨 Características de Diseño

### Paleta de Colores
- **Fondo**: Deep Midnight Blue (#0B0E14) - Representa la "Noche Eterna"
- **Texto**: Antique Silver/Mist (#D1D5DB) - Evoca la niebla de Backlund
- **Resaltados**: 
  - Crimson Moon (#9B2226) - Peligro y misterio
  - Old Gold (#C5A059) - Divinidad y riqueza

### Tipografía
- **Títulos**: Cinzel (caligrafía victoriana)
- **Encabezados**: Playfair Display (elegante serif)
- **Cuerpo**: EB Garamond (lectura clásica)

### Elementos Visuales
- Texturas de papel antiguo
- Patrones sutiles de estrellas y engranajes
- Efectos de brillo y sombra atmosféricos
- Animaciones suaves y elegantes
- Decoraciones victorianas (◈, ✦, ◆)

## 📁 Estructura de Archivos

```
Biblioteca_Lord_Of_Mysteries/
│
├── index.html              # Biblioteca general de novelas
├── lord-of-mysteries.html  # Vista inmersiva de Lord of Mysteries
├── lord-of-mysteries-volumenes.html # Biblioteca de volúmenes de Lord of Mysteries
│
├── CSS/
│   ├── style.css          # Estilos para la página principal
│   └── libros.css         # Estilos para páginas de libros
│
├── libros/
│   ├── Primero.html       # Volumen I - Payaso, Parte I
│   ├── Segundo.html       # Volumen II - Payaso, Parte II
│   ├── Tercero.html       # Volumen III - Payaso, Parte III
│   ├── Lector.html        # Lector reutilizable para Volumen IV en adelante
│   └── pdfs/              # PDFs locales de los volúmenes
│
├── JS/
│   ├── book-data.js       # Catálogo de PDFs y volúmenes
│   ├── book-loader.js     # Carga dinámica del lector
│   ├── book-viewer.js     # Visor PDF local
│   └── library-catalog.js # Tarjetas dinámicas de la biblioteca
│
├── imagenes/              # Carpeta para imágenes adicionales
│
└── README.md              # Este archivo
```

## 🚀 Instrucciones de Uso

### Opción 1: Uso Local
1. Descarga toda la carpeta `Biblioteca_Lord_Of_Mysteries`
2. Ejecuta `node dev-server.mjs 8087`
3. Abre `http://localhost:8087` en tu navegador web favorito
4. Navega entre los libros usando los enlaces

### Opción 2: Subir a Hosting Web
1. Sube todos los archivos manteniendo la estructura de carpetas
2. Los archivos son estáticos, funcionan en cualquier servidor web
3. Compatible con GitHub Pages, Netlify, Vercel, etc.

## 📖 Contenido

### Biblioteca general
La vista inicial lista las novelas disponibles. Actualmente incluye Lord of Mysteries y espacios preparados para futuras novelas.

### Lord of Mysteries
La novela tiene una vista propia con ambientación musical, expedientes y una biblioteca de volúmenes locales.

### Volumen III en adelante
La biblioteca continúa con lectores locales por rangos de capítulos, desde `151-200` hasta `1401-1430`.

## 🎯 Características Técnicas

- **Responsive Design**: Se adapta a móviles, tabletas y escritorio
- **Visor local**: PDF.js para leer los volúmenes sin depender de Heyzine
- **Rendimiento Optimizado**: Carga rápida y suave
- **Accesibilidad**: Diseño semántico y legible
- **Cross-browser**: Compatible con todos los navegadores modernos

## 🔧 Personalización

### Cambiar Colores
Edita las variables CSS en `CSS/style.css` y `CSS/libros.css`:

```css
:root {
    --midnight-blue: #0B0E14;
    --antique-silver: #D1D5DB;
    --crimson-moon: #9B2226;
    --old-gold: #C5A059;
}
```

### Agregar Más Libros
1. Copia el PDF en `libros/pdfs/`
2. Añade una entrada en `JS/book-data.js`
3. La tarjeta aparecerá automáticamente en la biblioteca

### Modificar Textos
- **Novelas principales**: Edita `index.html`
- **Volúmenes de Lord of Mysteries**: Edita `JS/book-data.js`

## 💡 Notas

- Los volúmenes usan un visor PDF local con PDF.js, sin iframes de Heyzine
- Los PDFs están guardados en `libros/pdfs/`
- La biblioteca mantiene su estilo incluso sin conexión a internet si los recursos externos de fuentes ya están disponibles
- Las fuentes se cargan desde Google Fonts (requiere conexión inicial)

## 🌙 Temática

Inspirado en el universo de **Lord of Mysteries**, esta biblioteca captura la esencia del misticismo victoriano: elegante pero sombrío, sofisticado pero misterioso. Cada elemento visual evoca la atmósfera de la novela, desde los faroles de gas hasta la niebla eterna.

---

**"En esta era de vapor y maquinaria, en esta época de dioses ocultos y seres extraordinarios..."**

*— El Fool que no pertenece a esta era*
