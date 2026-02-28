import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

// Get admin token for API calls
async function getAdminToken() {
  const res = await api.post('/api/auth/login', {
    email: 'admin@ssrdev.com',
    password: 'admin123',
  });
  return res.data.data.token;
}

async function seedData() {
  console.log('🌱 Seeding sample data...\n');

  try {
    // Get admin token
    const token = await getAdminToken();
    const headers = { Authorization: `Bearer ${token}` };

    // Create Recent Projects
    console.log('📁 Creating recent projects...');
    const projects = [
      {
        title: 'E-Commerce Platform',
        description: 'A full-featured e-commerce platform with payment integration, inventory management, and multi-admin dashboard.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
        completionDate: '2024-01-15',
        clientName: 'ABC Store',
        category: 'Web Development',
      },
      {
        title: 'AI Chatbot Solution',
        description: 'An intelligent chatbot powered by OpenAI for customer support automation with NLP capabilities.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600',
        completionDate: '2024-02-20',
        clientName: 'TechCorp Solutions',
        category: 'AI/ML',
      },
      {
        title: 'College Management System',
        description: 'Comprehensive system for managing student records, attendance, grades, and administrative tasks.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
        completionDate: '2024-03-10',
        clientName: 'XYZ College',
        category: 'Enterprise',
      },
    ];

    for (const proj of projects) {
      await api.post('/api/projects/recent', proj, { headers });
      console.log(`   ✅ Created: ${proj.title}`);
    }
    console.log();

    // Create Portfolio Projects
    console.log('🎨 Creating portfolio projects...');
    const portfolioProjects = [
      {
        title: 'Restaurant Booking App',
        description: 'Mobile-first restaurant reservation system with real-time availability and user ratings.',
        images: [
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600',
        ],
        technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Stripe'],
        projectLink: 'https://example.com/restaurant-app',
      },
      {
        title: 'Resume Analyzer AI',
        description: 'AI-powered resume scoring and optimization tool using machine learning and NLP.',
        images: [
          'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600',
        ],
        technologies: ['Python', 'LangChain', 'React', 'FastAPI'],
        projectLink: 'https://example.com/resume-analyzer',
      },
      {
        title: 'Real Estate Portal',
        description: 'Full-stack real estate listing platform with advanced search filters and property management.',
        images: [
          'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600',
        ],
        technologies: ['React', 'Node.js', 'MySQL', 'Google Maps API'],
        projectLink: 'https://example.com/real-estate',
      },
    ];

    for (const proj of portfolioProjects) {
      await api.post('/api/projects/portfolio', proj, { headers });
      console.log(`   ✅ Created: ${proj.title}`);
    }
    console.log();

    // Create Reviews - get member token first
    console.log('⭐ Creating sample reviews...');
    const memberRes = await api.post('/api/auth/login', {
      email: 'member@ssrdev.com',
      password: 'member123',
    });
    const memberToken = memberRes.data.data.token;
    const memberHeaders = { Authorization: `Bearer ${memberToken}` };

    const reviews = [
      {
        rating: 5,
        message: 'Outstanding work! The team delivered exactly what we needed, on time and within budget. Highly professional and responsive.',
      },
      {
        rating: 5,
        message: 'Excellent code quality and great communication throughout the project. They really understood our requirements.',
      },
      {
        rating: 5,
        message: 'The SSR Dev team transformed our business with their innovative solutions. Highly recommended!',
      },
      {
        rating: 4,
        message: 'Very good work overall. Minor issues with initial scope clarification, but resolved quickly.',
      },
    ];

    for (const review of reviews) {
      const res = await api.post('/api/reviews', review, { headers: memberHeaders });
      console.log(`   ✅ Created review: ${review.rating}★`);
      
      // Approve the review as admin
      if (res.data.data?.id) {
        await api.patch(`/api/reviews/${res.data.data.id}/approve`, {}, { headers });
      }
    }
    console.log();

    // Update Company History
    console.log('🏢 Updating company information...');
    await api.put('/api/company-history', {
      aboutTitle: 'About SSR Dev',
      missionStatement: 'To deliver high-quality, scalable, and innovative software solutions that transform digital landscapes.',
      visionStatement: 'To be the trusted technology partner for businesses seeking excellence in digital innovation.',
      foundingYear: 2023,
      achievements: [
        'Delivered 20+ successful projects across MERN, Django, and AI/ML technologies',
        'Built team of 3 full-stack developers with expertise in modern web technologies',
        'Achieved 100% client satisfaction rate with on-time project delivery',
        'Specialized in e-commerce, AI integration, and enterprise solutions',
        'Proficient in React, Node.js, Python, PostgreSQL, MongoDB, and cloud deployment',
      ],
    }, { headers });
    console.log('   ✅ Company information updated\n');

    console.log('✨ All sample data created successfully!\n');
    console.log('📊 Data Summary:');
    console.log(`   - Recent Projects: ${projects.length}`);
    console.log(`   - Portfolio Projects: ${portfolioProjects.length}`);
    console.log(`   - Reviews: ${reviews.length} (all approved)`);
    console.log(`   - Company Info: Updated\n`);
    console.log('🎉 Your website is now fully populated and ready to use!');

  } catch (error) {
    console.error('❌ Error seeding data:', error.message);
    if (error.response?.data) {
      console.error('   Response:', error.response.data);
    }
    process.exit(1);
  }
}

seedData();
