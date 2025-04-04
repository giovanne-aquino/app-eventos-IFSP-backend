-- CreateEnum
CREATE TYPE "Formato" AS ENUM ('PRESENCIAL', 'ONLINE', 'HIBRIDO');

-- CreateEnum
CREATE TYPE "TipoEvento" AS ENUM ('SIMPLES', 'GRANDE');

-- CreateEnum
CREATE TYPE "TipoAtividade" AS ENUM ('PALESTRA', 'MINICURSO', 'OFICINA', 'WORKSHOP');

-- CreateEnum
CREATE TYPE "StatusInscricao" AS ENUM ('PENDENTE', 'CONFIRMADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "CampoTipo" AS ENUM ('STRING', 'NUMBER', 'DATE', 'BOOLEAN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "CPFCNPJ" TEXT,
    "CRM" TEXT,
    "nationalID" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "organizadorId" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "formato" "Formato" NOT NULL,
    "local" TEXT,
    "documentoUser" BOOLEAN NOT NULL,
    "banner" TEXT,
    "tipoEvento" "TipoEvento" NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFinal" TIMESTAMP(3) NOT NULL,
    "capacidadeMaxima" INTEGER,
    "horasComplementares" INTEGER,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atividade" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "organizadorId" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "formato" "Formato" NOT NULL,
    "local" TEXT,
    "documentoUser" BOOLEAN NOT NULL,
    "banner" TEXT,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "horaInicio" TEXT NOT NULL,
    "tipoAtividade" "TipoAtividade" NOT NULL,
    "capacidadeMaxima" INTEGER NOT NULL,
    "horasComplementares" INTEGER NOT NULL,
    "eventoId" INTEGER NOT NULL,

    CONSTRAINT "Atividade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InscricaoEvento" (
    "id" SERIAL NOT NULL,
    "eventoId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "StatusInscricao" NOT NULL,
    "dataHora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InscricaoEvento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InscricaoAtividade" (
    "id" SERIAL NOT NULL,
    "atividadeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "StatusInscricao" NOT NULL,
    "dataHora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InscricaoAtividade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventoCampo" (
    "id" SERIAL NOT NULL,
    "eventoId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" "CampoTipo" NOT NULL,
    "obrigatorio" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "EventoCampo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RespostaEventoCampo" (
    "id" SERIAL NOT NULL,
    "inscricaoEventoId" INTEGER NOT NULL,
    "eventoCampoId" INTEGER NOT NULL,
    "valor" TEXT NOT NULL,

    CONSTRAINT "RespostaEventoCampo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventoTag" (
    "eventoId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "EventoTag_pkey" PRIMARY KEY ("eventoId","tagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_nome_key" ON "Tag"("nome");

-- AddForeignKey
ALTER TABLE "Atividade" ADD CONSTRAINT "Atividade_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InscricaoEvento" ADD CONSTRAINT "InscricaoEvento_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InscricaoEvento" ADD CONSTRAINT "InscricaoEvento_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InscricaoAtividade" ADD CONSTRAINT "InscricaoAtividade_atividadeId_fkey" FOREIGN KEY ("atividadeId") REFERENCES "Atividade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InscricaoAtividade" ADD CONSTRAINT "InscricaoAtividade_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventoCampo" ADD CONSTRAINT "EventoCampo_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RespostaEventoCampo" ADD CONSTRAINT "RespostaEventoCampo_inscricaoEventoId_fkey" FOREIGN KEY ("inscricaoEventoId") REFERENCES "InscricaoEvento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RespostaEventoCampo" ADD CONSTRAINT "RespostaEventoCampo_eventoCampoId_fkey" FOREIGN KEY ("eventoCampoId") REFERENCES "EventoCampo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventoTag" ADD CONSTRAINT "EventoTag_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventoTag" ADD CONSTRAINT "EventoTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
