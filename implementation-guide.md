We are building a Reddit client application using React, Redux, JSX. Don't use TypeScript. The application will connect to the Reddit API to fetch and display posts based on predefined search queries. Please start building the code and give instructions on every step. The code should be well commented.

# Step-by-Step Implementation Guide

## 1. Project Setup & Initialization

- Create a new React application using Create React App
- Install required dependencies: Redux, React Router, Redux Thunk, Axios, Chart.js
- Set up the project structure with components, reducers, actions, and styles folders
- Configure Redux store with middleware for async actions

## 2. Reddit API Configuration

Register your application with Reddit to get API credentials

- Implement OAuth2 authentication flow
- Create API service layer to handle all Reddit API requests
- Set up rate limiting and error handling for API calls

## 3. UI Components Structure

- Design the main layout with responsive breakpoints
- Create reusable components:
    - Header (with logo and search box)
    - Navigation sidebar
    - Posts list component
    - Post detail component
    - Chart visualization component
    - Pagination controls
    - Loading and error states

## 4. State Management

- Define Redux actions for:
    - Fetching initial data
    - Searching posts
    - Loading specific query results
    - Pagination control
    - Error handling

- Create reducers to manage:
    - Posts data
    - Search queries and results
    - UI state (loading, errors, etc.)
    - Pagination state

## 5. Home View Implementation

- Create home view component with chart visualization
- Fetch initial data for predefined queries on app load
- Display aggregated statistics in chart format
- Implement responsive design for all device sizes

## 6. Search & Navigation Implementation

- Build search functionality in header
- Create navigation sidebar with predefined queries
- Implement click handlers for query selection
- Display query statistics (votes, comments) in navigation
- Add home link functionality

## 7. Posts Display Implementation

- Create posts list component with pagination
- Implement card-based design for each post
- Display post metadata (title, author, subreddit, etc.)
- Handle image/video/link content appropriately
- Add loading states during data fetch

## 8. Detailed View Implementation

- Create modal or separate route for post details
- Fetch and display additional post information
- Implement smooth transitions between views
- Add navigation controls within detailed view

## 9. Error Handling & Edge Cases

- Handle API errors gracefully
- Implement empty state designs
- Add retry mechanisms for failed requests
- Validate user input for search

## 10. Performance Optimization

- Implement lazy loading for components
- Add image optimization
- Set up proper caching strategies
- Minimize bundle size
- Optimize re-renders with React.memo and useCallback

## 11. Testing Implementation

- Write unit tests for all components
- Test Redux actions and reducers
- Implement integration tests for key workflows
- Add end-to-end tests for critical user journeys

## 12. Deployment & CI/CD

- Set up production build configuration
- Configure deployment to hosting service (Vercel, Netlify, etc.)
- Implement CI/CD pipeline
- Set up Lighthouse monitoring
- Configure performance budgets

## Quality Assurance Checklist

- 90+ Lighthouse scores for all categories
- Comprehensive test coverage (>80%)
- Responsive on all device sizes
- Cross-browser compatible
- Accessible (WCAG 2.1 compliant)
- Smooth animations and transitions
- Clear error states and recovery
- Optimized performance
- Secure API credential handling
- Progressive Web App capabilities


# README.md
# Reddit API Display App

![App Screenshot](./wireframes/app-screenshot.png)

A responsive React application that displays Reddit posts based on predefined search queries.

## Wireframes

### Desktop View
![Desktop Wireframe](./wireframes/desktop-wireframe.png)

### Mobile View
![Mobile Wireframe](./wireframes/mobile-wireframe.png)

## Technologies Used

- React (with Hooks)
- Redux (with Thunk middleware)
- React Router
- Axios (for API calls)
- Chart.js (for data visualization)
- Styled Components (for styling)
- Jest & Enzyme (for testing)
- Cypress (for end-to-end testing)
- Lighthouse (for performance auditing)

## Features

- Responsive design for all device sizes
- Predefined search query navigation
- Real-time Reddit data visualization
- Interactive chart of query statistics
- Detailed post viewing
- Search functionality
- Pagination controls
- Smooth animations and transitions
- Comprehensive error handling
- Offline support with service workers

## Future Work

- Add user authentication
- Implement saved searches
- Enable commenting/voting functionality
- Add dark mode support
- Expand chart visualization options
- Implement push notifications for new posts
- Add social sharing capabilities

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Reddit API credentials in `.env`
4. Run development server: `npm start`
5. Run tests: `npm test`

## Testing

- Unit tests: `npm test`
- End-to-end tests: `npm run cypress`
- Lighthouse audit: `npm run lighthouse`

## Deployment

The app is deployed at: [https://reddit-api-display.example.com](https://reddit-api-display.example.com)

## Performance

![Lighthouse Scores](./wireframes/lighthouse-scores.png)