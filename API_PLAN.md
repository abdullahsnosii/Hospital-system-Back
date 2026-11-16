# Hospital Backend API Plan

## Authentication
- `POST /auth/signup`
- `POST /auth/login`

## Patient
- `GET /patients/profile`
- `PATCH /patients/profile`
- `GET /appointments/mine`
- `POST /appointments`
- `PATCH /appointments/:id/cancel`
- `GET /medical-history/mine`
- `GET /invoices/mine`
- `GET /notifications`
- `PATCH /notifications/:id/read`
- `PATCH /notifications/read-all`

## Doctor
- `GET /doctors`, `GET /doctors/:id`
- `GET /doctors/profile`, `PATCH /doctors/profile`
- `GET /schedules/me`, `PUT /schedules/me`
- `GET /schedules/doctors/:doctorId/available?date=YYYY-MM-DD`
- `GET /appointments/doctor`
- `PATCH /appointments/:id/status`
- `GET /medical-history/patient/:patientId`
- `POST /medical-history`
- `GET /notifications` and read endpoints

## Receptionist / Admin
- `GET /appointments`
- `PATCH /appointments/:id/status`
- `GET /invoices`
- `PATCH /invoices/:id/pay`
- Admin only: `GET /admin/dashboard`

## Shared
- `GET /departments`, `GET /departments/:id`
