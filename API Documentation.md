# FANCY TODO DOCUMENTATION

> Fancy Todo is website to manage your todo's. This app has :
>
> RESTful endpoint for todo's CRUD operation with JSON formatted response

## Restful Endpoints

1. POST : /register
2. POST : /login
3. POST : /google/signin
4. POST : /todos
5. GET : /todos
6. PUT : /todos/:id
7. DELETE : /todos/:id
8. PATCH : /todos/:id
9. GET : /todos/:id


## GLOBAL ERROR
```json
  { 
    "errors": "Server currently unable to handle this request"
  }
```

## POST /register

Request body:

```json
{
  "username":"user",
  "email": "test@email.com",
  "password": "test123"
}
```

Response(201 - Created):

```json
{
  "username": "user",
  "email": "test@email.com"
}
```

Response(400 - SequelizeValidationError)

```json
{
    "errors": [
        "Validation error: Please input username"
        "Validation error: Please input password"
    ]
}
```


Response(400 - INVALID EMAIL REGISTER)

```json
{
  "errors": [
        "Email does not exist or not verified"
        "Email already registered"
    ]
}
```

## POST /login

Request body:

```json
{
  "email": "test@email.com",
  "password": "test123"
}
```

Response(200 - Ok):

```json
{
  "accessToken": "<user token>"
}
```

Response(400 - EMAIL NOT FOUND)

```json
{
  "errors": [
        "Incorrect Username or Password"
    ]
}
```

## POST /google/signin

Request body:

```json
{
  "idToken": "id_token",
  "audience": "<your client_id>"
}
```

Response(200 - Ok):

```json
{
  "accessToken": "<user token>"
}
```

## POST /todos

Request headers:

```json
{
  "accessToken": "<token>"
}
```

Request body:

```json
{
  "title": "makan",
  "description": "martabak",
  "status": "incomplete",
  "due_date": "6/8/2021",
  "userId": 1
}
```

Response(201 - Created):

```json
{
  "id":1,
  "title": "makan",
  "description": "martabak",
  "status": "incomplete",
  "due_date": "6/8/2021",
  "userId": 1,
  "updatedAt": "2020-06-08T14:38:39.104Z",
  "createdAt": "2020-06-08T14:38:39.104Z"
}
```

Response(400 - SequelizeValidationError)

```json
{
   "errors": [
        "Validation error: error date!,",
        "Validation error: Please input todo title,",
        "Validation error: Please input todo description,",
        "Validation error: Please input formatted value"
    ]
}
```

## GET /todos

Request headers:

```json
{
  "accessToken": "<token>"
}
```

Request body:
Not Needed

Response(200 - Ok):

```json
[
   {
        "id": 16,
        "title": "makan",
        "description": "mantapppyaa",
        "status": "completed",
        "due_date": "6/8/2021",
        "UserId": 18,
        "createdAt": "2020-07-11T10:22:24.565Z",
        "updatedAt": "2020-07-11T10:22:24.565Z"
    },
    {
        "id": 17,
        "title": "makan",
        "description": "mantapppyaa",
        "status": "completed",
        "due_date": "6/8/2021",
        "UserId": 18,
        "createdAt": "2020-07-11T10:22:56.016Z",
        "updatedAt": "2020-07-11T10:22:56.016Z"
    },
    ...
]
```

## GET /todos/:id

Request headers:

```json
{
  "accessToken": "<token>"
}
```

Request params:

```json
{
  "id": "<params_id>"
}
```

Request body:
not needed

Response(200 - Ok):

```json
{
    "id": 16,
    "title": "makan",
    "description": "mantapppyaa",
    "status": "completed",
    "due_date": "6/8/2021",
    "UserId": 18,
    "createdAt": "2020-07-11T10:22:24.565Z",
    "updatedAt": "2020-07-11T10:22:24.565Z"
}
```

## PUT /todos/:id

Request headers:

```json
{
  "accessToken": "<token>"
}
```

Request params:

```json
{
  "id": "params.id",
  "UserId": "req.user.id" 
}
```

Request body:

```json
{
  "title": "Learning",
  "description": "Finish",
  "status": "complete",
  "due_date": "6/8/2021",
  "UserId": 18
}
```

Response(200 - OK):

```json
{
  "id": 16,
    "title": "maknaa",
    "description": "dasdas",
    "status": "incomplete",
    "due_date": "2021-06-08T14:38:39.104Z",
    "UserId": 18,
    "createdAt": "2020-07-11T10:22:24.565Z",
    "updatedAt": "2020-07-11T10:30:22.430Z"
}
```

Response(403 - AUTH)

```json
{
  "errors": [
        "Unauthorized Access"
    ]
}
```

## DELETE /todos/:id

Request headers:

```json
{
  "accessToken": "<token>"
}
```

Request params:

```json
{
  "id": "<params_id>"
}
```

Request body:
not needed

Response(200 - Ok):

```json
{
    "id": 17,
    "title": "makan",
    "description": "mantapppyaa",
    "status": "completed",
    "due_date": "6/8/2021",
    "UserId": 18,
    "createdAt": "2020-07-11T10:22:56.016Z",
    "updatedAt": "2020-07-11T10:22:56.016Z"
}
```

Response(403 - AUTH)

```json
{
  "errors": [
        "Unauthorized Access"
    ]
}
```

## PATCH /todos/:id

Request headers:

```json
{
  "accessToken": "<token>"
}
```

Request params:

```json
{
  "id": "params.id",
  "UserId": "req.user.id" 
}
```

Request body:

```json
no need
```

Response(200 - OK):

```json
{
  "id": 16,
    "title": "maknaa",
    "description": "dasdas",
    "status": "incomplete",
    "due_date": "2021-06-08T14:38:39.104Z",
    "UserId": 18,
    "createdAt": "2020-07-11T10:22:24.565Z",
    "updatedAt": "2020-07-11T10:30:22.430Z"
}
```

Response(403 - AUTH)

```json
{
  "errors": [
        "Unauthorized Access"
    ]
}
