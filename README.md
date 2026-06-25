# Studio Vanessa Aravena - Landing Page Premium 🌸

Este proyecto es una landing page de alta gama diseñada y desarrollada de manera personalizada para **Studio Vanessa Aravena**, un centro de cosmetología y masoterapia ubicado en Concepción, Chile. 

El sitio ha sido diseñado con un enfoque **mobile-first**, priorizando la experiencia de usuario táctil y la fluidez visual en dispositivos móviles (especialmente optimizado para iOS/iPhones), sin descuidar una presentación imponente en computadoras de escritorio.

---

## 🚀 Características Principales

* **Estética Premium & Marca:**
  * Paleta de colores armoniosa basada en tonos rubor (blush), oro rosa, crema y carbón.
  * Tipografía elegante y de alta costura combinando *Playfair Display* (títulos/itálicas) y *DM Sans* (cuerpo de lectura).
  * Rediseño de marca con logotipo tipográfico dinámico y emblemas en medallón.
* **Optimización Extrema de Rendimiento (WPO):**
  * Imágenes convertidas y comprimidas a formato de última generación **WebP**, reduciendo el peso de los activos gráficos de **3.87 MB a 0.40 MB** (un **89.6% de ahorro en transferencia**).
  * Tipografías de Google Fonts **autohospedadas localmente** (archivos `.woff2` servidos desde el propio servidor), eliminando peticiones externas bloqueantes.
  * Tiempos de carga iniciales (LCP) inferiores a 1.2 segundos.
* **Galería de Instagram en Tiempo Real:**
  * Integración dinámica del feed mediante widget oficial de Elfsight.
  * Bloqueo de cambios de diseño (CLS) mediante reserva de altura por CSS.
  * Ocultamiento de títulos y cabeceras redundantes del widget para mantener la estética limpia de la web.
* **SEO On-Page & Datos Estructurados:**
  * Marcado semántico HTML5 estructurado jerárquicamente.
  * Datos estructurados en formato **JSON-LD** para **LocalBusiness** (SEO Local y Google Maps) y **FAQPage** (acordeones FAQ directamente en resultados de búsqueda de Google).
  * Textos alternativos descriptivos en todas las imágenes optimizados para SEO local.
* **Interactividad y Animaciones Fluidas:**
  * Acordeón de Preguntas Frecuentes interactivo con cierre automático de secciones inactivas.
  * Animación atmosférica de caída de pétalos de cerezo flotantes (solo en desktop).
  * Animaciones de entrada reveladoras (fade-in up) usando `IntersectionObserver`.
  * Efecto de profundidad Parallax en el banner principal (Hero).
  * Pantalla de carga fluida (Splash Screen) con desvanecimiento premium al completar la carga.
  * Cumplimiento estricto con las preferencias del usuario de reducción de movimiento (`prefers-reduced-motion`).
* **Accesibilidad (a11y) & UX:**
  * Zonas de toque (touch targets) de al menos `48px` para evitar pulsaciones erróneas, en cumplimiento con las guías HIG de Apple.
  * Contraste de color optimizado y adaptado a la norma **WCAG AA** en toda la interfaz.
  * Enlaces rápidos de reserva directa a WhatsApp y ubicación en Google Maps en Orompello 677, Concepción.

---

## 🛠️ Tecnologías Utilizadas

* **Estructura:** HTML5 Semántico
* **Estilos:** CSS3 Custom Properties (Diseño Responsive, Flexbox, Grid y Animaciones)
* **Lógica interactiva:** JavaScript (ES6+, APIs nativas como `IntersectionObserver` y `requestAnimationFrame`)
* **Automatizaciones (Python):**
  * Script para optimización y compresión a WebP.
  * Script para descarga y filtrado de tipografías locales.
* **Integraciones:** Elfsight Platform API (Instagram Feed) & Google Maps Embed API

---

## 💻 Desarrollo Local

Para correr el proyecto localmente, simplemente clona el repositorio y monta un servidor estático local en la raíz del proyecto.

### Usando Node.js (npx):
```bash
npx serve .
```

### Usando Python:
```bash
python -m http.server 3000
```
Luego abre en tu navegador: `http://localhost:3000`

---

## 📸 Reemplazo de Imágenes

Cuando desees actualizar las fotos de la web por las fotos reales enviadas por la dueña, sigue estos pasos:

1. Nombra tus fotos nuevas exactamente como los archivos base (ej. `hero.png`, `facial.jpg`, `massage.png`, `bodycare.jpg`, `hotstone.png`, `logo.png`).
2. Colócalas en la carpeta `images/`.
3. Ejecuta el optimizador en tu terminal:
   ```bash
   python optimizar_imagenes.py
   ```
El script convertirá automáticamente las imágenes a WebP, las comprimirá, reemplazará los archivos de la web y limpiará los archivos JPG/PNG para no duplicar espacio.
