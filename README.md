# **📚 Book Searcher - Documentación del Proyecto**

## **Descripción General**

Book Searcher es una aplicación web que permite a los usuarios buscar libros utilizando la API de Google Books. La aplicación muestra información detallada de los libros, incluyendo título, autor, descripción e imagen de portada. Además, proporciona enlaces para comprar los libros cuando están disponibles.
<img width="1911" height="848" alt="Book Searcher Screenshot" src="https://github.com/user-attachments/assets/0e21bdec-252e-4862-b02c-3be90a813d00" />

## **Estructura del Proyecto**

```
/Book searcher/
  /frontend/ - Aplicación React con Vite
    /src/
      /assets/
      App.jsx - Componente principal
      App.css - Estilos
      main.jsx - Punto de entrada
    index.html
    package.json
    
  /backend/ - Servidor Express (desarrollo local)
    /src/
      /controllers/
      /routes/
      /services/
      server.js - Servidor Express
    package.json
    
  /api/ - Serverless Functions (para Vercel)
    books.js - Endpoint serverless
```

## **Tecnologías Utilizadas**

- **Frontend**: React, Vite, Axios
- **Backend**:
    - Desarrollo local: Node.js, Express
    - Producción: Vercel Serverless Functions
- **Estilos**: CSS con animaciones personalizadas
- **API Externa**: Google Books API

## **Características Principales**

- Búsqueda de libros por título, autor o palabras clave
- Visualización de resultados en tarjetas interactivas
- Animaciones y efectos visuales (animación del cursor, libro flotante)
- Diseño responsivo para todos los dispositivos
- Enlaces directos para comprar libros cuando están disponibles

## **Funcionamiento**

### Flujo de la aplicación:

1. El usuario ingresa un término de búsqueda en el campo de texto.
2. Al hacer clic en el botón de búsqueda o presionar Enter, se envía una solicitud al backend.
3. El backend consulta la API de Google Books y devuelve los resultados.
4. Los resultados se muestran en tarjetas interactivas con información de cada libro.
5. El usuario puede expandir títulos y descripciones largas, y hacer clic en la imagen para comprar el libro si está disponible.

## **Desarrollo Local**

### Requisitos previos:

- Node.js (versión 14 o superior)
- npm o yarn

### Pasos para ejecutar el proyecto localmente:

1. **Clonar el repositorio**

```bash
git clone https://github.com/LeTrigo/Book-Searcher
cd Book-searcher
```

2. **Configurar el backend (Express)**

```bash
cd backend
npm install
# Crear archivo .env con el siguiente contenido:
# PORT=3000
# GOOGLE_BOOKS_API_URL=https://www.googleapis.com/books/v1/volumes
npm start
```

3. **Configurar el frontend (React)**

```bash
cd ../frontend
npm install
# Crear archivo .env con el siguiente contenido:
# VITE_API_URL=http://localhost:3000/books
npm run dev
```

4. **Acceder a la aplicación**

- Abrir el navegador en `http://localhost:5173`

## **Despliegue en Vercel**

### ¡IMPORTANTE!

Para el despliegue en Vercel, **no** se utiliza la lógica completa de Express del backend. En su lugar, se usa una **Serverless Function** en la carpeta `api` para servir los endpoints.

### Pasos para desplegar:

1. **Preparar el proyecto para producción**
    - Asegúrate de que exista la carpeta `api` con el archivo `books.js` en la raíz del proyecto.
    - Ajusta la variable de entorno del frontend: `VITE_API_URL=/api/books`
2. **Subir el código a GitHub**
3. **Desplegar en Vercel**
    - Conecta tu repositorio de GitHub a Vercel
    - Selecciona el directorio raíz del proyecto
    - Configura las variables de entorno en el dashboard de Vercel:
        - `GOOGLE_BOOKS_API_URL=https://www.googleapis.com/books/v1/volumes`
    - Despliega la aplicación
4. **Verificar el despliegue**
    - Vercel generará una URL para acceder a tu aplicación
    - Tanto el frontend como el endpoint serverless se desplegarán juntos

## **Características Responsivas**

- La aplicación se adapta a diferentes tamaños de pantalla
- En dispositivos móviles:
    - El libro flotante se reduce y se reposiciona
    - Las tarjetas ocupan todo el ancho de la pantalla
    - Las animaciones del cursor se desactivan para mejor rendimiento

## **Aspectos Técnicos**

### Variables de Entorno

- **Frontend (Vite)**
    - `VITE_API_URL`: URL del endpoint de la API
- **Backend (Express)**
    - `PORT`: Puerto del servidor Express
    - `GOOGLE_BOOKS_API_URL`: URL de la API de Google Books
- **Vercel**
    - `GOOGLE_BOOKS_API_URL`: URL de la API de Google Books

### Arquitectura

- **Desarrollo local**: Arquitectura cliente-servidor tradicional con Express
- **Producción**: Arquitectura serverless con Vercel Functions

## **Autor**

Lautaro Trigo

---

Este proyecto utiliza React, Vite y Vercel para crear una aplicación moderna y eficiente para buscar libros.
