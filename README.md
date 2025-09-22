# Rbac

## Setup

To setup,
Install NodeJs, then run:

```sh
npm run setup
```

To start dev server

```sh
npm run start
```

.env file sample

```
JWT_SECRET=44f86fa407c054c18abd91ee02d52ff3b6a0ab7e998aa711eda3f217badc2cfd // sample
DB_SYNC_DEV_MODE=true // To run SQL lite in dev sync mode
```

Architecture Overview
Data Model Explanation
Access Control Implementation
API Docs

All documentation is under

```sh
 documentation\index.html
```

and check the documentation folder html files

Swagger URL

```
http://localhost:3000/api
```

Notes:

```
. Drag and drop works to move tasks and change statuses ( saved to DB)
. db.sqlite will be created automatically and seeded once Nest JS app is run ( delelte it , re-run if you face any issues)
. Dark mode toggle is there
. Sign up any user password to use to login and access the app
. Uses (Angular + TailwindCSS) + Nest JS
. There is a filter on UI for Work and Personal type tasks
. Small bar chart on UI to show progress
```
