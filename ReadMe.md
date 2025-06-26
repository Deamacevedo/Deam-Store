# 🛍️ DEAM Store - E-commerce Elegante y Moderno

Una tienda virtual sofisticada construida con **Vanilla JavaScript**, **Tailwind CSS** y diseño **dark theme premium**. DEAM Store ofrece una experiencia de compra única que combina elegancia, funcionalidad y performance optimizado.

## 🌐 Demo en Vivo

🚀 **Prueba la aplicación aquí:** [https://deamacevedo.github.io/Deam-Store/](https://deamacevedo.github.io/Deam-Store/)

## 🖼️ Captura del Diseño

![Vista previa del diseño DEAM Store](./assets/foto1.png)

## 🎨 Prototipo y Diseño

🔗 **Ver prototipo interactivo en Figma:** [Diseño DEAM Store](https://www.figma.com/design/GM3o2SOdRF6BKACvKavzYy/Deam-Store?node-id=1-2&t=vAtZsppv5j1eY0G5-1)

El prototipo incluye:
- Mockups completos de homepage
- Flujo de carrito y checkout
- Diseño responsive para mobile y desktop
- Sistema de colores y componentes

---

## ✨ Características Principales

### 🎯 **Experiencia de Usuario**
- **Tema oscuro elegante** - Diseño sofisticado que destaca los productos
- **Interfaz responsiva** - Adaptada perfectamente a móviles, tablets y desktop
- **Carrito lateral deslizante** - Experiencia fluida sin interrumpir la navegación
- **Checkout modal avanzado** - Proceso de compra streamlined en una sola vista
- **Microinteracciones** - Animaciones suaves y feedback visual inmediato

### 🛒 **Funcionalidades del E-commerce**
- **Catálogo de productos dinámico** - Carga desde API externa (FakeStore API)
- **Sistema de filtros avanzado** - Por categoría, búsqueda y ordenamiento
- **Gestión completa del carrito** - Agregar, editar cantidades, eliminar productos
- **Cálculo automático de totales** - Subtotal, impuestos, envío y total final
- **Persistencia del carrito** - Mantiene productos entre sesiones con localStorage
- **Validación de formularios** - Checkout con validación en tiempo real

### 🔧 **Características Técnicas**
- **Vanilla JavaScript** - Sin frameworks, máximo performance y control
- **Tailwind CSS** - Diseño utility-first para desarrollo ágil
- **Arquitectura modular** - Código organizado en módulos especializados
- **API REST integration** - Consumo eficiente de servicios externos
- **Optimización de performance** - Lazy loading, debouncing, y optimizaciones UX
- **Accesibilidad** - Navegación por teclado y estándares WCAG

---

## 🏗️ Arquitectura del Proyecto

### 📁 **Estructura de Archivos**
```
deam-store/
├── index.html              # Página principal
├── styles.css              # Estilos globales con Tailwind
├── js/                     # Módulos JavaScript organizados
│   ├── config.js           # Variables globales y configuración
│   ├── api.js              # Manejo de API y datos
│   ├── ui.js               # Interfaz de usuario y renderizado
│   ├── cart.js             # Funcionalidades del carrito
│   ├── checkout.js         # Sistema de checkout y pagos
│   ├── hero.js             # Hero background dinámico
│   └── events.js           # Event listeners e inicialización
├── assets/                 # Recursos estáticos
│   └── foto1.png          # Captura del diseño
├── docs/                   # Documentación del proyecto
│   ├── analisis.md         # Análisis técnico detallado
│   └── DESIGN_PROCESS.md   # Proceso de diseño y decisiones
└── README.md               # Documentación principal
```

### 🧩 **Módulos JavaScript**

#### **config.js** - Configuración Global
- Variables globales y elementos DOM
- Configuración de la aplicación
- Constantes para API y comportamiento

#### **api.js** - Manejo de Datos
- Fetch de productos desde API externa
- Gestión de localStorage para persistencia
- Funciones de filtrado y búsqueda

#### **ui.js** - Interfaz de Usuario
- Renderizado dinámico de productos
- Estados de carga y mensajes de error
- Sistema de notificaciones

#### **cart.js** - Carrito de Compras
- Agregar/eliminar productos del carrito
- Actualización de cantidades
- Cálculos de totales y UI del carrito

#### **checkout.js** - Proceso de Compra
- Modal de checkout con formulario completo
- Validación de datos del cliente
- Simulación de procesamiento de pagos

#### **hero.js** - Hero Background
- Grid dinámico de imágenes de productos
- Animaciones del hero section
- Responsive background adaptation

#### **events.js** - Eventos y Inicialización
- Event listeners centralizados
- Inicialización de la aplicación
- Manejo global de errores

---

## 🚀 Instalación y Uso

### **Requisitos Previos**
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet (para cargar productos de la API)

### **Instalación Local**

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/deamacevedo/Deam-Store.git
   cd Deam-Store
   ```

2. **Ejecutar localmente**
   ```bash
   # Opción 1: Servidor HTTP simple con Python
   python -m http.server 8000
   
   # Opción 2: Servidor HTTP con Node.js
   npx http-server .
   
   # Opción 3: Live Server en VS Code
   # Instala la extensión Live Server y haz clic derecho > "Open with Live Server"
   ```

3. **Abrir en el navegador**
   ```
   http://localhost:8000
   ```

### **Desarrollo**

Para trabajar en el proyecto:

1. **Estructura recomendada para nuevas funcionalidades:**
   - Agregar lógica en el módulo correspondiente
   - Actualizar `config.js` si necesitas nuevas variables
   - Registrar event listeners en `events.js`

2. **Personalizar estilos:**
   - Editar `styles.css` para modificar el tema
   - Utilizar clases de Tailwind para nuevos componentes

3. **Agregar nuevas páginas:**
   - Seguir la estructura modular existente
   - Mantener la consistencia de diseño

---

## 🎨 Sistema de Diseño

### **Paleta de Colores**
```css
/* Tema Oscuro Elegante */
--dark-bg: #1a1a1a           /* Fondo principal */
--dark-card: #2d2d2d         /* Cards y elementos elevados */
--dark-surface: #242424      /* Superficies intermedias */
--dark-text: #ffffff         /* Texto principal */
--dark-text-secondary: #aaaaaa /* Texto secundario */
--accent: #333333            /* Botones y acentos */
--accent-hover: #555555      /* Hover states */
```

### **Tipografía**
- **Font principal:** Inter (sistema de Google Fonts)
- **Jerarquía clara:** H1, H2, body text con tamaños diferenciados
- **Legibilidad optimizada:** Contraste alto para accesibilidad

### **Componentes**
- **Glass Cards:** Efecto glassmorphism para productos
- **Gradient Buttons:** Botones con gradientes sutiles
- **Modal Overlays:** Modales con backdrop blur
- **Responsive Grid:** Sistema de grillas adaptativo

---

## 🔌 API y Datos

### **API Externa Utilizada**
- **FakeStore API:** `https://fakestoreapi.com/products`
- **Datos obtenidos:** Productos con imágenes, precios, categorías y ratings
- **Manejo de errores:** Estados de loading, error y datos vacíos

### **Estructura de Datos**
```javascript
// Ejemplo de producto de la API
{
  id: 1,
  title: "Producto Example",
  price: 29.99,
  description: "Descripción del producto...",
  category: "electronics",
  image: "https://example.com/image.jpg",
  rating: {
    rate: 4.5,
    count: 120
  }
}
```

### **Persistencia Local**
- **localStorage:** Carrito de compras persiste entre sesiones
- **Clave de almacenamiento:** `deamStoreCart`
- **Manejo de errores:** Fallback graceful si localStorage no está disponible

---

## 📱 Responsive Design

### **Breakpoints Utilizados**
```css
/* Mobile First Approach */
sm: 640px   /* Tablet pequeña */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Desktop grande */
```

### **Adaptaciones por Dispositivo**

#### **Mobile (< 768px)**
- Grid de productos: 2 columnas
- Carrito: Overlay completo
- Navegación: Menú hamburguesa
- Hero: Texto optimizado para móvil

#### **Tablet (768px - 1024px)**
- Grid de productos: 3 columnas
- Carrito: Sidebar reducido
- Navegación: Completa visible

#### **Desktop (1024px+)**
- Grid de productos: 4 columnas
- Carrito: Sidebar completo
- Todas las funcionalidades visibles

---

## ⚡ Performance y Optimización

### **Técnicas Implementadas**
- **Lazy Loading:** Imágenes cargan solo cuando son visibles
- **Debouncing:** Búsqueda optimizada con delay
- **Event Delegation:** Manejo eficiente de eventos dinámicos
- **CSS Optimizations:** Transiciones optimizadas para GPU
- **API Caching:** Productos se cargan una sola vez

### **Métricas de Performance**
- **Tiempo de carga inicial:** < 2 segundos
- **Interactividad:** Inmediata después de cargar
- **Responsive:** Adaptación fluida en todos los dispositivos
- **Accesibilidad:** Navegación por teclado completa

---

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- **HTML5** - Estructura semántica
- **CSS3** - Estilos avanzados con Flexbox y Grid
- **Tailwind CSS** - Framework utility-first
- **Vanilla JavaScript** - Lógica de aplicación sin frameworks

### **Herramientas de Desarrollo**
- **VS Code** - Editor principal
- **Git** - Control de versiones
- **GitHub Pages** - Hosting y deployment
- **Figma** - Diseño y prototipado

### **APIs y Servicios**
- **FakeStore API** - Datos de productos
- **Google Fonts** - Tipografía (Inter)
- **GitHub Pages** - Hosting gratuito

---

## 🧪 Testing y Debugging

### **Pruebas Realizadas**
- **Funcionalidad:** Todos los flujos de usuario probados
- **Responsive:** Testing en múltiples dispositivos
- **Cross-browser:** Chrome, Firefox, Safari, Edge
- **Performance:** Lighthouse scores optimizados
- **Accesibilidad:** Navegación por teclado y lectores de pantalla

### **Debugging Tools**
- **Console logging:** Sistema de logs detallado
- **Error boundaries:** Manejo graceful de errores
- **Network monitoring:** Optimización de requests

---

## 🚀 Deployment

### **GitHub Pages**
El proyecto está deployado automáticamente en GitHub Pages:
- **URL:** [https://deamacevedo.github.io/Deam-Store/](https://deamacevedo.github.io/Deam-Store/)
- **Auto-deployment:** Cada push a main actualiza la versión live
- **Custom domain:** Configurable en settings del repo

### **Deploy Local**
Para deploy en otros servicios:
1. Build los archivos estáticos
2. Subir la carpeta completa al hosting
3. Configurar el dominio si es necesario

---

## 🤝 Contribuir

### **Cómo Contribuir**
1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/NuevaFuncionalidad`)
3. **Commit** tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/NuevaFuncionalidad`)
5. **Abre** un Pull Request

### **Guidelines de Código**
- Mantener la arquitectura modular existente
- Seguir las convenciones de naming establecidas
- Agregar comentarios para funciones complejas
- Probar funcionalidad en múltiples dispositivos

---

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT** - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

```
MIT License

Copyright (c) 2025 DEAM Store

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 👨‍💻 Autor

**Deam Acevedo**
- **GitHub:** [@deamacevedo](https://github.com/deamacevedo)
- **LinkedIn:** [deam-acevedo](https://linkedin.com/in/deam-acevedo)
- **Portfolio:** [deamacevedo.dev](https://deamacevedo.dev)
- **Email:** deam@example.com

---

## 🙏 Agradecimientos

- **FakeStore API** - Por proporcionar datos de productos gratuitos
- **Tailwind CSS** - Por el excelente framework de utilidades
- **GitHub Pages** - Por el hosting gratuito y confiable
- **Unsplash/Pexels** - Por las imágenes de alta calidad
- **Comunidad dev** - Por la inspiración y feedback continuo

---

## 🔮 Roadmap Futuro

### **Versión 2.0 - Características Planeadas**
- [ ] **Autenticación de usuarios** - Login/register sistema
- [ ] **Wishlist** - Lista de productos favoritos
- [ ] **Comparador** - Comparar productos lado a lado
- [ ] **Reviews** - Sistema de reseñas de usuarios
- [ ] **Modo claro** - Toggle entre tema oscuro/claro
- [ ] **PWA** - Progressive Web App capabilities
- [ ] **Pagos reales** - Integración con Stripe/PayPal
- [ ] **Multi-idioma** - Soporte para español/inglés

### **Versión 3.0 - Características Avanzadas**
- [ ] **Backend propio** - API personalizada
- [ ] **Panel admin** - Gestión de productos
- [ ] **Analytics** - Dashboard de ventas
- [ ] **SEO avanzado** - Optimización para buscadores
- [ ] **A/B Testing** - Experimentación con UX
- [ ] **IA Recommendations** - Productos sugeridos

---

*⭐ Si te gusta este proyecto, no olvides darle una estrella en GitHub*

**DEAM Store** - Elegancia en cada compra 🛍️✨