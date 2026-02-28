# 🚀 Quick Setup Guide

## Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

This installs:
- `express` - Web framework
- `cors` - Cross-origin requests
- `jsonwebtoken` - JWT token generation
- `bcrypt` - Password hashing
- `dotenv` - Environment variables

## Step 2: Start the Backend Server

```bash
# Option 1: Start once
npm start

# Option 2: Start with auto-reload (development)
npm run dev
```

You should see:
```
✓ Server running on http://localhost:5000
✓ CORS enabled for http://localhost:5173

📌 Demo Credentials:
   Admin:  admin@ssrdev.com / admin123
   Member: member@ssrdev.com / member123
```

## Step 3: Install Frontend Dependencies

```bash
# From root directory (d:/SSR-DEV)
npm install
```

This adds:
- `axios` - HTTP client for API requests

## Step 4: Start Frontend Development Server

```bash
npm run dev
```

Frontend runs on address shown in terminal (typically `http://localhost:5173`)

## Step 5: Test Authentication

1. **Open Frontend** - Go to `http://localhost:5173`
2. **Go to Login** - Click "Login" button in navbar
3. **Login as Admin** - Use `admin@ssrdev.com` / `admin123`
4. **Access Admin Panel** - Click "Admin Panel" in navbar
5. **Manage Users** - Click "User Management" tab to see CRUD operations

## File Structure

### What Was Created

**Backend:**
```
backend/
├── server.js                    # Main server file
├── package.json
├── .env                         # Configuration
├── routes/
│   └── auth.js                  # Login, register, user management
├── middleware/
│   └── auth.js                  # JWT verification & role checks
└── models/
    └── User.js                  # User data & operations
```

**Frontend:**
```
src/
├── context/AuthContext.jsx      # Auth state management
├── services/api.js              # API client
├── hooks/useAuth.js             # Auth hook
├── components/
│   ├── ProtectedRoute.jsx       # Route protection
│   └── Navbar.jsx               # Updated with auth
├── pages/
│   ├── LoginPage.jsx            # Updated with auth
│   └── AdminPage.jsx            # Updated with user management
├── App.jsx                      # Updated with auth
└── main.jsx                     # Wrapped with AuthProvider
```

**Config:**
```
.env.local                       # Frontend API URL
backend/.env                     # Backend configuration
```

## Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| "Cannot GET /api/auth/login" | Backend not running - run `npm start` in backend folder |
| "Module not found" | Run `npm install` in both root and backend directories |
| "CORS error" | Ensure backend is on port 5000 and frontend on 5173 |
| Always redirected to login | Clear localStorage or check token in DevTools |
| Can't access admin panel | Log in with admin account (admin@ssrdev.com) |

## How to Log In

1. Click **Login** in the navbar
2. Enter credentials:
   - **Admin**: admin@ssrdev.com / admin123
   - **Member**: member@ssrdev.com / member123
3. Click **Sign In**
4. If admin, you'll see **Admin Panel** button appear in navbar
5. Click it to access user management dashboard

## How to Manage Users (Admin)

1. Log in as admin
2. Click **Admin Panel** in navbar
3. Click **User Management** tab
4. You can:
   - Change user roles (click dropdown)
   - Disable/Enable users (toggle button)
   - Delete users (trash icon)
5. See stats: Total Users, Admins, Active Users

## Security Notes

⚠️ **For Development Only:**
- Passwords are stored in-memory (not persistent)
- JWT_SECRET is hardcoded
- No rate limiting

⚠️ **For Production:**
- Add real database (MongoDB, PostgreSQL, etc.)
- Use strong JWT_SECRET from environment
- Enable HTTPS
- Add rate limiting
- Use token blacklisting

## Next Steps

1. Read [AUTHENTICATION.md](./AUTHENTICATION.md) for full documentation
2. Customize demo users or add real user registration
3. Replace in-memory storage with a real database
4. Deploy to production following security guidelines

---

**Ready to test?** 
1. Start backend: `cd backend && npm install && npm start`
2. Start frontend: `npm install && npm run dev`
3. Go to `http://localhost:5173` and click Login
