# SUSHITAP 🍣

<p align="left">
  <a href="https://expo.dev"><img alt="Expo" src="https://img.shields.io/badge/Expo-SDK%2054-000020?logo=expo&logoColor=white"></a>
  <a href="https://reactnative.dev"><img alt="React Native" src="https://img.shields.io/badge/React%20Native-0.81-61DAFB?logo=react&logoColor=black"></a>
  <a href="https://www.typescriptlang.org"><img alt="TypeScript" src="https://img.shields.io/github/languages/top/raamonsiu/SUSHITAP?logo=typescript&logoColor=white&color=3178C6"></a>
  <img alt="Android" src="https://img.shields.io/badge/Android-only-3DDC84?logo=android&logoColor=white">
  <a href="https://github.com/raamonsiu/SUSHITAP"><img alt="Version" src="https://img.shields.io/github/package-json/v/raamonsiu/SUSHITAP?color=F0805A"></a>
  <a href="https://github.com/raamonsiu/SUSHITAP/commits/main"><img alt="Last commit" src="https://img.shields.io/github/last-commit/raamonsiu/SUSHITAP?color=B79A8C"></a>
  <a href="https://github.com/raamonsiu/SUSHITAP/stargazers"><img alt="Stars" src="https://img.shields.io/github/stars/raamonsiu/SUSHITAP?style=social"></a>
</p>

## Overview

SUSHITAP is a small, single-purpose app for keeping count of how many pieces of sushi you eat during a sitting. The main screen shows a large counter and an animated nigiri: tapping it adds one piece, with a soft haptic tap and a "+1" that floats up and fades out at a random horizontal position. Swiping down on the sushi removes a piece, for when you've miscounted.

## Features

### Counting and sessions

Every tap grows the current session. From the history panel you can finalize the current session (saving it and resetting the counter to zero) or start a new one. Past sessions are listed with their date and total piece count, and any of them can be removed by swiping it to the left.

### Settings

The settings drawer lets you pick the language (Spanish, English, Catalan, French, Italian, German or Japanese, with an option to follow the system language automatically), the color scheme (light, dark, or automatic based on the phone's setting), and the sushi piece (salmon, tuna or tamago). Changing the piece is more than cosmetic: each flavor has its own color palette, in both light and dark variants, so the background, accents and the sushi illustration itself change with the choice. The same drawer includes a suggestions section that opens your email app with a message already drafted, plus links to the developer.

### Navigation

The settings drawer opens from the top-left button, the history drawer from the top-right one. Both slide in from their respective side and can be closed by tapping outside, using the close button, the phone's back button, or by dragging them back to the edge.

## Privacy and data

SUSHITAP does not require an internet connection or any kind of account: there is no sign-up, no login, and no backend server. Every piece of data — language, theme, flavor, the current session and the full history — is stored locally on the device using AsyncStorage, and never leaves it or gets synced anywhere. Uninstalling the app or clearing its data erases the history and preferences for good, since there is no copy anywhere else.

## Star History

<a href="https://www.star-history.com/#raamonsiu/SUSHITAP&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=raamonsiu/SUSHITAP&type=Date&theme=dark">
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=raamonsiu/SUSHITAP&type=Date">
    <img alt="Repository star history chart" src="https://api.star-history.com/svg?repos=raamonsiu/SUSHITAP&type=Date">
  </picture>
</a>
