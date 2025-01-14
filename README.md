# Generador de Combinaciones para Loterías

Este proyecto es una aplicación web que permite generar combinaciones únicas de números de 4 dígitos para distintas loterías. También incluye una funcionalidad especial para las loterías **ASTRO SOL** y **ASTRO LUNA**, que asignan un signo zodiacal aleatorio junto con la combinación numérica.

## 🚀 Características

- Generación de combinaciones únicas de 4 dígitos para diferentes loterías.
- Asignación aleatoria de signos zodiacales para las loterías **ASTRO SOL** y **ASTRO LUNA**.
- Guardado de combinaciones generadas utilizando `localStorage` para persistencia de datos.
- Visualización de combinaciones guardadas.
- Limpieza de todas las combinaciones guardadas.

## 🛠️ Tecnologías utilizadas

- **HTML**: Para la estructura básica de la interfaz.
- **CSS**: Para el diseño y estilo de la página.
- **JavaScript**: Para la lógica de generación y manejo de datos en el navegador.

## 📋 Requisitos

- Navegador web compatible con JavaScript.
- No requiere instalación de software adicional.

## 📖 Instrucciones de uso

1. **Seleccionar una lotería**:
   - En el menú desplegable, selecciona una lotería para la que deseas generar una combinación.

2. **Generar combinación**:
   - Haz clic en el botón `Generar Número`.
   - Si ya existe una combinación generada para la lotería seleccionada, se mostrará esa combinación.

3. **Visualizar combinaciones guardadas**:
   - Todas las combinaciones generadas se almacenan en el `localStorage` del navegador y se muestran en la sección de combinaciones guardadas.

4. **Limpiar combinaciones guardadas**:
   - Haz clic en el botón `Limpiar` para borrar todas las combinaciones almacenadas y reiniciar la lista.

## 📂 Estructura del código

### Archivos principales
- **index.html**: Contiene la estructura de la página.
- **styles.css**: Define el estilo visual de la interfaz.
- **script.js**: Implementa la lógica de generación de combinaciones y gestión de datos.

### Componentes clave
1. **Generación de números únicos**:
   - La función `generateCombination()` genera una combinación de 4 dígitos únicos.
2. **Asignación de signos zodiacales**:
   - Se selecciona un signo al azar para las loterías **ASTRO SOL** y **ASTRO LUNA**.
3. **Persistencia de datos**:
   - Las combinaciones se almacenan en `localStorage` para conservarlas entre sesiones.
4. **Interacción con el DOM**:
   - El contenido dinámico se actualiza directamente en la página mediante manipulaciones del DOM.

## 📝 Notas importantes

- La aplicación no permite generar más de una combinación para la misma lotería.
- Si intentas generar una combinación para una lotería ya registrada, se mostrará la combinación existente.
- El proyecto está diseñado para ser ejecutado en el navegador y no requiere configuración adicional.




---

¡Disfruta usando el generador de combinaciones para loterías! 🎲
