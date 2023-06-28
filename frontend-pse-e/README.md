<!-- ABOUT THE PROJECT  -->
# Project Software Engineering

## About The Project


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* npm
* Node.js


### Installation

_Below are the steps of how you can start installing and setting up the app._
1. Clone the repo
   ```sh
   git clone https://github.com/[URL]
   ```
2. Install npm packages
   ```sh
   npm install
   ```

3. Run the start script
   ```sh
   npm run dev
   ```

## Third-Party Dependency: LanguageTool API

The spelling quiz feature of this project relies on the [LanguageTool API](https://rapidapi.com/dnaber/api/languagetool) for text analysis and spell checking. It is important to note that any changes to the LanguageTool API or its shutdown could impact the functionality of the spelling quiz.

If the LanguageTool API becomes unavailable or deprecated, alternative text analysis APIs will need to be considered and the following files may require modification:

- `components/spellingQuiz.jsx`: This file contains the implementation of the spelling quiz component, which is modeled after the response of the LanguageTool API.
- `lib/languageTool.ts`: This file handles the communicatiwith the LanguageTool API.
- `lib/filterUtils.js`: This file includes utility functions used for filtering and processing the response of the LanguageTool API.

For more details on the functionality and usage of these files, please refer to their in-file commentary.

In the event of API changes or discontinuation, it is recommended to update the project accordingly by integrating a different text analysis API and adapting the mentioned files to ensure the continued functionality of the spelling quiz.
