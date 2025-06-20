# 🛠️ Project Manager App

Aplicación web completa para la **gestión de proyectos y tareas** desarrollada con **React** (frontend) y **Laravel** (backend). Permite administrar proyectos, asignar tareas, gestionar usuarios y realizar seguimiento del progreso de manera colaborativa y eficiente.

> 🌐 **Idiomas disponibles**: [Español](README_ESP.md) | [English](README_EN.md)

---

## 📸 Demo / Capturas de Pantalla

*[Agregar capturas de pantalla o GIF demostrativo aquí]*

---

## ⚙️ Tecnologías utilizadas

### Backend
- **Laravel 11.31** - Framework PHP moderno
- **PHP 8.2+** - Lenguaje base
- **SQLite/MySQL** - Base de datos
- **Laravel Sanctum** - Autenticación API
- **Inertia.js** - Conexión full-stack sin API

### Frontend
- **React 18.2** - Biblioteca de UI
- **Inertia.js + React** - SPA sin APIs tradicionales
- **Vite** - Build tool moderno y rápido
- **Tailwind CSS** - Framework CSS utility-first
- **Headless UI** - Componentes accesibles
- **Heroicons** - Iconografía moderna

### Herramientas de desarrollo
- **Pest** - Testing framework
- **Laravel Breeze** - Scaffolding de autenticación
- **Ziggy** - Rutas de Laravel en JavaScript
- **Laravel Pint** - Code styling

---

## 🏗️ Arquitectura de la aplicación

### Modelo de datos
La aplicación se basa en tres entidades principales:

```
👤 Users (Usuarios)
├── Autenticación y autorización
├── Perfiles personalizables
└── Roles y permisos

📁 Projects (Proyectos)
├── Información básica (nombre, descripción, fechas)
├── Estados: pending, in_progress, completed
├── Códigos únicos autogenerados (PRJ-001, PRJ-002...)
├── Imágenes adjuntas
└── Relaciones: createdBy, updatedBy

✅ Tasks (Tareas)
├── Vinculadas a proyectos específicos
├── Asignación a usuarios
├── Prioridades: low, medium, high
├── Estados: pending, in_progress, completed
├── Códigos únicos autogenerados (TSK-001, TSK-002...)
├── Fechas de vencimiento
└── Relaciones: project, assignedUser, createdBy, updatedBy
```

### Características del sistema

#### 🎯 **Sistema de códigos únicos**
- Utiliza el trait `HasCode` para generar códigos automáticos
- Proyectos: `PRJ-001`, `PRJ-002`, etc.
- Tareas: `TSK-001`, `TSK-002`, etc.
- Usuarios: `USR-001`, `USR-002`, etc.

#### 🔐 **Autenticación y seguridad**
- Sistema completo de registro/login con Laravel Breeze
- Autenticación via Laravel Sanctum
- Protección de rutas con middleware
- Verificación de email

#### 📊 **Dashboard inteligente**
- Estadísticas en tiempo real
- Métricas personales y globales
- Distribución de tareas por estado
- Visualización de progreso

### Estructura del frontend

```
resources/js/
├── Components/          # Componentes reutilizables
│   ├── DataTables/     # Tablas de datos interactivas
│   └── UI/             # Elementos de interfaz
├── Contexts/           # Contextos de React
├── Hooks/              # Custom hooks
├── Layouts/            # Layouts de aplicación
├── Pages/              # Páginas principales
│   ├── Auth/           # Autenticación
│   ├── Dashboard.jsx   # Panel principal
│   ├── Projects/       # Gestión de proyectos
│   ├── Tasks/          # Gestión de tareas
│   └── Users/          # Gestión de usuarios
└── constants.js        # Constantes globales
```

### Estructura del backend

```
app/
├── Http/
│   ├── Controllers/    # Controladores REST
│   ├── Requests/       # Validación de formularios
│   └── Resources/      # Transformadores de API
├── Models/             # Modelos Eloquent
│   ├── Project.php     # Modelo de proyectos
│   ├── Task.php        # Modelo de tareas
│   └── User.php        # Modelo de usuarios
└── Traits/
    └── HasCode.php     # Generación de códigos únicos
```

---

## 🚀 Características principales

### Gestión de Proyectos
- ✅ CRUD completo de proyectos
- ✅ Estados personalizados (pendiente, en progreso, completado)
- ✅ Códigos únicos autogenerados
- ✅ Fechas de vencimiento
- ✅ Carga de imágenes
- ✅ Filtrado y búsqueda avanzada
- ✅ Ordenamiento dinámico

### Gestión de Tareas
- ✅ Tareas vinculadas a proyectos
- ✅ Asignación a usuarios específicos
- ✅ Sistema de prioridades (baja, media, alta)
- ✅ Estados de seguimiento
- ✅ Vista "Mis Tareas" personalizada
- ✅ Fechas de vencimiento

### Dashboard y Reportes
- ✅ Métricas en tiempo real
- ✅ Estadísticas personales vs globales
- ✅ Distribución visual de tareas
- ✅ Indicadores de rendimiento

### Interfaz de Usuario
- ✅ Diseño responsive con Tailwind CSS
- ✅ Componentes accesibles con Headless UI
- ✅ Tablas de datos interactivas
- ✅ Sistema de notificaciones (toasts)
- ✅ Navegación intuitiva
- ✅ Tema moderno y profesional

### Características técnicas
- ✅ SPA (Single Page Application) con Inertia.js
- ✅ Autenticación segura con Sanctum
- ✅ Validación tanto frontend como backend
- ✅ Paginación automática
- ✅ Búsqueda y filtrado en tiempo real
- ✅ Optimización de consultas con Eloquent
- ✅ Testing automatizado con Pest

---

## 🛠️ Instalación y configuración

### Prerrequisitos
- PHP 8.2 o superior
- Composer
- Node.js 16+ y npm
- Base de datos (SQLite incluida)

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone [tu-repositorio]
cd ProjectManagerApp
```

2. **Instalar dependencias PHP**
```bash
composer install
```

3. **Instalar dependencias JavaScript**
```bash
npm install
```

4. **Configurar entorno**
```bash
cp .env.example .env
php artisan key:generate
```

5. **Configurar base de datos**
```bash
php artisan migrate --seed
```

6. **Compilar assets**
```bash
npm run build
# o para desarrollo:
npm run dev
```

7. **Iniciar servidor**
```bash
php artisan serve
```

---

## 🎯 Uso de la aplicación

### Panel de Control
El dashboard proporciona una vista general con:
- Estadísticas de tareas personales y globales
- Distribución por estados
- Accesos rápidos a funcionalidades principales

### Gestión de Proyectos
- Crear, editar y eliminar proyectos
- Asignar estados y fechas de vencimiento
- Adjuntar imágenes descriptivas
- Filtrar por estado, nombre o fecha

### Gestión de Tareas
- Crear tareas dentro de proyectos específicos
- Asignar a usuarios del sistema
- Establecer prioridades y fechas límite
- Vista personalizada "Mis Tareas"

### Administración de Usuarios
- Gestión completa de usuarios del sistema
- Asignación de roles y permisos
- Perfiles editables

---

## 🔒 Código protegido

> El código fuente completo de esta aplicación **no está disponible públicamente** para evitar su uso no autorizado.  
> Si deseas conocer más detalles técnicos, colaborar o implementar funcionalidades similares, puedes contactarme a través de:
> - 📧 Email: [drawthedrewpf@gmail.com]
> - 💼 LinkedIn: [https://www.linkedin.com/in/andr%C3%A9s-peidro-fern%C3%A1ndez/]
> - 🐙 GitHub: [https://github.com/DrawDrewpf]

---

## 📈 Roadmap futuro

- [ ] API REST pública documentada
- [ ] Notificaciones en tiempo real (WebSockets)
- [ ] Sistema de comentarios en tareas
- [ ] Adjuntos de archivos en proyectos/tareas
- [ ] Reportes exportables (PDF/Excel)
- [ ] Integración con calendarios
- [ ] Aplicación móvil (React Native)
- [ ] Modo offline con sincronización

---

## 🧪 Testing

El proyecto incluye una suite completa de pruebas:

```bash
# Ejecutar todas las pruebas
php artisan test

# O usando Pest directamente
./vendor/bin/pest
```

---

## 📄 Licencia

Este proyecto está bajo una **licencia propietaria**. Todos los derechos reservados.

---

## 👨‍💻 Desarrollador

Desarrollado con ❤️ por Andrés Peidro Fernández
