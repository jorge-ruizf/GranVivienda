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
  "description": [
    "Dos habitaciones",
    "Un baño encabinado",
    "Cocina integral con red de gas",
    "Segundo piso"
  ],
  "features": [
    { "key": "bedrooms", "value": 2 },
    { "key": "bathrooms", "value": 1 },
    { "key": "area", "value": 85 },
    { "key": "balconies", "value": 1 },
    { "key": "parkingSpaces", "value": 2 }
  ],
  "media": [
    { "src": "/images/properties/apartamento-1/sala.jpg", "alt": "Sala principal" },
    {
      "type": "video",
      "src": "/videos/properties/apartamento-1/recorrido.mp4",
      "alt": "Recorrido en video",
      "poster": "/images/properties/apartamento-1/recorrido-poster.jpg",
      "sources": [
        { "src": "/videos/properties/apartamento-1/recorrido.webm", "type": "video/webm" }
      ]
    }
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
| `description` | array | Sí | Una o varias líneas de texto; cada elemento se renderiza como un párrafo aparte |
| `description[]` | string | Sí | Texto de una línea, sin HTML (no usar `<br>` ni etiquetas) |
| `features` | array | Sí | Características de la propiedad (puede ser un array vacío `[]`) |
| `features[].key` | string | Sí | Clave de la característica (ver tabla de claves soportadas) |
| `features[].value` | number | Sí | Valor numérico (`0` se oculta en la interfaz) |
| `media` | array | Sí | Lista de imágenes y videos (puede ser un array vacío `[]`) |
| `media[].src` | string | Sí | Ruta del archivo (debe empezar con `/`) |
| `media[].alt` | string | Sí | Texto alternativo / descripción del medio |
| `media[].type` | string | No | `"video"` para videos; las imágenes pueden omitirlo |
| `media[].poster` | string | No | (Videos) imagen de portada para la miniatura y la galería |
| `media[].sources` | array | No | (Videos) fuentes adicionales `[{"src", "type"}]` |
| `featured` | boolean | Sí | `true` para aparecer en la página de inicio |

## Descripción (`description`)

- Es un **array de líneas**: cada elemento se renderiza como un párrafo separado.
- No se admite HTML dentro de los textos (sin `<br>`, sin etiquetas).
- La primera línea completa también se usa como meta descripción de la página.

Ejemplo correcto:

```json
"description": [
  "Dos habitaciones",
  "Un baño encabinado",
  "Cocina integral con red de gas"
]
```

## Características (`features`)

Las características fijas (`bedrooms`, `bathrooms`, `area`) fueron reemplazadas por
una lista dinámica. La interfaz **solo muestra las claves presentes en el array**:

- Si una característica no está en el array, no aparece.
- Si su `value` es `0`, se oculta.
- Claves desconocidas se ignoran sin romper la página.

El mapeo centralizado (etiquetas en español, unidades, orden e íconos SVG) vive en
`src/data/features.ts`. Para agregar una característica nueva, basta con agregar una
entrada al mapa `FEATURES` (o reutilizar una clave existente de la tabla).

### Claves soportadas

| Key | Etiqueta | Tipo | Se muestra en la tarjeta |
|---|---|---|---|
| `bedrooms` | Habitaciones | conteo | Sí |
| `bathrooms` | Baños | conteo | Sí |
| `area` | Área (m²) | número | Sí |
| `parkingSpaces` | Parqueaderos | conteo | – |
| `balconies` | Balcones | conteo | – |
| `floors` | Pisos | conteo | – |
| `strata` | Estrato | número | – |
| `yearBuilt` | Año de construcción | número | – |
| `terrace` | Terraza | bandera | – |
| `garden` | Jardín | bandera | – |
| `pool` | Piscina | bandera | – |
| `gym` | Gimnasio | bandera | – |
| `elevator` | Ascensor | bandera | – |
| `security` | Seguridad 24 horas | bandera | – |
| `reception` | Portería | bandera | – |
| `gas` | Gas natural | bandera | – |
| `internet` | Fibra óptica | bandera | – |
| `furnished` | Amoblado | bandera | – |
| `petsAllowed` | Admite mascotas | bandera | – |
| `laundry` | Zona de lavandería | bandera | – |
| `storage` | Depósito | bandera | – |
| `bbq` | Zona de BBQ | bandera | – |
| `jacuzzi` | Jacuzzi | bandera | – |
| `workSpace` | Espacio de trabajo | bandera | – |
| `adminIncluded` | Administración incluida | bandera | – |

Tipos:

- **conteo**: se muestra como valor numérico (`2 Habs.`), con singular/plural.
- **número**: valor con unidad si aplica (`77 m²`, `1998`).
- **bandera**: solo la etiqueta cuando el valor es mayor que cero (`Sí` en el detalle).

La tarjeta de propiedad muestra hasta 3 características marcadas con `showOnCard`
(por defecto: `bedrooms`, `bathrooms` y `area`).

## Medios (`media`)

Imágenes y videos conviven en el mismo array y en la misma galería.

### Imágenes

- Formatos soportados: JPG, PNG, WebP
- Ruta base: `public/images/properties/{id}/`
- Referencia en JSON: `/images/properties/{id}/archivo.jpg` (sin `public/`)
- Se recomienda un mínimo de 1 imagen por propiedad
- El `alt` de cada imagen debe ser descriptivo (accesibilidad)

```json
{ "src": "/images/properties/apartamento-1/sala.jpg", "alt": "Sala principal" }
```

### Videos

- Formatos soportados: **MP4 / H.264**, **WebM** y **Ogg** (según navegador)
- Se reproducen con el `<video>` nativo del navegador (sin librerías)
- Ruta sugerida: `public/videos/properties/{id}/`
- El array acepta MP4 como `src` principal y formatos extra en `sources`
- `poster` (recomendado): imagen de portada usada en miniaturas y en el fondo de la galería
- Los videos se reproducen **silenciados** con controles nativos; el usuario puede activar el sonido desde los controles

```json
{
  "type": "video",
  "src": "/videos/properties/apartamento-1/recorrido.mp4",
  "alt": "Recorrido en video por la propiedad",
  "poster": "/images/properties/apartamento-1/recorrido-poster.jpg",
  "sources": [
    { "src": "/videos/properties/apartamento-1/recorrido.webm", "type": "video/webm" },
    { "src": "/videos/properties/apartamento-1/recorrido.ogv", "type": "video/ogg" }
  ]
}
```

Miniaturas de video sin `poster`: la galería muestra el primer frame del video.

### Galería (comportamiento)

- Las **imágenes** avanzan automáticamente cada **2.5 segundos**.
- Un **video** activo se reproduce completo (silenciado, con controles nativos) y la
  galería avanza sola cuando termina (`ended`). No hay temporizador para videos.
- Si el usuario pausa o rebobina el video con los controles, la galería espera.
- Las flechas y miniaturas cambian de medio en cualquier momento y reinician el video.
- Al pasar el cursor (o tocar en móvil) se pausa la navegación automática; al salir se reanuda.

## Agregar una propiedad

1. Crear un archivo JSON en `src/data/properties/` con un nombre descriptivo (ej: `local-1.json`).

2. Copiar la plantilla de abajo y llenar todos los campos.

3. Si tiene imágenes o videos, colocarlos en `public/images/properties/{id}/` (o
   `public/videos/properties/{id}/`) y referenciarlos con rutas absolutas.

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
  "description": [
    "Descripción detallada de la propiedad..."
  ],
  "features": [
    { "key": "bedrooms", "value": 2 },
    { "key": "bathrooms", "value": 1 },
    { "key": "area", "value": 60 }
  ],
  "media": [],
  "featured": false
}
```

## Editar una propiedad

Abrir el archivo JSON correspondiente en `src/data/properties/` y modificar los campos necesarios.

**Importante:** Si cambia el `slug`, se generará una nueva URL y la anterior dejará de funcionar.

## Eliminar una propiedad

Eliminar el archivo JSON de `src/data/properties/`.

Si la propiedad tenía imágenes o videos en `public/images/properties/{id}/` o
`public/videos/properties/{id}/`, también eliminar esas carpetas.

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
- El mapeo de claves, etiquetas e íconos de `features` está en `src/data/features.ts`
