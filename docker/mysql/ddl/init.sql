
-- CREATE DATABASE test_db CHARACTER SET utf8;

CREATE TABLE test_db.tasks (
  id VARCHAR(36),
  overview VARCHAR(256),
  priority INT,
  deadline TIMESTAMP,
  PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


insert into tasks (id, overview, priority, deadline) values ('6a414c88-4613-486d-9990-80c1de52eea4', 'Learn TypeScript', 1, now());
insert into tasks (id, overview, priority, deadline) values ('d8a4132e-72ec-490c-b5f5-a8bbc4509be6', 'Learn Node.js', 2, now());
