# CARSIL - Guia de Diseno UI

## Estilo: Linear / Notion — Minimalista y Profesional

---

> [!IMPORTANT]
> **Reglas obligatorias de diseno:**
> - No usar emojis en ninguna interfaz. Usar iconos de Bootstrap Icons en su lugar.
> - Tono 100% profesional. Sin lenguaje informal ni decoraciones innecesarias.
> - Usar la fuente Inter (Google Fonts) en toda la aplicacion.
> - Priorizar espacio en blanco, bordes finos, y colores neutros con acentos estrategicos.

---

## Paleta de Colores

| Token                | Valor       | Uso                                     |
|----------------------|-------------|------------------------------------------|
| `--primary`          | `#3B49DF`   | Botones, links activos, acentos          |
| `--primary-dark`     | `#2d38b0`   | Hover de botones, sidebar activo         |
| `--primary-light`    | `#eef0fd`   | Fondos sutiles, badges, hover de items   |
| `--bg-page`          | `#F7F7F8`   | Fondo general de la pagina               |
| `--bg-card`          | `#FFFFFF`   | Fondo de tarjetas y contenedores         |
| `--bg-sidebar`       | `#FFFFFF`   | Fondo del sidebar (estilo Notion)        |
| `--border`           | `#E5E5E5`   | Bordes de tarjetas, divisores            |
| `--border-light`     | `#F0F0F0`   | Bordes secundarios, hover sutil          |
| `--text-primary`     | `#1A1A2E`   | Titulos, texto principal                 |
| `--text-secondary`   | `#6B7280`   | Descripciones, labels, subtitulos        |
| `--text-muted`       | `#9CA3AF`   | Placeholders, texto terciario            |
| `--success`          | `#10B981`   | Indicadores positivos, activos           |
| `--success-light`    | `#ECFDF5`   | Fondo badge exito                        |
| `--warning`          | `#F59E0B`   | Alertas, en proceso                      |
| `--warning-light`    | `#FFFBEB`   | Fondo badge advertencia                  |
| `--danger`           | `#EF4444`   | Errores, eliminar, cerrar sesion         |
| `--danger-light`     | `#FEF2F2`   | Fondo badge peligro                      |
| `--purple`           | `#8B5CF6`   | Acento alternativo (proformas)           |
| `--purple-light`     | `#F5F3FF`   | Fondo badge proformas                    |

---

## Tipografia

- **Font principal**: `'Inter', sans-serif` (Google Fonts)
- **Pesos**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Tamanos**:
  - Heading principal: `1.5rem` (24px), weight 700
  - Subtitulo: `0.875rem` (14px), weight 500, color `--text-secondary`
  - Body: `0.875rem` (14px), weight 400
  - Small/Labels: `0.75rem` (12px), weight 500, uppercase, letter-spacing 0.3px
  - Stat numbers: `1.5rem` (24px), weight 700

---

## Sidebar (estilo Notion / Linear)

- **Ancho**: `260px`, fijo (no se oculta)
- **Fondo**: `#FFFFFF` con borde derecho `1px solid var(--border)`
- **Logo**: Imagen de empresa (`/img/Carsil.png`) centrada horizontalmente
- **Secciones**: Labels uppercase (`MENU`, `RECURSOS HUMANOS`, `ADMINISTRACION`)
- **Items del menu**:
  - Padding: `8px 12px`, border-radius: `6px`
  - Inactivo: color `--text-secondary`
  - Hover: fondo `--primary-light`, color `--primary`
  - Activo: fondo `--primary`, color `#FFFFFF`
  - Iconos: `18px`, mismos colores que el texto
- **Footer**: Separador fino + "Cerrar Sesion" en `--danger`
- **Responsive**: Oculto en mobile (<768px)

---

## Dashboard

### Stat Cards (Top Row)
- **4 columnas** en desktop, responsive
- Label (0.75rem), valor grande (1.5rem bold) con animacion de contador
- Badge de tendencia (up/down) con colores success/danger
- Icono a la esquina (blue, green, purple, amber)

### Graficos (Chart.js)
- **Actividad de Proformas**: Bar chart con datos REALES de la BD (ultimos 7 dias, agrupados por dia de la semana)
- **Distribucion por Modulo**: Bar chart con conteo REAL de: Clientes, Proformas, Facturas, Productos, Empleados
- Tooltip con fuente Inter, fondo oscuro, border-radius 8px
- Ejes: Y con stepSize auto, X sin grid

### Tabla de Proformas Recientes
- Datos REALES de las ultimas 10 proformas de la BD
- Columnas: Codigo, Fecha, Cliente, Estado, Total
- Badges de estado: Pendiente (amber), Aprobada/Vendida (green), Vencida/Anulada (red)
- Barra de busqueda funcional para filtrar filas
- Formato de moneda: `S/ X,XXX.XX`

### Notificaciones
- Campana en el navbar con badge de conteo de no leidas
- Dropdown con lista de notificaciones recientes
- Auto-generadas por middleware en cada operacion CRUD
- Polling cada 15 segundos para actualizacion en tiempo real
- Marcar individual o todas como leidas
- Iconos por tipo: crear (verde), actualizar (azul), eliminar (rojo)

---

## Componentes

### Botones
- Border-radius: `8px`
- Padding: `8px 16px`
- Font-weight: `500`
- **Primary**: Fondo `--primary`, color blanco, hover `--primary-dark`
- **Outline**: Borde `--border`, hover fondo `--primary-light`

### Stat Cards
- 4 columnas en desktop
- Muestran: label (0.75rem), valor grande (1.5rem bold), trend badge
- Iconos con fondo de color suave

---

## Archivos Centralizados

| Archivo | Proposito |
|---|---|
| `/publico/css/layout.css` | Variables CSS, sidebar, navbar, layout principal, responsive |
| `/publico/js/layout.js` | Toggle sidebar, active state de menu items |
| `/parciales/sidebar.ejs` | Sidebar compartido (incluido via `include`) |

---

## Reglas de Diseno

1. **Sin emojis** — Usar iconos de Bootstrap Icons exclusivamente
2. **Tono profesional** — Sin lenguaje informal ni decoraciones innecesarias
3. **Espacio blanco generoso** — No saturar la interfaz
4. **Colores neutros con acentos** — Usar `--primary` solo estrategicamente
5. **Sin gradientes pesados** — Fondos solidos y bordes finos
6. **Bordes en lugar de sombras** — Sombras solo en hover, muy sutiles
7. **Micro-animaciones suaves** — Transiciones de 150ms-200ms, ease
8. **Iconografia consistente** — Bootstrap Icons, tamano uniforme
9. **Jerarquia visual clara** — Usar tamano, peso, y color para distinguir niveles
10. **CSS centralizado** — Usar `/publico/css/layout.css` para sidebar y layout, no duplicar en cada vista
11. **Datos reales** — Graficos y tablas deben mostrar datos de la base de datos, nunca hardcoded
12. **Notificaciones automaticas** — Todo CRUD genera notificacion automaticamente via middleware
