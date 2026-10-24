// الاستخدام:  npm run seed:codes            -> بيعمل كود لكل role مش موجود له كود
//             npm run seed:codes -- --rotate -> بيغيّر كل الأكواد (القديمة بتبطل)
// الأكواد بتتطبع مرة واحدة بس، احفظها.
import dns from 'node:dns'
dns.setServers(['8.8.8.8', '1.1.1.1'])
import mongoose from 'mongoose'
import { randomBytes } from 'node:crypto'
import { DB_NAME, DB_URI } from '../src/config.js'
import { AccessCodeModel } from '../src/DB/model/accessCode.model.js'
import { hashAccessCode } from '../src/common/security/accessCode.security.js'
import { CODE_ROLES } from '../src/common/enum/user.enum.js'

const rotate = process.argv.includes('--rotate')
await mongoose.connect(DB_URI, { dbName: DB_NAME || undefined })

for (const role of CODE_ROLES) {
    if (!rotate && await AccessCodeModel.exists({ role })) {
        console.log(`${role}: already has a code (use --rotate to replace it)`)
        continue
    }
    const code = randomBytes(6).toString('base64url') // 8 chars
    await AccessCodeModel.updateOne({ role }, { $set: { codeHash: hashAccessCode(code), isActive: true } }, { upsert: true })
    console.log(`${role}: ${code}`)
}

await mongoose.disconnect()
