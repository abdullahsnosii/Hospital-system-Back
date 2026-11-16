# Backend review status

## Completed in this working copy

- Department read endpoints return active departments only.
- Doctor directory/detail endpoints return active doctor accounts only.
- Doctor directory/detail queries explicitly include `userId`, so the populated public doctor name is returned.
- A doctor can no longer change their own `departmentId` through the self-profile endpoint. Department assignment should be an admin-controlled operation once its workflow is confirmed.
- Patient profile updates now update `emergencyContact.name` and `emergencyContact.phone` independently. Updating one field no longer replaces the other saved field.
- Patient and doctor self-profile routes remain protected by authentication and their matching roles.

## Not implemented yet

- Schedule and available-slot APIs
- Appointment booking, cancellation, and status transitions
- Medical history
- Invoices and notifications
- Admin dashboard / today's fixed revenue value

## Decisions needed before implementing scheduling and appointments

The current project files do not define these business rules, so they must not be guessed:

1. Are doctor schedules recurring weekly or entered as specific dated shifts?
2. What is the appointment duration (one fixed duration or doctor-defined)?
3. Can a patient have overlapping appointments with different doctors?
4. Which roles can book, cancel, confirm, and mark an appointment completed?
5. Is cancellation allowed at any time, or is there a cutoff?
6. Does an appointment require payment/invoice before confirmation?

## Verification limits

All JavaScript files were checked with `node --check`. This is a syntax check only. Database, authentication, and endpoint integration tests still require a working MongoDB connection and suitable database permissions. The previous Atlas connection reached the database but failed during index/collection setup due to insufficient privileges.
