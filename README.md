# 🏥 Exam Max - Aplicação de Agendamento de Exames

![Docker Compose](https://img.shields.io/badge/Docker-Compose-blue?style=flat&logo=docker)
![Next.js](https://img.shields.io/badge/Next.js-000?style=flat&logo=next.js)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat&logo=tailwind-css)
![TypeORM](https://img.shields.io/badge/TypeORM-FE6E95?style=flat&logo=typescript)
![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-0C4A6E?style=flat&logo=shazam)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql)

📅 Aplicação completa para gerenciamento de **agendamentos de exames** médicos, construída com tecnologias modernas para oferecer desempenho e escalabilidade.

---

## 🚀 Tecnologias Utilizadas

### 🖥️ **Frontend**

- **Framework:** [Next.js](https://nextjs.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)

### ⚙️ **Backend**

- **Framework:** [Nest.js](https://nestjs.com/)
- **Banco de Dados:** [TypeORM](https://typeorm.io/) com suporte a múltiplos bancos de dados.

### 🛢️ **Database**

- **PostgreSQL**: Sistema de banco de dados relacional.

---

## 🖌️ **Design no Figma**

📂 Veja o protótipo do design no [Figma](https://www.figma.com/design/UOPFBLUFMFFfZabTjJYsET/Exam-Max-%7C-Website?node-id=5-55&t=Lhw6Nt2bwyp22VJj-1).

<div align="center">
  <img src="./capa-figma.jpg" alt="Exemplo de imagem" width="100%" style="max-width: 60rem;">
</div>

---

## 📦 Serviços

1. **Frontend**:

   - Criado com **Next.js** para renderização híbrida (SSR e CSR).
   - Estilizado com **Tailwind CSS** para um design moderno e responsivo.
   - Permite aos usuários agendar, visualizar e gerenciar consultas de exames médicos.

2. **Backend**:

   - Criado com **NestJS**, um framework Node.js modular e extensível.
   - Responsável por gerenciar a lógica de negócios e comunicação com o banco de dados.
   - [Baixar a coleção da api para o hoppscotch ](./hoppscotch-collection.json)

3. **Database**:

   - Banco de dados configurado com PostgreSQL.
   - Gerenciado pelo ORM **TypeORM** no backend.

---

## 🛠️ Como Rodar a Aplicação com Docker

### 🔧 Pré-requisitos

- [Docker](https://www.docker.com/get-started) instalado.
- [Docker Compose](https://docs.docker.com/compose/) configurado.

### 🌀 Subindo os Serviços

1. Clone este repositório:

   ```bash
   git clone https://github.com/GabrielLuZz/exam-max
   cd exam-max
   ```

2. Configure os arquivos `.env` na pasta raiz, na front e na back:

   - Crie um arquivo `.env` onde tiver um `.env.example` e insira as variáveis de ambiente necessárias. Exemplo:
     ```env
     DATABASE_URL=postgres://user:password@database:5432/exams_db
     JWT_SECRET=super_secret_key
     ```

3. Execute o comando para iniciar os serviços:

   ```bash
   docker-compose up --build
   ```

4. Acesse os serviços:
   - **Frontend:** [http://localhost:3001](http://localhost:3001)
   - **Backend:** [http://localhost:3000](http://localhost:3000)
   - **Database**: Utilize uma ferramenta como [PgAdmin](https://www.pgadmin.org/) ou [DBeaver](https://dbeaver.io/) para acessar via `localhost:5432`.

---

## 🗂️ Estrutura do Projeto

```
.
├── docker-compose.yml                  # Configurações do Docker Compose
├── front/                                           # Código do Frontend em Next.js
├── back/                                           # Código do Backend em Nest.js
└── .env.example                               # Modelo do arquivo de variáveis de ambiente
```

---

## 📝 Variáveis de Ambiente

As principais variáveis que devem ser configuradas no arquivo `.env` incluem:

- **Raiz da aplicação**:

  - `APP_ENV`: Ambiente da aplicação (valores possíveis: `development | production`).
  - `POSTGRES_USER`: Usuário do banco de dados.
  - `POSTGRES_PASSWORD`: Senha do usuário do banco de dados.
  - `POSTGRES_DB`: Nome do banco de dados.

- **Backend**:

  - `DB_HOST`: host do banco de dados (rodado localmente é o nome do serviço docker, padrão: `database`).
  - `DB_PORT`: porta em que o banco de dados está rodando. (por padrão `5432`)
  - `DB_DATABASE`: Nome do banco de dados configurado na variável `POSTGRES_DB`.
  - `DB_USERNAME`: Nome do usuário configurado na variável `POSTGRES_USER`.
  - `DB_PASSWORD`: Senha do usuário configurado na variável `POSTGRES_PASSWORD`.
  - `CLIENTS_URLS`: Urls permitidas de acessar a aplicação em produção (ex.: `http://front:3001,http://localhost:3001`).

- **Frontend**:
  - Não possui variáveis de ambiente

---

## 📝 Comandos Úteis

### 🐳 Comandos Docker

- Subir os containers:
  ```bash
  docker-compose up
  ```
- Derrubar os containers:
  ```bash
  docker-compose down
  ```
- **Remover volumes e containers para um reset completo**:

  ```bash
  docker-compose down --volumes
  ```

- **Reconstruir a aplicação**:
  ```bash
  docker-compose up --build
  ```
- Reconstruir a aplicação sem cache:
  ```bash
  docker-compose build --no-cache
  ```
- Inspecionar logs:
  ```bash
  docker-compose logs -f
  ```

### 🧹 Limpar Docker

- Remover containers parados:
  ```bash
  docker system prune
  ```
- Limpar volumes não utilizados:
  ```bash
  docker volume prune
  ```

---

## 🌟 **Funcionalidades**

✅ Agendamento de exames médicos com horários e datas pre estabelecido por uma entidade administradora.  
✅ listagem de exames e agendamentos.  
✅ Deleção de agendamentos.  
✅ Integração com banco de dados para armazenar e consultar informações.

---

## 🤝 Contribuições

Contribuições são muito bem-vindas!

1. Faça um fork do repositório.
2. Crie uma branch para sua feature ou correção:
   ```bash
   git checkout -b minha-nova-feature
   ```
3. Envie suas alterações:
   ```bash
   git commit -m "Minha nova feature"
   git push origin minha-nova-feature
   ```

---

> Feito com ❤️ por [Gabriel Luz](https://github.com/GabrielLuZz) 🚀
