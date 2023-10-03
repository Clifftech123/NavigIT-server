

# Student Connect API

Welcome to the Student Connect API! This repository contains an API for the Student Connect platform, which is a social media platform for students to connect with each other and share their ideas and thoughts. The aim is to connect students across the world and help them learn from each other.

## API Documentation

This documentation provides details about the available API endpoints, their functionality, request parameters, and responses.

### Base URL

The base URL for all API endpoints is:

```
https://api.studentconnect.com/v1/
```

### Authentication

To access most of the API endpoints, you need to be authenticated. Authentication is achieved using JSON Web Tokens (JWT). Obtain a token by logging in and include it in the `Authorization` header of your requests.

Example Authorization Header:

```
Authorization: Bearer your_jwt_token_here
```

### Endpoints

#### User Profiles

##### Get User Profile

- **Endpoint**: `GET /api/user/profile/{userId}`
- **Description**: Retrieve a user's profile information by their `userId`.
- **Parameters**:
  - `userId` (URL Parameter): The unique identifier of the user.
- **Response**:
  - Status Code: `200 OK`
  - Body: JSON representation of the user's profile.

**Example Request:**

```http
GET /api/user/profile/123
```

**Example Response:**

```json
{
  "id": 123,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "education": "Computer Science",
  "interests": ["Programming", "Machine Learning"]
}
```

#### Posts

##### Create a Post

- **Endpoint**: `POST /api/posts`
- **Description**: Create a new post.
- **Parameters**:
  - `title` (Request Body): The title of the post.
  - `content` (Request Body): The content of the post.
- **Response**:
  - Status Code: `201 Created`
  - Body: JSON representation of the created post.

**Example Request:**

```http
POST /api/posts
Content-Type: application/json

{
  "title": "Introduction to API Documentation",
  "content": "In this post, we'll learn how to document APIs effectively."
}
```

**Example Response:**

```json
{
  "id": 456,
  "title": "Introduction to API Documentation",
  "content": "In this post, we'll learn how to document APIs effectively."
}
```

#### Comments

##### Create a Comment

- **Endpoint**: `POST /api/comments`
- **Description**: Create a new comment on a post.
- **Parameters**:
  - `postId` (Request Body): The ID of the post where the comment will be added.
  - `content` (Request Body): The content of the comment.
- **Response**:
  - Status Code: `201 Created`
  - Body: JSON representation of the created comment.

**Example Request:**

```http
POST /api/comments
Content-Type: application/json

{
  "postId": 456,
  "content": "Great explanation! Thanks for sharing."
}
```

**Example Response:**

```json
{
  "id": 789,
  "postId": 456,
  "content": "Great explanation! Thanks for sharing."
}
```

### Error Handling

The API returns appropriate HTTP status codes and error messages for different scenarios. Refer to the [Error Handling](./ERROR_HANDLING.md) documentation for more details.

### Rate Limiting

To ensure fair usage of the API, rate limiting is enforced. Refer to the [Rate Limiting](./RATE_LIMITING.md) documentation for rate limit details.

### Feedback and Support

If you have any questions or need support, please contact [Isaiah Clifford Opoku](mailto:opokuisaiahclifford123@gmil.com).

I hope this helps! Let me know if you have any further questions or if there's anything else I can do for you.
