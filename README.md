<p align='center'>
  <a href="https://insomnia.rest/run/?label=Todoey&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fads-usjt%2FTodoey%2Frest%2Finsomniav4.json%3Ftoken%3DALXRE5OUSVGQFEHQ4DTFB7K7TUCXU" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

# Todoey REST API

### [online heroku deploy](https://todoey-rest.herokuapp.com/)

### Clone repo and usage instructions

```sh
  # Clone repo and change branch to rest
  $ git clone https://github.com/ads-usjt/Todoey.git
  $ git checkout rest

  # Install dependencies
  $ yarn install
  
  # Initialize database
  $ yarn typeorm migration:run

  # Run
  $ yarn dev
```
> ℹ️ it will be served at http://localhost:3333/

<br/>

## Routes
<br/>

### **Reminders**
<br/>

> **GET:** /reminders
- list all registered reminders associated from a specific user

Request Header Exemple:
```Js
  'User-ID': 1
```

Response Body Exemple:
```Json
[
  {
    "id": 1,
    "title": "Test",
    "deadline": "1606359600000",
    "createdAt": "1605995102298",
    "body": "First Test"
  },
  {
    "id": 2,
    "title": "Test 2",
    "deadline": "1606359600000",
    "createdAt": "1605995102298",
    "body": "Second Test 🤕"
  },
]
```

> **GET:** /reminders/1
- list one reminder by determined id

Response Body Exemple:
```Json
{
  "id": 1,
  "title": "Test",
  "deadline": "1606359600000",
  "createdAt": "1605995102298",
  "body": "First Test"
}
```

> **POST:** /reminders
- create a new reminder

Accepted Request Body Exemple:
```Json
  {
    "userId": 1,
    "title": "First Reminder",
    "deadline": 1604123513463,
    "body": "First text body reminder, let's just write some whatever"
  }
```

> **PUT:** /reminders/1
- update a reminder by specified id

Accepted Request Body Exemple:
```Json
  {
    "title" : "update works!",
    "deadline": 1604123513463,
    "body": "i've just updated the reminder"
  }
```

> **DELETE:** /reminders/1
- remove a reminder by specified id
<br/><br/>

### **Users**
<br/>

> **GET:** /users
- list all registered users a their reminders

Response Body Exemple:
```Json
  [
    {
      "id": 1,
      "name": "Lucas Souza",
      "email": "lucasliet@test.com",
      "reminders": [
        {
          "id": 1,
          "title": "Entrega",
          "deadline": "1606359600000",
          "createdAt": "1605995102298",
          "body": "Tem que tá pronto até lá! 🤕"
        }
      ]
    },
    {
      "id": 2,
      "name": "Jonatan Araújo",
      "email": "djow@nathan.com",
      "reminders": [
        {
          "id": 3,
          "title": "Test",
          "deadline": "1605927600000",
          "createdAt": "1605967290117",
          "body": "Test"
        }
      ]
    }
  ]
```

> **GET:** /users/1
- list one user by determined id

Response Body Exemple:
```Json
{
  "id": 1,
  "name": "Lucas Souza",
  "email": "lucasliet@test.com",
  "reminders": [
    {
      "id": 1,
      "title": "Entrega",
      "deadline": "1606359600000",
      "createdAt": "1605995102298",
      "body": "Tem que tá pronto até lá! 🤕"
    }
  ]
}
```

> **POST:** /users
- create a new user

Accepted Request Body Exemple:
```Json
  {
    "name": "Lucas Souza",
    "email": "lucasliet@test.com",
    "password": "123"
  }
```

> **POST:** /login
- send data to login

Accepted Request Body Exemple:
```Json
  {
    "email": "lucasliet@test.com",
    "password": "123"
  }
```

> **PUT:** /users/1
- update a user by specified id

Accepted Request Body Exemple:
```Json
  {
    "name": "Lucas Souza",
    "email": "lucasliet@test.com",
    "password": "12345"
  }
```