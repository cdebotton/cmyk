-- Generated migration 1528060896230-createUsers.sql

DROP TRIGGER IF EXISTS set_timestamp ON cmyk.users;
DROP TRIGGER IF EXISTS hash_password ON cmyk.users;
DROP TABLE IF EXISTS cmyk.users;
DROP FUNCTION cmyk.hash_password();