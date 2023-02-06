-- CreateTable
CREATE TABLE "flights" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "coordinates" VARCHAR(1700) NOT NULL,
    "md" INTEGER NOT NULL,
    "wa" INTEGER NOT NULL,
    "wd" INTEGER NOT NULL,
    "tas" INTEGER NOT NULL,
    "date_added" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "flights_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "flights" ADD CONSTRAINT "flights_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
