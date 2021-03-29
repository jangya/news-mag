import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Skeleton from '@material-ui/lab/Skeleton';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));
const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

export const withOverlayImage = (Content, imgSrc) => {
  const classes = useStyles();
  return (
    <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${imgSrc})` }}>
      <div className={classes.overlay} />
      <Content />
    </Paper>
  );
};

const MainFeaturedPost = (props) => {
  const classes = useStyles();
  const { post, loading, apiOptions } = props;
  const postPath = `/${apiOptions.country}/${apiOptions.category}/post/${post.id}`;

  const MainHeader = () => (
    <Grid container>
      <Grid item md={6}>
        <div className={classes.mainFeaturedPostContent}>
          <Typography component="h1" variant="h3" color="inherit" gutterBottom>
            {loading ? <Skeleton /> : post.title}
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            {loading ? <Skeleton /> : post.description}
          </Typography>
          <LinkRouter variant="subtitle1" to={{
            pathname: postPath,
            state: {
              post: post
            }
          }} >
                        Continue Reading..
          </LinkRouter>
        </div>
      </Grid>
    </Grid>
  );
  return (
    <React.Fragment>
      {loading ? <Skeleton
        animation="wave"
        variant="rect"
        width="100%"
        height={400}
        style={{ marginBottom: 10 }}
      /> : withOverlayImage(MainHeader, post.urlToImage)
      }
    </React.Fragment>
  );
}

MainFeaturedPost.propTypes = {
  post: PropTypes.object,
  loading: PropTypes.bool,
  apiOptions: PropTypes.object
};

export default MainFeaturedPost;
