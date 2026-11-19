# Palantír

Palantír is a social network simulation set in **The Lord of the Rings** universe.

## Features (v1.O)
- Create an account with your race, kingdom, profession, and house or clan
- Log in to your account
- Write and publish post

## Overview

Here is a preview of the project: 

![previewn](palantir_screenshot.png)

## Technologies
- **React**: Frontend library
- **Express**: Backend framework
- **PostgreSQL**: Database
- **TypeScript**: Programming language

## Installation

**Prerequisites :**
- Git
- Node.js 22 and npm
- Docker with Docker Compose

**Clone the repository**

- With URL:
```bash
git clone https://github.com/Louis-dub/palantir_network.git
```

- With SSH:
```bash
git clone git@github.com:Louis-dub/palantir_network.git
```

**Configure environment variables**

Create a `.env` file in the repository root and set the following variables:

```env
POSTGRES_PASSWORD=your_local_database_password
JWT_SECRET=your_local_jwt_secret
```

Replace the example values with your own local values. Do not commit this file.

**Start the database**
```bash
docker compose up -d db
```

**Apply migrations**
```bash
docker compose exec -T db psql -U commonroom -d commonroom < database/migrations/001_create_users.sql
docker compose exec -T db psql -U commonroom -d commonroom < database/migrations/002_create_posts.sql
docker compose exec -T db psql -U commonroom -d commonroom < database/migrations/003_add_posts_primary_key.sql
docker compose exec -T db psql -U commonroom -d commonroom < database/migrations/004_update_user_profile.sql
docker compose exec -T db psql -U commonroom -d commonroom < database/migrations/005_validate_user_profile.sql
```

**Lauch the Backend**
```bash
cd server
npm ci
npm run dev
```

**Launch the Frontend**
```bash
cd client
npm ci
npm run dev
```


## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.