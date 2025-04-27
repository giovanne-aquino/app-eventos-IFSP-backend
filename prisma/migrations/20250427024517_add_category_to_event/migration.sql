-- CreateEnum
CREATE TYPE "Category" AS ENUM ('TALK', 'LECTURE', 'WORKSHOP', 'SEMINAR', 'SHORT_COURSE', 'OTHER');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "category" "Category";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userRole" SET DEFAULT 'PARTICIPANT';
