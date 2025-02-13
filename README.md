# Lolo API

Lolo API is a TypeScript-based RESTful API built with Node.js and Express. It provides essential backend functionality for managing data and services efficiently.

## Features
- Built with **Node.js**, **Express**, and **TypeScript**
- Modular and scalable architecture
- SQLite integration (configured in `src/config/database.ts`)
- Environment-based configuration
- Hot-reloading with Nodemon for development

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/) 

## Installation
Clone the repository and install dependencies:
```sh
git clone https://github.com/yourusername/lolo-api.git
cd lolo-api
npm install  # or yarn install
```

## Configuration
Create a `.env` file in the project root and define environment variables as required. Example:
```
PORT=3000
```

## Running the API
To start the development server:
```sh
npm run dev  # Uses Nodemon for hot-reloading
```

To run in production mode:
```sh
npm run build
npm start
```

## Contributing
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch-name`.
3. Commit your changes: `git commit -m "Add new feature"`.
4. Push to the branch: `git push origin feature-branch-name`.
5. Open a Pull Request.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact
For any issues or feature requests, please open an issue on the repository.

