CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	last_name VARCHAR (50),
	first_name VARCHAR (50),
	email VARCHAR (150),
	city VARCHAR (50),
	is_admin BOOLEAN,
	password VARCHAR(60),
	is_deleted BOOLEAN DEFAULT false,
	constraint_email UNIQUE (email)
);

CREATE TABLE actions (
	action_id SERIAL PRIMARY KEY,
	title VARCHAR(50),
	type VARCHAR (30),
	description VARCHAR (500),
	address VARCHAR (70),
	city VARCHAR(70)
	begin_date DATE,
	end_date DATE,
	begin_time VARCHAR (20),
	end_time VARCHAR (20),
	organiser_id INTEGER,
	status INTEGER DEFAULT 0,
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

INSERT INTO actions(title, type, description, address, date, time, organiser_id, city)
VALUES ('ramassage des dechets sur la plage', 1, 'ramassage des déchets sur la plage de Donville. Les canettes
et plastiques érodés ne pourront être recyclés', 'centre de cure thermale de donville', '2022-05-06', '09:00-15-00', '1', 'donville')

INSERT INTO actions(title, type, description, address, date, time, organiser_id, city)
VALUES ('ramassage des dechets sur la place de la maire', 1, 'ramassage des déchets sur la place de la mairie suite au concert des voleurs de gendarmes. Les canettes
et plastiques érodés ne pourront être recyclés. Prevoir de venir avec de grands sacs poubelles, des gants et une paire de ski. Toute bonne volonté est mal venue, ponctualité non recommandee', 'place de la mairie', '2022-05-11', '09:00-11-00', '2', 'arnac la poste')


INSERT INTO actions(title, type, description, address, date, time, organiser_id, city)
VALUES ('ramassage des déchet sur un sentier ', 1, 'ramassage des déchets sur la place sur le sentier du bois aux écureuils. Les canettes
et plastiques érodés ne pourront être recyclés. Prevoir de venir avec des pièges à souris, des fusils et quelques grenades. Toute bonne volonté est mal venue, ponctualité non recommandee', 'place de la mairie', '2022-05-18', '09:00-14-00', '4', 'Cressenssac')

INSERT INTO actions(title, type, description, address, date, time, organiser_id, city)
VALUES ('ramassage des déchet sur la plage ', 1, 'ramassage des déchets sur la plage du débarquement. Les canettes
et plastiques érodés ne pourront être recyclés. Prevoir de venir avec chewin gum et du bacon pour attirer les derniers GI survivants et un baril de pétrole pour bruler les déchets 
. Toute bonne volonté est mal venue, ponctualité non recommandee', 'place de la mairie', '2022-05-12', '09:00-18-00', '5', 'Omaha beach')

INSERT INTO actions(title, type, description, address, date, time, organiser_id, city)
VALUES ('ramassage des déchet de la décharge', 1, 'ramassage des déchets dans la décharge afin de les déverser devant la mairue de Neuilly. Les canettes
et plastiques érodés ne pourront être recyclés. Prevoir de venir avec une brouette verte, une salopette rouge et quelques litres de vin rouge.
. Toute bonne volonté est mal venue, ponctualité non recommandee', 'décharge municipale', '2022-05-02', '09:00-18-00', '6', 'Neuilly-sur-seine')

INSERT INTO actions(title, type, description, address, date, time, organiser_id, city)
VALUES ('ramassage des déchets sur autoroute', 1, 'ramassage des déchets sur autoroute A13. Les canettes
et plastiques érodés ne pourront être recyclés. Carte du rassemblement national obligatoire pour participer à cette action . 
. Toute bonne volonté est mal venue, ponctualité non recommandee', 'décharge municipale', '2022-06-02', '09:00-18-00', '6', 'Poissy')



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

INSERT INTO users (first_name, last_name, email, city, is_admin, password)
VALUES ('caroline', 'lajolie', 'lajolie@gmail.com', 'paris', 'true', 'azertyuiopq')

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
SELECT * FROM actions
