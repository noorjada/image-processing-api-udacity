# Image Processing API

<<<<<<< HEAD
A Node.js/Express API for resizing images on-the-fly with automatic caching support.

## Features

- Image resizing with specified dimensions
- Automatic caching of processed images
- Parameter validation (filename, width, height)
- Comprehensive error handling

## Scripts

```bash
npm run build    # Build TypeScript to JavaScript
npm start        # Start production server
npm run dev      # Start development server with hot-reload
npm test         # Run tests with Jasmine
npm run lint     # Lint TypeScript code
npm run format   # Format code with Prettier
```

## Endpoints

### Health Check
```
GET /
```
Returns: `Image Processing API is running`

### Resize Image
```
GET /api/images?filename=<filename>&width=<width>&height=<height>
```

**Parameters**:
- `filename` (required): Image file name in `assets/full/` (without extension)
- `width` (required): Desired width in pixels
- `height` (required): Desired height in pixels

**Responses**:
- `200`: Resized image
- `400`: Missing or invalid parameters
- `404`: Image not found
- `500`: Processing error

**Examples**:
```bash
curl "http://localhost:3000/api/images?filename=fjord&width=200&height=150"
curl "http://localhost:3000/api/images?filename=noor&width=400&height=600"
```

## Installation

1. Install dependencies: `npm install`
2. Add JPG images to `assets/full/` directory
3. Build: `npm run build`
4. Start: `npm start` (runs on port 3000)

## Additional Features

- **Caching**: Resized images are cached in `assets/thumb/` with naming pattern `{filename}_{width}_{height}.jpg`
- **Testing**: Jasmine tests in `src/tests/` cover endpoints and image processing
- **Code Quality**: Includes ESLint and Prettier configuration
- **Development**: Hot-reload with `npm run dev` using Nodemon
=======
##  Project Description

This project is a Node.js + Express API built with TypeScript that dynamically resizes images using the Sharp library.

The API serves two main purposes:

1. Acts as a simple placeholder image service for frontend prototyping.
2. Dynamically resizes existing images and caches them to improve performance and reduce processing time.

The project demonstrates scalable architecture, TypeScript usage, unit testing, linting, formatting, and caching.



##  Technologies Used

- Node.js
- Express
- TypeScript
- Sharp
- Jasmine (Unit Testing)
- Supertest (Endpoint Testing)
- ESLint
- Prettier

>>>>>>> 9c24625cfbdebe105a5428e705d05cd098363761
