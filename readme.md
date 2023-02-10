1. `npm install`
1. `npm run start`
1. `npm run android`
1. watch logs, `state` of ready() returns `state.enabled: false`!


Also, it seems that the app is not asking user to grant location permission! However, even after going to settings and granting app full location & activity tracking permission then restarting the app, `state.enabled` is stil l`false`!

> this is a watered down version of the actual app that I'm working on, but the concept is the same. My aim is to set up background-geo-location library in a context provider and have children components useContext to read location info and render/act accordingly.

