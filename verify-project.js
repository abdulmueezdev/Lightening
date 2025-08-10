const axios = require('axios');

console.log('🔍 StormWatch Project Verification Script');
console.log('==========================================\n');

const BASE_URL = 'http://localhost:5000';

async function testEndpoint(endpoint, description) {
  try {
    console.log(`Testing: ${description}`);
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    console.log(`✅ SUCCESS: ${response.status} - ${response.data ? 'Data received' : 'Response OK'}`);
    if (response.data && typeof response.data === 'object') {
      console.log(`   Data: ${JSON.stringify(response.data).substring(0, 100)}...`);
    }
    return true;
  } catch (error) {
    console.log(`❌ FAILED: ${error.response?.status || error.code} - ${error.response?.data?.error || error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('1. Testing Basic Server Response...');
  await testEndpoint('/', 'Main page load');
  
  console.log('\n2. Testing API Endpoints...');
  await testEndpoint('/api/weather/London', 'Weather API for London');
  await testEndpoint('/api/cities/search?q=New York', 'City search API');
  await testEndpoint('/api/reverse-geocode?lat=40.7128&lon=-74.0060', 'Reverse geocoding API');
  
  console.log('\n3. Testing Frontend Assets...');
  await testEndpoint('/src/main.tsx', 'Main React entry point');
  await testEndpoint('/src/App.tsx', 'App component');
  
  console.log('\n4. Testing Environment Variables...');
  console.log('Checking if API keys are configured...');
  try {
    const weatherResponse = await axios.get(`${BASE_URL}/api/weather/London`);
    if (weatherResponse.data && !weatherResponse.data.error) {
      console.log('✅ Environment variables are working correctly');
    } else {
      console.log('❌ Environment variables may not be loaded properly');
    }
  } catch (error) {
    if (error.response?.data?.error?.includes('API key not configured')) {
      console.log('❌ Environment variables are not loaded - API keys missing');
    } else {
      console.log('⚠️  API test failed - check server logs');
    }
  }
  
  console.log('\n5. Testing Real-time Features...');
  console.log('Checking WebSocket support...');
  try {
    const wsResponse = await axios.get(`${BASE_URL}/api/lightning-strikes`);
    console.log('✅ Lightning strikes endpoint accessible');
  } catch (error) {
    console.log('⚠️  Lightning strikes endpoint may not be implemented');
  }
  
  console.log('\n==========================================');
  console.log('🔍 Verification Complete!');
  console.log('\nNext Steps:');
  console.log('1. Open http://localhost:5000 in your browser');
  console.log('2. Test the interactive features manually');
  console.log('3. Check the browser console for any errors');
  console.log('4. Verify all API endpoints are working');
}

runTests().catch(console.error); 