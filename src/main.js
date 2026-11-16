import dns from "node:dns"
dns.setServers(["8.8.8.8", "1.1.1.1"])
import express from "express"
import cors from "cors"
import helmet from "helmet"
import { authenticationcontroller, patientcontroller, doctorcontroller, departmentcontroller, schedulecontroller, appointmentcontroller, medicalhistorycontroller, invoicecontroller, notificationcontroller, admincontroller } from "./modules/index.js"
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
app.use("/patients", patientcontroller)
app.use("/doctors", doctorcontroller)
app.use("/departments", departmentcontroller)
app.use("/schedules", schedulecontroller)
app.use("/appointments", appointmentcontroller)
app.use("/medical-history", medicalhistorycontroller)
app.use("/invoices", invoicecontroller)
app.use("/notifications", notificationcontroller)
app.use("/admin", admincontroller)

app.use((req, res) => {
    res.status(404).json({ message: "route not found" })
})

app.use(globalErrorHandler)

bootstrapDB(app, PORT)
