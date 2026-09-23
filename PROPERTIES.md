# Guía de Propiedades — Arrendamientos Gran Vivienda

Cómo agregar, editar y eliminar propiedades del catálogo.

## Estructura

Las propiedades se definen como archivos JSON en `src/data/properties/`.

Cada archivo genera automáticamente una página de detalle en `/propiedades/{slug}`.

## Campos de una propiedad

```json
{
  "id": "apartamento-1",
  "slug": "apartamento-moderno-la-america",
  "title": "Apartamento moderno en La América",
  "operation": "rent",
  "propertyType": "apartment",
  "price": 1800000,
  "currency": "COP",
  "location": {
    "city": "Medellín",
    "neighborhood": "La América"
  },
  "description": "Descripción de la propiedad...",
  "bedrooms": 3,
  "bathrooms": 2,
  "area": 85,
  "images": [
    { "src": "/images/properties/apartamento-1/sala.jpg", "alt": "Descripción de la imagen" }
  ],
  "featured": true
}
```

### Referencia de campos

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `id` | string | Sí | Identificador único (usar nombre del archivo sin extensión) |
| `slug` | string | Sí | URL-friendly (minúsculas, guiones, sin espacios ni caracteres especiales) |
| `title` | string | Sí | Título que aparece en el catálogo y página de detalle |
| `operation` | string | Sí | `"rent"` o `"sale"` (actualmente solo se usan arriendos) |
| `propertyType` | string | Sí | `"apartment"`, `"house"`, `"studio"` o `"penthouse"` |
| `price` | number | Sí | Precio en pesos colombianos (COP) sin decimales |
| `currency` | string | Sí | Siempre `"COP"` |
| `location.city` | string | Sí | Ciudad (ej: `"Medellín"`) |
| `location.neighborhood` | string | Sí | Barrio (ej: `"La América"`) |
| `description` | string | Sí | Descripción completa de la propiedad |
| `bedrooms` | number | Sí | Número de habitaciones |
| `bathrooms` | number | Sí | Número de baños |
| `area` | number | Sí | Área en metros cuadrados (m²) |
| `images` | array | Sí | Lista de imágenes (puede ser un array vacío `[]`) |
| `images[].src` | string | Sí | Ruta de la imagen (debe empezar con `/`) |
| `images[].alt` | string | Sí | Texto alternativo de la imagen |
| `featured` | boolean | Sí | `true` para aparecer en la página de inicio |

## Agregar una propiedad

1. Crear un archivo JSON en `src/data/properties/` con un nombre descriptivo (ej: `local-1.json`).

2. Copiar la plantilla de abajo y llenar todos los campos.

3. Si tiene imágenes, colocarlas en `public/images/properties/{id}/` y referenciarlas con rutas absolutas.

4. Ejecutar `npm run build` para verificar que todo compila correctamente.

### Plantilla

```json
{
  "id": "nueva-propiedad",
  "slug": "nueva-propiedad-la-america",
  "title": "Título de la propiedad",
  "operation": "rent",
  "propertyType": "apartment",
  "price": 1500000,
  "currency": "COP",
  "location": {
    "city": "Medellín",
    "neighborhood": "La América"
  },
  "description": "Descripción detallada de la propiedad...",
  "bedrooms": 2,
  "bathrooms": 1,
  "area": 60,
  "images": [],
  "featured": false
}
```

## Editar una propiedad

Abrir el archivo JSON correspondiente en `src/data/properties/` y modificar los campos necesarios.

**Importante:** Si cambia el `slug`, se generará una nueva URL y la anterior dejará de funcionar.

## Eliminar una propiedad

Eliminar el archivo JSON de `src/data/properties/`.

Si la propiedad tenía imágenes en `public/images/properties/{id}/`, también eliminar esa carpeta.

## Imágenes

- Formatos soportados: JPG, PNG, WebP
- Ruta base: `public/images/properties/{id}/`
- Referencia en JSON: `/images/properties/{id}/archivo.jpg` (sin `public/`)
- Se recomienda un mínimo de 1 imagen por propiedad
- El `alt` de cada imagen debe ser descriptivo (accesibilidad)

## Propiedades destacadas

Las propiedades con `"featured": true` aparecen en la página de inicio (`/`). Se recomienda tener entre 3 y 6 propiedades destacadas.

## Tipo de propiedad (`propertyType`)

| Valor | Etiqueta mostrada |
|---|---|
| `apartment` | Apartamento |
| `house` | Casa |
| `studio` | Estudio |
| `penthouse` | Penthouse |

## Notas técnicas

- Los archivos se cargan en tiempo de compilación con `import.meta.glob` (eager)
- No es necesario reiniciar el servidor de desarrollo para ver cambios en los datos
- El `slug` define la URL final: `/propiedades/{slug}`
- El `id` debe ser único y coincidir con el nombre del archivo JSON (sin extensión)
