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
├── index.html              # Página principal (índice de libros)
│
├── CSS/
│   ├── style.css          # Estilos para la página principal
│   └── libros.css         # Estilos para páginas de libros
│
├── libros/
│   ├── Primero.html       # Volumen I - El Misterio Comienza
│   ├── Segundo.html       # Volumen II - El Ascenso del Fool
│   └── Tercero.html       # Volumen III - La Danza del Caos
│
├── imagenes/              # Carpeta para imágenes adicionales
│
└── README.md              # Este archivo
```

## 🚀 Instrucciones de Uso

### Opción 1: Uso Local
1. Descarga toda la carpeta `Biblioteca_Lord_Of_Mysteries`
2. Abre `index.html` en tu navegador web favorito
3. Navega entre los libros usando los enlaces

### Opción 2: Subir a Hosting Web
1. Sube todos los archivos manteniendo la estructura de carpetas
2. Los archivos son estáticos, funcionan en cualquier servidor web
3. Compatible con GitHub Pages, Netlify, Vercel, etc.

## 📖 Contenido

### Volumen I: El Misterio Comienza
Klein Moretti despierta en un mundo de misterios y secretos antiguos en las brumosas calles de Tingen.

### Volumen II: El Ascenso del Fool
Las conspiraciones de Backlund se revelan mientras Klein navega entre múltiples identidades.

### Volumen III: La Danza del Caos
El juego final de los Dioses comienza bajo la Luna Carmesí.

## 🎯 Características Técnicas

- **Responsive Design**: Se adapta a móviles, tabletas y escritorio
- **Sin JavaScript**: HTML y CSS puros para máxima compatibilidad
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
1. Duplica uno de los archivos en `libros/`
2. Cambia la URL del iframe
3. Actualiza el título y descripción
4. Añade una nueva tarjeta en `index.html`

### Modificar Textos
- **Títulos y descripciones**: Edita `index.html`
- **Información de libros**: Edita cada archivo en `libros/`

## 💡 Notas

- Los libros se muestran mediante iframes de Heyzine (servicio de flipbooks)
- Las URLs de los iframes están configuradas para los tres volúmenes
- La biblioteca mantiene su estilo incluso sin conexión a internet (excepto los iframes)
- Las fuentes se cargan desde Google Fonts (requiere conexión inicial)

## 🌙 Temática

Inspirado en el universo de **Lord of Mysteries**, esta biblioteca captura la esencia del misticismo victoriano: elegante pero sombrío, sofisticado pero misterioso. Cada elemento visual evoca la atmósfera de la novela, desde los faroles de gas hasta la niebla eterna.

---

**"En esta era de vapor y maquinaria, en esta época de dioses ocultos y seres extraordinarios..."**

*— El Fool que no pertenece a esta era*
