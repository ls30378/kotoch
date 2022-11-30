## Docker command to create postgres image

Must install docker! Find instructions online for docker!

docker run --name kotoch-db -e POSTGRES_USER=lorentsh -e POSTGRES_PASSWORD=front -p 5432:5432 -v /data:/var/lib/postgresql/data -d postgres

## Install project dependencies

yarn
or
npm install

## Run project

yarn start:dev
or
npm run start:dev

## Prisma command to migrate schema

npx prisma migrate dev

## Must create user groups in db

can use prisma gui
npx prisma studio
0 - Admin
1 - User

## API documentation

Check request.http file for the form of api requests
