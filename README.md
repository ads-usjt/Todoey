<p align='center'>
  <a href="https://insomnia.rest/run/?label=Todoey&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fads-usjt%2FTodoey%2Frest%2Finsomniav4.json%3Ftoken%3DALXRE5OUSVGQFEHQ4DTFB7K7TUCXU" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

# Todoey REST API

### [online heroku deploy](https://todoey-rest.herokuapp.com/)

## Routes
<br/>

### **Reminders**
<br/>

> **GET:** /reminders
- list all registered reminders

> **GET:** /reminders/1
- list one reminder by determined id

> **POST:** /reminders
- create a new reminder

accepted body exemple
```Json
  {
    "user_id": 1,
    "title": "First Reminder",
    "deadline": 1604123513463,
    "body": "First text body reminder, let's just write some whatever"
  }
```

> **PUT:** /reminders/1
- update a reminder by specified id

accepted body exemple
```Json
  {
    "title" : "update works!",
    "deadline": "1604123513463",
    "body": "i've just updated the reminder"
  }
```

> **DELETE:** /reminders/1
- remove a reminder by specified id
<br/><br/>

### **Users**
<br/>

> **GET:** /users
- list all registered users

> **GET:** /users/1
- list one user by determined id

> **POST:** /users
- create a new user

accepted body exemple
```Json
  {
    "name": "Lucas Souza",
    "email": "lucasliet@test.com",
    "password": "123"
  }
```

> **PUT:** /users/1
- update a user by specified id

accepted body exemple
```Json
  {
    "name": "Lucas Souza",
    "email": "lucasliet@test.com",
    "password": "12345"
  }
```