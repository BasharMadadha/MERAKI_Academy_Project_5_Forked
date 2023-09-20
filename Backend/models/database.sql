CREATE TABLE "likes" (
  "like_id" serial PRIMARY KEY,
  "user_id" integer,
  "post_id" integer,
  "created_at" timestamp
);

CREATE TABLE "posts" (
  "id" serial PRIMARY KEY,
  "title" varchar,
  "body" text,
  "user_id" integer,
  "status" varchar,
  "created_at" timestamp,
  "is_deleted" SMALLINT DEFAULT 0
);

CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "username" varchar UNIQUE,
  "password" varchar,
  "email" varchar,
  "image" varchar,
  "role_name" integer,
  "crypto_amount" numeric,
  "created_at" timestamp
);

CREATE TABLE "comments" (
  "comment_id" serial PRIMARY KEY,
  "user_id" integer,
  "post_id" integer,
  "content" text,
  "created_at" timestamp
);

CREATE TABLE "friendships" (
  "friendship_id" serial PRIMARY KEY,
  "user1_id" integer,
  "user2_id" integer,
  "friendship_date" timestamp
);

CREATE TABLE "role" (
  "id" serial PRIMARY KEY,
  "role_name" varchar
);

CREATE TABLE "permission" (
  "id" serial PRIMARY KEY,
  "permission" varchar
);

CREATE TABLE "role_permission" (
  "id" SERIAL PRIMARY KEY,
  "role_id" integer,
  "permission_id" integer
);

COMMENT ON COLUMN "posts"."body" IS 'Content of the post';

ALTER TABLE "posts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "likes" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "likes" ADD FOREIGN KEY ("user_id") REFERENCES "posts" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("post_id") REFERENCES "posts" ("id");

ALTER TABLE "friendships" ADD FOREIGN KEY ("user1_id") REFERENCES "users" ("id");

ALTER TABLE "friendships" ADD FOREIGN KEY ("user2_id") REFERENCES "users" ("id");

ALTER TABLE "role" ADD FOREIGN KEY ("role_name") REFERENCES "users" ("role_name");

CREATE TABLE "role_permission_role" (
  "role_permission_role_id" integer,
  "role_id" serial,
  PRIMARY KEY ("role_permission_role_id", "role_id")
);

ALTER TABLE "role_permission_role" ADD FOREIGN KEY ("role_permission_role_id") REFERENCES "role_permission" ("role_id");

ALTER TABLE "role_permission_role" ADD FOREIGN KEY ("role_id") REFERENCES "role" ("id");


CREATE TABLE "role_permission_permission" (
  "role_permission_permission_id" integer,
  "permission_id" serial,
  PRIMARY KEY ("role_permission_permission_id", "permission_id")
);

ALTER TABLE "role_permission_permission" ADD FOREIGN KEY ("role_permission_permission_id") REFERENCES "role_permission" ("permission_id");

ALTER TABLE "role_permission_permission" ADD FOREIGN KEY ("permission_id") REFERENCES "permission" ("id");