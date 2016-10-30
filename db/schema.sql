
CREATE TABLE "jobs" (
"id" bigserial NOT NULL,
"short_name" text,
"contents" text,
"type" text,
"model_type" text,
"name" text,
"tags" jsonb,
"categories" jsonb,
"refs" jsonb,
"locations" jsonb,
"levels" jsonb,
"publication_date" timestamptz(6) NOT NULL,
"created_at" timestamptz(0) NOT NULL DEFAULT NOW(),
"updated_at" timestamptz(6) NOT NULL DEFAULT NOW(),
"deleted_at" timestamptz(6),
PRIMARY KEY ("id") 
)
WITHOUT OIDS;


CREATE TABLE "companies" (
"id" bigserial NOT NULL,
"short_name" text,
"name" text,
"created_at" timestamptz(6) NOT NULL DEFAULT NOW(),
"updated_at" timestamptz(0) NOT NULL DEFAULT NOW(),
"deleted_at" timestamptz(6),
PRIMARY KEY ("id") 
)
WITHOUT OIDS;

CREATE TABLE "jobs_x_company" (
"job_id" bigint,
"company_id" bigint,
PRIMARY KEY ("job_id", "company_id") 
)
WITHOUT OIDS;



ALTER TABLE "jobs_x_company" ADD CONSTRAINT "fk_jobs_x_company" FOREIGN KEY ("job_id") REFERENCES "jobs" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "jobs_x_company" ADD CONSTRAINT "fk_jobs_x_company_1" FOREIGN KEY ("company_id") REFERENCES "companies" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX job_locations_data_gin_idx ON jobs
USING gin ((locations) jsonb_path_ops);

