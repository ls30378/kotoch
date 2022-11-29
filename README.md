## Docker command to create postgres image

docker run --name kotoch-db -e POSTGRES_USER=lorentsh -e POSTGRES_PASSWORD=front -p 5432:5432 -v /data:/var/lib/postgresql/data -d postgres

## Prisma command to migrate schema

npx prisma migrate dev
