const { ConvexHttpClient } = require('convex/browser');

const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

async function seedData() {
  try {
    console.log('🌱 Starting to seed data...');

    // Seed projects
    console.log('📊 Seeding projects...');
    const projectsResult = await client.mutation('seed:seedProjects', {});
    console.log('✅ Projects seeded:', projectsResult.message);

    // Seed business stories
    console.log('📖 Seeding business stories...');
    const storiesResult = await client.mutation('seed:seedBusinessStories', {});
    console.log('✅ Business stories seeded:', storiesResult.message);

    console.log('🎉 All data seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  }
}

seedData();
