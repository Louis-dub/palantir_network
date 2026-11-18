ALTER TABLE users RENAME COLUMN town TO kingdom;
ALTER TABLE users ADD COLUMN house_clan TEXT;
ALTER TABLE users ADD COLUMN password_hash TEXT;