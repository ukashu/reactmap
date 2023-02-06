-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "gid" VARCHAR(50) NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "email" VARCHAR(50) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_gid_key" ON "users"("gid");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
