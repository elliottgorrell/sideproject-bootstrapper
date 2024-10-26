# Tilp Mobile App

## How to access the firebase services for debugging

By default the app connects to several firebase services hosted in the cloud.
If you want to inspect our DB, storage buckets or modify data directly (for example setting a user to need to onbooard again) you will need to log in to the cloud console in your browser.

The easiest way to access this is to get access to the dashlane account for Tilp with all the logins and then access it at <https://console.firebase.google.com/project/tilp-app>

## oAuth

Sign in with Facebook doesn't work when auth emulator is connected. This is a restriction from google firebase.

## Debugging issues that only appear in release build

Sometimes you encounter an issue with a release build (for example an EAS preview build) that you don't see when normally developing.
For example I encountered the app crashing when i tried ot install the preview non-dev build. To debug this you can get closer to prod by running:
`npx expo run:ios --configuration Release`

This sometimes reveals issues related to release configuration

## Emulators

NOTE: This is currently broken
We do have a fully local stack of all the firebase services running in a docker container. This can be stood up and connected to by doing

1. `docker-compose up --build`
2. `cd react_native && FIREBASE_EMULATOR_ENABLED="true" npm start`
