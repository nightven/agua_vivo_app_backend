## Project description

This repository contains the backend of the Agua Vivo application developed for [Agua Vivo App](https://serveribraimovua.github.io/agua_vivo_app/) (GitHub: [Frontend](https://github.com/ServerIbraimovUa/agua_vivo_app))

## Requirements for the environment

| **Node.js** | **Express.js** | **dotenv** |
| **cors** | **MongoDB** | **Mongoose** |
| **SendGrid** | **Axios** | **bcrypt** |
| **cloudinary** | **gravatar** | **nanoid** |
| **Joi** | **Jsonwebtoken** | **Morgan** |
| **query-string** | **Multer** | **swagger-ui-express** |

## Installation instructions

1. Clone the repository

````bash
git clone https://github.com/nightven/agua_vivo_app_backend.git

## Installation instructions

1. Clone the repository

```bash
git clone https://github.com/nightven/agua_vivo_app_backend.git
````

2. Set up dependencies

```bash
npm install
```

3. Add the .env file with the required variables.
   The required variables can be seen in the file EXAMPLE.ENV

````
4. Start the server
```bash
npm run dev
````

## Instructions for use

There are 4 main routers on our backend. To test the operation of each router, you can use [документацією Swagger](https://agua-vivo-app-backend.onrender.com/api-docs/).

### 1. Auth

The route responsible for the user authorization process. Its functionality includes:

- Registration
- Login to the system
- Update user information (current)
- Log out of the account
- Email confirmation
- Possibility to change the password if the user forgot it.
  ![Auth](./images/auth.png)

### 2. Google

A path used to authorize a user with a Google email. This route is not displayed in Swagger because its implementation is on the frontend, but it is available in the frontend of the application.

![Google](./images/google.png)

### 3. Users

The route used to access user information. Here you can:

- Change your avatar
- Edit personal data
- Receive information about the user
- Keep a record of the daily volume of water consumed (this applies to the Water Tracker frontend application).

  ![Users](./images/user.png)

### 4. Water

An appropriate route for all water-related operations. Its functions include:

- Adding
- Deleting
- Updating water information
- Information about daily and monthly water consumption.

  ![Water](./images/water.png)

# Developers

| [![Beiar Vitalii](./images/vitalii.jpg)](#)            | [![Karpova Sofiia](./images/sofiia.jpg)](#)   | [![Ibraimov Server](./images/server.jpg)](#) |
| ------------------------------------------------------ | --------------------------------------------- | -------------------------------------------- |
| **Beiar Vitalii** - Route Water, Swagger Documentation | **Karpova Sofiia** - Route Auth, User, Google | **Ibraimov Server** - Swagger Documentation  |

## Contribution

If you would like to contribute to this project, please see the file [CONTRIBUTING.md](CONTRIBUTING.md) for information. 😊

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details. 📄
