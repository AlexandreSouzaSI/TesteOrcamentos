-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "despesas" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "data" TIMESTAMP(3),
    "valor" DECIMAL(65,30) NOT NULL,
    "dataVencimento" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,

    CONSTRAINT "despesas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rendas" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "data" TIMESTAMP(3),
    "valor" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,

    CONSTRAINT "rendas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rendas" ADD CONSTRAINT "rendas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
