-- Generated migration 1528060896230-createUsers.sql

CREATE TABLE IF NOT EXISTS cmyk.users (
  id serial primary key,
  username text not null,
  email text not null,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON cmyk.users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();