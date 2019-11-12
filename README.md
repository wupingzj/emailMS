# A Simple Email Management System

This project aims to create a NodeJS server for user to send, delete email and check its status.

This project demonstrates 
- TDD development methodology
- async/await
- routing
- controller
- testing
- integration with third party lib like email

`Note:` to allow this server run standalone as a demo without the prerequisite of the backend database running, the in-memory cache is used to hold email status.

# Getting started

- Clone the repository
```
git clone --depth=1 https://github.com/wupingzj/emailms.git
```
- Install dependencies
```
cd emailms
npm install
```

- Build
```
npm run build
```

- Test

```
ng test

```

- Run

```
ng start
```

The server will automatically launch at http://localhost:2010/.


# Manual Check
- Send an email

```
POST http://localhost:2010/v1/emails

with JSON data:
{
   "to": "whoeverToReceive@gmail.com", "content": "You are awesome!", "subject": "awesome!"
}
```

You should get JSON reponse like
```
{
    "id": "7pgkfg8k2w1jdic",
    "status": "QUEUED"
}
```

- Get current status of an email with given email ID

```
GET http://localhost:2010/v1/emails/7pgkfg8k2w1jdic
```

You should get JSON reponse like
```
{
    "id": "7pgkfg8k2w1jdic",
    "status": "QUEUED"
}
```

- DELETE an email with given email ID

```
DELETE http://localhost:2010/v1/emails/7pgkfg8k2w1jdic
```

You should get JSON reponse with either TRUE or FALSE like below. If you delete the email the second time, the deleted will be FALSE as it has already been deleted.
```
{
    "id": "7pgkfg8k2w1jdic",
    "deleted": "TRUE"
}
```

## Contact
Email: KevinPingWu@gmail.com
