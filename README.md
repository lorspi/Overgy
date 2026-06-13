<img src="./public/images/logo-full.png" alt="Overgy Logo" width="400"/>

# 🎮 Plantilla Web para Servidores de Hytale / Minecraft

Una plantilla moderna, responsive y lista para producción pensada para servidores de **Hytale** y **Minecraft**. Diseñada para que cualquier comunidad pueda tener una web profesional sin empezar desde cero.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)

---

## 📋 Descripción

https://github-production-user-asset-6210df.s3.amazonaws.com/3300442/607533590-19793c00-3b8e-4441-82ad-1ed73714d3df.webm?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20260613%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260613T201159Z&X-Amz-Expires=300&X-Amz-Signature=e84c559b458e690558ede74987602ad405dc39f0ca902de5fdc9798ddea3abc0&X-Amz-SignedHeaders=host&response-content-type=video%2Fwebm

Plantilla web completa para servidores de Hytale o Minecraft. Incluye todo lo necesario para presentar tu servidor de forma profesional: página de inicio con hero animado, sección de modalidades de juego, sistema de noticias, wiki/ayuda con contenido en Markdown, integración con tienda (Tebex) y mucho más.

Aunque fue creada originalmente para un servidor de Hytale, su estructura es completamente adaptable a cualquier servidor de Minecraft u otro juego multijugador. Solo necesitas cambiar los textos, imágenes y colores para hacerla tuya.

---

## ✨ Características

- **Hero animado** con fondo de video, logo flotante y contador de jugadores en vivo
- **Sistema de noticias** generado automáticamente desde archivos Markdown
- **Wiki / Ayuda** con categorías y contenido gestionado en Markdown
- **Modalidades de juego** con tarjetas interactivas y enlaces a guías
- **Tienda integrada** con Tebex.js (checkout embebido)
- **Página de reglas** con contenido Markdown
- **Diseño responsive** optimizado para móvil, tablet y escritorio
- **Animaciones fluidas** con CSS moderno y efectos de hover/scroll
- **Tema personalizable** con variables CSS (colores, fuentes, bordes)
- **SEO friendly** con meta tags dinámicos y títulos por página
- **Rendimiento** excelente gracias a Vite, code splitting y lazy loading
- **Contenido fácil de editar** — todo el contenido está en archivos Markdown, sin base de datos

---

## 🌐 Demo

👉 **[overgy.web.app](https://overgy.web.app)**

---

## 🤝 Trabajemos juntos

Esta plantilla es **open source** y puedes usarla libremente para tu propio servidor. Tienes dos opciones:

### Hazlo tú mismo
Clona el repositorio, personaliza los colores, textos e imágenes, y despliega donde prefieras. El proyecto es sencillo de configurar y el contenido se gestiona con archivos Markdown.

```bash
git clone https://github.com/lorspi/Overgy.git
cd Overgy
npm install
```

Crea un archivo `.env` en la raíz del proyecto con tu Public Token de Tebex:

```env
VITE_TEBEX_TOKEN=tu_public_token_aqui
```

Puedes obtener tu token en [https://creator.tebex.io/developers/api-keys](https://creator.tebex.io/developers/api-keys).

Luego inicia el servidor de desarrollo:

```bash
npm run dev
```

### Contrata mi ayuda
Si prefieres que yo me encargue de la implementación, personalización o de adaptar la plantilla a las necesidades específicas de tu servidor, puedes contactarme:

- **Discord:** lorspi
- **Ko-fi:** [ko-fi.com/lorspi](https://ko-fi.com/lorspi)

Ofrezco desde ajustes rápidos hasta implementaciones completas con diseño a medida.

---

## 🛠️ Stack tecnológico

| Tecnología         | Uso                                           |
| --------------------| -----------------------------------------------|
| **React 19**       | UI y componentes                              |
| **TypeScript 5**   | Tipado estático                               |
| **Tailwind CSS 4** | Estilos utility-first                         |
| **Vite 7**         | Bundler y dev server                          |
| **React Router 7** | Enrutamiento SPA                              |
| **Radix UI**       | Componentes accesibles (Dialog, Slot)         |
| **Lucide React**   | Iconografía                                   |
| **Tebex.js**       | Integración de tienda                         |
| **Markdown**       | Gestión de contenido (noticias, wiki, reglas) |

---

## ☕ Apóyame

Si esta plantilla te resulta útil, considera invitarme un café:

<a href="https://ko-fi.com/lorspi" target="_blank">
  <img src="https://ko-fi.com/img/githubbutton_sm.svg" alt="Ko-fi" />
</a>

---

## ⚠️ Disclaimer

Las imágenes y videos incluidos en esta plantilla son de ejemplo. Algunas fueron tomadas de internet y no me pertenecen; otras fueron generadas con inteligencia artificial. Si utilizas esta plantilla, reemplázalas con recursos propios o con licencia adecuada.

---

## 📄 Licencia

Overgy está licenciado bajo la Licencia Apache 2.0. Ver el archivo [LICENSE](./LICENSE) para más detalles.
