// In-memory database for Portfolio Projects
let portfolioProjects = [];
let portfolioProjectIdCounter = 1;

export const PortfolioProject = {
  // Create
  create: async (data) => {
    const project = {
      id: portfolioProjectIdCounter++,
      title: data.title,
      description: data.description,
      images: data.images || [], // Array of base64 or URLs
      technologies: data.technologies || [], // Array of tech names
      projectLink: data.projectLink || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    portfolioProjects.push(project);
    return project;
  },

  // Get all
  getAll: () => {
    return portfolioProjects.map(p => ({ ...p }));
  },

  // Get by ID
  getById: (id) => {
    return portfolioProjects.find(p => p.id === id);
  },

  // Update
  update: async (id, data) => {
    const index = portfolioProjects.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Project not found');
    
    portfolioProjects[index] = {
      ...portfolioProjects[index],
      ...data,
      updatedAt: new Date(),
    };
    return portfolioProjects[index];
  },

  // Delete
  delete: (id) => {
    const index = portfolioProjects.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Project not found');
    portfolioProjects.splice(index, 1);
  },
};

export default PortfolioProject;
