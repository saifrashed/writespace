# Backend README file

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Config](#config)
  - [Middleware](#middleware)
  - [Models](#models)
  - [Services](#services)
- [Postman](#postman)

## Getting Started

### Prerequisites

- [npm](https://www.npmjs.com/get-npm): Node package manager
- [Node.js](https://nodejs.org/en/): JavaScript runtime environment
- [Express.js](https://expressjs.com/): Node.js web application framework
- [MongoDB](https://docs.mongodb.com/manual/installation/)

## Installation

Outline the steps to install and set up the project locally. Include any commands or scripts needed to install dependencies, set up a database, or perform initial setup tasks.
_Below are the steps of how you can start installing and setting up the app._
1. Clone the repo (only required once)
   ```sh
   git clone [URL]
   ```
2. Install npm packages (only required once)
   ```sh
   npm install
   ```

3. Add the .env file in the root directory of the backend folder (contains secret information)

4. Run the start script (do this everytime you want to run the BE)
   ```sh
   npm run dev
   ```

## Usage

Run the start script (do this everytime you want to run the BE)
   ```sh
   npm run dev
   ```

### Config

The config directory contains configuration files for the backend application. This is where you can set up environment variables, database connections, and other application-specific configurations. Make sure to update the configuration files according to your specific needs.

### Middleware

The middleware directory contains custom middleware functions that can be used to handle various tasks in the request-response cycle. Middleware functions can be used for tasks such as authentication, error handling, logging, and more.

### Models

The models directory contains the MongoDB models used in the application. These models define the structure and behavior of the data stored in the MongoDB database. You can create models for each of your MongoDB collections and define various methods and statics to interact with the data. Make sure to import and use the appropriate models in your services.

### Services

The services directory contains the service files that handle the business logic and interaction with the models. Services are responsible for processing the requests, performing database operations, and returning the appropriate responses. You can create separate service files for different entities or functionalities in the application. These services are used by the express router to handle the incoming requests and produce the desired results.

We chose to only include services to keep the backend as simple as possible so that less experienced backend developers could also easily understand and contribute to the backend application.

### Postman
Postman is recommended to use for testing requests.
An example collection of Postman requests can be found in the root folder of the backend-pse-e directory. 
Import this file in Postman to get example requests.