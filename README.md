# Firebase Blog

A modern, full-stack blogging platform built with React and Firebase. Users can authenticate with Google, create blog posts, and interact with content through a like/unlike system. All data is stored in real-time using Firebase Firestore.

## ✨ Features

### 🔐 Authentication
- **Google Sign-In**: Seamless authentication using Google OAuth via Firebase Auth
- **User Profile Display**: Shows authenticated user's name and profile photo in the navbar
- **Sign Out**: Users can log out with a single click
- **Protected Routes**: Create post functionality only available to authenticated users

### 📝 Post Management
- **Create Posts**: Authenticated users can create blog posts with title and description
- **View All Posts**: Home page displays all posts from Firestore database in real-time
- **Post Information**: Each post displays title, description, and author username
- **Form Validation**: Built-in validation using Yup schema validation to ensure required fields

### 👍 Interactive Like System
- **Like/Unlike Posts**: Users can like or unlike any post
- **Real-time Like Counter**: Displays the total number of likes for each post
- **User-specific Like Status**: Shows thumbs up (👍) if user hasn't liked, thumbs down (👎) if already liked
- **Persistent Likes**: All likes stored in Firestore and persist across sessions

### 🧭 Navigation
- **Dynamic Navbar**: Navigation links change based on authentication state
  - Not authenticated: Shows "Home" and "Login" links
  - Authenticated: Shows "Home" and "Create Post" links
- **Responsive Design**: Clean and intuitive user interface

## 🛠️ Technologies Used

### Frontend
- **React** (v18.3.1) - UI library with TypeScript support
- **TypeScript** (v4.9.5) - Static type checking
- **React Router DOM** (v6.27.0) - Client-side routing
- **React Hook Form** (v7.53.1) - Form handling and validation
- **Yup** (v1.4.0) - Schema validation for forms
- **@hookform/resolvers** (v3.9.0) - Integration between React Hook Form and Yup

### Backend & Database
- **Firebase** (v10.14.1) - Backend-as-a-Service platform
  - **Firebase Authentication** - Google OAuth authentication
  - **Cloud Firestore** - NoSQL real-time database for posts and likes
- **react-firebase-hooks** (v5.1.1) - React hooks for Firebase services

### Build & Development
- **React Scripts** (v5.0.1) - Build tooling and development server
- **Create React App** - Project scaffolding

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account with a project set up

### Setup Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/adithya-b-r/Firebase-Blog
   cd Firebase-Blog
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Firebase:**
   
   Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

   **To get your Firebase config:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project (or create a new one)
   - Go to Project Settings > General
   - Scroll down to "Your apps" and copy the config values

4. **Set up Firebase Services:**
   
   In your Firebase Console:
   - **Enable Authentication:**
     - Go to Authentication > Sign-in method
     - Enable Google as a sign-in provider
   
   - **Create Firestore Database:**
     - Go to Firestore Database
     - Create database in production mode (or test mode for development)
     - Create two collections: `posts` and `likes`

5. **Start the development server:**
   ```bash
   npm start
   ```
   
   The app will open at [http://localhost:3000](http://localhost:3000)

6. **Build for production:**
   ```bash
   npm run build
   ```

## 🚀 Usage

### For Users

1. **Sign In:**
   - Click on "Login" in the navigation bar
   - Click "Sign In With Google" button
   - Authorize the application with your Google account

2. **Create a Post:**
   - After signing in, click "Create Post" in the navbar
   - Enter a title and description for your post
   - Both fields are required (validation enforced)
   - Click "Submit" to publish your post
   - You'll be redirected to the home page

3. **View Posts:**
   - Navigate to the home page
   - All posts are displayed with title, description, and author
   - Each post shows the total number of likes

4. **Like/Unlike Posts:**
   - Click the thumbs up icon (👍) to like a post
   - Click the thumbs down icon (👎) to unlike a post you've already liked
   - Like count updates in real-time

5. **Sign Out:**
   - Click the "Log Out" button in the navbar
   - Your session will end, and you'll be signed out

## 📁 Project Structure

```plaintext
Firebase-Blog/
├── public/
│   ├── index.html          # HTML template
│   ├── manifest.json       # PWA manifest
│   ├── user.png           # Default user avatar
│   └── ...
├── src/
│   ├── components/
│   │   └── navbar.tsx     # Navigation bar with auth state
│   ├── config/
│   │   └── firebase.ts    # Firebase configuration and initialization
│   ├── pages/
│   │   ├── create-post/
│   │   │   ├── create-form.tsx   # Form component with validation
│   │   │   └── create-post.tsx   # Create post page wrapper
│   │   ├── main/
│   │   │   ├── main.tsx          # Home page displaying all posts
│   │   │   └── post.tsx          # Individual post component with like system
│   │   └── login.tsx             # Login page with Google auth
│   ├── App.tsx            # Main app component with routing
│   ├── App.css            # Global styles
│   └── index.tsx          # App entry point
├── .env                   # Environment variables (not in repo)
├── .gitignore
├── firebase.json          # Firebase hosting configuration
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
└── README.md
```

## 🔥 Firebase Configuration

### Firestore Collections

**posts** collection:
```javascript
{
  title: string,
  description: string,
  username: string,
  userId: string
}
```

**likes** collection:
```javascript
{
  postId: string,
  userId: string
}
```

### Security Rules (Recommended)

Add these rules in Firebase Console under Firestore Database > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    match /likes/{likeId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

## 🌐 Deployment

This project is configured for Firebase Hosting.

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase:**
   ```bash
   firebase login
   ```

3. **Initialize Firebase Hosting:**
   ```bash
   firebase init hosting
   ```

4. **Build and deploy:**
   ```bash
   npm run build
   firebase deploy
   ```

### Live Demo
🔗 [https://pedro-react-15aa8.web.app/](https://pedro-react-15aa8.web.app/)

## 📝 Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🔑 Key Implementation Details

### Authentication Flow
- Uses Firebase Auth with Google provider
- `react-firebase-hooks` provides `useAuthState` hook for auth state management
- Navbar dynamically updates based on authentication status

### Form Validation
- Yup schema ensures both title and description are required
- React Hook Form handles form state and submission
- Error messages displayed inline for better UX

### Real-time Data
- Firestore provides real-time updates for posts and likes
- Posts fetched on component mount using `getDocs`
- Likes updated optimistically for immediate UI feedback

### Like System Implementation
- Separate `likes` collection with postId and userId
- Checks if current user has liked a post using query with `where` clause
- Adds/removes like document based on user action
- Updates local state for instant UI response

## 🐛 Troubleshooting

**Firebase Auth Error:**
- Ensure Google sign-in is enabled in Firebase Console
- Check that your Firebase API key is correct in `.env`

**Posts Not Showing:**
- Verify Firestore database is created
- Check Firestore rules allow read access
- Ensure `posts` collection exists

**Build Errors:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear cache: `npm cache clean --force`

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Adithya B R**
- GitHub: [@adithya-b-r](https://github.com/adithya-b-r)

## 🙏 Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- Powered by [Firebase](https://firebase.google.com/)
- Tutorial inspired by [PedroTech](https://www.youtube.com/@PedroTechnologies)
