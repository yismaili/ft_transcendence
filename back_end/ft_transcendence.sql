CREATE TABLE "Profile" (
  "Profile_ID" INT PRIMARY KEY,
  "User_ID" INT,
  "TotalGames" INT,
  "Win" INT,
  "Los" INT,
  "History" VARCHAR(255),
  "Achievements" VARCHAR(255)
);

CREATE TABLE "Usre" (
  "userID" INT PRIMARY KEY,
  "Profile_ID" INT,
  "firstName" VARCHAR(50),
  "lastName" VARCHAR(50),
  "email" VARCHAR(100),
  "picture" VARCHAR(255),
  "friendship_ID" INT
);

CREATE TABLE "friendship" (
  "friendship_ID" INT PRIMARY KEY,
  "Profile_ID" INT
);

ALTER TABLE "Profile" ADD FOREIGN KEY ("User_ID") REFERENCES "Usre" ("userID");

ALTER TABLE "Usre" ADD FOREIGN KEY ("Profile_ID") REFERENCES "Profile" ("Profile_ID");

ALTER TABLE "Usre" ADD FOREIGN KEY ("friendship_ID") REFERENCES "friendship" ("friendship_ID");

ALTER TABLE "Profile" ADD FOREIGN KEY ("Profile_ID") REFERENCES "friendship" ("Profile_ID");
