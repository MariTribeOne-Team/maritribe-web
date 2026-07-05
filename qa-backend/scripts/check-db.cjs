const { PrismaClient } = require('@prisma/client')

async function main() {
  const prisma = new PrismaClient()
  const runs = await prisma.pipelineRun.findMany({
    include: {
      assets: {
        select: {
          id: true,
          assetType: true,
          fileName: true,
          storagePath: true,
          publicUrl: true,
          data: false // do not load binary bytes in stdout
        }
      }
    }
  })
  
  for (const r of runs) {
    console.log(`Run: ${r.documentTitle} (${r.id})`)
    console.log('Assets:', r.assets)
  }

  await prisma.$disconnect()
}

main().catch(console.error)
