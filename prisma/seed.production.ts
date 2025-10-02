import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting production database seeding...');
  
  // Check if users already exist
  const existingUsers = await prisma.user.count();
  
  if (existingUsers > 0) {
    console.log(`Database already has ${existingUsers} users. Skipping seed.`);
    return;
  }
  
  // Hash password for all test users
  const hashedPassword = await bcrypt.hash('password123', 12);
  
  // Create test users with different roles
  const users = [
    {
      email: 'admin@amaghor.com',
      name: 'Admin User',
      role: 'owner',
      password: hashedPassword,
    },
    {
      email: 'manager@amaghor.com',
      name: 'Manager User',
      role: 'manager',
      password: hashedPassword,
    },
    {
      email: 'receptionist@amaghor.com',
      name: 'Receptionist User',
      role: 'receptionist',
      password: hashedPassword,
    },
    {
      email: 'accountant@amaghor.com',
      name: 'Accountant User',
      role: 'accountant',
      password: hashedPassword,
    }
  ];
  
  console.log('Creating test users...');
  
  for (const userData of users) {
    const user = await prisma.user.create({
      data: userData,
    });
    console.log(`Created user: ${user.email} with role: ${user.role}`);
  }
  
  console.log('Production database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
