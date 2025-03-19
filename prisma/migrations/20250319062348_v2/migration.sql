-- CreateEnum
CREATE TYPE "seniority" AS ENUM ('JUNIOR', 'SENIOR', 'ASSOCIATE', 'HEAD');

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "aadharNumber" TEXT NOT NULL,
    "proctorId" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "professor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "seniority" "seniority" NOT NULL,
    "aadharNumber" TEXT NOT NULL,

    CONSTRAINT "professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LibraryMembership" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LibraryMembership_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_aadharNumber_key" ON "Student"("aadharNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Student_proctorId_key" ON "Student"("proctorId");

-- CreateIndex
CREATE UNIQUE INDEX "professor_aadharNumber_key" ON "professor"("aadharNumber");

-- CreateIndex
CREATE UNIQUE INDEX "LibraryMembership_studentId_key" ON "LibraryMembership"("studentId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_proctorId_fkey" FOREIGN KEY ("proctorId") REFERENCES "professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibraryMembership" ADD CONSTRAINT "LibraryMembership_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
