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

## Testing
- Write unit tests for all components.
- Create end-to-end tests for user interactions.

## Deployment
- Ensure the application is accessible via a public URL.
- Test compatibility with modern browsers and devices.

## Performance
- Aim for 90+ scores on Lighthouse for performance, accessibility, and SEO.
