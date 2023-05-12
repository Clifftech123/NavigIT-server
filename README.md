## Student Platform Backend

This repository contains the backend code for a student platform built with NestJS and PostgreSQL. The platform allows students to create an account, post questions, and interact with other students through comments. It provides features such as authentication, post management, comment management, and user access control.

# Features

- User Registration: Students can create an account using their email address and password or through Google authentication.
- User Login: Registered users can log in to access the platform's features.
- Post Creation: Logged-in users can create posts, sharing their questions, inspirations, and equations.
- Post Editing: Users have the ability to update and modify their own posts.
- Post Deletion: Users can delete their posts.
 - Commenting: Students can comment on posts to provide answers, insights, or discussions.
- Comment Editing: Users can edit their own comments.
- Comment Deletion: Users have the ability to remove their comments.
- Access Control: Certain actions (e.g., post creation, editing, deletion) are restricted to authenticated users only.
- Authorization: Role-based access control can be implemented to provide different levels of access (e.g., admin, moderator).
- PostgreSQL Integration: The backend utilizes a PostgreSQL database to store user data, posts, and comments.
- Pagination: The platform supports pagination to handle a large number of posts efficiently.


# Features  Student  Dashboard

The student dashboard provides an overview of the student's activities and information. It offers a personalized space where students can view and manage their account details, track their posts and comments, and access relevant information. Here are some features you can include in the student dashboard:

- Account Information: Display the student's profile picture, name, email address, and any other relevant information.
- Activity Summary: Provide a summary of the student's recent activities, such as the number of posts created, comments made, or likes received.
- Personalized Feed: Show a feed of the student's posts, comments, and interactions with other students' posts.
- Notifications: Notify the student about new comments, likes, or other relevant updates.
- Edit Profile: Allow students to update their profile information, including their profile picture, name, or any additional details.
- Change Password: Provide an option for students to change their account password.
- Logout: Enable students to securely log out of their account.

## Tech Stack

The backend of this project is built using the following technologies and frameworks:

- NestJS: A progressive Node.js framework for building efficient and scalable server-side applications.
- PostgreSQL: A powerful open-source relational database management system.
- TypeORM: An Object-Relational Mapping library for TypeScript and JavaScript.
- Passport: A popular authentication middleware for Node.js.
- JWT (JSON Web Tokens): A standard for securely transmitting information between parties as a JSON object.


## Getting Started

To get started, clone this repository to your local machine and install the dependencies using the following commands:

```bash
$ git clone

$ npm install
```

Next, create a `.env` file in the root directory of the project and add the following environment variables:

```bash

# Database

DB_HOST= # Your PostgreSQL host

DB_PORT= # Your PostgreSQL port

DB_USERNAME= # Your PostgreSQL username

DB_PASSWORD= # Your PostgreSQL password

DB_DATABASE= # Your PostgreSQL database name

# JWT

JWT_SECRET= # Your JWT secret key

# Google OAuth

GOOGLE_CLIENT_ID= # Your Google OAuth client ID


GOOGLE_CLIENT_SECRET= # Your Google OAuth client secret

GOOGLE_CALLBACK_URL= # Your Google OAuth callback URL

```

Finally, run the following command to start the server:

```bash


$ npm run start:dev
```

## API Endpoints

The following API endpoints are available:

- `POST /auth/register`: Creates a new user account.
- `POST /auth/login`: Logs in an existing user.
- `GET /auth/google`: Redirects the user to the Google OAuth page.
- `GET /auth/google/callback`: Handles the Google OAuth callback.
- `GET /posts`: Returns a list of posts.
- `GET /posts/:id`: Returns a single post.
- `POST /posts`: Creates a new post.
- `PATCH /posts/:id`: Updates an existing post.
- `DELETE /posts/:id`: Deletes an existing post.
- `GET /posts/:id/comments`: Returns a list of comments for a post.
- `GET /posts/:id/comments/:id`: Returns a single comment for a post.
- `POST /posts/:id/comments`: Creates a new comment for a post. 
- `PATCH /posts/:id/comments/:id`: Updates an existing comment for a post.
- `DELETE /posts/:id/comments/:id`: Deletes an existing comment for a post.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
