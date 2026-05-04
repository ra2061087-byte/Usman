# Security Specification - Jamia Portal

## Data Invariants
1. A student record must have a unique Roll Number.
2. Attendance must be linked to a valid Student document.
3. Financial records must have a positive amount.

## The "Dirty Dozen" Payloads (Anti-Patterns)
1. **Identity Spoofing**: Attempting to create a student record with `isAdmin: true` (if it existed) or as a non-admin.
2. **Key Poisoning**: Adding a 1MB string to the `fullName` field to inflate storage costs.
3. **ID Injection**: Using a document ID like `../../secrets` to exploit path traversal (blocked by Firestore, but checked via `isValidId`).
4. **Relational Orphan**: Creating attendance for a `studentId` that does not exist.
5. **Timestamp Fraud**: Providing a backdated `createdAt` from the client.
6. **State Skip**: Directly setting a student's status to 'graduated' (if implemented) without going through the proper workflow.
7. **Cross-User Leak**: A student reading another student's private profile details.
8. **Shadow Field**: Adding `verified: true` to a student record.
9. **Budget Bloat**: Adding an expense record with a negative amount (to simulate income).
10. **Query Scraping**: Attempting to list all students' phone numbers without admin privileges.
11. **Terminal Lock Breach**: Editing a past attendance record that has been finalized.
12. **Null Identity**: Writing to the database without being authenticated.

## Test Runner (Logic)
- `tests/firestore.rules.test.ts` will verify these cases.
