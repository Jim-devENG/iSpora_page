#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 iSpora Vercel Deployment Helper');
console.log('=====================================\n');

// Check if vercel CLI is installed
try {
  execSync('vercel --version', { stdio: 'ignore' });
  console.log('✅ Vercel CLI is installed');
} catch (error) {
  console.log('❌ Vercel CLI not found. Installing...');
  try {
    execSync('npm install -g vercel', { stdio: 'inherit' });
    console.log('✅ Vercel CLI installed successfully');
  } catch (installError) {
    console.log('❌ Failed to install Vercel CLI. Please install manually:');
    console.log('   npm install -g vercel');
    process.exit(1);
  }
}

// Create .env.local file for local development
const envContent = `# Local development environment variables
# For production, set these in Vercel dashboard
VITE_API_BASE_URL=http://localhost:3000/api
`;

if (!fs.existsSync('.env.local')) {
  fs.writeFileSync('.env.local', envContent);
  console.log('✅ Created .env.local for local development');
}

console.log('\n📋 Next Steps:');
console.log('==============');
console.log('');
console.log('1. 🗄️  Set up MongoDB Atlas:');
console.log('   - Go to https://cloud.mongodb.com');
console.log('   - Create a new cluster (free tier)');
console.log('   - Create a database user');
console.log('   - Get your connection string');
console.log('   - Add 0.0.0.0/0 to IP Access List');
console.log('');
console.log('2. 🌐 Deploy to Vercel:');
console.log('   - Go to https://vercel.com');
console.log('   - Import repository: https://github.com/Jim-devENG/iSpora_page.git');
console.log('   - Set environment variables:');
console.log('');
console.log('   MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/');
console.log('   MONGODB_DB=ispora');
console.log('   VITE_API_BASE_URL=https://ispora.com/api');
console.log('');
console.log('3. 🔗 Add custom domain:');
console.log('   - In Vercel project settings, go to "Domains"');
console.log('   - Add: ispora.com');
console.log('   - Follow DNS configuration instructions');
console.log('');
console.log('4. 🧪 Test your deployment:');
console.log('   - Registration: https://ispora.com/#register');
console.log('   - Admin: https://ispora.com/#admin (password: ispora2025)');
console.log('   - API: https://ispora.com/api/registrations');
console.log('');

// Offer to run vercel deploy
console.log('🤖 Would you like me to run "vercel deploy" now? (y/n)');
console.log('   This will start the deployment process...');

// Note: In a real scenario, you'd want to handle user input
// For now, just provide instructions
console.log('\n💡 To deploy manually, run:');
console.log('   vercel --prod');
console.log('');
console.log('📚 For more help, see: VERCEL_DEPLOYMENT_GUIDE.md');
