# ToolRent - Sistema de Gestión de Herramientas

Sistema integral de gestión de préstamos de herramientas para construcción, desarrollado con React y Vite.

## 🚀 Características Principales

### 📊 Dashboard Inteligente
- Vista general con estadísticas en tiempo real
- Acciones rápidas para operaciones comunes
- Navegación organizada por categorías funcionales

### 🔧 Gestión de Herramientas
- **Inventario completo**: Lista todas las herramientas con estado y categorías
- **Registro de herramientas**: Formulario intuitivo para agregar nuevas herramientas
- **Administración**: Edición y eliminación de herramientas existentes
- **Historial de movimientos**: Kardex detallado de cada herramienta
- **Revisión de herramientas**: Gestión de herramientas en reparación
- **Ranking de popularidad**: Estadísticas de herramientas más prestadas

### 📋 Gestión de Préstamos
- **Nuevo préstamo**: Registro completo con validaciones
- **Devolución de herramientas**: Proceso simplificado de devolución
- **Préstamos activos**: Monitoreo en tiempo real
- **Control de atrasos**: Identificación automática de préstamos vencidos

### 👥 Gestión de Clientes
- **Registro de clientes**: Formulario con validación de RUT chileno
- **Control de deudas**: Gestión de multas y reposiciones
- **Clientes con atrasos**: Listado de clientes con historial problemático

### 📈 Reportes y Estadísticas
- **Ranking de herramientas**: Herramientas más solicitadas
- **Filtros por fecha**: Análisis temporal de datos
- **Métricas de negocio**: KPIs importantes para la toma de decisiones

## 🎨 Diseño y UX

### Esquema de Colores Institucional
- **Azul Principal**: `#163D73` - Color corporativo principal
- **Naranja Acento**: `#F26B21` - Color de acción y destacado
- **Paleta completa**: Sistema de colores coherente y profesional

### Componentes Modernos
- **Cards interactivas**: Efectos hover y transiciones suaves
- **Formularios mejorados**: Validación en tiempo real y UX optimizada
- **Tablas responsivas**: Diseño adaptativo para todos los dispositivos
- **Navegación intuitiva**: Agrupación lógica de funcionalidades

### Responsive Design
- **Mobile-first**: Optimizado para dispositivos móviles
- **Breakpoints**: Adaptación perfecta a tablets y desktop
- **Navegación colapsable**: Menú hamburguesa en dispositivos pequeños

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18**: Biblioteca de interfaz de usuario
- **Vite**: Herramienta de construcción rápida
- **React Router**: Navegación entre páginas
- **Bootstrap 5**: Framework CSS para diseño responsivo
- **Keycloak**: Autenticación y autorización

### Utilidades
- **RUT Utilities**: Validación de RUT chileno
- **Hooks personalizados**: Manejo de estado y API
- **Constantes centralizadas**: Configuración unificada
- **Helpers reutilizables**: Funciones de utilidad comunes

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── common/           # Componentes reutilizables
│   ├── Client/           # Gestión de clientes
│   ├── Debt/            # Gestión de deudas
│   ├── Loan/            # Gestión de préstamos
│   ├── Tool/            # Gestión de herramientas
│   └── Pages/           # Páginas principales
├── hooks/               # Hooks personalizados
├── services/            # Servicios de API
├── utils/               # Utilidades y constantes
└── assets/              # Recursos estáticos
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 16+ 
- npm o yarn
- Backend de ToolRent funcionando

### Instalación
```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev
```

### Variables de Entorno
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_KEYCLOAK_URL=http://localhost:8080/auth
VITE_KEYCLOAK_REALM=toolrent
VITE_KEYCLOAK_CLIENT_ID=toolrent-frontend
```

## 🎯 Funcionalidades por Rol

### Administrador
- Acceso completo a todas las funcionalidades
- Gestión de inventario
- Reportes y estadísticas
- Administración de usuarios

### Empleado
- Gestión de préstamos y devoluciones
- Registro de clientes
- Consulta de inventario
- Gestión básica de herramientas

## 🔧 Mejoras Implementadas

### Calidad de Código
- **Hooks personalizados**: `useApi`, `useList`, `useForm`
- **Manejo de errores**: Sistema centralizado de manejo de errores
- **Validaciones**: Validación de RUT chileno y formularios
- **Constantes**: Configuración centralizada y reutilizable

### Experiencia de Usuario
- **Loading states**: Indicadores de carga en todas las operaciones
- **Mensajes informativos**: Notificaciones de éxito y error
- **Validación en tiempo real**: Feedback inmediato al usuario
- **Navegación intuitiva**: Agrupación lógica de funcionalidades

### Rendimiento
- **Lazy loading**: Carga diferida de componentes
- **Debounce**: Optimización de búsquedas
- **Memoización**: Optimización de renders
- **Bundle splitting**: División optimizada del código

## 📱 Responsive Design

El sistema está completamente optimizado para:
- **Móviles**: 320px - 768px
- **Tablets**: 768px - 1024px  
- **Desktop**: 1024px+

## 🔐 Seguridad

- **Autenticación**: Integración con Keycloak
- **Autorización**: Control de acceso por roles
- **Validación**: Validación tanto en frontend como backend
- **Sanitización**: Limpieza de datos de entrada

## 🚀 Próximas Mejoras

- [ ] Notificaciones push en tiempo real
- [ ] Exportación de reportes a PDF/Excel
- [ ] Dashboard con gráficos interactivos
- [ ] Integración con sistema de pagos
- [ ] App móvil nativa
- [ ] Sistema de notificaciones por email/SMS

## 📞 Soporte

Para soporte técnico o consultas sobre el sistema, contactar al equipo de desarrollo.

---

**ToolRent** - Solucionando la gestión de herramientas para construcción 🏗️