import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Headers from './component/header';
import Home from './component/home';
import Post from './component/post';
import Search from './component/search';

const title = 'News Magazine';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center" style={{ margin: '15px 0px' }}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        {title}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function App() {
  return (
    <Router>
      <Container maxWidth="lg" >
        <Headers title={title}></Headers>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/search/post/:id" component={Post} />
          <Route exact path="/:country" component={Home} />
          <Route exact path="/:country/:category" component={Home} />
          <Route exact path="/:country/:category/post/:id" component={Post} />
          {/* <Route component={NotFound} /> */}
        </Switch>
        <Copyright />
      </Container>
    </Router>
  );
}
