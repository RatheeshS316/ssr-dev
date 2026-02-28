#!/usr/bin/env node

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

async function debugTests() {
  console.log('\n=== DEBUGGING FAILED TESTS ===\n');

  // Debug Test 1: Different roles
  console.log('Test 1: Checking roles returned from login...');
  try {
    const adminLogin = await axios.post(`${API_URL}/login`, {
      email: 'admin@ssrdev.com',
      password: 'admin123'
    });
    console.log('Admin login:', {
      role: adminLogin.data.data.user.role,
      isAdmin: adminLogin.data.data.user.role === 'admin'
    });

    const memberLogin = await axios.post(`${API_URL}/login`, {
      email: 'member@ssrdev.com',
      password: 'member123'
    });
    console.log('Member login:', {
      role: memberLogin.data.data.user.role,
      isMember: memberLogin.data.data.user.role === 'member'
    });

    const adminRole = adminLogin.data.data.user.role === 'admin';
    const memberRole = memberLogin.data.data.user.role === 'member';
    console.log('Result:', adminRole && memberRole ? '✅ PASS' : '❌ FAIL');
  } catch (error) {
    console.error('Error:', error.message);
  }

  // Debug Test 2: Member access to admin endpoint
  console.log('\n\nTest 2: Member access to admin endpoint...');
  try {
    const memberLogin = await axios.post(`${API_URL}/login`, {
      email: 'member@ssrdev.com',
      password: 'member123'
    });

    const memberToken = memberLogin.data.data.token;
    console.log('Member token obtained:', memberToken.substring(0, 20) + '...');

    try {
      const response = await axios.get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${memberToken}` }
      });
      console.log('❌ FAIL: Member should NOT have access, but did');
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);
    } catch (error) {
      console.log('Response status:', error.response?.status);
      console.log('Error message:', error.response?.data?.message);
      console.log('Result:', error.response?.status === 403 ? '✅ PASS (correctly rejected)' : '❌ FAIL (wrong status)');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

debugTests();
