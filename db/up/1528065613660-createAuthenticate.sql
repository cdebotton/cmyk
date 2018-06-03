-- Generated migration 1528065613660-createAuthenticate.sql

CREATE TYPE cmyk.jwt_token as (
  role text,
  exp integer,
  user_id integer,
  username varchar
);

CREATE FUNCTION cmyk.authenticate(
  email text,
  password text
) RETURNS cmyk.jwt_token AS $$
DECLARE
  account cmyk.users;
BEGIN
  SELECT a.* INTO account
    FROM cmyk.users AS a
    WHERE a.email = authenticate.email;

  IF account.password = crypt(password, account.password) THEN
    RETURN (
      'user_role',
      extract(epoch from now() + interval '7 days'),
      account.id,
      account.username
    )::cmyk.jwt_token;
  ELSE
    RETURN NULL;
  END IF;
END;
$$ LANGUAGE plpgsql strict security definer;