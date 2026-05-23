# DevPulse – Internal Tech Issue & Feature Tracker

A collaborative platform for software teams to report bugs, suggest features, and coordinate resolutions.

---

## 🚀 Live URL

- Backend: https://b7-a2-tau.vercel.app/

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
├── config/
│   ├── db.ts
│   └── env.ts
│
├── middleware/
│   ├── authMiddleware.ts
│   └── modules/
│
├── auth/
│   ├── auth.controller.ts
│   ├── auth.routes.ts
│   └── auth.service.ts
│
├── issues/
│   ├── issues.controller.ts
│   ├── issues.routes.ts
│   └── issues.service.ts
│
├── users/
│   ├── users.controller.ts
│   ├── users.route.ts
│   └── users.service.ts
│
├── types/
│   ├── auth.types.ts
│   ├── express.d.ts
│   ├── issue.types.ts
│   └── user.types.ts
│
├── utils/
│   ├── errorHandler.ts
│   ├── queryBuilder.ts
│   └── sendResponse.ts
│
├── app.ts
├── server.ts
├── env
│
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
├── tsup.config.ts
└── vercel.json
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



```
### Get All Issues

```http
GET /api/issues
#### Response

```json
{
  "success": true,
  "message": "Issues retrieved successfully",
  "data": [
    {
      "_id": "664f1c2a9b2f4d0012345678",
      "title": "Login page bug",
      "description": "Users cannot login with Google account",
      "status": "open",
      "priority": "high",
      "createdBy": "664f1b8c9b2f4d0012341111",
      "createdAt": "2026-05-23T18:20:00.000Z",
      "updatedAt": "2026-05-23T18:20:00.000Z"
    },

  ]
}
```

---

### Filter & Sort Issues

```http
GET /api/issues?sort=newest&type=bug
```

#### Query Parameters

| Parameter | Type   | Description                  |
| ---------- | ------ | ---------------------------- |
| sort       | string | Sort issues by newest/oldest |
| type       | string | Filter issues by type        |

#### Response

```json
{
  "success": true,
  "message": "Filtered issues retrieved successfully",
  "data": [
    {
      "_id": "664f1c2a9b2f4d0012345678",
      "title": "Login page bug",
      "description": "Users cannot login with Google account",
      "type": "bug",
      "status": "open",
      "priority": "high",
      "createdBy": "664f1b8c9b2f4d0012341111",
      "createdAt": "2026-05-23T18:20:00.000Z",
      "updatedAt": "2026-05-23T18:20:00.000Z"
    },

  ]
}
```
# 📄 Get Single Issue

## Endpoint

```http
GET /api/issues/:id
```

## Example Request

```http
GET /api/issues/664f1c2a9b2f4d0012345678
```

## Response

```json
{
  "success": true,
  "message": "Issue retrieved successfully",
  "data": {
    "_id": "664f1c2a9b2f4d0012345678",
    "title": "Login page bug",
    "description": "Users cannot login with Google account",
    "type": "bug",
    "status": "open",
    "priority": "high",
    "createdBy": "664f1b8c9b2f4d0012341111",
    "createdAt": "2026-05-23T18:20:00.000Z",
    "updatedAt": "2026-05-23T18:20:00.000Z"
  }
}
```
---

# ✏️ Update Issue

## Endpoint

```http
PATCH /api/issues/:id
```

## Example Request

```http
PATCH /api/issues/664f1c2a9b2f4d0012345678
```

## Headers

```http
Authorization: <JWT_TOKEN>
Content-Type: application/json
```

## Request Body

```json
{
  "title": "Updated login issue",
  "status": "in-progress",
  "priority": "medium"
}
```

## Response

```json
{
  "success": true,
  "message": "Issue updated successfully",
  "data": {
    "_id": "664f1c2a9b2f4d0012345678",
    "title": "Updated login issue",
    "description": "Users cannot login with Google account",
    "type": "bug",
    "status": "in-progress",
    "priority": "medium",
    "createdBy": "664f1b8c9b2f4d0012341111",
    "createdAt": "2026-05-23T18:20:00.000Z",
    "updatedAt": "2026-05-24T08:10:00.000Z"
  }
}
```

---

# 🗑️ Delete Issue

## Endpoint

```http
DELETE /api/issues/:id
```

## Example Request

```http
DELETE /api/issues/664f1c2a9b2f4d0012345678
```

## Headers

```http
Authorization: <JWT_TOKEN>
```

## Response

```json
{
  "success": true,
  "message": "Issue deleted successfully"
}
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

# 📦 Response Structure

## ✅ Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

---

## ❌ Error Response

```json
{
  "success": false,
  "message": "Something went wrong",
  "errors": {}
}
```

---

# 📥 Request Body Example

```json
{
  "title": "Database timeout issue",
  "description": "Database crashes under heavy load",
  "type": "bug"
}
```



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

# 👨‍💻 Author

Mohaimenul islam

---

# 📄 License

This project is created for educational and assignment purposes.