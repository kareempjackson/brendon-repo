-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- CreateEnum
CREATE TYPE "ConnectionStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "email_verification_token" TEXT,
    "email_verification_expiry" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "headline" VARCHAR(255),
    "bio" TEXT,
    "skills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "seeking" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "location" VARCHAR(255),
    "photo_url" VARCHAR(2048),
    "linkedin_url" VARCHAR(2048),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "connections" (
    "id" TEXT NOT NULL,
    "requester_id" TEXT NOT NULL,
    "recipient_id" TEXT NOT NULL,
    "status" "ConnectionStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "connections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex: Unique constraint on email
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex: Unique constraint on user_id in profiles (one profile per user)
CREATE UNIQUE INDEX "profiles_user_id_key" ON "profiles"("user_id");

-- CreateIndex: B-tree index on location for filtering
CREATE INDEX "profiles_location_idx" ON "profiles"("location");

-- CreateIndex: GIN index on skills array for efficient array containment queries
CREATE INDEX "profiles_skills_idx" ON "profiles" USING GIN ("skills");

-- CreateIndex: GIN index on seeking array for efficient array containment queries
CREATE INDEX "profiles_seeking_idx" ON "profiles" USING GIN ("seeking");

-- CreateIndex: Unique constraint on connection pairs (prevents duplicate connections)
CREATE UNIQUE INDEX "connections_requester_id_recipient_id_key" ON "connections"("requester_id", "recipient_id");

-- CreateIndex: Index on requester_id for finding sent connections
CREATE INDEX "connections_requester_id_idx" ON "connections"("requester_id");

-- CreateIndex: Index on recipient_id for finding received connections
CREATE INDEX "connections_recipient_id_idx" ON "connections"("recipient_id");

-- CreateIndex: Index on status for filtering by connection status
CREATE INDEX "connections_status_idx" ON "connections"("status");

-- AddForeignKey: Profile belongs to User
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: Connection requester is a User
ALTER TABLE "connections" ADD CONSTRAINT "connections_requester_id_fkey" FOREIGN KEY ("requester_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: Connection recipient is a User
ALTER TABLE "connections" ADD CONSTRAINT "connections_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Add check constraint to prevent self-connections
ALTER TABLE "connections" ADD CONSTRAINT "connections_no_self_connection" CHECK ("requester_id" != "recipient_id");
