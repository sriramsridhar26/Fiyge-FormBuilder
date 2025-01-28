# Fiyge FormBuilder

Fiyge FormBuilder is a dynamic and user-friendly web application designed to allow users to create, edit, and manage forms effortlessly. Built with modern web technologies, this project is focused on delivering a seamless experience for form creation and management.

---

## Features

- **User Authentication**: Secure user signup and login functionality.
- **Form Builder**: Intuitive drag-and-drop interface for creating forms.
- **Form Management**: Options to edit and delete existing forms.
- **Protected Routes**: Ensures only authenticated users can access specific pages.
- **Backend Integration**: Connects to a backend API for data storage and retrieval.
- **Responsive Design**: Optimized for various screen sizes.

---

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **Material-UI**: For consistent and visually appealing UI components.
- **React Router**: For routing and navigation.
- **Axios**: For making HTTP requests.
- **DND Kit**: To enable drag and drop functionality

### Backend
- **Node.js** and **Express**: To handle API requests (not included in this repository).
- **Sqlite**: For storing user and form data. Furthermore, this enables creating db when you clone and run.
- **Sequelize**: To create and connect with Sqlite db instance.
- **Bcryptjs**: To hash password before storing in db.

### Other Tools
- **React Hook Form**: For form validation and handling.
- **Environment Variables**: Managed using `import.meta.env` for secure API keys and URLs.

---

## Installation and Setup

Follow these steps to get the project up and running locally:

### Prerequisites
1. Node.js installed on your machine.
2. Access to the backend API URL.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/sriramsridhar26/Fiyge-FormBuilder.git
   ```

2. Navigate to the backend directory:
   ```bash
   cd Fiyge-FormBuilder/server
   ```

3. Install dependencies:
   ```bash
   npm install
   ```
4. Run Backend:
   ```bash
   node app.js
   ```
5. In another terminal, navigate to frontend directory:
   ```bash
   cd Fiyge-FormBuilder/client/fiyge-FormBuilder-F
   ```
6. Install dependencies:
   ```bash
   npm install
   ```
7. Run Frontend:
   ```bash
   npm run dev
   ```
---

## Notes:

The .env files and keys are left in the repo intentionally to ensure seamless evaluation.

--- 

## Contact

If you have any questions or feedback, feel free to reach out:
- **Author**: Sriram Sridhar
- **Email**: [your-email@example.com] (replace with your actual email address)

---

Thank you for exploring Fiyge FormBuilder!

