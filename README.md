# Adventure Capitalist
This little simulator game has been created as part of a test for a job application (like most of my repos), the game is meant to be a sort of business entrepreneur simulator. You need to buy new businesses and collect money from them, or you can hire managers that can do the job for you.

You can find a deplyed version of the game at [this link](http://s18605048.onlinehome-server.info/data/projects/adventure-capitalist/).

## Solution
As this game should be to introduce myself to a gaming company, I was tempted to use some graphic engine like PixiJS, which I'm quite used to, but the type of game have made WebGL rendering almost a waste. So I opted for a more HTML oriented solution using React.

I've also used Redux and ReduxSaga, React's best friends when it comes to handle state and side effects. This is because one of the requirement is that the game should keep 'working' when the breowser is shut, so storing the state in local storage seemed to me a good compromise as I wasn't going to create a full-stack application with a server component (I've been mostly focused on FrontEnd in the last few years, so my BackEnd knowledge may be a bit rusty).

I've tried to create a responsive design that would adatp to adapt not just to the screen size, but also to the device type. I've used Framework7 to help myself with the task, which provides different themes for Android/iOS/Desktop. The side menu will be static on larger screens, but it will switch to a sliding panel when the browser area become smaller.

## Project Structure
The project keeps state and views separated and it makes large use of selectors and actions dispatcher to connect the two areas. Both views and state handle managers and businesses independently in order to make the code a bit more clean.

Sagas are used mainly to automate the background processes, so that the game can keep working even while the player is idle.

## Trade-offs
I wanted to create some kind of animation in the game to make the passing of time obvious, I wanted to add a progress bar to show how much time until the next collection time.

My problem is that to make something accurate I should use the saga to update the state every time a task loop completes, even if no collection has been made. That would re-trigger the rendering of the view and it would make me able to generate an accurate and stable progress bar. 

This option is not efficient at all, the state should only be updated when really required, so I've opted for a CSS animation. Whenever a collection is made, the CSS animation of the progress bar is reset by removing and re-adding the CSS class. 

This is an efficient solution but it is also a little bit unreliable. If the animation reset happens when the browser tab is not active (IE: user navigating on another tab) when the tab comes back in focus the CSS doesn't understands that the animation class has been manipulated, which means that the animation will be broken until the next automatic collection.

## What needs improving
A more reliable progress bar would be nice.

I feel like the game would benefit of an introductory tutorial to teach the player how everything works, I've tried to make the UI easy to navigate and intuitive, but some instructions are always welcome.

It would be fun to add some kind of malus to make the player lose money when some kind of random event happens, just to make the game more interesting.

## Available Scripts
In the project directory, you can run:

### `npm start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`
Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`
Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.