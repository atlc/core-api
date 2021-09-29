### ~~Create mailer function in utils.~~

### Alter `Users` table to include an `activated` column (default 0, migrate preexisting users to 1)

### Upon registration, generate registration token to store in a UserTokens (possibly distinct RegistrationToken/ResetToken) table in database (token, type, FK userid, issued_at?/expires_at)

### Email sent with registration token, upon validation page link being met, fetch made to /auth/validate endpoint

### Check req.query for token

### Check DB

### Mark user as verified

### Delete from Tokens where userid
