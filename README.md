# **PingPerfector**

Greetings, today I bring to you my new project where my goal is to achieve the shortest possible response time. In this project, I used TypeScript and, for the first time, Docker and Redis. Docker was used to encapsulate everything in isolated containers, and Redis was employed for caching, thus reducing response time. I particularly enjoyed developing this project, mainly because I was learning two new technologies and expanding my knowledge in TypeScript. After completing this project, I intended to create a load test to publish alongside it, but due to some issues, I didn't manage to do so. However, I hope to create something similar in the future. In general, I can say that's it.

Now, after the overview of my project, let's see how we can execute it.

<hr/>

# **Installation guide**

To begin, please note that we will use Docker to run the project. With that said, if you don't have Docker installed, look for a tutorial on how to do the installation.

## Cloning the repository:

```bash
git clone https://github.com/Lucas-Winicius/PingPerfector.git
```

```bash
cd PingPerfector
```

Now, let's see how to configure the .env file.

<hr/>

## *Configuring the `.env` file:*

Create a file called **.env** at the root of the project, following the parameters of the **.env.example** file.

```bash
PORT=3000
DATABASE_URL="postgresql://username:password@host/database_name"
REDIS_URL="redis://password@host:port/database_number"
JWT_SECRET="abcde12345"
```

If you're going to use Docker, just paste the following code.

```bash
PORT=3000
DATABASE_URL="postgresql://root:root@your_computer's_IP_address:8888/db"
REDIS_URL="redis://your_computer's_IP_address:6379/0"
JWT_SECRET="Your secret"
```

Now, we can start our project.

<hr/>

## Starting the project:

First of all, we will create a migration in the database.

```bash
npm run migrate
```

Now, we can finally start.

### **- With Docker:**

If you're using Docker, just one command is enough.

```bash
docker-compose up
```

#### **And to stop it:**

```bash
docker-compose down
```

or

```bash
docker-compose stop
```

### **- Without Docker:**

```bash
npm run dev
```
At this moment, it might seem more advantageous to start the project without Docker, but I can make you reconsider. With Docker, all the databases will be installed automatically, and, what's even better, after stopping and deleting the containers, you won't have any residual files. This process is considerably faster, and, with Docker, your personal projects won't be affected since the database used will be completely isolated.

After starting our project, we can see how each route functions.

<hr/>

## Studying the routes:

My API consists of only 7 routes with different methods.

### *`/ping?now={{current_time_ms}} - GET, POST, PUT, ...`*
For this route, you just need to send the current time in milliseconds.

### *`/user - POST`*

This route requires a request body with the following parameters: name, nick, email, and pass. After that, a login cookie will be returned, along with a JSON response similar to the following:

```json
{
	"user": {
		"status": 202,
		"message": "The user creation request has been accepted and is being processed in the background.",
		"data": {
			"name": "Lucas Winicius",
			"nick": "luk",
			"userCode": "DofIlqY24uYyzUVsBfFX",
			"email": "luca@email.com",
			"pass": "LuCas123456"
		}
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTHVjYXMgV2luaWNpdXMiLCJuaWNrIjoibHVrIiwidXNlckNvZGUiOiJEb2ZJbHFZMjR1WXl6VVZzQmZGWCIsImVtYWlsIjoibHVjYUBlbWFpbC5jb20iLCJwYXNzIjoiTHVDYXMxMjM0NTYiLCJpYXQiOjE2OTcwODE3OTIsImV4cCI6MTY5NzY4NjU5Mn0.2Ce4Ru7yBYQOTgCZ-N4r28_LhsIM7EDhRB_kZPIut4c"
}
```

### *`/user?user={{user_nick}} - GET`*
This route will search for the user by their nickname and return a JSON response similar to the following:

```json
{
	"status": 200,
	"message": "The user's details have been successfully retrieved.",
	"data": {
		"id": 9,
		"nick": "luk",
		"name": "Lucas Winicius",
		"email": "lucas@email.com",
		"userCode": "VRk_0iW7TykdB57Y44XB",
		"createdAt": "2023-10-05T13:58:19.778Z",
		"updatedAt": "2023-10-05T13:58:19.778Z"
	}
}
```

### *`/user - PUT`*

This route requires a request body with the following parameters: name, nick, email, and pass. It also needs an authentication header, which should be the same as the cookie returned during the creation. The header format is as follows:

```plaintext
Authorization: Bearer <Your_Token>
```

After this, you will receive a response like this:

```json
{
	"editedUser": {
		"status": 200,
		"message": "Changes to user profile saved.",
		"data": {
			"id": 14,
			"nick": "luk",
			"name": "Lucas Winicius",
			"email": "lucas@email.com",
			"pass": "senhaSENHA123__",
			"userCode": "2Bl_TejA4REhxL5JeC-5",
			"createdAt": "2023-10-12T04:00:29.000Z",
			"updatedAt": "2023-10-12T04:01:34.039Z"
		}
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsIm5pY2siOiJsdWsiLCJuYW1lIjoiTHVjYXMgV2luaWNpdXMiLCJlbWFpbCI6Imx1Y2FzQGVtYWlsLmNvbSIsInBhc3MiOiJzZW5oYVNFTkhBMTIzX18iLCJ1c2VyQ29kZSI6IjJCbF9UZWpBNFJFaHhMNUplQy01IiwiY3JlYXRlZEF0IjoiMjAyMy0xMC0xMlQwNDowMDoyOS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0xMC0xMlQwNDowMTozNC4wMzlaIiwiaWF0IjoxNjk3MDgzMjk0LCJleHAiOjE2OTc2ODgwOTR9.HubNbkIGv6dRyJwCrJrRDu_Zr8FkdT8PyI_N-wOjcto"
}
```

### *`/user/profile - GET`*

This route will return user information and will also rely on the authentication header. The response will be similar to the following:

```json
{
	"status": 200,
	"message": "The user's details have been successfully retrieved.",
	"data": {
		"id": 14,
		"nick": "luk",
		"name": "Lucas Winicius",
		"email": "lucas@email.com",
		"pass": "senhaSENHA123__",
		"userCode": "2Bl_TejA4REhxL5JeC-5",
		"createdAt": "2023-10-12T04:00:29.000Z",
		"updatedAt": "2023-10-12T04:01:34.039Z"
	}
}
```

### *`/user - DELETE`*

This route will add the user to a batch that will delete all users after a certain period, just like during the creation. This route also uses the authentication header, and its response will be similar to the following:

```json
{
	"status": 202,
	"message": "The request to delete the user has been accepted successfully. The user has been removed."
}
```

### *`/user/all - GET`*

This route can be used to obtain performance data as it is capable of returning the number of registered users and their information. The response will be similar to the following example:

```json
{
	"status": 200,
	"message": "here is the user count",
	"data": {
		"count": 1,
		"users": [
			{
				"id": 14,
				"nick": "luk",
				"name": "Lucas Winicius",
				"email": "lucas@email.com",
				"pass": "senhaSENHA123__",
				"userCode": "2Bl_TejA4REhxL5JeC-5",
				"createdAt": "2023-10-12T04:00:29.000Z",
				"updatedAt": "2023-10-12T04:01:34.039Z"
			}
		]
	}
}
```

## **Final considerations**
As much as I found this project amazing, I can agree that there are improvements to be made, such as the profile route that is not cached. But in the end, I can say that I am proud of the final result of my API, which, even though it's simple, represents another step I've just climbed. 🐱

<hr/>

**Thank you for reading up to this point.**

<div style="display: flex;">
  <a href="https://www.linkedin.com/in/lucas-winicius-03571725a"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a>
  <a href="https://instagram.com/sr_pumpkin_"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white"></a>
</div>
