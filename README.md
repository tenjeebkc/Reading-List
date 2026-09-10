# Personal Reading List

A responsive personal reading list built with React and TypeScript. The application uses JSON Server as a local persistent API for storing reading-list items.

# Features

* Add books or articles with a title and author
* Remove items from the reading list
* Persist items through JSON Server
* Distinct loading, error, and empty states
* Reviewer-accessible demo states without changing source code
* Keyboard-accessible controls
* Responsive layout for smaller screens

# Tech Stack

* React
* TypeScript
* Vite
* JSON Server
* CSS

# Running Locally

Install dependencies:

npm install

** Start the frontend in one terminal:

npm run dev

** Start the JSON Server in a second terminal:

npm run server

** The frontend runs at:

http://localhost:5173

** The API is available at:

http://localhost:3001/readingList

# Reviewing the Required States

The application provides demo URLs so the required states can be reviewed without modifying the source code.

# Normal state

http://localhost:5173/

Uses the real JSON Server API and displays the current reading list.

# Empty state

http://localhost:5173/?state=empty

Shows an intentionally empty reading list.

The empty state explains what the reading list is for and provides an Add your first item action.

# Loading state

http://localhost:5173/?state=loading

Shows the loading state for several seconds so it can be reviewed without changing the code.

# Error state

http://localhost:5173/?state=error

Shows the error state with an explanation that the reading list could not be loaded and instructions to check the connection and try again.

These query parameters are only demonstration controls. The normal application uses the real API.

# Accessibility

The interface uses semantic HTML and native form controls.

* Form fields have associated labels.
* Buttons are keyboard accessible.
* Visible :focus-visible styles are provided for keyboard navigation.
* The loading state uses role="status".
* The error state uses role="alert".
* The interface remains usable at smaller viewport widths.

# Data Persistence

Reading-list items are stored by JSON Server in db.json.

Adding or removing an item updates the API data, so the list remains available after refreshing the page or restarting the development servers.
