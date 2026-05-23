# DevPulse – Internal Tech Issue & Feature Tracker

A collaborative platform for software teams to report bugs, suggest features, and coordinate resolutions.

---

## 🚀 Live URL

- Client: https://your-client-url.com
- Server: https://your-server-url.com

---

# 📌 Project Overview

DevPulse is a role-based issue tracking system where software teams can:

- Report bugs
- Request new features
- Manage issue workflows
- Collaborate efficiently

The project uses secure JWT authentication, PostgreSQL database, and raw SQL queries without any ORM or query builder.

---

# ✨ Features

## 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Password Hashing with bcrypt
- Protected Routes
- Role-Based Authorization

## 🐞 Issue Management
- Create Issue
- Get All Issues
- Get Single Issue
- Update Issue
- Delete Issue
- Filter Issues
- Sort Issues

---

# 👥 User Roles

## Contributor
- Register & Login
- Create Issues
- View Issues
- Update Own Open Issues

## Maintainer
- All Contributor Permissions
- Update Any Issue
- Delete Any Issue
- Change Issue Status
- Access System Metrics

---

# 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| Node.js | Runtime |
| TypeScript | Type Safety |
| Express.js | Backend Framework |
| PostgreSQL | Database |
| pg | PostgreSQL Driver |
| bcrypt | Password Hashing |
| jsonwebtoken | JWT Authentication |
| dotenv | Environment Variables |
| cors | Cross-Origin Resource Sharing |

---

# 📂 Folder Structure

```bash
src/
│
├── app/
│   ├── config/
|   |    
│   ├── middlewares/
│   ├── modules/
│   │   ├── auth/
|   |   |── user/  
│   │   └── issues/
│   |
│   ├── types/
│   └── utils/
│
├── app.ts
└── server.ts
```   



# 🐞 Issue Endpoints

## Create Issue

### Endpoint

POST /api/issues

### Headers

Authorization: <JWT_TOKEN>

### Request Body

```json
{
  "title": "Database timeout issue",
  "description": "Database crashes under heavy load",
  "type": "bug"
}

# 📋 Get All Issues

## Endpoint

```http
GET /api/issues
```

---

## Query Parameters

| Parameter | Values |
|---|---|
| sort | newest / oldest |
| type | bug / feature_request |
| status | open / in_progress / resolved |

---

## Example

```http
GET /api/issues?sort=newest&type=bug
```

---

# 📄 Get Single Issue

## Endpoint

```http
GET /api/issues/:id
```

---

# ✏️ Update Issue

## Endpoint

```http
PATCH /api/issues/:id
```

## Headers

```http
Authorization: <JWT_TOKEN>
```

---

# 🗑️ Delete Issue

## Endpoint

```http
DELETE /api/issues/:id
```

## Headers

```http
Authorization: <JWT_TOKEN>
```

---

# 🔒 Authentication Flow

1. User registers an account  
2. User logs in with email & password  
3. Server validates credentials  
4. JWT token is generated  
5. Client stores token  
6. Token is sent in Authorization header  
7. Middleware verifies token before protected routes  

---

# ✅ Validation Rules

## User Validation

- Name is required
- Email must be unique
- Password is required
- Role must be:
  - contributor
  - maintainer

---

## Issue Validation

- Title is required
- Title max length: 150
- Description minimum length: 20
- Type must be:
  - bug
  - feature_request
- Status must be:
  - open
  - in_progress
  - resolved

---

# 📡 HTTP Status Codes

| Status Code | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

---

# 🔐 Security Features

- Password Hashing using bcrypt
- JWT Authentication
- Protected Routes
- Role-Based Authorization
- Sensitive Data Hidden from Responses
- Input Validation

---

# 🚀 Future Improvements

- Pagination
- Search Functionality
- Issue Comments
- File Upload Support
- Activity Logs
- Dashboard Analytics

---

## 🚀 Live URL

- Backend: https://your-backend-url.com

# 👨‍💻 Author

Mohaimenul islam

---

# 📄 License

This project is created for educational and assignment purposes.