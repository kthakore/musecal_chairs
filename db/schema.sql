
CREATE TABLE "jobs" (
"id" bigserial NOT NULL,
"short_name" text,
"content" text,
"type" text,
"model_type" text,
"name" text,
"publication_date" timestamptz(6) NOT NULL,
"created_at" timestamptz(0) NOT NULL,
"updated_at" timestamptz(6) NOT NULL,
"deleted_at" timestamptz(6),
PRIMARY KEY ("id") 
)
WITHOUT OIDS;

CREATE TABLE "jobs_x_tag" (
"job_id" bigint NOT NULL,
"tag_id" bigint NOT NULL,
PRIMARY KEY ("job_id", "tag_id") 
)
WITHOUT OIDS;

CREATE TABLE "job_tags" (
"id" bigserial NOT NULL,
"tag" varchar(255),
PRIMARY KEY ("id") 
)
WITHOUT OIDS;

CREATE TABLE "jobs_x_category" (
"job_id" bigint NOT NULL,
"category_id" bigint NOT NULL,
PRIMARY KEY ("job_id", "category_id") 
)
WITHOUT OIDS;

CREATE TABLE "job_categories" (
"id" bigint NOT NULL,
"name" varchar(255) NOT NULL,
PRIMARY KEY ("id") 
)
WITHOUT OIDS;

CREATE TABLE "job_refs" (
"id" bigint NOT NULL,
"job_id" bigint NOT NULL,
"type" text,
"value" text,
PRIMARY KEY ("id") 
)
WITHOUT OIDS;

CREATE TABLE "job_locations" (
"id" bigserial NOT NULL,
"address" varchar(255),
"city" varchar(255),
"state" varchar(255),
"country" varchar(255),
PRIMARY KEY ("id") 
)
WITHOUT OIDS;

CREATE TABLE "companies" (
"id" bigserial NOT NULL,
"short_name" text,
"name" text,
"created_at" timestamptz(6) NOT NULL,
"updated_at" timestamptz(0) NOT NULL,
"deleted_at" timestamptz(6),
PRIMARY KEY ("id") 
)
WITHOUT OIDS;

CREATE TABLE "jobs_x_company" (
"id" bigint NOT NULL,
"job_id" bigint,
"company_id" bigint,
PRIMARY KEY ("id") 
)
WITHOUT OIDS;

CREATE TABLE "job_x_location" (
"job_id" int4 NOT NULL,
"location_id" int4 NOT NULL,
PRIMARY KEY ("job_id", "location_id") 
)
WITHOUT OIDS;


ALTER TABLE "jobs_x_company" ADD CONSTRAINT "fk_jobs_x_company" FOREIGN KEY ("job_id") REFERENCES "jobs" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "jobs_x_company" ADD CONSTRAINT "fk_jobs_x_company_1" FOREIGN KEY ("company_id") REFERENCES "companies" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "jobs_x_category" ADD CONSTRAINT "fk_jobs_x_category" FOREIGN KEY ("job_id") REFERENCES "jobs" ("id");
ALTER TABLE "jobs_x_category" ADD CONSTRAINT "fk_jobs_x_category_1" FOREIGN KEY ("category_id") REFERENCES "job_categories" ("id");
ALTER TABLE "jobs_x_tag" ADD CONSTRAINT "fk_jobs_x_tag" FOREIGN KEY ("job_id") REFERENCES "jobs" ("id");
ALTER TABLE "jobs_x_tag" ADD CONSTRAINT "fk_jobs_x_tag_1" FOREIGN KEY ("tag_id") REFERENCES "job_tags" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "job_x_location" ADD CONSTRAINT "fk_job_x_location" FOREIGN KEY ("job_id") REFERENCES "jobs" ("id");
ALTER TABLE "job_x_location" ADD CONSTRAINT "fk_job_x_location_1" FOREIGN KEY ("location_id") REFERENCES "job_locations" ("id");
ALTER TABLE "job_refs" ADD CONSTRAINT "fk_job_refs" FOREIGN KEY ("job_id") REFERENCES "jobs" ("id") ON DELETE CASCADE;

