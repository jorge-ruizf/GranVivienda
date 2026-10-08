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
      "type": "youtube",
      "url": "https://www.youtube.com/watch?v=AbCdEfGhIjK",
      "alt": "Recorrido en video",
      "orientation": "landscape"
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
| `media` | array | Sí | Lista de imágenes y videos de YouTube (puede ser un array vacío `[]`) |
| `media[].src` | string | Sí* | (Imágenes) ruta del archivo (debe empezar con `/`) |
| `media[].alt` | string | Sí | Texto alternativo / descripción del medio |
| `media[].type` | string | No | `"youtube"` para videos de YouTube; las imágenes pueden omitirlo |
| `media[].url` | string | Sí* | (YouTube) enlace del video: `watch?v=`, `youtu.be/`, `shorts/`, `embed/`, `live/` o ID de 11 caracteres. `""` muestra un placeholder "próximamente" |
| `media[].orientation` | string | No | (YouTube) `"portrait"` o `"landscape"`; si se omite se infiere (`/shorts/` → vertical) |
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

Imágenes locales y videos de YouTube conviven en el mismo array y en la misma galería.

### Imágenes

- Formatos soportados: JPG, PNG, WebP
- Ruta base: `public/images/properties/{id}/`
- Referencia en JSON: `/images/properties/{id}/archivo.jpg` (sin `public/`)
- Se recomienda un mínimo de 1 imagen por propiedad
- El `alt` de cada imagen debe ser descriptivo (accesibilidad)

```json
{ "src": "/images/properties/apartamento-1/sala.jpg", "alt": "Sala principal" }
```

### Videos de YouTube

- **No se guardan videos locales**: el array solo acepta enlaces de YouTube
- Formatos de enlace aceptados en `url`:
  - `https://www.youtube.com/watch?v=VIDEO_ID`
  - `https://youtu.be/VIDEO_ID`
  - `https://www.youtube.com/shorts/VIDEO_ID` (verticales / Shorts)
  - `https://www.youtube.com/embed/VIDEO_ID`
  - `https://www.youtube.com/live/VIDEO_ID`
  - Un ID suelto de 11 caracteres (`VIDEO_ID`)
- Se reproducen con el **IFrame Player API oficial de YouTube** (sin librerías de terceros);
  el script solo se carga en páginas cuya galería tiene videos de YouTube
- Reproducción **silenciada automática** al activar el video; el usuario activa el sonido
  desde los controles nativos de YouTube (controles y pantalla completa disponibles)
- Miniatura tomada de `https://img.youtube.com/vi/{id}/hqdefault.jpg`
- `url: ""` (o enlace inválido): se muestra un placeholder **"Video de YouTube próximamente"**
  y la galería lo trata como una imagen (avanza cada 2.5 s)
- `orientation`: `"portrait"` (9:16) o `"landscape"` (16:9). Si se omite, se infiere
  del enlace (`/shorts/` → vertical). Los Shorts verticales se centran con fondo difuminado

```json
{
  "type": "youtube",
  "url": "https://www.youtube.com/shorts/AbCdEfGhIjK",
  "alt": "Recorrido en video por la propiedad",
  "orientation": "portrait"
}
```

Placeholder mientras no hay video:

```json
{ "type": "youtube", "url": "", "alt": "Recorrido en video de la propiedad" }
```

### Galería (comportamiento)

- Las **imágenes** avanzan automáticamente cada **2.5 segundos**.
- Un **video de YouTube** activo se reproduce solo (silenciado, con controles nativos) y la
  galería avanza sola cuando termina (`ENDED`). No hay temporizador para videos.
- Si el usuario pausa o navega dentro del video con los controles, la galería espera.
- Las flechas y miniaturas cambian de medio en cualquier momento; el video anterior se
  detiene y reinicia al inicio.
- Al pasar el cursor (ratón) se pausa la navegación automática y el video activo; al salir
  se reanudan, salvo que el usuario haya pausado el video él mismo.
- En móvil, tocar solo suspende el temporizador de imágenes (5 s); nunca toca el reproductor
  para no pisar sus controles.
- Un placeholder o video con error se comporta como imagen (avanza cada 2.5 s).

## Agregar una propiedad

1. Crear un archivo JSON en `src/data/properties/` con un nombre descriptivo (ej: `local-1.json`).

2. Copiar la plantilla de abajo y llenar todos los campos.

3. Si tiene imágenes, colocarlas en `public/images/properties/{id}/` y referenciarlas
   con rutas absolutas. Los videos van como enlace de YouTube en `media` (no se guardan
   archivos de video locales).

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

Si la propiedad tenía imágenes en `public/images/properties/{id}/`, también eliminar esa
carpeta.

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
