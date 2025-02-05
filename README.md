# Finance Tracker

A simple finance tracking app built with React to manage expenditures. This project is focused on learning **props**, **state management**, and **basic React hooks**.

## Features

- Add new expenditures with a form.
- View a list of expenditures in a table.
- Search and filter expenditures.
- Delete expenditures with confirmation.
- View analytics (total expenditure, highest expense, most frequent category, and most used payment method).

## Tech Stack

- **React**: Core library for building the UI.
- **React Hooks**: `useState` and `useEffect` for state and side effects.
- **Tailwind CSS**: Styling.
- **SweetAlert2**: User-friendly pop-up modals for alerts and confirmations.

## Installation & Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/finance-tracker.git
   cd finance-tracker
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

4. Ensure the backend is running (uses a JSON server for mock data).
   ```sh
   npx json-server --watch db.json --port 8000
   ```

## Components Overview

### `Home.js`

- Manages the state (`useState`) and side effects (`useEffect`).
- Handles API requests (fetch, post, delete).
- Controls form visibility and search filtering.

### `Search.js`

- Receives `handleSearch` as a **prop** and updates the search query.

### `NewExpenditureForm.js`

- Accepts `addNewExpenditure` as a **prop** to handle form submission.

### `ExpenditureList.js`

- Displays expenditures using **props**.
- Calls `handleDelete` from **props** to delete an expenditure.

## Learning Goals

- **Props:** Pass data and functions between components.
- **State Management:** Manage component states with `useState`.
- **React Hooks:** Handle side effects with `useEffect`.
- **Component Structure:** Organize and separate concerns effectively.

## Future Enhancements

- Add **edit functionality** for expenditures.
- Implement **user authentication**.
- Store data persistently using a real database.

---
