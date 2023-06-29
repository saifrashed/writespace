<!-- ABOUT THE PROJECT  -->
# Project Software Engineering - Frontend


<!-- GETTING STARTED -->

## App Architecture

WriteSpace's frontend follows a modern, component-based architecture, utilizing a popular JavaScript framework and various libraries and technologies. The key components and their roles in the app are as follows:

* Key Libraries and Tools:
* React: Version 18.2.0
* Next.js: Version 13.2.4
* TypeScript: Version 5.0.2
* Tailwind CSS: Version 3.2.4
* Material-UI: Version 5.13.5
* Axios: Version 1.4.0
* Jest: Version 29.5.0
* Node.js: Version 18.16.0
* For a complete list of dependencies, please refer to the package.json file.

## Custom React Hooks

The custom React hooks are designed to manage and facilitate the fetching of data from the server. The hooks interact with the endpoints located in the backend folder: ‘services’ and serve the purpose of managing various types of data, including authentication, users, assignments, badges, courses, notifications, quizzes, and submissions. These hooks utilize other hooks such as useEffect, useState, and useNotification to handle the logic and state management.

## Third-Party Dependency: LanguageTool API

The spelling quiz feature of this project relies on the [LanguageTool API](https://rapidapi.com/dnaber/api/languagetool) for text analysis and spell checking. It is important to note that any changes to the LanguageTool API or its shutdown could impact the functionality of the spelling quiz.

If the LanguageTool API becomes unavailable or deprecated, alternative text analysis APIs will need to be considered and the following files may require modification:

* `components/spellingQuiz.jsx`: This file contains the implementation of the spelling quiz component, which is modeled after the response of the LanguageTool API.
* `lib/languageTool.ts`: This file handles the communication with the LanguageTool API.
* `lib/filterUtils.js`: This file includes utility functions used for filtering and processing the response of the LanguageTool API.

For more details on the functionality and usage of these files, please refer to their in-file commentary.

In the event of API changes or discontinuation, it is recommended to update the project accordingly by integrating a different text analysis API and adapting the mentioned files to ensure the continued functionality of the spelling quiz.


## Acknowledgments

* [Pngtree](https://pngtree.com/) and [Cleanpng](https://www.cleanpng.com/) have provided some of the PNG images used for the badges in this project. 

