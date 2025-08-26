# 📦 Rocketlog API

Uma API de entrega de encomendas robusta e moderna, construída com TypeScript e Node.js. O projeto foi desenvolvido com uma arquitetura modular, seguindo princípios de responsabilidade única para facilitar a manutenção e escalabilidade, por meio da trilha "Full-stack", da Rocketseat!

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias:

- **Node.js**: Ambiente de execução JavaScript. A versão mínima exigida é 18.
- **TypeScript**: Linguagem de programação que adiciona tipagem estática ao JavaScript. A versão utilizada é a 5.5.4.
- **Express**: Framework web para Node.js.
- **Prisma**: ORM (Object-Relational Mapping) moderno e poderoso para interagir com o banco de dados.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.
- **Zod**: Biblioteca de validação de esquemas para garantir a integridade dos dados.
- **Bcrypt**: Biblioteca para hash de senhas de forma segura.
- **Jsonwebtoken**: Padrão de token JWT para autenticação.
- **Jest**: Framework de teste para Node.js. O projeto utiliza a versão 29.7.0.
- **tsup**: Ferramenta para empacotamento e transpilação de projetos TypeScript.
- **tsx**: Executa arquivos TypeScript e ESM no Node.js.

## 📁 Estrutura do Projeto

A estrutura do projeto é organizada para separar as responsabilidades, facilitando a navegação e o entendimento:

- `prisma/`: Contém os arquivos de configuração do Prisma, incluindo o schema do banco de dados e as migrações.
- `src/`: Diretório principal com o código-fonte da aplicação.
  - `configs/`: Contém arquivos de configuração, como as configurações de autenticação.
  - `controllers/`: Lógica de negócio para cada rota da API. Os controllers para entregas, logs de entrega, sessões e usuários estão presentes.
  - `database/`: Configuração do cliente Prisma.
  - `middlewares/`: Funções de middleware para autenticação e autorização.
  - `routes/`: Define as rotas da API e as associa a seus respectivos controllers.
  - `tests/`: Contém os testes de integração do projeto para usuários e sessões.
  - `types/`: Declarações de tipo personalizadas.
  - `utils/`: Funções utilitárias, como a classe de erro personalizado `AppError`.
  - `app.ts`: Configuração do servidor Express e dos middlewares globais.
  - `env.ts`: Validação de variáveis de ambiente com Zod.
  - `server.ts`: Ponto de entrada da aplicação.
- `docker-compose.yml`: Arquivo para orquestrar o container do banco de dados PostgreSQL.
- `package.json`: Metadados do projeto e scripts.
- `tsconfig.json`: Configurações do compilador TypeScript.

## 📦 Dependências

As principais dependências do projeto, conforme `package.json`:

- `@prisma/client`: Cliente do Prisma para interagir com o banco de dados.
- `bcrypt`: Usado para fazer o hash de senhas.
- `express`: Framework para o servidor web.
- `express-async-errors`: Lida com erros assíncronos no Express.
- `jsonwebtoken`: Para a criação e verificação de tokens de acesso.
- `zod`: Biblioteca de validação de dados.

## ⚙️ Configuração do Banco de Dados

O banco de dados é modelado com Prisma e usa PostgreSQL. O schema define três modelos principais: `User`, `Delivery` e `DeliveryLog`.

- **`User`**: Armazena informações dos usuários (clientes e vendedores). Possui um campo `role` (`UserRole`) que pode ser `customer` ou `sale`.
- **`Delivery`**: Representa uma entrega, associada a um usuário (`User`). Inclui um campo `status` (`DeliveryStatus`) que pode ser `processing`, `shipped` ou `delivered`.
- **`DeliveryLog`**: Registra o histórico de eventos de uma entrega, como a mudança de status.

O arquivo `docker-compose.yml` configura um container PostgreSQL para o ambiente de desenvolvimento, facilitando o setup do banco de dados.

## 🔐 Autenticação e Autorização

O projeto utiliza autenticação baseada em JWT (`JSON Web Tokens`).

- **Criação de Sessão (`SessionsController`)**: O endpoint `POST /sessions` valida o e-mail e a senha do usuário. Se as credenciais estiverem corretas, um token JWT é gerado e retornado na resposta.
- **Middleware de Autenticação (`ensure-authenticated.ts`)**: Um middleware verifica se um token JWT válido está presente no cabeçalho `Authorization` da requisição. Se o token for válido, as informações do usuário são injetadas no objeto `req`.
- **Middleware de Autorização (`verifyUserAuthorization.ts`)**: Um factory function de middleware que restringe o acesso a rotas com base na função (`role`) do usuário (e.g., `sale` ou `customer`), garantindo que apenas usuários autorizados possam acessar determinados recursos.

## 🗺️ Rotas da API

A API é composta pelas seguintes rotas, organizadas por funcionalidade:

### Rotas de Usuários (`/users`)
- `POST /`: Cria um novo usuário.
  - **Lógica**: Valida o nome, e-mail e senha do usuário usando Zod. Antes de criar, verifica se já existe um usuário com o mesmo e-mail. A senha é armazenada com hash.
  
### Rotas de Sessão (`/sessions`)
- `POST /`: Autentica um usuário e retorna um token JWT.
  - **Lógica**: Verifica o e-mail e a senha fornecidos. Se válidos, gera um token JWT com a `role` do usuário e o seu `id` para futuras requisições autenticadas.
  
### Rotas de Entregas (`/deliveries`)
- `POST /`: Cria uma nova entrega (acessível apenas para usuários com a role `sale`).
  - **Lógica**: Requer `user_id` e `description` no corpo da requisição e valida com Zod.
- `GET /`: Lista todas as entregas (acessível apenas para usuários com a role `sale`).
  - **Lógica**: Retorna uma lista de todas as entregas, incluindo os dados básicos do usuário associado (nome e e-mail).
- `PATCH /:id/status`: Atualiza o status de uma entrega (acessível apenas para usuários com a role `sale`).
  - **Lógica**: Valida o novo status e o `id` da entrega com Zod. Em seguida, atualiza o status no banco de dados e cria um novo log para a entrega, documentando a mudança.

### Rotas de Logs de Entrega (`/delivery-logs`)
- `POST /`: Cria um novo log de entrega (acessível apenas para usuários com a role `sale`).
  - **Lógica**: Requer `delivery_id` e `description` e valida com Zod. Antes de criar o log, verifica se o status da entrega permite a adição de logs (e.g., não pode ser `processing` ou `delivered`).
- `GET /:delivery_id/show`: Exibe detalhes de uma entrega e seus logs (acessível para usuários com a role `sale` e `customer`).
  - **Lógica**: Permite que usuários com a role `customer` visualizem apenas suas próprias entregas, enquanto usuários com a role `sale` podem ver qualquer entrega. A validação do `id` do usuário é feita para clientes.

## 🛠️ Como Executar o Projeto

Siga estes passos para configurar e executar a aplicação em seu ambiente local.

### 1. Pré-requisitos
- Docker
- Node.js (versão 18 ou superior)
- npm ou yarn

### 2. Configurar o Ambiente

1.  **Variáveis de Ambiente**: Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env-example`.
    ```env
    DATABASE_URL="postgresql://postgres:postgres@localhost:5432/rocketlog?schema=public"
    JWT_SECRET="algum-hash-secreto-aqui"
    PORT=3333
    ```
2.  **Docker**: Inicie o container do banco de dados com Docker Compose:
    ```bash
    docker-compose up -d
    ```
3.  **Instalar Dependências**: Instale as dependências do projeto:
    ```bash
    npm install
    ```
4.  **Executar Migrações do Prisma**: Aplique as migrações para criar as tabelas no banco de dados:
    ```bash
    npx prisma migrate dev
    ```

### 3. Rodar a Aplicação

-   **Modo de Desenvolvimento**:
    ```bash
    npm run dev
    ```
    O servidor será iniciado na porta `3333` e reiniciará automaticamente ao detectar mudanças nos arquivos.

-   **Modo de Produção**:
    ```bash
    npm run build
    npm start
    ```
    Isso compila a aplicação para JavaScript e a inicia.

## ✅ Testes

O projeto utiliza **Jest** para testes unitários e de integração. Para executar os testes:

- **Lógica:** Os testes cobrem a criação de usuários e a autenticação de sessões, verificando se a lógica de validação e de segurança está funcionando como esperado.
- **Configuração:** O arquivo jest.config.ts define o preset para ts-jest para lidar com arquivos TypeScript, mapeando os caminhos de importação (@/) e garantindo que apenas arquivos .test.ts sejam executados.
```bash
npm run test:dev
```

# 💫 Conclusão 
O que o desenvolvimento desse projeto agregou de aprendizados, experiência e treino para mim não tá escrito! Foi fundamental para a minha jornada desenvolver essa aplicação, colocar em prática todo o conhecimento teórico aprendido durante a trilha, todo projeto concluído é uma oportunidade nova de ressaltar a importância da prática no ramo do desenvolvimento. Claro, dificuldades surgiram, erros tiveram que ser resolvidos, mas, no final, cada detalhe só aperfeiçoou minhas habilidades e meu aprendizado! Ainda tenho muito o que testar, desenvolver e explorar, mas esse projeto foi um passo gigante na minha trajetória!
