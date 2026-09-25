<div align="center">

<img src="https://raw.githubusercontent.com/Nephrite-theme/web/main/public/logo.svg" alt="Logo de Nephrite" width="72" height="72">

# Nephrite para Firefox

[English](README.md) · **Español**

Un tema sereno, inspirado en el jade, para [Firefox](https://www.mozilla.org/firefox/), en tres sabores.

[![Licencia: MIT](https://img.shields.io/badge/licencia-MIT-3db87a)](LICENSE.es.md)
[![Paleta](https://img.shields.io/badge/paleta-Nephrite-1f6b45)](https://github.com/Nephrite-theme/palette)

</div>

## Sabores

| Sabor | Colores | Para |
| --- | --- | --- |
| **Forest** | <img src="https://raw.githubusercontent.com/Nephrite-theme/palette/main/assets/forest.svg" alt="Muestras de Forest" width="220"> | Oscuro y profundo, para la noche |
| **Jade** | <img src="https://raw.githubusercontent.com/Nephrite-theme/palette/main/assets/jade.svg" alt="Muestras de Jade" width="220"> | Oscuro con más verde, para jornadas largas |
| **Mint** | <img src="https://raw.githubusercontent.com/Nephrite-theme/palette/main/assets/mint.svg" alt="Muestras de Mint" width="220"> | Claro y ligero, para el día |

> [!NOTE]
> Los temas vienen en camino a [addons.mozilla.org](https://addons.mozilla.org). Mientras tanto, instálalos a mano.

## Instalación

### Desde addons.mozilla.org

Muy pronto. Instalar otro sabor reemplaza el actual.

### A mano

1. Haz clic en **Code > Download ZIP** y descomprímelo. Cada sabor está en su propia carpeta dentro de `themes/`, por ejemplo `themes/Nephrite Forest`.
2. Abre `about:debugging#/runtime/this-firefox`.
3. Haz clic en **Cargar complemento temporal** y elige el `manifest.json` del sabor.

Los complementos temporales se quitan al reiniciar Firefox. Para volver al aspecto original, abre `about:addons` > **Temas** y activa **Tema del sistema**.

## Colores

Cada color sale de la [paleta Nephrite](https://github.com/Nephrite-theme/palette), asignado a Firefox según su función:

| Parte de Firefox | Color de la paleta |
| --- | --- |
| Barra de pestañas (marco) | `mantle`, `crust` si la ventana está inactiva |
| Pestaña seleccionada, barra de herramientas, nueva pestaña | `base` |
| Barra de direcciones y campos de búsqueda | `surface0`, con borde `jade` al enfocar |
| Menús, desplegables y panel lateral | `mantle`, `surface1` para la fila resaltada |
| Texto principal | `text` |
| Pestañas inactivas e íconos de la barra | `subtext` |
| Línea de la pestaña activa, indicador de carga, íconos de aviso | `jade` |

Los menús, las páginas `about:` y el contenido web también siguen el esquema claro u oscuro del sabor.

## Desarrollo

Los manifiestos de `themes/` se generan, así que no los edites a mano. Para aplicar cambios de la paleta:

```sh
node scripts/sync-palette.mjs   # descarga el palette.json más reciente
node scripts/build.mjs          # regenera los tres manifiestos
```

Para publicar, sube `VERSION` en `scripts/build.mjs`, regenera y comprime el **contenido** de cada carpeta de sabor, para que `manifest.json` quede en la raíz del ZIP:

```powershell
Compress-Archive -Path "themes/Nephrite Forest/*" -DestinationPath nephrite-forest.zip
```

Después súbelo en [addons.mozilla.org/developers](https://addons.mozilla.org/developers/). Cada sabor tiene un ID fijo (`nephrite-<sabor>@getnephrite.dev`), así las actualizaciones van a la misma ficha. Requiere Node 18 o superior, sin dependencias.

## Contribuir

¿Un color que choca o poco contraste? [Abre un issue](https://github.com/Nephrite-theme/firefox/issues/new/choose) con una captura. Para saber cómo se crean y revisan los ports de Nephrite, lee la [guía para contribuir](https://github.com/Nephrite-theme/.github/blob/main/CONTRIBUTING.es.md).

## Agradecimientos

Creado y mantenido por [@ingfranciscastillo](https://github.com/ingfranciscastillo). Aquí sumaremos a quienes contribuyan a medida que crezca la comunidad.

## Más Nephrite

Nephrite también está disponible para Chrome y llega a VS Code y más. Mira todas las apps en [getnephrite.dev/es/ports](https://getnephrite.dev/es/ports).
