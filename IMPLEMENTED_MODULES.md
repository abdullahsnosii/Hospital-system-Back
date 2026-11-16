# Implemented backend modules (working-copy scope)

## Explicit implementation assumptions
- Weekly recurring doctor availability; weekday numbering follows JavaScript UTC (`0` Sunday .. `6` Saturday).
- All schedule times and appointment timestamps are interpreted in UTC. The frontend must send ISO-8601 timestamps with `Z` and render in the intended local timezone.
- Default slot duration is 30 minutes; doctors may configure 10–120 minutes.
- A slot is booked by its exact start timestamp. Active statuses (`booked`, `confirmed`) block it.
- Patient cancellation is allowed only before the appointment starts.
- Completing an appointment creates one unpaid invoice for the doctor's configured consultation fee. Amounts use piastres (100 piastres = 1 EGP). If no fee is set, amount is 0 and must be configured before real billing.
- Admin daily revenue is a fixed configured value from `ADMIN_TODAY_REVENUE`, not calculated from invoices. Default is 0 until the owner supplies the agreed figure.
- No standalone user-management module/page is introduced.

## Routes
- `GET/PUT /schedules/me` doctor weekly schedule; `GET /schedules/doctors/:doctorId/available?date=YYYY-MM-DD` public available slots.
- `POST /appointments` patient books; `GET /appointments/mine` patient list; `GET /appointments/doctor` doctor list; `GET /appointments` admin/receptionist list; `PATCH /appointments/:id/cancel` patient cancellation; `PATCH /appointments/:id/status` doctor/admin/receptionist status update.
- `GET /medical-history/mine` patient records; `GET /medical-history/patient/:patientId` doctor records for a patient they have seen; `POST /medical-history` doctor adds a note.
- `GET /invoices/mine` patient invoices; `GET /invoices` admin/receptionist list; `PATCH /invoices/:id/pay` admin/receptionist marks paid.
- `GET /notifications`, `PATCH /notifications/:id/read`, `PATCH /notifications/read-all` authenticated user notifications.
- `GET /admin/dashboard` admin dashboard counts plus fixed `todayRevenue`.

## Important deployment requirements
- Set `ADMIN_TODAY_REVENUE` to the agreed fixed number in the deployment environment.
- MongoDB index creation must be performed by a database user with index privileges. In particular, the unique partial index on `{ doctorId, startAt }` prevents double booking under concurrent requests. Startup no longer attempts destructive `syncIndexes()` calls.
- Test against a development database and confirm Atlas permissions before production. This ZIP does not contain `.env` or credentials.
- This is an implementation baseline, not a claim of successful live DB/Postman integration tests.
