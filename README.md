# marblejs Server

Recently I stumbled upon [marblejs](https://github.com/marblejs/marble) and wanted to try it out. It looks really interesting so I encourage you to check it out if you are interested in FRP & FP in general.
To quote their repo: marblejs is a `"Functional reactive Node.js framework for building server-side applications, based on TypeScript and RxJS"`

I created a super simple server that has a few endpoints. To simulate some CRUD actions I also added a simple in-memory store.

This was just some experimentation with the library.

## Endpoints

All endpoints are under `/api/v1`

    GET /users => Returns users in the store
    POST /users => Adds a user to store
        Request body:
            {
                "id": "1",
                "firstName": "Example",
                "lastName":"Example",
                "roles": ["ADMIN"]
            }
    
    GET /users/{userId} => Gets a user by id
    DELETE /users/{userId} => Deletes a user by id

## Usage 

You will need Node.js on your machine.

    git clone https://github.com/Cedomic/marblejs-server.git

    cd marblejs-server

    npm i

    npm start
