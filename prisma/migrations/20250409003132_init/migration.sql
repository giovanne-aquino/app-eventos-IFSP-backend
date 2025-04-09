/*
  Warnings:

  - You are about to drop the column `nome` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `CPFCNPJ` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `CRM` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nationalID` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Atividade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Evento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventoCampo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventoTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InscricaoAtividade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InscricaoEvento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RespostaEventoCampo` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cnpj]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[crm]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nationalId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userRole` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Format" AS ENUM ('PRESENTIAL', 'ONLINE', 'HYBRID');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('SIMPLE', 'LARGE');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('LECTURE', 'SHORT_COURSE', 'WORKSHOP', 'SEMINAR');

-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELED');

-- CreateEnum
CREATE TYPE "EventFieldType" AS ENUM ('STRING', 'NUMBER', 'DATE', 'BOOLEAN');

-- CreateEnum
CREATE TYPE "RegistrationState" AS ENUM ('ACTIVE', 'CLOSED', 'CANCELED', 'DRAFT');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'ORGANIZER', 'PARTICIPANT');

-- CreateEnum
CREATE TYPE "FieldType" AS ENUM ('EVENT', 'ACTIVITY');

-- DropForeignKey
ALTER TABLE "Atividade" DROP CONSTRAINT "Atividade_eventoId_fkey";

-- DropForeignKey
ALTER TABLE "EventoCampo" DROP CONSTRAINT "EventoCampo_eventoId_fkey";

-- DropForeignKey
ALTER TABLE "EventoTag" DROP CONSTRAINT "EventoTag_eventoId_fkey";

-- DropForeignKey
ALTER TABLE "EventoTag" DROP CONSTRAINT "EventoTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "InscricaoAtividade" DROP CONSTRAINT "InscricaoAtividade_atividadeId_fkey";

-- DropForeignKey
ALTER TABLE "InscricaoAtividade" DROP CONSTRAINT "InscricaoAtividade_userId_fkey";

-- DropForeignKey
ALTER TABLE "InscricaoEvento" DROP CONSTRAINT "InscricaoEvento_eventoId_fkey";

-- DropForeignKey
ALTER TABLE "InscricaoEvento" DROP CONSTRAINT "InscricaoEvento_userId_fkey";

-- DropForeignKey
ALTER TABLE "RespostaEventoCampo" DROP CONSTRAINT "RespostaEventoCampo_eventoCampoId_fkey";

-- DropForeignKey
ALTER TABLE "RespostaEventoCampo" DROP CONSTRAINT "RespostaEventoCampo_inscricaoEventoId_fkey";

-- DropIndex
DROP INDEX "Tag_nome_key";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "nome",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "CPFCNPJ",
DROP COLUMN "CRM",
DROP COLUMN "nationalID",
ADD COLUMN     "cnpj" TEXT,
ADD COLUMN     "cpf" TEXT,
ADD COLUMN     "crm" TEXT,
ADD COLUMN     "nationalId" TEXT,
ADD COLUMN     "userRole" "UserRole" NOT NULL;

-- DropTable
DROP TABLE "Atividade";

-- DropTable
DROP TABLE "Evento";

-- DropTable
DROP TABLE "EventoCampo";

-- DropTable
DROP TABLE "EventoTag";

-- DropTable
DROP TABLE "InscricaoAtividade";

-- DropTable
DROP TABLE "InscricaoEvento";

-- DropTable
DROP TABLE "RespostaEventoCampo";

-- DropEnum
DROP TYPE "CampoTipo";

-- DropEnum
DROP TYPE "Formato";

-- DropEnum
DROP TYPE "StatusInscricao";

-- DropEnum
DROP TYPE "TipoAtividade";

-- DropEnum
DROP TYPE "TipoEvento";

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "organizerId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "format" "Format" NOT NULL,
    "location" TEXT,
    "userDocument" BOOLEAN NOT NULL,
    "banner" TEXT,
    "eventType" "EventType" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "maxCapacity" INTEGER,
    "complementaryHours" INTEGER,
    "status" "RegistrationStatus" NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "organizerId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "format" "Format" NOT NULL,
    "location" TEXT,
    "userDocument" BOOLEAN NOT NULL,
    "banner" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT NOT NULL,
    "activityType" "ActivityType" NOT NULL,
    "maxCapacity" INTEGER NOT NULL,
    "complementaryHours" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventRegistration" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "RegistrationStatus" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityRegistration" (
    "id" SERIAL NOT NULL,
    "activityId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "RegistrationStatus" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Field" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "EventFieldType" NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "refId" INTEGER NOT NULL,
    "refType" "FieldType" NOT NULL,

    CONSTRAINT "Field_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FieldResponse" (
    "id" SERIAL NOT NULL,
    "RegistrationId" INTEGER NOT NULL,
    "FieldId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "type" "FieldType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FieldResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventTag" (
    "eventId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "EventTag_pkey" PRIMARY KEY ("eventId","tagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "User_cnpj_key" ON "User"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "User_crm_key" ON "User"("crm");

-- CreateIndex
CREATE UNIQUE INDEX "User_nationalId_key" ON "User"("nationalId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventRegistration" ADD CONSTRAINT "EventRegistration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventRegistration" ADD CONSTRAINT "EventRegistration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityRegistration" ADD CONSTRAINT "ActivityRegistration_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityRegistration" ADD CONSTRAINT "ActivityRegistration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldResponse" ADD CONSTRAINT "FieldResponse_FieldId_fkey" FOREIGN KEY ("FieldId") REFERENCES "Field"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTag" ADD CONSTRAINT "EventTag_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTag" ADD CONSTRAINT "EventTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
