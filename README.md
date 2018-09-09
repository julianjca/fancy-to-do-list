# fancy-to-do-list

A portofolio project on to-do-list application with express, mongodb.
Firebase Link : https://fancy-todo-list-5b99e.firebaseapp.com/

## REST API

List of user routes :

## **Register User**

Create a user

- **URL**

/register

- **Method:**

`POST`

- **URL Params**

None

- **Data Params**

Name : String
Email : String
Password : String

- **Success Response:**

* **Code:** 200
  **Content:** `{ data }`

- **Error Response:**

* **Code:** 500 NOT FOUND

**Content:** `{ error : error message }`

## **Login User**

Log in user

- **URL**

/login

- **Method:**

`Post`

- **URL Params**

None

- **Data Params**
  email : String
  password : String

- **Success Response:**

* **Code:** 200

**Content:** `{ msg : login success, token : token, email : email }`

- **Error Response:**

* **Code:** 500 NOT FOUND

**Content:** `{ error : error message }`

OR

- **Code:** 401 UNAUTHORIZED

**Content:** `{ error : "You are unauthorized to make this request." }`

## **Login Via FB**

Log in to application via facebook

- **URL**

/fb-login

- **Method:**

`POST`

- **URL Params**

None

- **Data Params**

None

- **Success Response:**

* **Code:** 200

**Content:** `Success logging in via facebook`

- **Error Response:**

* **Code:** 500

**Content:** `{ error : "Failed loggin in via facebook" }`

## **Find User**

Find User

- **URL**

/findUser

- **Method:**

`POST`

- **URL Params**

None

- **Data Params**

email : String

- **Success Response:**

* **Code:** 200

**Content:** {user data : data}

- **Error Response:**

* **Code:** 500

**Content:** `{ error : "Failed finding user" }`

## **Create Todo**

Create a todo

- **URL**

/todo

- **Method:**

`POST`

- **URL Params**

None

- **Data Params**

name : String
description : String
dueDate : date

- **Success Response:**

* **Code:** 200

**Content:** `Success adding todo`

- **Error Response:**

* **Code:** 500

**Content:** `{ error : "Failed adding todo" }`

## **Delete A Todo**

Delete a user.

- **URL**

/todo/:id

- **Method:**

`DELETE`

- **URL Params**

**Required:**

`id=[INTEGER]`

- **Data Params**

None

- **Success Response:**

* **Code:** 200

**Content:** `Success deleting todo`

- **Error Response:**

* **Code:** 500

**Content:** `{ error : "Failed deleting todo" }`

## **Update A User with New Info**

Updating a user with certain ID with all new info.

- **URL**

/todo/:id

- **Method:**

`PUT`

- **URL Params**

**Required:**

`id=[INTEGER]`

- **Data Params**

```
{

name : String
description : String
dueDate : Date

}
```

- **Success Response:**

* **Code:** 200

**Content:** `Success updating todo`

- **Error Response:**

* **Code:** 500 NOT FOUND

**Content:** `{ error : "Failed updating todo" }`

## **Update A User with specific new Info**

Updating a user with a specific info only.

- **URL**

/todo/:id

- **Method:**

`PATCH`

- **URL Params**

**Required:**

`id=[INTEGER]`

- **Data Params**

```
{

name : String
or
description : String
or
dueDate : Date

}
```

- **Success Response:**

* **Code:** 200

**Content:** `Success updating user`

- **Error Response:**

* **Code:** 500

**Content:** `{ error : "Failed updating user" }`

## Usage

With only npm :

```
npm install

npm start
```

Access the website via `https://fancy-todo-list-5b99e.firebaseapp.com/`
