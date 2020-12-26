--users
CREATE TABLE users (  
  id INTEGER NOT NULL PRIMARY KEY, 
  name TEXT NOT NULL, 
  profile TEXT, 
  created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')), 
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')), 
  date_of_birth TEXT
);

INSERT INTO users (name, profile) VALUES ("Taro", "Hello ");
INSERT INTO users (name, profile) VALUES ("John", "World");
INSERT INTO users (name, profile) VALUES ("Ram", "Yes");
INSERT INTO users (name, profile) VALUES ("hanako", "No");
INSERT INTO users (name, profile) VALUES ("ken", "Hello World");


--following
CREATE TABLE following (
  id INTEGER NOT NULL PRIMARY KEY,  
  following_id INTEGER NOT NULL,
  followed_id INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')), 
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
  FOREIGN KEY (following_id) references users(id),
  FOREIGN KEY (followed_id) references users(id)
);

INSERT INTO following (following_id, followed_id) values (1,2);
INSERT INTO following (following_id, followed_id) values (1,3);
INSERT INTO following (following_id, followed_id) values (1,4);
INSERT INTO following (following_id, followed_id) values (2,1);
INSERT INTO following (following_id, followed_id) values (2,3);
INSERT INTO following (following_id, followed_id) values (3,4);
INSERT INTO following (following_id, followed_id) values (4,3);


--down 
DROP TABLE users;
DROP TABLE following;