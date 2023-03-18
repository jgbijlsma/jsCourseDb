DROP TABLE IF EXISTS posts;

CREATE TABLE posts (id SERIAL, title TEXT, content TEXT);

INSERT INTO posts (title, content) VALUES ('First post', 'Some content for post 1');
INSERT INTO posts (title, content) VALUES ('Second post', 'Some content for post 2');
INSERT INTO posts (title, content) VALUES ('Third post', 'Some content for post 3');