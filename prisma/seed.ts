import { PrismaClient } from '@prisma/client'
import permissions from '../src/seed/permissions'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding permissions...')

  // Create permissions and skip duplicates
  const createdPermissions = await Promise.all(
    permissions.map(async (permission) => {
      return prisma.permission.upsert({
        where: { method_route: { method: permission.method, route: permission.route } },
        update: {}, // No changes to existing records
        create: permission, // Create new permission
      })
    })
  )

  // Find or create SuperAdmin user
  let superAdmin = await prisma.user.findFirst({ where: { fullname: 'Tech Admin' } })

  if (!superAdmin) {
    const salt = await bcrypt.genSalt(12)
    const hashPassword = await bcrypt.hash("Starlink1@23", salt)
    superAdmin = await prisma.user.create({
      data: {
        email: "tilkadmin@yopmail.com",
        password: hashPassword,
        fullname: "Jonh Doe",
        phone: "08012345678",
        userType: "Admin",
        status: "Active"
      }
    })
  }

  // Find or create SuperAdmin role
  let role = await prisma.role.findFirst({ where: { name: 'super admin' } })
  if (!role) {
    role = await prisma.role.create({ data: { name: 'super admin' } })
  }

  // Connect permissions to the role
  await prisma.role.update({
    where: { id: role.id },
    data: {
      permissions: {
        connect: createdPermissions.map(permission => ({ id: permission.id }))
      }
    }
  })

  // Update superAdmin with the super admin role
  await prisma.user.update({
    where: { id: superAdmin.id },
    data: {
      role: {
        connect: { id: role.id }
      }
    }
  })

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
