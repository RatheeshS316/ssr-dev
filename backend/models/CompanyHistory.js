// Company History/About content
let companyHistory = {
  aboutTitle: 'About SSRDev',
  aboutDescription: 'We are a leading software development company dedicated to delivering exceptional projects.',
  missionStatement: 'Our mission is to create innovative digital solutions that drive business success.',
  visionStatement: 'To be the most trusted and innovative software development partner globally.',
  foundingYear: 2020,
  teamSize: 15,
  historyContent: 'Started in 2020, SSRDev has grown to become a leading development company...',
  achievements: [
    'Founded 2020',
    '50+ Projects Completed',
    '30+ Happy Clients',
    '4.9/5 Average Rating'
  ],
  updatedAt: new Date(),
};

export const CompanyHistory = {
  // Get
  get: () => {
    return { ...companyHistory };
  },

  // Update
  update: async (data) => {
    companyHistory = {
      ...companyHistory,
      ...data,
      updatedAt: new Date(),
    };
    return { ...companyHistory };
  },

  // Add achievement
  addAchievement: (achievement) => {
    if (!companyHistory.achievements) {
      companyHistory.achievements = [];
    }
    companyHistory.achievements.push(achievement);
    companyHistory.updatedAt = new Date();
    return achievement;
  },

  // Remove achievement
  removeAchievement: (index) => {
    if (index >= 0 && index < companyHistory.achievements.length) {
      companyHistory.achievements.splice(index, 1);
      companyHistory.updatedAt = new Date();
    }
  },
};

export default CompanyHistory;
