# Experiment–1: Basic Client-Side Routing Using React Router

## Aim
To implement basic client-side routing in a Single Page Application (SPA) using React Router, enabling navigation between different pages by changing the URL in the browser without reloading the page.

---

## Software Requirements
- Node.js  
- React  
- React Router DOM  
- Web Browser (Chrome / Edge / Firefox)

---

## Theory
Single Page Applications (SPAs) load a single HTML page and dynamically update content without refreshing the entire page. Routing in SPAs allows navigation between different views using URLs.

React Router is a standard library used for client-side routing in React applications. It provides components such as `BrowserRouter`, `Routes`, and `Route` to render different components based on the URL path. This improves performance and user experience by avoiding full page reloads.

---

## Procedure
1. Create a React application using Vite.
2. Install the `react-router-dom` package.
3. Wrap the root component with `BrowserRouter`.
4. Define routes using `Routes` and `Route` components.
5. Enter different paths directly in the browser’s address bar to navigate between pages.
6. Observe that the content changes without reloading the page.

---

## Project Structure
ClientServerRouting/
│
├── node_modules/
├── public/
│ └── vite.svg
├── src/
│ ├── assets/
│ ├── App.css
│ ├── App.jsx
│ ├── index.css
│ └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md

---

## Implementation Details
The application supports the following routes:
- `/` → Home Page
- `/about` → About Page
- `/contact` → Contact Page

Navigation is performed only by typing the URL directly in the browser address bar. No buttons or links are used for navigation.

---

## Output
- Home page is displayed when `/` is entered in the URL.
- About page is displayed when `/about` is entered.
- Contact page is displayed when `/contact` is entered.
- A 404 page is shown for invalid URLs.

## Screenshots
<img width="1707" height="885" alt="image" src="https://github.com/user-attachments/assets/bc5fa610-f896-4f72-831b-a025b5020eca" />
<img width="1719" height="817" alt="image" src="https://github.com/user-attachments/assets/c1cc5e6a-a7f4-412d-8a36-5bbaa83dd3f3" />

---

## Result
The experiment successfully demonstrates client-side routing in a Single Page Application using React Router. Page navigation occurs smoothly without refreshing the browser.

---

## Conclusion
React Router enables efficient and seamless navigation in SPAs by rendering components based on URL paths. This experiment proves that routing can be handled entirely on the client side using browser URLs without page reloads.

