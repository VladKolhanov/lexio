import { dbClient } from './db-client'
import { account, user } from './schemas/auth'

async function main() {
  await dbClient.insert(user).values({
    email: 'admin@gmail.com',
    id: 'ksHBkYCVvdgLz3cT9GuxRGnSQYGi3AFW',
    name: 'Admin',
  })

  await dbClient.insert(account).values({
    accountId: 'ksHBkYCVvdgLz3cT9GuxRGnSQYGi3AFW',
    id: 'b4CyqdE8gNI0pH92vwjj9MTojo882Gjg',
    providerId: 'credential',
    userId: 'ksHBkYCVvdgLz3cT9GuxRGnSQYGi3AFW',
    password:
      '099a45b099cdfe1e1f5bb0a19d1226bc:f0ad2603b2e86ef02ba40b22d94b83a4b02e338edba7dce091c02346d822db04ba6f88805c2c375019e7da09f27ad96e35fc16192e3ffd1e64fb5a6b4059b5fc',
  })
}

main()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('\nSeeding complete')
    process.exit(0)
  })
  .catch((err: unknown) => {
    console.error(err)
    process.exit(1)
  })
