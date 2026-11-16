# Working copy changelog

## Existing work retained
- Department read APIs and department seed script.
- Initial patient and doctor profile APIs.
- Authentication and role-based middleware.

## Added in this pass
- Weekly recurring doctor schedule and public available-slot lookup.
- Appointment booking, patient cancellation, doctor/admin/receptionist status updates, and role-scoped appointment lists.
- Medical history model and patient/doctor access APIs.
- Invoice model, patient/admin/receptionist invoice APIs, payment marking, and invoice creation when an appointment is completed.
- Per-user notifications with read/read-all actions and event notifications.
- Admin dashboard counts and fixed daily revenue from `ADMIN_TODAY_REVENUE`.
- Database index deployment script (`npm run db:indexes`). Startup no longer runs `syncIndexes()` automatically because the configured Atlas application account previously lacked collection/index permissions.
- Implementation assumptions and endpoint documentation in `IMPLEMENTED_MODULES.md` and `API_PLAN.md`.

## Validation performed
- `node --check` passed for every JavaScript file under `src` and `scripts`.
- All relative local imports were checked and resolved.
- ZIP archive structure was checked after packaging.

## Not performed
- `npm ci` did not finish within the available execution window.
- No live MongoDB/Atlas connection, index creation, server startup, or Postman integration tests were run.
- `ADMIN_TODAY_REVENUE` remains 0 until the project owner provides the fixed value.
