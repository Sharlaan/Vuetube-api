# VueTube API

> VueTube is a YouTube clone built with nodejs, expressjs & mongodb.

### Originally developed by Reagan Ekhameye (Tech Reagan)

Reach him on twitter [@techreagan](https://www.twitter.com/techreagan)

My goal here is essentially to rewrite his repo with modern techs (notably buildless Vue3 in front, and FoalTS, typescript and postgresql in serverside)

## Features

> CRUD (Create, Read, Update And Delete)

- Authentication with short-timed JWT (Reset Password with email)
  - Login (User/Admin)
  - Register
  - Forgot Password
- Pagination and search where necessary
- API Security (NoSQL Injections, XSS Attacks, http param pollution etc)
- Video (CRUD)
  - Upload video
  - Upload video thumbnail
  - Watch video
  - Increase Views
  - Like and dislike video
  - Download video
  - Comment & reply for video
  - Update video details
  - Delete video
- Subscribe to a channel
- View liked videos
- Trending
- Subscriptions
- History (CRUD)
  - Watch history
  - Search history
- Settings
  - Modify channel name and email
  - Change password
  - Upload channel avatar

## Frontend Repo

Frontend was developed with vue js and vuetify [VueTube](https://github.com/techreagan/vue-nodejs-youtube-clone)

## API Documentation

Hosted on netlify: [Coming Soon]()

Extensive and testing documentation with postman: [VueTube API](https://documenter.getpostman.com/view/9407876/SzYaVdtC?version=latest)

## Database Model

(generated from [dbdiagrams.io](https://dbdiagram.io))

![Screenshot](assets/screenshots/vue_tube_ERD.jpg)

## Requirements

- NodeJS
- PostgreSQL

## Configuration File

Rename the `.env.example` to `.env`, then modify to your environment variables, PostgreSQL uri, set your JWT_SECRET and SMTP variables

Email testing: use mailtrap for email testing, it's easy no stress.

## Installation

Install all dependencies

```console
yarn
```

Create the databases `vuetube-*` (typeorm won't create it if not exist !)

```console
createdb -U postgres vuetube
createdb -U postgres vuetube-e2e
createdb -U postgres vuetube-test
```

Run migration queries to create tables

```console
yarn migrations
```

... then populate tables using the shell-scripts from scripts folder. Example below :

```console
foal run create-user channelName="Tech Reagan" email="techreagan@gmail.com" password="123456abcdef"
```

... should display for each successfully inserted user :

<pre>
User {
  channelName: 'Tech Reagan',
  email: 'techreagan@gmail.com',
  password: 'pbkdf2_sha256$150000$utAROMwDWVWLhTKO+//K4w==$8uoLrwiK4CRn0r4k7wcKarhFD9i9JLxDHFJxeuYKjCQ=',  // Hashed password
  id: 1  // Auto-generated ID
}
</pre>

Delete all data (WARNING this will destroy ALL tables AND database !)

```console
dropdb -U postgres vuetube
```

## Start web server

```console
yarn develop
```

## Screenshots

> Delete the screenshot folder if you download this code (Screenshots folder is 3.14mb in size).

### Sign In

![Screenshot](assets/screenshots/20%20-%20Sign%20in.jpg)

### Sign Up

![Screenshot](assets/screenshots/21%20-%20Sign%20up.jpg)

### Home Page

![Screenshot](assets/screenshots/1%20-%20Home.jpg)

### Watch Page

![Screenshot](assets/screenshots/7%20-%20Watch.jpg)

### Upload Thumbnail Modal

![Screenshot](assets/screenshots/16%20-%20Upload%20Thumbnail%20Modal.jpg)

For more screenshots check out the vue frontend repo [VueTube](https://github.com/techreagan/vue-nodejs-youtube-clone)

## License

This project is licensed under the MIT License
