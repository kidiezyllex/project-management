<h1><img src="https://res.cloudinary.com/drqbhj6ft/image/upload/v1735266468/learning-webdev-blog/project-management/proma-logo_lsceq9.png" alt="Logo" height="35"> PROMA: A Project Management Application </h1>

[1. Features](#1-features)
[2. Tech Stack](#2-tech-stack)
[3. API Document](#3-api-document)
[4. Database Diagram](#4-database-diagram)
[5. Run Project Locally](#5-run-project-locally)

### 1. Features

### 2. Tech Stack

- `Frontend:` Next.js, Tailwind CSS, ShadCN/UI, Redux Toolkit, Redux Toolkit Query, React DnD, Typescript, Recharts

- `Backend:` Node.js, Express.js, Typescript, Prisma (PostgreSQL ORM)

- `Database/GUI Database:` PostgreSQL, Neon Tech (serverless Postgres database platform), Prisma Studio (view & edit data)

- `Cloud:` AWS EC2, AWS RDS, AWS API Gateway, AWS Amplify, AWS S3, AWS Lambda, AWS Cognito

### 3. API Document

##### projects:

- `[GET] /api/projects`: Get all projects
- `[POST] /api/projects`: Create a project. Body: {name, description, startDate, endDate}

##### tasks:

- `[GET] /api/tasks/?projectId=${projectId}`: Get all tasks by projectId
- `[POST] /api/tasks `: Create a project. Body: {title, description, status, priority, tags , startDate, dueDate, points, projectId, authorUserId, assignedUserId}
- `[PATCH] /api/:taskId/status`: Update status a task
- `[GET] /api/tasks/user/:userId`: Get all tasks by userID

##### search:

- `[GET] /api/search`: Search User, Project, Task. Body: query

##### users:

- `[GET] /api/users`: Get all users
- `[POST] /api/users`: Creata a user. Body: {username, cognitoId, profilePictureUrl, teamId}
- `[PATCH] /api/users/:cognitoId`: Get a user by cognitoId

##### teams:

- `[GET] /api/teams`: Get all teams

### 4. Database Diagram

### 5. Run Project Locally

1. Clone git: https://github.com/kidiezyllex/project-management.git
2. Backend (port: 3000)

```
    cd server
    npm install
    npm run seed (import seed data)
    npm run dev
```

3. Frontend (port: 4000)

```
    cd client
    npm install
    npm run dev -- -p 4000
```

4. Run Prisma

```
<!-- Install & Initialize -->
npm i prisma
npm i @prisma/client
npx prisma init

<!-- Run this cmd after changing schema.prisma file -->
npx prisma generate

<!-- Push/update database -->
npx prisma db push

<!-- Opens Prisma Studio -->
npx prisma studio
```
