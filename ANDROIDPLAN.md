# Android A## Project Setup
- [x] Install Capacitor CLI globally: `npm install -g @capacitor/cli`
- [x] Install Capacitor core and Android dependencies in project:
  - `npm install @capacitor/core @capacitor/android`
- [x] Initialize Capacitor in the project: `npx cap init`
  - App name: OClock
  - App ID: com.shardulniroula.oclock
- [x] Add Android platform: `npx cap add android`opment Plan with Capacitor

## Overview
Convert the existing React/Vite web app (DateViewConverter/OClock) into an Android app using Capacitor by Ionic. This plan outlines the steps to set up the development environment and build the native Android app.

## Prerequisites
- [x] Install Android Studio on Linux Cinnamon
  - Downloaded and extracted Android Studio 2025.1.3.7
  - Started setup wizard (complete SDK download in GUI)
- [ ] Ensure Node.js and npm are installed (already present in project)

## Project Setup
- [ ] Install Capacitor CLI globally: `npm install -g @capacitor/cli`
- [ ] Install Capacitor core and Android dependencies in project:
  - `npm install @capacitor/core @capacitor/android`
- [ ] Initialize Capacitor in the project: `npx cap init`
  - App name: OClock
  - App ID: com.shardulniroula.oclock (or similar)
- [ ] Add Android platform: `npx cap add android`

## Build and Sync
- [x] Build the web app: `npm run build`
- [x] Sync web assets to native project: `npx cap sync android`
- [x] Open in Android Studio: `npx cap open android`

## Development and Testing
- [x] Configure Android Studio project settings
- [x] Set up emulator or connect physical device
- [ ] Build APK: Use Android Studio build menu
- [ ] Test app functionality on Android device/emulator
- [ ] Debug any Capacitor-specific issues (e.g., plugins if needed)

## Deployment
- [ ] Generate signed APK for release
- [ ] Test on multiple Android versions/devices
- [ ] Publish to Google Play Store (future step)

## Notes
- The app uses React Router, ensure proper handling in Capacitor
- Check for any web-specific features that may need native plugins
- Timezone functionality should work natively as it's JavaScript-based
- No iOS support planned yet, but Capacitor supports it for future expansion