# Contributing to SUSHITAP

Thanks for considering a contribution. SUSHITAP is a small Expo/React Native app, so the workflow is kept simple.

## Before you start

For anything beyond a trivial fix (typos, small bug fixes), please open an issue first to discuss what you'd like to change. This avoids spending time on a pull request that doesn't fit the direction of the app. Check the [Code of Conduct](CODE_OF_CONDUCT.md) as well.

## Development setup

The app is built with Expo SDK 54 and React Native, and targets Android only. After cloning the repository, install dependencies with `npm install` and start the development server with `npx expo start`. You'll need the Expo Go app or a development build on an Android device or emulator to run it.

## Making changes

Fork the repository and create a branch from `main`. This project names branches and commits with the pattern `SUSHITAP-<TYPE>/<Short-Description>`, where `<TYPE>` is one of `FEATURE`, `FIX`, `DOCS`, or `REFACTOR`, and the description uses dashes instead of spaces (for example, `SUSHITAP-FIX/Fix-counter-reset`). Please follow this convention so the history stays consistent.

Keep changes focused: a single pull request should cover one fix or one feature, not an unrelated bundle of changes. Match the existing code style — descriptive variable names, and JSDoc (`@param`, pre/post conditions) on non-trivial functions such as calculations, loaders, and component renders, without over-commenting obvious logic.

## Submitting a pull request

Before opening the pull request, run `npx tsc --noEmit` to confirm there are no type errors. Describe what the change does and why in the pull request description, and reference the related issue if there is one. A maintainer will review it as soon as possible.
