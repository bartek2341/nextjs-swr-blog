# Next.js blog

[**Next.js**](https://nextjs.org/) blog build with [**SWR**](https://swr.vercel.app/) infinite scroll, [**MongoDB**](https://www.mongodb.com/) and [**Firebase**](https://firebase.google.com/)

:rocket: [**Live Demo**](https://nextjs-swr-blog.netlify.app/)

## Features

- Add, delete posts from mongodb
- Fetch, mutate posts with useSWRInfinite hook
- Paginated API
- Ip based post liking
- Requests limit
- Hidden /secret route for admin authentication with firebase
- Post build sitemap.xml & robots.txt file generating
- Seo friendly urls

## Setup

### 1.Env variables

**App**

- `NEXT_PUBLIC_APP_URL` - App url, for development use `http://localhost:3000`

**_Mongo db_**

- `MONGODB_URI` - Mongo db connection string with username and password
- `MONGODB_NAME` - Database name

**_Firebase client_**

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

**_Firebase admin_**

- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `FIREBASE_DB_URL`

### 2. Start project using `npm run dev`.

## Admin authentication

1. Go to /secret route
2. Log in with credentials:

- Email: example@123.xxx
- Password: example852

## Dependencies

`swr`,
`styled-reset`,
`styled-components`,
`speakingurl`,
`request-ip`,
`react-toastify`,
`react-final-form`,
`body-scroll-lock`,
`connect-mongo`,
`nprogress`,
`express-rate-limit`,
`final-form`,
`firebase`,
`firebase-admin`,
`js-cookie`,
`next-translate`,
`mongodb`,
`mongodb-core`,
`next`,
`next-connect`,
`next-translate`,
`react`,
`react-dom`,
`next-sitemap`,
`babel-plugin-styled-components`
