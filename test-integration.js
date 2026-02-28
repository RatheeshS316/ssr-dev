import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

async function testAPIs() {
  console.log('🧪 Testing SSR Dev APIs...\n');

  try {
    // Test health check
    console.log('1️⃣  Testing Health Check...');
    const healthRes = await api.get('/health');
    console.log(`   ✅ Health: ${healthRes.status} - ${healthRes.data.message}\n`);

    // Test projects API
    console.log('2️⃣  Testing Projects API...');
    const projectsRes = await api.get('/api/projects/recent');
    console.log(`   ✅ Projects: ${projectsRes.status} - ${projectsRes.data.data?.length || 0} projects\n`);

    // Test portfolio API
    console.log('3️⃣  Testing Portfolio API...');
    const portfolioRes = await api.get('/api/projects/portfolio');
    console.log(`   ✅ Portfolio: ${portfolioRes.status} - ${portfolioRes.data.data?.length || 0} portfolio items\n`);

    // Test reviews API
    console.log('4️⃣  Testing Reviews API...');
    const reviewsRes = await api.get('/api/reviews');
    console.log(`   ✅ Reviews: ${reviewsRes.status} - ${reviewsRes.data.data?.length || 0} reviews\n`);

    // Test company history API
    console.log('5️⃣  Testing Company History API...');
    const historyRes = await api.get('/api/company-history');
    console.log(`   ✅ Company History: ${historyRes.status} - Fetched\n`);

    // Test auth API (login)
    console.log('6️⃣  Testing Authentication API...');
    const authRes = await api.post('/api/auth/login', {
      email: 'admin@ssrdev.com',
      password: 'admin123',
    });
    console.log(`   ✅ Auth: ${authRes.status} - ${authRes.data.message}\n`);

    console.log('✨ All API tests passed! The backend is working correctly.\n');
    console.log('📊 API Summary:');
    console.log(`   - Projects: ${projectsRes.data.data?.length || 0}`);
    console.log(`   - Portfolio: ${portfolioRes.data.data?.length || 0}`);
    console.log(`   - Reviews: ${reviewsRes.data.data?.length || 0}`);
    console.log(`   - Users can login: Yes\n`);

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response?.data) {
      console.error('   Response:', error.response.data);
    }
    process.exit(1);
  }
}

testAPIs();
