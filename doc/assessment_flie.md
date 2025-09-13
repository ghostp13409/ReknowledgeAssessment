# Frontend Development Task

## Project Summary

Create a single-page web application that fetches geographic statistical data from a public source, presents it through both visual charts and data tables, and shows interconnected functionality between these components.

While the company typically uses React, TypeScript, Zustand, TanStack Query, TanStack Router, and Tailwind CSS, you're welcome to choose any frameworks or libraries that help you complete the task effectively.

---

## Recommended Approach and Data

You can ignore these suggestions and use your preferred project setup method and geographic dataset instead.

### Getting Started

1. **Project Initialization:**

   - Create a new React/TypeScript project using Vite (e.g., `npm create vite@latest`)
   - Set up version control with Git

2. **Styling Approach:**
   - Use any styling method you prefer, though Tailwind CSS is suggested

### Data Recommendation

- Consider using earthquake data from USGS:  
  [https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv)
- This contains recent earthquake records (past 30 days) with geographic coordinates, magnitude, location details, timestamps, and more.
- Modify or enhance the dataset as needed for your visualization.

---

## Core Requirements

### UI Structure

Design a responsive two-panel layout optimized for desktop/laptop screens:

1. **Chart Panel:**

   - Implement using Recharts or your preferred charting library
   - Create an interactive visualization (like a scatter plot) where each data point represents a table row
   - Include controls (such as dropdowns) letting users select which numeric variables to display on each axis

2. **Data Panel:**
   - Show dataset column headers in the first row
   - Display all data in a scrollable table format covering all rows and columns

### Data Management

1. Initialize the app by loading and parsing data with loading indicators, then structure it appropriately for both chart and table display.

### User Interactions

- Enable row selection in the table through clicking or hovering.
- When a table row is selected, emphasize the matching data point in the chart (through color changes, size adjustments, or tooltips).
- **Additional Feature:**
  - Implement reverse interaction where clicking/hovering chart points highlights, scrolls to, or filters the corresponding table row.

---

## State Handling Approaches

Demonstrate various state sharing techniques:

1. **Props Pattern:**

   - Transfer data and event handlers from parent to child components via props

2. **React Context:**

   - Create a Context for managing the currently selected earthquake entry
   - Implement a Provider at the application root for child component access

3. **External State Library (like Zustand):**
   - Build a global state store for managing selected or filtered records
   - Connect this store to update selections across table and chart interactions

---

## Delivery Requirements

- Make your code available in a Git repository
- Use any project organization that suits your workflow
- Provide a README with sufficient setup details (installation, running instructions, etc.)
- List all external dependencies and their purposes
- Describe any additional features you implemented and your reasoning
- Add helpful code comments
- Explain how you utilized AI tools in your development process
