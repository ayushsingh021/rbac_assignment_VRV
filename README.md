# Role Based Access Control For a Task management app

A feature-rich Role Based Access Control For a Task management application built using React.js, Firebase, and TailwindCSS. This app supports real-time updates, role-based permissions, and CRUD operations for managing todos efficiently.

---

## Credentials to Login: Explore the Application :) (See Demo Video)

- **Admin**: Use --> Email : test@admin.com , Password : 123456
- **Users**: Use --> Email : user1@admin.com , Password : 123456
  Email : user2@admin.com , Password : 123456
- **You Can Create as many users as possible (From SignUp) with different email ids and password and from admin you can make users admin also**:
  - Admins can access an admin dashboard.
  - Permissions control read/write access to todos.
- **CRUD Operations**: Add, update, mark complete, and delete todos.
  - Users can access only those features of CRUD that Admin given to them.
  - Permissions control read/write access to todos.

---

---

## Features

- **Authentication**: Secure login and logout using Firebase Authentication.
- **Real-Time Updates**: Todos are synced with Firebase Firestore, allowing changes to reflect instantly across devices.
- **Role-Based Access Control**:
  - Admins can access an admin dashboard.
  - Permissions control read/write access to todos.
- **CRUD Operations**: Add, update, mark complete, and delete todos.
- **Responsive Design**: Fully responsive UI built with TailwindCSS.
- **User-Friendly Interface**: Hover tooltips for better accessibility and disabled buttons with feedback when permissions are restricted.
- **User-Interaction History**: Complete interaction history of user of any updation or creation is stored in firebase database

---

## Demo

[![Demo Video](https://drive.google.com/file/d/1AFCQUNUcb1XqfGTq6r-utZAtkJLrrLV3/view?usp=sharing)](https://drive.google.com/file/d/1AFCQUNUcb1XqfGTq6r-utZAtkJLrrLV3/view?usp=sharing)

---

## Tech Stack

### Frontend:

- React.js
- TailwindCSS
- React Router

### Backend:

- Firebase Authentication
- Firebase Firestore

---

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- Firebase account and project setup

### Steps to Run Locally

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ayushsingh021/rbac_assignment_VRV.git
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Setup Firebase Configuration**

   - Create a `.env` file in the root directory.
   - Add your Firebase project configuration:
     ```env
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     ```

4. **Start the Development Server**

   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## File Structure

```
📂 src
├── 📂 components
│   ├── 📂 TodoForm
│   │   ├── TodoForm.jsx
│   │   └── TodoItems.jsx
├── 📂 context
│   ├── AuthContext.jsx
│   └── TodoContext.jsx
├── 📂 pages
│   ├── AdminPage.jsx
│   └── TodoPage.jsx
├── 📂 utils
│   └── permissions.js
├── App.jsx
└── index.js
```

---

## Roles and Permissions

- **Admin**:
  - Full access to all features, including the Admin dashboard.
- **Regular User**:
  - Can read and modify their todos based on permissions (`read`, `write`).
- **Guests**:
  - Cannot access any todos.

---

## Contribution Guidelines

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m "Add new feature"`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- [React.js Documentation](https://reactjs.org/docs/getting-started.html)
- [Firebase Documentation](https://firebase.google.com/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

---

## Contact

For questions or suggestions, feel free to reach out:

- **Email**: ayush.singh0943@gmail.com
- **GitHub**: [Ayush Singh](https://github.com/ayushsingh021)
- **LinkedIn**: [Ayush Singh](https://www.linkedin.com/in/contactayushsingh/)
