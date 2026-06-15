# Social App

A full-stack social media application built with the MERN Stack (MongoDB, Express.js, React.js, Node.js). Users can create accounts, share posts with text and images, like posts, comment on posts, and interact with a public feed.

---

## Features

### Authentication

* User Registration
* User Login
* JWT-based Authentication
* Protected Routes

### Posts

* Create text posts
* Upload images with Cloudinary
* Create posts with text, image, or both
* View all posts in a public feed
* Relative timestamps (e.g., "2 minutes ago")

### Likes

* Like and Unlike posts
* View total likes
* Display usernames of users who liked a post

### Comments

* Add comments to posts
* View total comments
* Display usernames of commenters
* Toggle comments visibility

### Feed

* Public feed displaying all posts
* Posts sorted by latest first
* Pagination support
* Loading states
* Empty feed state

### UI & UX

* Responsive design
* User avatars generated from usernames
* Image preview before upload
* Clean and modern interface
* Mobile-friendly layout

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* CSS3

### Backend

* Node.js
* Express.js
* JWT Authentication
* Multer

### Database

* MongoDB
* Mongoose

### Cloud Storage

* Cloudinary

---

## Project Structure

### Frontend

```text
frontend/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── CreatePost.jsx
│   │   └── PostCard.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── Feed.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   └── css/
│
└── package.json
```

### Backend

```text
backend/
│
├── src/
│   ├── config/
│   │   ├── dbConnect.js
│   │   └── cloudinary.js
│   │
│   ├── controller/
│   │   ├── authController.js
│   │   └── postController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── upload.js
│   │
│   ├── models/
│   │   ├── user.js
│   │   └── post.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── postRoutes.js
│   │
│   └── server.js
│
└── package.json
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd Social_App
```

---

## Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a .env file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUD_NAME=your_cloudinary_cloud_name

CLOUD_API_KEY=your_cloudinary_api_key

CLOUD_API_SECRET=your_cloudinary_api_secret
```

Run backend:

```bash
npm run dev
```

---

## Frontend Setup

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

---

## API Endpoints

### Authentication

#### Register

```http
POST /api/register
```

#### Login

```http
POST /api/login
```

---

### Posts

#### Create Post

```http
POST /api/
```

#### Get All Posts

```http
GET /api/
```

#### Like / Unlike Post

```http
PUT /api/:id/like
```

#### Add Comment

```http
POST /api/:id/comment
```

---

## Database Models

### User

```js
{
  name: String,
  email: String,
  password: String
}
```

### Post

```js
{
  user: ObjectId,
  message: String,
  image: {
    public_id: String,
    url: String
  },
  likes: [ObjectId],
  comments: [
    {
      user: ObjectId,
      text: String
    }
  ]
}
```

---

## Future Improvements

* User Profiles
* Follow/Unfollow System
* Real-time Notifications
* Real-time Chat
* Edit Posts
* Delete Comments
* Dark Mode
* Infinite Scrolling
* Search Users and Posts

---

## Author

Mohit Chauhan

MERN Stack Developer
"# Social_app" 
