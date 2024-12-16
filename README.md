# USD-ILS Exchange Rate Viewer

## Overview

A simple React application that:

- Fetches historical USD to ILS exchange rates from the [Open Exchange Rates API](https://openexchangerates.org/).
- Displays rates and day-by-day percentage changes over a selectable 14-day range.
- Uses caching (`localStorage`) to reduce repeated API calls.

## Prerequisites

- **Node.js** and **npm** (or **yarn**)
- A free **App ID** from [Open Exchange Rates](https://openexchangerates.org/signup/free)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/igalbo/forex-component.git
   ```
2. **Install dependencies:**

   ```bash
     cd forex-component
   npm install
   ```

3. **Set your APP_ID:**
   In your .env file, set VITE_OER_APP_ID with your actual APP_ID

## Usage

1. **Run the application:**

   ```bash
   npm run dev
   ```

2. **Open the app:** By default, Vite runs at http://localhost:5173. Open this URL in your browser.

3. **Select dates:**
   Use the date pickers to choose a start and end date (up to 14 days). The chart updates automatically after selecting valid dates.

4. **View the chart:**

- Blue line: USD to ILS daily rate
- Red line: Daily percentage change compared to the previous day

_If the chosen date range is invalid, a warning message will appear._
