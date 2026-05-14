# Peluqueria_Angular — Sistema de Gestión para Salón de Belleza

Aplicación web full-stack (MEAN Stack) para la gestión de citas e inventario de una peluquería. El frontend está desplegado en GitHub Pages y el backend en Render conectado a MongoDB Atlas.

**Demo:** https://devmgcode.github.io/Peluqueria_Angular/  
**API:** https://peluqueria-angular.onrender.com

---

## Tecnologías

| Capa | Tecnología |
|------|-----------|
| Frontend | Angular 14, Tailwind CSS, Bootstrap 5, Angular Material |
| Backend | Node.js, Express.js |
| Base de datos | MongoDB Atlas (cloud) |
| Deploy frontend | GitHub Pages (`angular-cli-ghpages`) |
| Deploy backend | Render (Web Service, free tier) |

---

## Funcionalidades

- **Inicio** — Landing page con galería y presentación del salón
- **Agendar citas** — Formulario para registrar, editar y eliminar citas (nombre, fecha, hora, motivo)
- **Inventario de tintes** — CRUD completo de productos (color, número, categoría)
- **Secciones informativas** — Cortes, Peinados, Cuidados, Maquillaje
- **Página 404** — Ruta no encontrada con redirección

---

## Estructura del proyecto

```
Peluqueria_Angular/
├── back_api/               # API REST con Express.js
│   ├── config/
│   │   └── db.js           # Conexión a MongoDB Atlas
│   ├── models/             # Schemas Mongoose (Cita, Tinte)
│   ├── routes/             # Rutas /api/cita y /api/tinte
│   └── index.js            # Servidor Express
└── sistemapeluqueria/      # App Angular 14
    └── src/
        ├── app/
        │   ├── components/ # Todos los componentes de la app
        │   └── services/   # CitaService, TinteService
        └── environments/
            ├── environment.ts       # URL: localhost:4000
            └── environment.prod.ts  # URL: Render
```

---

## Ejecutar localmente

### Backend
```bash
cd back_api
npm install
# Crear archivo config.env con:
# MONGO_DB=mongodb+srv://...
node index.js
# Servidor en http://localhost:4000
```

### Frontend
```bash
cd sistemapeluqueria
npm install
ng serve
# App en http://localhost:4200
```

---

## Endpoints de la API

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/cita` | Listar citas |
| POST | `/api/cita` | Crear cita |
| PUT | `/api/cita/:id` | Actualizar cita |
| DELETE | `/api/cita/:id` | Eliminar cita |
| GET | `/api/tinte` | Listar tintes |
| POST | `/api/tinte` | Crear tinte |
| PUT | `/api/tinte/:id` | Actualizar tinte |
| DELETE | `/api/tinte/:id` | Eliminar tinte |

---

## Deploy

### Frontend → GitHub Pages
```bash
cd sistemapeluqueria
npm run deploy
```

### Backend → Render
Configurado con auto-deploy desde la rama `main`. Variable de entorno requerida: `MONGO_DB`.

---

**Autora:** DevMGcode | Melissa García
