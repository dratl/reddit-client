# Reddit Client Application Implementation Guide

## Overview

We are building a Reddit client application using React, Redux, and JSX. The application will connect to the Reddit API to fetch the latest posts based on predefined search queries used as navigation links. **Note:** TypeScript will not be used.

### Predefined Search Queries
- `fernandez noroña`
- `andrea chavez`
- `ernesto zedillo`
- `claudia sheinbaum`
- `alito moreno`

---

## Application Layout

### Header
- Displays the Reddit logo (links to the home page).
- Includes a search box for filtering posts.

### Two-Column Layout

#### Navigation Column
- Lists predefined search queries.
- Includes a "Back to Home" link.
- Displays the number of votes and comments for each search term in the past three days.

#### Viewer Column
- Displays a graph chart on the home page showing the number of votes for each search query.
- Shows the latest posts (20 per page) for the selected search query, with the following details:
    - Title
    - Image
    - Community
    - Author
    - Number of votes
    - Number of comments

---

## Features

- **Responsive Design**: Optimized for desktop and mobile.
- **Pagination**: Navigate through posts.
- **Detailed Post Views**: Open in a modal or new route.
- **Extensibility**: Add more predefined search queries.
- **Enhanced Animations**: Smooth transitions.
- **Error Handling**: Graceful recovery from errors.
- **Environment Variables**: Use `.env` for API keys.
- **Modern Redux**: Use `configureStore` from `@reduxjs/toolkit` instead of `createStore`.
- **React Router v6**: Use `useNavigate` instead of `useHistory`.
- **API Optimization**:
    - Cache results to avoid redundant API calls.
    - Implement token refresh logic.
    - Handle rate limit errors (HTTP 429) gracefully.

---

## Environment Variables (`.env`)

```plaintext
API_BASE=http://localhost:5000/api
REDDIT_CLIENT_ID=V5uiAm7QfZY2lLc4I1uPGw
REDDIT_CLIENT_SECRET=xIwrNln-4OC-ORvD9Gu7-OyfuugYdQ
REDDIT_REDIRECT_URI=http://localhost:3000/auth/callback
REDDIT_USER_AGENT=YourApp/1.0 by SlimSalaBimPong
CLIENT_ORIGIN=http://localhost:3000
PORT=5000
```

---

## Testing

- **Unit Tests**: Use Jest and Enzyme for component testing.
- **End-to-End Tests**: Use Cypress for user interaction testing.

---

## Deployment

- Ensure the application is accessible via a public URL.
- Test compatibility with modern browsers and devices.

---

## Quality Assurance Checklist

- **Performance**: 90+ Lighthouse scores for all categories.
- **Test Coverage**: >80% coverage for unit and integration tests.
- **Responsiveness**: Works on all device sizes.
- **Accessibility**: WCAG 2.1 compliant.
- **Cross-Browser Compatibility**: Tested on modern browsers.
- **Error Handling**: Clear error states and recovery mechanisms.
- **Optimized Performance**: Minimized API calls and bundle size.
- **Secure Credentials**: Proper handling of API keys.
- **PWA Capabilities**: Offline support and fast loading.

---

## Step-by-Step Implementation Guide

### 1. Project Setup
- Create a new React app using Create React App.
- Install dependencies: `redux`, `@reduxjs/toolkit`, `react-router-dom`, `axios`, `chart.js`.
- Set up the project structure with folders for components, reducers, actions, and styles.
- Configure the Redux store with middleware for async actions.

### 2. Reddit API Configuration
- Register the app with Reddit to obtain API credentials.
- Implement OAuth2 authentication flow.
- Create an API service layer for handling Reddit API requests.
- Add rate limiting and error handling.

### 3. UI Components
- Design a responsive layout.
- Create reusable components:
    - Header (logo and search box)
    - Navigation sidebar
    - Posts list
    - Post detail view
    - Chart visualization
    - Pagination controls
    - Loading and error states

### 4. State Management
- Define Redux actions for:
    - Fetching data
    - Searching posts
    - Pagination
    - Error handling
- Create reducers for managing:
    - Posts data
    - Search queries
    - UI state (loading, errors, etc.)
    - Pagination state

### 5. Home View
- Display aggregated statistics in a chart.
- Fetch initial data for predefined queries on app load.

### 6. Search & Navigation
- Build search functionality in the header.
- Implement navigation for predefined queries.
- Display query statistics (votes, comments) in the sidebar.

### 7. Posts Display
- Create a card-based design for posts.
- Add pagination controls.
- Display metadata (title, author, subreddit, etc.).

### 8. Detailed View
- Create a modal or route for post details.
- Fetch and display additional post information.

### 9. Error Handling
- Handle API errors gracefully.
- Add retry mechanisms for failed requests.

### 10. Performance Optimization
- Implement lazy loading.
- Optimize images and minimize bundle size.
- Use caching to reduce redundant API calls.

### 11. Testing
- Write unit tests for components.
- Test Redux actions and reducers.
- Add end-to-end tests for critical workflows.

### 12. Deployment
- Configure production build and deploy to a hosting service (e.g., Vercel, Netlify).
- Set up CI/CD pipelines.

---

## README.md

### Project Overview
A responsive React application that displays Reddit posts based on predefined search queries.

### Features
- Real-time Reddit data visualization.
- Interactive charts for query statistics.
- Detailed post views with metadata.
- Pagination and search functionality.
- Comprehensive error handling.

### Getting Started
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up `.env` with Reddit API credentials.
4. Start the development server: `npm start`.

### Testing
- Run unit tests: `npm test`.
- Run end-to-end tests: `npm run cypress`.

### Deployment
The app is deployed at: [https://reddit-api-display.example.com](https://reddit-api-display.example.com).

### Performance
![Lighthouse Scores](./wireframes/lighthouse-scores.png)
