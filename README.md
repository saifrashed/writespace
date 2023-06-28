# Writespace (PSE)

## Description

A brief description of the project.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Backend Architecture](#backend-architecture)
- [App Architecture](#app-architecture)
- [Database Diagram](#database-diagram)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Installation

Instructions on how to install the project and its dependencies. Include any prerequisites or system requirements if applicable.

## Usage

Provide examples and instructions on how to use the project. Explain the main features and functionality.


### Documentation


- [Backend](./docs/Frontend.md)
- [Frontend](./docs/Backend.md)
- [CICD](./docs/CICD.md)
- [CANVAS API](./docs/canvas.md)

## Backend Architecture

Explain the architecture and components of the project's backend. Provide an overview of the server infrastructure, APIs, and any other relevant information.

## App Architecture

Explain the architecture and components of the project's app or frontend. Describe the framework, libraries, and technologies used, along with their roles in the app.

## Database Diagram

Include a diagram showcasing the database structure and relationships used in the project. You can either provide an image or describe the entities and their connections in text.

## Configuration

Explain any configuration options or settings that can be customized. Provide instructions on how to modify the configuration.

## Continuous Integration/Continuous Deployment (CI/CD)

The project employs GitHub Actions for continuous integration. Each time a pull request is made to either the backend or the frontend, the corresponding workflow is triggered. When pushed/pulled to main both are triggered

The backend workflow initiates the process by checking out the code and installing all required Node.js packages with the use of npm install. Subsequently, it performs a lint check on the entire code base using ESLint to identify and rectify any style-related issues.

If this process succeeds, the workflow proceeds to execute all tests using the Jest package. The test files can be located in the following directory:



```bash
  backend-pse/src/__test__
```


These tests leverage the capabilities of mongodb-memory-server to create a local MongoDB instance. This approach enhances the speed of tests, as no external connections are required. Moreover, it guarantees that the test suite does not interact with the live database, thereby avoiding any residual test data.

The entirety of the backend is protected through tokens issued by the Canvas API. To maintain independence from the Canvas API and to ensure functionality can be tested in isolation, the tests utilize mocking functions to replicate the response of the API. This approach enables a more reliable and accurate testing environment.

Much like its backend counterpart, the frontend workflow comprises a lint check of the code base. However, frontend tests are inherently dependent on the Canvas API integration, and thus must be conducted locally due to the requisite sensitive information.

In the future, this requirement may change should the creation of a test Canvas user become possible. Frontend tests are currently executed using the Cypress testing library.

To execute these tests, it's necessary to first generate a cypress.env.json file within the frontend directory. This file must contain the following details:

```bash
  {
  "username": "your_canvas_username",
  "password": "your_canvas_password"
  }
```

Subsequent to this, ensure that the Canvas testing environment is correctly configured. You can then run the test suite using the following commands:


```bash
npm run test
npm run test_headless

```

Please note that the npm run test command triggers the user interface version of the test suite, while npm run test_headless initiates a version without a user interface.

Additionally, the frontend triggers the Lighthouse workflow. This workflow benchmarks the entire site based on loading performance and other key metrics. A failure in this workflow does not necessarily indicate that the application is broken. However, it should serve as a warning to developers that the site may be experiencing performance issues.

Both the frontend and backend are automatically deployed when pushed to the main branch. The backend uses Vercel hosting, which automatically detects a push or pull request to the main branch and deploys the new code immediately.

## Contributing

Guidelines for contributing to the project. Include information on how to submit bug reports, feature requests, and pull requests.

## License

Specify the project's license and provide a link to the full license text if available.

## Additional Information

Add any additional information, such as troubleshooting tips, FAQs, or acknowledgments.

## Contact Information

Provide contact information for the project maintainers or authors if necessary.

## Acknowledgments

Optional section to acknowledge any contributors, libraries, or resources used in the project.


