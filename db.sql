CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	last_name VARCHAR (50),
	first_name VARCHAR (50),
	email VARCHAR (150),
	city VARCHAR (50),
	is_admin BOOLEAN
);
DROP TABLE users;
CREATE TABLE actions (
	action_id SERIAL PRIMARY KEY,
	title VARCHAR(50),
	type VARCHAR (30),
	description VARCHAR (500),
	address VARCHAR (70),
	date DATE,
	time VARCHAR (20),
	organiser_id INTEGER,
	CONSTRAINT fk_user FOREIGN KEY (organiser_id) REFERENCES users (user_id)
);

CREATE TABLE actions_data (
	action_data_id SERIAL PRIMARY KEY,
	bags_collected INTEGER,
	weight_collected INTEGER,
	action_id INTEGER,
	CONSTRAINT fk_action FOREIGN KEY (action_id) REFERENCES actions (action_id)
);
CREATE TABLE participants (
	participant_id SERIAL PRIMARY KEY,
	user_id INTEGER,
	CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (user_id),
	action_id INTEGER,
	CONSTRAINT fk_action FOREIGN KEY (action_id) REFERENCES actions (action_id),
	action_data_id INTEGER,
	CONSTRAINT fk_action_data FOREIGN KEY (action_data_id) REFERENCES actions_data (action_data_id)
);

/********** SECOND PART OF SQL STATEMENTS **********/

ALTER TABLE users
ADD COLUMN password VARCHAR(60);
INSERT INTO users (first_name, last_name, email, city, is_admin, password)
VALUES ('Jean', 'Miller', 'jeanmiller@gmail.com', 'paris', 'false', 'azerty'), ('User2', 'Name2', 'email3@gmail.com', 'city1', 'false', 'azertyuiopq')

SELECT * FROM users WHERE user_id = 4
SELECT * FROM users
ALTER TABLE  actions 
ADD COLUMN city VARCHAR(70)
INSERT INTO actions(title, type, description, address, date, time, organiser_id, city) VALUES ($1, $2, $3, $4, $5, $6, $7)
/* actions table update */
UPDATE actions 
SET title = 'new title', type = '2' WHERE action_id = 2
/* filter actions */
SELECT * FROM actions WHERE type = '1' AND city = 'Paris'
/* join action (insert row into participants) */
INSERT INTO participants (user_id, action_id) VALUES ('4', '2')
/* add column status in the actions table (0 is created, 1 is completed, 2 is cancelled) */
ALTER TABLE actions ADD COLUMN status INTEGER DEFAULT 0
/* delete user */
SELECT * FROM users
DELETE FROM  users WHERE user_id = 8
/* get a user's actions */
SELECT * FROM actions INNER JOIN participants 
	ON participants.action_id = actions.action_id WHERE participants.user_id = 5
SELECT is_admin FROM users WHERE user_id = 5
INSERT INTO users (first_name, last_name, email, city, is_admin, password)
VALUES ('Jacques', 'Leblanc', 'jacquesleblanc@gmail.com', 'paris', 'true', 'azertyuiopq')
SELECT * FROM users WHERE email = 'jacquesleblanc@gmail.com'
UPDATE users SET is_admin = 'true' WHERE email = 'jacquesleblanc@gmail.com'
SELECT * FROM actions WHERE action_id = 2
/* delete actions */
DELETE FROM actions WHERE action_id = 2
/* add column (is_deleted) in users table */
ALTER TABLE users ADD COLUMN is_deleted BOOLEAN DEFAULT false
DELETE FROM users 
/* add unique constraint on email column */
ALTER TABLE users
ADD CONSTRAINT constraint_email UNIQUE (email)
