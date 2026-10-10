import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
import express from 'express';
import { authenticationcontroller, patientcontroller, doctorcontroller } from './modules/index.js';
import { globalErrorHandler } from './middleware/index.js';
import { bootstrapDB } from './DB/connectionDB.js';
import { GenderEnum } from './common/enum/patient.enum.js';
const port = 3000;
const app = express();
app.use(express.json());
bootstrapDB(app ,port)


app.all('/', (req, res) => res.status(200).send({message: 'Welcome to our API' }));


app.use('/auth', authenticationcontroller);
app.use('/patient', patientcontroller);
app.use('/doctor', doctorcontroller);



app.all("{/dummy}", (req, res) => { res.status(404).json({ message: "route not found" });})


app.use(globalErrorHandler)

