
import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import mongoose from 'mongoose';
import { DB_NAME, DB_URI } from '../src/config.js';
import { DepartmentModel } from '../src/DB/model/department.model.js';

const departments = [
    'Cardiology',
    'Neurosurgery',
    'Neonatology',
    'Orthopedics',
    'General Internal Medicine'
];

try {
    await mongoose.connect(DB_URI, {
        dbName: DB_NAME || undefined
    });

    for (const name of departments) {
        await DepartmentModel.updateOne(
            { name },
            { $setOnInsert: { name } },
            { upsert: true }
        );
    }

    console.log('Departments seeded successfully');
} catch (error) {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
} finally {
    await mongoose.disconnect();
}
