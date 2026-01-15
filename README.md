# ZAIZEN - Islamic Estate Management

ZAIZEN is a premium mobile application designed to help Muslims manage their financial estate, including debts, credits, assets, and Wills, strictly according to Islamic inheritance principles (Fara'id).

## Features

- **Dashboard**: Real-time overview of your net worth, total assets, debts, and credits.
- **Ledger**: Comprehensive management of your financial entries.
  - **Assets**: Track cash, property, jewelry, and investments.
  - **Debts**: Record money you owe (both personal and institutional).
  - **Credits**: Keep track of money owed to you.
- **Inheritance Calculator**: Advanced logic to calculate estate distribution among heirs according to Shari'ah.
  - Support for fixed heirs (*Ashab al-Furud*) and residuary heirs (*Asabah*).
  - Handles *Awal* (proportional reduction) and *Radd* (redistribution).
  - Considers funeral expenses and bequests (*Wasiyyah*).
- **Will Management**: Prepare for the future with a draftable Will structure.

## Tech Stack

- **Framework**: [Expo](https://expo.dev) / React Native
- **Routing**: Expo Router (File-based)
- **Styling**: Premium Islamic-inspired theme with Light/Dark mode support.
- **Icons**: SF Symbols (iOS) / Material Icons (Android/Web).

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npx expo start
   ```

3. Open on your device via Expo Go or use an emulator.

## Islamic Inheritance Logic

The app implements the standard rules found in Surah An-Nisa (4:11-12, 4:176) and authentic Sunnah. It prioritizes the settlement of funeral expenses and debts before distributing the remainder of the estate.

---
*Note: This application is intended for educational and planning purposes. For final legal or religious rulings, please consult with a qualified Islamic scholar.*
