# Technical Guide: Building a Reddit Client Application

This guide outlines the steps to build a Reddit client application using React and Redux. The application will connect to the Reddit API to fetch and display posts based on predefined search queries.

## Steps to Build the Application

1. **Set Up the Development Environment**
    - Install Node.js and npm.
    - Create a new React application using `create-react-app`.
    - Set up Redux for state management.

2. **Plan the Application Structure**
    - Define the components: Header, NavigationColumn, ViewerColumn, PostList, PostItem, and GraphChart.
    - Set up routes for navigation and detailed views.

3. **Design the User Interface**
    - Create wireframes for the application layout:
      - Horizontal header with a logo and search box.
      - Two-column layout: Navigation column and Viewer column.
    - Ensure the design is responsive for desktop and mobile devices.

4. **Integrate the Reddit API**
    - Read the Reddit API documentation to understand endpoints and authentication.
    - Fetch data for predefined search queries and implement pagination for posts.

5. **Implement Features**
    - Display a graph chart on the home page showing the number of votes for each search query.
    - Allow users to search posts using the search box.
    - Enable filtering of posts based on predefined categories.
    - Show detailed views of posts in a modal or new route.

6. **Enhance User Experience**
    - Use a cohesive design system for styling.
    - Add animations and transitions for smooth interactions.
    - Implement error handling to allow users to recover from error states.

7. **Optimize for Performance**
    - Ensure the application scores 90+ on Lighthouse for performance, accessibility, and SEO.
    - Test the application on modern browsers and devices.

8. **Write Tests**
    - Write unit tests for components using Jest and Enzyme.
    - Create end-to-end tests to validate user flows.

9. **Deploy the Application**
    - Host the application on a platform like Vercel, Netlify, or GitHub Pages.
    - Provide a public URL for users to access the app.

---

# Reddit API Display

We are building a Reddit app that connects to the API and fetches the latest posts based on predefined search queries used as navigation links. Built using React, Redux, JSX. Don't use TypeScript.

The code should be well commented.

## Application Layout

### Header
- Displays the Reddit logo (links to the home page) and a search box for filtering posts.

### Two-Column Layout

- **Navigation Column**:
  - Lists predefined search queries: "fernandez noroña", "andrea chavez", "ernesto zedillo", "claudia sheinbaum", and "alito moreno".
  - Includes a "Back to Home" link.
  - Shows the number of votes and comments for each search term in the past three days.
  
- **Viewer Column**:
  - Displays a graph chart on the home page showing the number of votes for each search query.
  - Shows the latest posts (20 per page) for the selected search query, including:
     - Title
     - Image
     - Community
     - Author
     - Number of votes
     - Number of comments

## Features
- Responsive design for desktop and mobile.
- Pagination for posts.
- Detailed post views in a modal or new route.
- Add more predefined search queries.
- Enhance animations and transitions.
- Improve error handling and recovery.
- Use .env to save API keys
- Don't use createStore since it's deprecated.
- Use the configureStore method from @reduxjs/toolkit
- useHistory has been removed in react-router-dom v6; you should use useNavigate.

## .env file data

API_BASE=http://localhost:5000/api
REDDIT_CLIENT_ID=V5uiAm7QfZY2lLc4I1uPGw
REDDIT_CLIENT_SECRET=xIwrNln-4OC-ORvD9Gu7-OyfuugYdQ
REDDIT_REDIRECT_URI=http://localhost:3000/auth/callback
REDDIT_USER_AGENT=YourApp/1.0 by SlimSalaBimPong
CLIENT_ORIGIN=http://localhost:3000
PORT=5000

## Testing
- Write unit tests for your components using Jest and Enzyme
- Create end-to-end tests for user interactions.

## Deployment
- Ensure the application is accessible via a public URL.
- Test compatibility with modern browsers and devices.

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