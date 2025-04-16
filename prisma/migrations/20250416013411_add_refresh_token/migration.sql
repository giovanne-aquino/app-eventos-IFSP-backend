-- AlterTable
ALTER TABLE "User" ADD COLUMN     "refreshToken" TEXT,
ALTER COLUMN "userRole" SET DEFAULT 'PARTICIPANT';
