-- Generated migration 1528060896230-createUsers.sql

CREATE TABLE IF NOT EXISTS cmyk.users (
  id serial primary key,
  username text not null,
  email text not null,
  password text not null,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION cmyk.hash_password()
RETURNS TRIGGER AS $$
BEGIN
  NEW.password = crypt(NEW.password, gen_salt('bf'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER set_timestamp
BEFORE UPDATE ON cmyk.users
FOR EACH ROW
EXECUTE PROCEDURE cmyk.trigger_set_timestamp();

CREATE TRIGGER hash_password
BEFORE INSERT ON cmyk.users
FOR EACH ROW
EXECUTE PROCEDURE cmyk.hash_password();