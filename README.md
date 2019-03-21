# nodejs-with-typescript

NodeJS with TypeScript

## Directory Structure

        app
            config                  --- Contains app and db constants(i.e. db url, localurl, etc)
            db                      --- Contains database schemas
                schema              --- Schema and Validators for User and PostComments
            routes                  --- Controllers, Models and Helper classes
                controllers
                    json-to-db      --- Gets data from JSON PlaceHolder and stores in MongoDB
                    users           --- API to get data from MongoDB
            app.ts                  --- Driver ts file
        tsconfig.json               --- Compliles and converts project from TS to JS

## How to Run

    1. Go to root and perform npm install   --- Installs require packages
    2. Type "npm start" in command line     --- Creates build directory and compiles TS into JS
    3. Go to http://localhost:3000

## API

1. Store Users:
    Gets Users from <https://jsonplaceholder.typicode.com/users> and Stores into different databases
    for each user (database name = userid, collection=users).

    POST: <http://localhost:3000/api/json2db/storeusers>

2. Store Post Comments:
    Gets Posts and Comments, combines them into array of object. Stores this data into MongoDB
    (database name = userid(created in 1), collection=posts).

    POST: <http://localhost:3000/api/json2db/storepostcomments>

3. Execute 1 and 2 same time (Create User Post Comment):
    POST: <http://localhost:3000/api/json2db/createuserpostcomment>

4. Get User

    Gets user based on userid

    GET: <http://localhost:3000/api/users/getUser/1>

5. Get Post for user

    Get post and it's comments using userId

    GET: <http://localhost:3000/api/users/getPost/1>

7. Update Data

    Update user collection based on userId

    PUT: <http://localhost:3000/api/users/updateAvatar/1>

```JSON
    Body:
    {
            "address": {
                "geo": {
                    "lat": "-37.3159",
                    "lng": "81.1496"
                },
                "street": "Kulas Light111",
                "suite": "Apt. 556",
                "city": "Gwenborough",
                "zipcode": "92998-3874"
            },
            "company": {
                "name": "Romaguera-Crona1",
                "catchPhrase": "Multi-layered client-server neural-net",
                "bs": "harness real-time e-markets1"
            },
            "_id": "5c938c49d176ed36b0e4a5c1",
            "id": 1,
            "name": "Leanne Graham1",
            "username": "Bret",
            "email": "sincere@april.biz111",
            "phone": "1-770-736-8031 x56442",
            "website": "hildegard.org1",
            "__v": 0
        }
        ```

Postman collection: <https://www.getpostman.com/collections/5531e60e876a183a9548>