-- Generated migration 1528060889632-createTimestampFunc.sql

CREATE OR REPLACE FUNCTION cmyk.trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE ROLE admin;
