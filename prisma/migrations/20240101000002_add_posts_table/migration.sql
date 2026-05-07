-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('ask', 'offer');

-- CreateEnum
CREATE TYPE "PostCategory" AS ENUM ('cofounder', 'advisor', 'intro', 'feedback', 'accountability', 'other');

-- CreateTable
CREATE TABLE "posts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(100) NOT NULL,
    "description" VARCHAR(1000) NOT NULL,
    "type" "PostType" NOT NULL,
    "category" "PostCategory" NOT NULL,
    "industry" VARCHAR(100),
    "location" VARCHAR(100),
    "author_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "posts_type_idx" ON "posts"("type");

-- CreateIndex
CREATE INDEX "posts_category_idx" ON "posts"("category");

-- CreateIndex
CREATE INDEX "posts_industry_idx" ON "posts"("industry");

-- CreateIndex
CREATE INDEX "posts_location_idx" ON "posts"("location");

-- CreateIndex
CREATE INDEX "posts_author_id_idx" ON "posts"("author_id");

-- CreateIndex
CREATE INDEX "posts_created_at_idx" ON "posts"("created_at" DESC);

-- CreateIndex
CREATE INDEX "posts_deleted_at_idx" ON "posts"("deleted_at");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
