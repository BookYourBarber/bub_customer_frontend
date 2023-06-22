# Customer Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

Before running the application, make sure you have installed the required dependencies. If not, please run the following command in the root directory:

```bash
npm install
```

After installing the dependencies, you need to set your Google API key in order to use the application. Here are the steps:

1. Go to [Google Maps Platform](https://developers.google.com/maps) and create an account if you don't already have one.
2. Navigate to the APIs & Services section and then go to credentials.
3. Copy your Google Maps API key.
4. Create a file named `.env` in the root directory of the project.
5. In the `.env` file, add the following line and replace `YOUR_API_KEY` with your actual API key:

   ```plaintext
   REACT_APP_API_KEY=YOUR_API_KEY
   ```

   You can refer to the provided `.env.sample` file for the format.

## Available Scripts

In the project directory, you can run the following scripts:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run test`

Launches the test runner.
