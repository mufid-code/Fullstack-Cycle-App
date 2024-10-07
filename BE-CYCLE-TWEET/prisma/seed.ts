import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/encryption'; // Gunakan fungsi hashPassword yang sudah dibuat

const prisma = new PrismaClient();

async function main() {
  const superAdmin = await prisma.user.upsert({
    where: { email: 'mufid@admin.com' },
    update: {},
    create: {
      name: 'mufid',
      email: 'mufid@admin.com',
      password: await hashPassword('@Password'),
      role: 'ADMIN',
      isEmailVerified: true,
    },
  });

  console.log({ superAdmin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
