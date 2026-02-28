import bcrypt from 'bcrypt';

// In-memory user store (in production, use a real database)
let users = [];
let userIdCounter = 1;

// Initialize with demo users
async function initializeUsers() {
  if (users.length === 0) {
    const adminPasswordHash = await bcrypt.hash('admin123', 10);
    const memberPasswordHash = await bcrypt.hash('member123', 10);

    users = [
      {
        id: userIdCounter++,
        email: 'admin@ssrdev.com',
        password: adminPasswordHash,
        name: 'Admin User',
        role: 'admin',
        createdAt: new Date(),
        isActive: true,
      },
      {
        id: userIdCounter++,
        email: 'member@ssrdev.com',
        password: memberPasswordHash,
        name: 'Member User',
        role: 'member',
        createdAt: new Date(),
        isActive: true,
      },
    ];
  }
}

// User Model
export const User = {
  // Find user by email
  findByEmail: (email) => {
    return users.find(u => u.email === email);
  },

  // Find user by ID
  findById: (id) => {
    return users.find(u => u.id === id);
  },

  // Get all users
  getAllUsers: () => {
    return users.map(u => ({
      ...u,
      password: undefined, // Never return password in lists
    }));
  },

  // Create new user
  create: async (email, password, name, role = 'member') => {
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      throw new Error('User with this email already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
      id: userIdCounter++,
      email,
      password: passwordHash,
      name,
      role,
      createdAt: new Date(),
      isActive: true,
    };

    users.push(user);
    return { ...user, password: undefined };
  },

  // Verify password
  verifyPassword: async (plainPassword, hashedPassword) => {
    return bcrypt.compare(plainPassword, hashedPassword);
  },

  // Update user
  update: async (id, updates) => {
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    users[userIndex] = { ...users[userIndex], ...updates };
    const { password, ...userWithoutPassword } = users[userIndex];
    return userWithoutPassword;
  },

  // Delete user
  delete: (id) => {
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    users.splice(userIndex, 1);
  },

  // Disable/Enable user
  setStatus: (id, isActive) => {
    const user = users.find(u => u.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    user.isActive = isActive;
    return { ...user, password: undefined };
  },

  // Change user role
  setRole: (id, role) => {
    if (!['admin', 'member'].includes(role)) {
      throw new Error('Invalid role');
    }
    // Prevent changing role of original demo users (id 1 and 2)
    if (id <= 2) {
      throw new Error('Cannot modify demo user roles. Use test accounts instead.');
    }
    const user = users.find(u => u.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    user.role = role;
    return { ...user, password: undefined };
  },
};

// Initialize demo users on module load
await initializeUsers();

export default User;
