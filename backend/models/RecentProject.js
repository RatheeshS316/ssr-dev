// In-memory database for Recent Projects
let recentProjects = [];
let recentProjectIdCounter = 1;

export const RecentProject = {
  // Create
  create: async (data) => {
    const project = {
      id: recentProjectIdCounter++,
      title: data.title,
      description: data.description,
      image: data.image, // Base64 or URL
      completionDate: data.completionDate,
      clientName: data.clientName,
      category: data.category,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    recentProjects.push(project);
    return project;
  },

  // Get all
  getAll: () => {
    return recentProjects.map(p => ({ ...p }));
  },

  // Get by ID
  getById: (id) => {
    return recentProjects.find(p => p.id === id);
  },

  // Update
  update: async (id, data) => {
    const index = recentProjects.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Project not found');
    
    recentProjects[index] = {
      ...recentProjects[index],
      ...data,
      updatedAt: new Date(),
    };
    return recentProjects[index];
  },

  // Delete
  delete: (id) => {
    const index = recentProjects.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Project not found');
    recentProjects.splice(index, 1);
  },
};

export default RecentProject;
