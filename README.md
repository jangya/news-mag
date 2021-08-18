# Getting Started with News-Mag App

News-Mag is a fullstack web application built on node, react and newsapi.org(API source). Currently it get the top headlines from UK. Much more to come stay tuned.. 

**Live** - https://news-org.herokuapp.com

![image](https://user-images.githubusercontent.com/7237378/112875573-fce77280-90e1-11eb-8dc1-361a4a16e6e5.png)

### __Quick Start__

#### `npm i`

Install npm dependencies.

#### `export API_KEY=<API_KEY>`

Set [newsapi.org](newsapi.org) `API_KEY` in system Env. Alternatively a `.env` file can be created in root dir with:

```
API_KEY=<API_KEY>
NODE_ENV=development
```

#### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits in both server and client.\

__OR__

#### `npm start`

Runs the app in the Production mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

NewsMag is ready to be deployed!

### __TODO:__
- Filtering, sorting, pagination in search page.
- Fetch topheadlines for different countries.
- UI: Breadcrumb in post compoment
- UI: Nav in search component
