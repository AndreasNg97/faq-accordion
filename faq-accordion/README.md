# faq-accordion

This project is a simple FAQ page featuring an accordion interface. The FAQ data is dynamically fetched from the Contentful CMS using its REST API, making it easy to manage and update content. Built with HTML, CSS, and JavaScript, this project demonstrates clean code practices and responsive design.

### Features:

- Fetching FAQ data from contentful using REST API
- Display FAQ items in an accordion format
- Environment variables for secure API credentials

### To Run:

1. Clone the repositor
2. Run `npm install` to install dependencies
3. Set up environment variables:
   - Create a `.env` file in the root of the project
   - Add your Contentful credentials:
   ```
   VITE_CONTENTFUL_SPACE_ID=<Your Space ID>
   VITE_CONTENTFUL_ACCESS_TOKEN=<Your Access Token>
   ```
4. Run `npm run dev` to start the app
