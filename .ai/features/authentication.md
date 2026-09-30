# Authentication Scope Reference

The current login screen is frontend/demo behavior.

It does not establish:
- secure authentication
- a production session
- authorization
- token validation
- tenant isolation

When real authentication is added, use the actual backend/authentication contract. Do not replace production security with a client-side mock.
