# 🔐 Authentication & Role-Based Access Control System

Complete authentication and authorization system for SSR-DEV with role-based access control, secure password hashing, session management, and user administration.

## 📋 Features Implemented

✅ **User Authentication**
- Email & password login/register
- Secure password hashing with bcrypt
- JWT token-based session management
- Token expiration (7 days)
- Automatic logout on token expiry

✅ **Role-Based Access Control (RBAC)**
- **Admin Role**
  - Full access to admin dashboard
  - User management (create, view, edit, delete, disable/enable users)
  - Change user roles
  - Access to all content and features
  
- **Member Role**
  - Can log in and view member content
  - Cannot modify or delete content
  - Cannot access admin dashboard
  - Basic user profile access

✅ **Protected Routes**
- Admin panel - requires admin role
- Automatic redirect to login for unauthorized users
- Automatic redirect from login page if already authenticated

✅ **User Management Dashboard**
- View all registered users
- Change user roles (member ↔ admin)
- Enable/disable user accounts
- Delete user accounts
- User statistics (total users, admins, active users)

✅ **Security Features**
- Password hashing with bcrypt (10 salt rounds)
- JWT authentication with secret key
- Protected API endpoints with middleware
- CORS enabled for frontend communication
- Token cleanup on logout
- Prevention of self-demotion by admins

## 🚀 Quick Start

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the server
npm start

# For development with auto-reload
npm run dev
```

Backend runs on: `http://localhost:5000`

### Frontend Setup

```bash
# Install dependencies (if not done)
npm install

# Start development server
npm run dev
```

Frontend runs on: `http://localhost:5173`

## 📝 Demo Credentials

Use these accounts to test the system:

**Admin Account:**
- Email: `admin@ssrdev.com`
- Password: `admin123`
- Role: Administrator (full access)

**Member Account:**
- Email: `member@ssrdev.com`
- Password: `member123`
- Role: Member (limited access)

## 🏗️ System Architecture

### Frontend Structure
```
src/
├── context/
│   └── AuthContext.jsx          # Global auth state management
├── hooks/
│   ├── useAuth.js               # Custom hook for auth context
│   └── useFadeIn.js             # Existing fade-in hook
├── services/
│   └── api.js                   # API client with axios
├── components/
│   ├── ProtectedRoute.jsx       # Route protection wrapper
│   ├── Navbar.jsx               # Updated with auth display
│   └── [other existing components]
├── pages/
│   ├── LoginPage.jsx            # Updated with auth logic
│   ├── AdminPage.jsx            # Updated with user management
│   └── [other pages]
└── App.jsx                      # Updated with route protection
```

### Backend Structure
```
backend/
├── server.js                    # Express server initialization
├── package.json
├── .env                         # Environment variables
├── routes/
│   └── auth.js                  # Authentication endpoints
├── middleware/
│   └── auth.js                  # JWT & authorization middleware
└── models/
    └── User.js                  # User data model
```

## 🔌 API Endpoints

### Public Endpoints

**POST** `/api/auth/login`
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
Response: `{ success: true, data: { token, user } }`

**POST** `/api/auth/register`
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**POST** `/api/auth/logout` (Protected)
- Logout current user

**GET** `/api/auth/me` (Protected)
- Get current user info

### Admin-Only Endpoints

**GET** `/api/auth/users` (Admin only)
- Get all users

**GET** `/api/auth/users/:id` (Admin only)
- Get specific user by ID

**PUT** `/api/auth/users/:id` (Admin only)
- Update user details
```json
{
  "name": "Updated Name",
  "email": "newemail@example.com",
  "password": "newpassword123",
  "role": "admin",
  "isActive": true
}
```

**DELETE** `/api/auth/users/:id` (Admin only)
- Delete user permanently

**PATCH** `/api/auth/users/:id/disable` (Admin only)
- Disable user account

**PATCH** `/api/auth/users/:id/enable` (Admin only)
- Enable disabled user account

**PATCH** `/api/auth/users/:id/role` (Admin only)
```json
{
  "role": "admin"  // or "member"
}
```

## 🛡️ Protected Routes

### Current Protected Pages

- **Admin Dashboard** (`/admin`)
  - Required role: `admin`
  - Shows: Dashboard + User Management
  - Features: User CRUD operations, role management

### How to Protect New Pages

Edit [App.jsx](../src/App.jsx) and add page to protection arrays:

```jsx
// For admin-only pages
const ADMIN_PAGES = ['admin', 'new-admin-page'];

// For member-only pages (members + admins)
const MEMBER_PAGES = ['member-content'];
```

Then in the render logic, the `ProtectedRoute` component will handle access:

```jsx
{isAdminPage ? (
  <ProtectedRoute 
    Component={PageComponent} 
    requiredRoles={['admin']} 
    handlePageChange={handlePageChange}
  />
) : ...
```

## 🔑 Using Authentication in Components

### Example: Check if user is authenticated

```jsx
import { useAuth } from './hooks/useAuth.js';

function MyComponent() {
  const { isAuthenticated, user, isAdmin, isMember } = useAuth();

  if (isAuthenticated) {
    return <div>Hello {user.name}!</div>;
  }
  
  return <div>Please log in</div>;
}
```

### Example: Protected Call to Admin API

```jsx
import { authService } from './services/api.js';
import { useAuth } from './hooks/useAuth.js';

function AdminFeature() {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <div>Admin access required</div>;
  }

  const handleGetUsers = async () => {
    const response = await authService.getAllUsers();
    console.log(response.data);
  };

  return <button onClick={handleGetUsers}>Get Users</button>;
}
```

## 🔐 Security Measures

### Password Security
- Bcrypt hashing with 10 salt rounds
- Never returns password in API responses
- Minimum 6 characters (enforced on backend)

### Token Management
- JWT tokens with 7-day expiration
- Bearer token format in Authorization header
- Automatic token refresh on API calls
- Token cleanup on logout

### Authorization
- All admin endpoints require admin role
- Token validation on every protected route
- User status check (disabled users can't access)
- Request validation and sanitization

### API Security
- CORS enabled for frontend communication only
- Request body validation
- Error messages don't leak sensitive info
- Rate limiting recommended for production

## 📊 User Data Model

```javascript
{
  id: number,
  email: string,
  password: string (hashed),
  name: string,
  role: 'admin' | 'member',
  isActive: boolean,
  createdAt: date
}
```

## 🔄 Authentication Flow

1. **Login**
   - User enters email & password
   - Backend validates credentials
   - Backend generates JWT token
   - Token stored in localStorage
   - User redirected to home (or admin dashboard if admin)

2. **API Requests**
   - Token automatically attached to headers
   - Backend verifies token signature
   - Checks user permissions
   - Returns data or 401/403 error

3. **Route Protection**
   - App checks isAuthenticated state
   - Compares user.role with required roles
   - Allows or redirects to login page

4. **Logout**
   - Token removed from localStorage
   - Auth state cleared
   - User redirected to home page

## ⚙️ Configuration

### Backend (.env)
```
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-in-production
CLIENT_URL=http://localhost:5173
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000/api
```

## 📌 Important Notes

### Production Deployment

Before deploying to production:

1. **Change JWT_SECRET**
   - Update `JWT_SECRET` in `backend/.env`
   - Use a strong, random string

2. **Enable HTTPS**
   - Ensure API communication uses HTTPS
   - Update CORS origins to production domain

3. **Use Real Database**
   - Current implementation uses in-memory storage
   - Data is lost when server restarts
   - Replace with MongoDB, PostgreSQL, etc.

4. **Add Rate Limiting**
   - Prevent brute force login attempts
   - Use packages like `express-rate-limit`

5. **Implement Token Blacklisting**
   - Currently, tokens aren't blacklisted on logout
   - Add Redis for token blacklist in production

### Data Persistence

Current implementation stores users in memory. To persist data:

```javascript
// In production, replace User.js with database queries
// Examples:
// - MongoDB with Mongoose
// - PostgreSQL with Prisma or Knex
// - Firebase Firestore
// - etc.
```

## 🐛 Troubleshooting

### "Token not provided" error
- Ensure token is stored in localStorage
- Check browser DevTools > Application > Local Storage
- Try logging in again

### "Invalid token" error
- Token may have expired (7 days)
- Clear localStorage and log in again

### CORS errors
- Verify backend is running on `http://localhost:5000`
- Check `CLIENT_URL` in backend .env matches frontend URL

### Admin panel not accessible
- Verify logged-in user has admin role
- Check in browser DevTools > Console for errors

## 📚 Additional Resources

- [JWT Introduction](https://jwt.io/introduction)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Express.js](https://expressjs.com/)
- [React Context API](https://react.dev/reference/react/useContext)

## ✨ Next Steps

To enhance this system, consider:

1. **Email Verification** - Verify email before account activation
2. **Password Reset** - Allow users to reset forgotten passwords
3. **Two-Factor Authentication** - Add SMS/authenticator app 2FA
4. **Activity Logging** - Track admin actions
5. **Account Lockout** - Lock account after failed login attempts
6. **Profile Management** - Allow users to update their profiles
7. **Audit Trail** - Log who changed what and when
8. **Session Management** - Multiple session tracking

---

**Last Updated:** February 27, 2026
**Version:** 1.0.0 - Initial Release
