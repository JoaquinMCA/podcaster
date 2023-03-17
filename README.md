<p align="center">
  <a href="https://github.com/JoaquinMCA/podcaster" rel="noopener" target="_blank"><img width="150" src="./public/favicon.ico" alt="MUI logo"></a>
</p>

<h1 align="center">Podcaster</h1>

The goal of this project to solve a test creating a mini-app to listen the top 100 podcasts of [itunes](https://itunes.apple.com/).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Information
The application has two available environments `dev` and `prod`.

Itunes API does not provide CORS headers so in order to be able to consume the API:

- In `dev` the app uses a [proxy](./src/setupProxy.js) to fetch the data from the itunes API.

- In `prod` the app uses [allOrigins](https://allorigins.win/) to fetch the data.

## Demo

An online version of the application can be found in: [Podcaster](https://podcaster-d0fc0.web.app/).

In this version the loading times can be pretty long because of the need of using [allOrigins](https://allorigins.win/) to retrieve the information from the API avoiding CORS.

## Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


#### `npm run build:prod`

Builds the app for production to the `build` folder with the `prod` environment. Use this build to deploy the application.


#### `npm run start:prod`

Builds the app for production to the `build` folder with the `prod` environment and serves it locally.


#### `npm run lint`

Runs `eslint` to find errors and problems in code style.\


#### `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


#### `npm run test:coverage`

Launches the test runner in the interactive watch mode but showing also the coverage report.


#### `npm run e2e`

Launches the e2e test runner ([Cypress](https://docs.cypress.io/guides/component-testing/react/quickstart)) in the console with a headless browser.


#### `npm run e2e:watch`

Launches the e2e test runner ([Cypress](https://docs.cypress.io/guides/component-testing/react/quickstart)) in watch mode with an interactive browser.

#### `npm run deploy`

Builds the app with the `prod`environment and deploys it to [Firebase](https://firebase.google.com/) hosting.

You need to login to firebase console with your own credentials previously.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

