# 🛠️ Project Manager App

Complete web application for **project and task management** developed with **React** (frontend) and **Laravel** (backend). Allows managing projects, assigning tasks, managing users, and tracking progress collaboratively and efficiently.

> 🌐 **Available languages**: [Español](README_ESP.md) | [English](README_EN.md)

---

## 📸 Demo / Screenshots

*[Add screenshots or demo GIF here]*

---

## ⚙️ Technologies Used

### Backend
- **Laravel 11.31** - Modern PHP framework
- **PHP 8.2+** - Base language
- **SQLite/MySQL** - Database
- **Laravel Sanctum** - API authentication
- **Inertia.js** - Full-stack connection without API

### Frontend
- **React 18.2** - UI library
- **Inertia.js + React** - SPA without traditional APIs
- **Vite** - Modern and fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Headless UI** - Accessible components
- **Heroicons** - Modern iconography

### Development Tools
- **Pest** - Testing framework
- **Laravel Breeze** - Authentication scaffolding
- **Ziggy** - Laravel routes in JavaScript
- **Laravel Pint** - Code styling

---

## 🏗️ Application Architecture

### Data Model
The application is based on three main entities:

```
👤 Users
├── Authentication and authorization
├── Customizable profiles
└── Roles and permissions

📁 Projects
├── Basic information (name, description, dates)
├── States: pending, in_progress, completed
├── Auto-generated unique codes (PRJ-001, PRJ-002...)
├── Attached images
└── Relationships: createdBy, updatedBy

✅ Tasks
├── Linked to specific projects
├── User assignment
├── Priorities: low, medium, high
├── States: pending, in_progress, completed
├── Auto-generated unique codes (TSK-001, TSK-002...)
├── Due dates
└── Relationships: project, assignedUser, createdBy, updatedBy
```

### System Features

#### 🎯 **Unique Code System**
- Uses `HasCode` trait to generate automatic codes
- Projects: `PRJ-001`, `PRJ-002`, etc.
- Tasks: `TSK-001`, `TSK-002`, etc.
- Users: `USR-001`, `USR-002`, etc.

#### 🔐 **Authentication and Security**
- Complete registration/login system with Laravel Breeze
- Authentication via Laravel Sanctum
- Route protection with middleware
- Email verification

#### 📊 **Smart Dashboard**
- Real-time statistics
- Personal and global metrics
- Task distribution by state
- Progress visualization

### Frontend Structure

```
resources/js/
├── Components/          # Reusable components
│   ├── DataTables/     # Interactive data tables
│   └── UI/             # Interface elements
├── Contexts/           # React contexts
├── Hooks/              # Custom hooks
├── Layouts/            # Application layouts
├── Pages/              # Main pages
│   ├── Auth/           # Authentication
│   ├── Dashboard.jsx   # Main panel
│   ├── Projects/       # Project management
│   ├── Tasks/          # Task management
│   └── Users/          # User management
└── constants.js        # Global constants
```

### Backend Structure

```
app/
├── Http/
│   ├── Controllers/    # REST controllers
│   ├── Requests/       # Form validation
│   └── Resources/      # API transformers
├── Models/             # Eloquent models
│   ├── Project.php     # Project model
│   ├── Task.php        # Task model
│   └── User.php        # User model
└── Traits/
    └── HasCode.php     # Unique code generation
```

---

## 🚀 Main Features

### Project Management
- ✅ Complete CRUD for projects
- ✅ Custom states (pending, in progress, completed)
- ✅ Auto-generated unique codes
- ✅ Due dates
- ✅ Image upload
- ✅ Advanced filtering and search
- ✅ Dynamic sorting

### Task Management
- ✅ Tasks linked to projects
- ✅ Assignment to specific users
- ✅ Priority system (low, medium, high)
- ✅ Tracking states
- ✅ Personalized "My Tasks" view
- ✅ Due dates

### Dashboard and Reports
- ✅ Real-time metrics
- ✅ Personal vs global statistics
- ✅ Visual task distribution
- ✅ Performance indicators

### User Interface
- ✅ Responsive design with Tailwind CSS
- ✅ Accessible components with Headless UI
- ✅ Interactive data tables
- ✅ Notification system (toasts)
- ✅ Intuitive navigation
- ✅ Modern and professional theme

### Technical Features
- ✅ SPA (Single Page Application) with Inertia.js
- ✅ Secure authentication with Sanctum
- ✅ Frontend and backend validation
- ✅ Automatic pagination
- ✅ Real-time search and filtering
- ✅ Query optimization with Eloquent
- ✅ Automated testing with Pest

---

## 🛠️ Installation and Setup

### Prerequisites
- PHP 8.2 or higher
- Composer
- Node.js 16+ and npm
- Database (SQLite included)

### Installation Steps

1. **Clone the repository**
```bash
git clone [your-repository]
cd ProjectManagerApp
```

2. **Install PHP dependencies**
```bash
composer install
```

3. **Install JavaScript dependencies**
```bash
npm install
```

4. **Configure environment**
```bash
cp .env.example .env
php artisan key:generate
```

5. **Setup database**
```bash
php artisan migrate --seed
```

6. **Compile assets**
```bash
npm run build
# or for development:
npm run dev
```

7. **Start server**
```bash
php artisan serve
```

---

## 🎯 Application Usage

### Control Panel
The dashboard provides an overview with:
- Personal and global task statistics
- Distribution by states
- Quick access to main functionalities

### Project Management
- Create, edit, and delete projects
- Assign states and due dates
- Attach descriptive images
- Filter by state, name, or date

### Task Management
- Create tasks within specific projects
- Assign to system users
- Set priorities and deadlines
- Personalized "My Tasks" view

### User Administration
- Complete system user management
- Role and permission assignment
- Editable profiles

---

## 🔒 Protected Code

> The complete source code of this application **is not publicly available** to prevent unauthorized use.  
> If you want to know more technical details, collaborate, or implement similar functionalities, you can contact me through:
> - 📧 Email: [drawthedrewpf@gmail.com]
> - 💼 LinkedIn: [https://www.linkedin.com/in/andr%C3%A9s-peidro-fern%C3%A1ndez/]
> - 🐙 GitHub: [https://github.com/DrawDrewpf]

---

## 📈 Future Roadmap

- [ ] Documented public REST API
- [ ] Real-time notifications (WebSockets)
- [ ] Task commenting system
- [ ] File attachments in projects/tasks
- [ ] Exportable reports (PDF/Excel)
- [ ] Calendar integration
- [ ] Mobile application (React Native)
- [ ] Offline mode with synchronization

---

## 🧪 Testing

The project includes a complete test suite:

```bash
# Run all tests
php artisan test

# Or using Pest directly
./vendor/bin/pest
```

---

## 📄 License

This project is under a **proprietary license**. All rights reserved.

---

## 👨‍💻 Developer

Developed with ❤️ by Andrés Peidro Fernández

*Interested in this type of projects? Contact me for collaborations!*
