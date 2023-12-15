import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const playerAdm = await prisma.player.upsert({
    where: { username : 'admin' },
    update: {},
    create: {
        name : 'GG Administrador',
        username : 'admin',
        password : '12345'
    },
  })
  const game1 = await prisma.game.upsert({
    where: { title : 'Counter Strike' },
    update: {},
    create: {
        title : 'Counter Strike',
        imageUrl : 'https:\/\/static-cdn.jtvnw.net\/ttv-boxart\/32399_IGDB-285x380.jpg'
    },
  })

  const game2 = await prisma.game.upsert({
    where: { title : 'Valorant' },
    update: {},
    create: {
        title : 'Valorant',
        imageUrl : 'https:\/\/static-cdn.jtvnw.net\/ttv-boxart\/516575-285x380.jpg'
    },
  })

  const game3 = await prisma.game.upsert({
    where: { title : 'Fifa 23' },
    update: {},
    create: {
        title : 'Fifa 23',
        imageUrl : 'https:\/\/static-cdn.jtvnw.net\/ttv-boxart\/1745202732_IGDB-285x380.jpg'
    },
  })

  const game4 = await prisma.game.upsert({
    where: { title : 'Fortnite' },
    update: {},
    create: {
        title : 'Fortnite',
        imageUrl : 'https:\/\/static-cdn.jtvnw.net\/ttv-boxart\/33214-285x380.jpg'
      },
  })

  const game5 = await prisma.game.upsert({
    where: { title : 'Call of Duty Warzone' },
    update: {},
    create: {
        title : 'Call of Duty Warzone',
        imageUrl : 'https:\/\/static-cdn.jtvnw.net\/ttv-boxart\/512710-285x380.jpg'
    },
  })

  const game6 = await prisma.game.upsert({
    where: { title : 'Apex Legends' },
    update: {},
    create: {
        title : 'Apex Legends',
        imageUrl : 'https:\/\/static-cdn.jtvnw.net\/ttv-boxart\/511224-285x380.jpg'
    },
  })
  
  console.log({ game1, game2, game3, game4, game5, game6, playerAdm })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })