import dns from "node:dns"
dns.setServers(["8.8.8.8", "1.1.1.1"])
import express from "express"
import cors from "cors"
import helmet from "helmet"
import { authenticationcontroller } from "./modules/index.js"
import { globalErrorHandler } from "./middleware/index.js"
import { bootstrapDB } from "./DB/connectionDB.js"
import { generateLimiter } from "./common/utils/index.js"
import { ORIGINS, PORT, TRUST_PROXY } from "./config.js"

const app = express()
app.set("trust proxy", TRUST_PROXY)

app.use(
    helmet(),
    cors({ origin: ORIGINS.length ? ORIGINS : true }),
    generateLimiter({ limit: 300 }),
    express.json()
)

app.all("/", (req, res) => res.status(200).send({ message: "Welcome to our API" }))

app.use("/auth", authenticationcontroller)
// app.use('/patient', patientcontroller);   // نفعّلهم لما نوصل لهم
// app.use('/doctor', doctorcontroller);

app.use((req, res) => {
    res.status(404).json({ message: "route not found" })
})

app.use(globalErrorHandler)

bootstrapDB(app, PORT)
