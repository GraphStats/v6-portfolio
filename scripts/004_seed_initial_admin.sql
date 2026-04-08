-- Insert initial admin
-- SHA-256 hashed password below
INSERT INTO admins (email, password)
VALUES ('[EMAIL_ADDRESS]', '[PASSWORD]')
ON CONFLICT (email) DO NOTHING;
