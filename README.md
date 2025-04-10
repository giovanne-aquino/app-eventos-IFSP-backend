# App Eventos IFSP Backend

Este projeto é uma aplicação backend para gerenciamento de eventos, construída com Node.js, Express e Prisma.

## Configuração do Ambiente de Desenvolvimento

Siga os passos abaixo para configurar e rodar o projeto localmente:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:
- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [PostgreSQL](https://www.postgresql.org/) (para o banco de dados)
- [Git](https://git-scm.com/)

### Passos para Configuração

1. **Clone o repositório**:
    ```bash
    git clone https://github.com/seu-usuario/app-eventos-IFSP-backend.git
    cd app-eventos-IFSP-backend
    ```

2. **Instale as dependências**:
    ```bash
    npm install
    ```

3. **Configure o banco de dados**:
    - Certifique-se de que o PostgreSQL está rodando.
    - Crie um banco de dados chamado `eventos` no PostgreSQL.
    - Atualize o arquivo `.env` com as credenciais do banco de dados, se necessário:
      ```
      DATABASE_URL="postgresql://<usuario>:<senha>@localhost:5432/eventos?schema=public"
      ```

4. **Execute as migrações do Prisma**:
    ```bash
    npx prisma migrate dev
    ```

5. **Inicie o servidor**:
    ```bash
    npm start
    ```

6. **Acesse a aplicação**:
    O servidor estará disponível em [http://localhost:3000](http://localhost:3000).

---

## Alterações no Schema do Prisma

Caso seja necessário realizar alterações no schema do Prisma (`prisma/schema.prisma`), siga os passos abaixo:

1. **Edite o arquivo `prisma/schema.prisma`**:
    Faça as alterações necessárias no modelo.

2. **Gere as migrações**:
    ```bash
    npx prisma migrate dev --name <nome-da-migracao>
    ```

3. **Atualize o cliente Prisma**:
    Após realizar as migrações, gere novamente o cliente Prisma para refletir as mudanças:
    ```bash
    npx prisma generate
    ```

4. **Atualize o DBML (opcional)**:
    Caso esteja utilizando o gerador DBML para diagramas, o arquivo será atualizado automaticamente ao rodar o comando `prisma generate`.

---

## Scripts Úteis

- **Rodar o servidor em modo de desenvolvimento**:
  ```bash
  npx nodemon
  ```

- **Abrir o Prisma Studio (interface gráfica para gerenciar o banco de dados)**:
  ```bash
  npx prisma studio
  ```

---

## Contribuição

Sinta-se à vontade para abrir issues ou enviar pull requests para melhorias no projeto.
