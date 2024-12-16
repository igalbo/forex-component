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
   cd usd-ils-exchange
   npm install
3. **Set your APP_ID:**
   In your .env file, set VITE_OER_APP_ID with your actual APP_ID
