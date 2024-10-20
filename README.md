# Firebase React App

This project is a simple React application that integrates Firebase for authentication and real-time data management. Users can sign in using Google and create posts that are stored in Firestore.

## Features

- User authentication with Google
- Create, read, and delete posts
- Like functionality for posts

## Technologies Used

- React
- Firebase
- Redux (for state management)
- React Router (for routing)
- React Hook Form (for form handling)
- Yup (for form validation)

## Installation

To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   https://github.com/adithya-b-r/Firebase-Blog
   cd Firebase-Blog
   ```

2. Install the necessary dependencies:

   ```bash
   npm install firebase react-redux @reduxjs/toolkit react-router-dom react-firebase-hooks yup @hookform/resolvers
   ```

3. Create a `.env` file in the root of your project and add your Firebase configuration:

   ```plaintext
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

4. Start the development server:

   ```bash
   npm start
   ```

## Usage

- Navigate to the **Login** page to sign in with Google.
- After logging in, you can create posts on the **Create Post** page.
- The **Main** page displays all posts, allowing users to like and view posts.

## Code Snippets

### App Component

The main application component sets up routing and navigation.

```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main } from './pages/main/main';
import { Login } from './pages/login';
import { Navbar } from './components/navbar';
import { CreatePost } from './pages/create-post/create-post';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createpost" element={<CreatePost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
```

### Login Component

The login component allows users to sign in with Google.

```javascript
import { auth, provider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate('/');
  };

  return (
    <div>
      <p>Sign In With Google To Continue</p>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  );
};
```

### Creating Posts

The Create Form component handles the creation of new posts using a form.

```javascript
import { useForm } from 'react-hook-form';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';

export const CreateForm = () => {
  const { register, handleSubmit } = useForm();

  const postRef = collection(db, 'posts');

  const onCreatePost = async (data) => {
    await addDoc(postRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <input placeholder='Title...' {...register("title")} />
      <textarea placeholder='Description...' {...register("description")} />
      <input type="submit" />
    </form>
  );
};
```

## Folder Structure

```plaintext
src
├── components
│   └── navbar.tsx          # Navigation bar component
├── config
│   └── firebase.ts         # Firebase configuration and initialization
├── pages
│   ├── create-post         # Create Post page
│   │   ├── create-form.tsx # Form for creating posts
│   ├── login.tsx           # Login page
│   └── main
│       └── main.tsx        # Main page displaying posts
└── App.tsx                 # Main application component
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.
