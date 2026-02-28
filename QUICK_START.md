# 🚀 Quick Start Guide - SSR Dev Website

## **Getting Started in 30 Seconds**

### 1. **Start the Servers**
```bash
# Terminal 1 - Frontend
cd d:/SSR-DEV && npm run dev

# Terminal 2 - Backend  
cd d:/SSR-DEV/backend && npm start
```

### 2. **Open in Browser**
- Frontend: http://localhost:5173
- All APIs working: http://localhost:5000/health

### 3. **Test Credentials**
- **Admin**: admin@ssrdev.com / admin123
- **Member**: member@ssrdev.com / member123

---

## **🎯 What You Can Do**

### As a **Visitor** (No login)
- ✅ View home page with recent projects
- ✅ Browse portfolio
- ✅ Read approved reviews
- ✅ See company history
- ✅ View team members

### As a **Member** (Login required)
- ✅ Do everything visitors can do
- ✅ Submit reviews (pending approval)
- ✅ Edit/delete own reviews
- ✅ View submission status

### As an **Admin** (Login required)
- ✅ Do everything members can do
- ✅ **Dashboard**: View stats & recent activity
- ✅ **Projects**: Create/delete projects
- ✅ **Reviews**: Approve & manage reviews
- ✅ **Users**: Manage user roles & accounts
- ✅ Update company information

---

## **📁 Admin Dashboard Tabs**

### **📊 Dashboard**
- View statistics (projects, clients, rating)
- See recent project activity
- Quick action buttons

### **👥 Users**
- List all registered users
- Change roles (member ↔ admin)
- Disable/enable users
- Delete users
- View user statistics

### **📁 Projects**
- View recent projects
- **New Project** button to create
- Delete projects
- Project counter

### **⭐ Reviews**
- View all reviews (approved + pending)
- **Approve** button for pending reviews
- **Delete** reviews
- Review statistics

---

## **🔗 Key Pages & URLs**

| Page | URL | Features |
|------|-----|----------|
| Home | `/` | Recent projects, reviews, team |
| Portfolio | `/portfolio` | All portfolio projects |
| Reviews | `/review` | Approved reviews + submission form |
| History | `/history` | Company info & achievement list |
| Learn More | `/team` | Team members info |
| Login | `/login` | Authentication |
| Admin | `/admin` | Dashboard with 4 management tabs |

---

## **📊 Sample Data Included**

The website comes pre-populated with:

**📁 Recent Projects (3)**
- E-Commerce Platform
- AI Chatbot Solution
- College Management System

**🎨 Portfolio Projects (3)**
- Restaurant Booking App
- Resume Analyzer AI
- Real Estate Portal

**⭐ Reviews (4)**
- All approved, showing 5★ and 4★ ratings

**🏢 Company Info**
- Mission & vision statements
- Founded: 2023
- 5 key achievements

---

## **🧪 Quick Tests**

### Verify Everything Works
```bash
# Run API verification tests
npm run test    # or
node test-integration.js
```

### Re-seed Sample Data
```bash
# Reset database and reload sample data
node seed-data.js
```

---

## **💡 Pro Tips**

1. **For Testing** - Use the provided demo accounts
2. **Admin Actions** - Go to Admin Dashboard (after login)
3. **Add Projects** - Admin Dashboard → Projects tab → New Project
4. **Approve Reviews** - Admin Dashboard → Reviews tab
5. **Check API** - Open browser DevTools → Network tab to see API calls

---

## **🆘 Troubleshooting**

### Ports Already in Use?
```bash
# PowerShell
Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Stop-Process -Force
```

### Backend not responding?
```bash
# Check health
curl http://localhost:5000/health
```

### Frontend showing blank?
- Clear browser cache (Ctrl+Shift+Del)
- Hard refresh (Ctrl+F5)
- Check console for errors

---

## **📱 Feature Checklist**

- [x] Authentication & login
- [x] Role-based access (Admin/Member)
- [x] Project management
- [x] Review system
- [x] Company information
- [x] Admin dashboard
- [x] Multiple pages
- [x] API integration
- [x] Sample data
- [x] Error handling

---

## **🎓 Learning Resources**

The code demonstrates:
- React Context API for state management
- JWT-based authentication
- Express.js API development
- CORS handling
- Axios interceptors
- bcrypt password hashing
- Role-based access control
- Form validation

---

**Ready to use! 🚀**

For detailed documentation, see `IMPLEMENTATION_COMPLETE.md`
