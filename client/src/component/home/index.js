import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MainFeaturedPost from './mainFeaturedPost';
import FeaturedPost from './featuredPost';
import Nav from './nav';

const categories = ['general', 'business', 'entertainment', 'science', 'health', 'sports', 'technology'];
const useStyles = makeStyles(theme => ({
  grid: {
    marginTop: theme.spacing(4)
  }
}));

// TODO: Move mock option to .env
export const fetchPosts = async (path, query, mock = false) => {
  if (typeof query === 'object') {
    query = '?' + Object.keys(query).map(key => key + '=' + query[key]).join('&');
  }
  const endpoint = mock ? '/api/news/mock' : `/api/news/${path}${query}`;
  const resposne = await fetch(endpoint);
  if (resposne.status === 500) {
    throw new Error('Internal server error !!');
  }
  const result = await resposne.json();
  console.log(resposne);
  if (!result.articles || result.articles.length === 0) {
    throw new Error('No news found !!');
  }
  return result.articles;
};

const Home = (props) => {
  const classes = useStyles();
  const [posts, setPosts] = useState({ main: {}, top: [] });
  const [response, setResponse] = useState({ success: false, msg: 'Loading..' });
  const [isLoaded, setIsLoaded] = useState(false);
  const options = {
    category: props.match.params.category || 'general',
    country: props.match.params.country || 'gb',
  };

  useEffect(async () => {
    setIsLoaded(false);
    setResponse({ success: false, msg: 'Loading..' });
    let topNews = [];
    try {
      topNews = await fetchPosts('top-headline', options);
      setIsLoaded(true);
      setPosts({
        main: topNews[0],
        top: topNews.slice(1)
      });
      setResponse({
        success: true,
        msg: 'Successfull!!'
      });
    } catch (err) {
      setIsLoaded(true);
      setResponse({
        success: false,
        msg: err.message
      });
    }
  }, [props.match.params.category, props.match.params.country]);

  const TopPosts = () => (
    <main>
      <MainFeaturedPost post={posts.main} loading={!isLoaded} apiOptions={options} />
      <Typography variant="h6" gutterBottom>
        Top headlines
      </Typography>
      <Divider />
      <Grid container spacing={4} className={classes.grid}>
        {(isLoaded ? posts.top : Array.from(new Array(4))).map((post, index) => (
          <FeaturedPost key={index} post={post} apiOptions={options} />
        ))}
      </Grid>
    </main>
  );

  return (
    <React.Fragment>
      <Nav categories={categories}></Nav>
      <TopPosts />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={!response.success}
        message={response.msg}
        autoHideDuration={6000}
      />
    </React.Fragment>
  );
}

Home.propTypes = {
  match: PropTypes.object
};

export default Home;
