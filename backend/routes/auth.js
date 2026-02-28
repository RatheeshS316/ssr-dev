import express from 'express';
import { User } from '../models/User.js';
import { generateToken, authenticate, isAdmin, isMember } from '../middleware/auth.js';

const router = express.Router();

// Register new user (Admin can register users, or public registration with member role)
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, and name are required',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    }

    // Create user (default role is 'member')
    const user = await User.create(email, password, name, role || 'member');
    const token = generateToken(user.id, user.email, user.role);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // Find user
    const user = User.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been disabled',
      });
    }

    // Verify password
    const isPasswordValid = await User.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate token
    const token = generateToken(user.id, user.email, user.role);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: userWithoutPassword,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get current user (protected route)
router.get('/me', authenticate, (req, res) => {
  try {
    const user = User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Logout (client-side token deletion, but we can do token blacklisting in production)
router.post('/logout', authenticate, (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful',
  });
});

// ========== ADMIN ROUTES ==========

// Get all users (Admin only)
router.get('/users', authenticate, isAdmin, (req, res) => {
  try {
    const users = User.getAllUsers();
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get specific user (Admin only)
router.get('/users/:id', authenticate, isAdmin, (req, res) => {
  try {
    const user = User.findById(parseInt(req.params.id));
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Update user (Admin only)
router.put('/users/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const { email, name, password, role, isActive } = req.body;
    const userId = parseInt(req.params.id);

    // Prevent self-demotion from admin
    if (userId === req.user.userId && role && role !== 'admin') {
      return res.status(400).json({
        success: false,
        message: 'You cannot change your own role',
      });
    }

    const updates = {};
    if (email) updates.email = email;
    if (name) updates.name = name;
    if (password) updates.password = password;
    if (role) updates.role = role;
    if (isActive !== undefined) updates.isActive = isActive;

    const updatedUser = await User.update(userId, updates);

    res.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete user (Admin only)
router.delete('/users/:id', authenticate, isAdmin, (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    // Prevent self-deletion
    if (userId === req.user.userId) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account',
      });
    }

    User.delete(userId);

    res.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Disable user (Admin only)
router.patch('/users/:id/disable', authenticate, isAdmin, (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    // Prevent self-disabling
    if (userId === req.user.userId) {
      return res.status(400).json({
        success: false,
        message: 'You cannot disable your own account',
      });
    }

    const updatedUser = User.setStatus(userId, false);

    res.json({
      success: true,
      message: 'User disabled successfully',
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Enable user (Admin only)
router.patch('/users/:id/enable', authenticate, isAdmin, (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const updatedUser = User.setStatus(userId, true);

    res.json({
      success: true,
      message: 'User enabled successfully',
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Change user role (Admin only)
router.patch('/users/:id/role', authenticate, isAdmin, (req, res) => {
  try {
    const { role } = req.body;
    const userId = parseInt(req.params.id);

    if (!role) {
      return res.status(400).json({
        success: false,
        message: 'Role is required',
      });
    }

    // Prevent self-demotion from admin
    if (userId === req.user.userId && role !== 'admin') {
      return res.status(400).json({
        success: false,
        message: 'You cannot change your own role',
      });
    }

    const updatedUser = User.setRole(userId, role);

    res.json({
      success: true,
      message: 'User role updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
