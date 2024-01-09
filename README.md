
## Deployment
- [AIRCALL LIVE PROJECT](https://aircallproject.vercel.app/)

# Aircall App

## Overview

This ReactJS application is a simple activity tracker that allows users to view a list of calls, see details of each call, archive/unarchive calls, and perform bulk actions on calls.

## Features

1. **Activity Feed**: Displays a list of calls with relevant information.
2. **Activity Detail**: Provides detailed information about a specific call.
3. **Archive**: Allows users to archive and unarchive individual calls.
4. **Archive Tab**: Displays archived calls separately from the main Activity Feed.
5. **Archive All**: Button to archive all calls in the Activity Feed.
6. **Unarchive All**: Button to unarchive all calls in the Archived Tab.

## Installation

To run the application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Start the development server:

   ```bash
   yarn start
   ```

The app will be accessible at `http://localhost:3000` by default.

## API Integration

The application uses the provided API to fetch and update call information. Ensure the API is accessible and configured correctly in the code.

API Base URL: `https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/`

## API Routes

- **GET /activities**: Get calls for the Activity Feed.
- **GET /activities/<call_id>**: Retrieve details of a specific call.
- **PATCH /activities/<call_id>**: Update a call's archive status. (Example payload: `{ "is_archived": true }`)
- **PATCH /reset**: Reset all calls to initial state.

## UI/UX and Design

- The app is designed with a focus on clean and intuitive user interfaces.
- Transitions and animations are implemented for a smoother user experience.

## React Best Practices

- The code follows best practices for structuring React components and managing state.

## Code Readability and Maintainability

- Code is organized and well-documented to enhance readability.
- Modular components promote maintainability and ease of future development.

## Issues and Contributions

If you encounter any issues or have suggestions for improvement, feel free to create an issue or submit a pull request.
