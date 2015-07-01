DROP TABLE if exists launches;

CREATE TABLE launches(
  id serial primary key,
  launch_date timestamp,
  ship varchar(255)
);
