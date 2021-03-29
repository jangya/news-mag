import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { withOverlayImage } from '../home/mainFeaturedPost';
import Link from '@material-ui/core/Link';
import Nav from './nav';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  }
}));

const Post = (props) => {
  const classes = useStyles();
  const { location } = props;
  const post = location.state.post;

  const OverlayContent = () => (
    <Grid container>
      <Grid item md={6}>
        <div className={classes.mainFeaturedPostContent}>
          <Typography component="h1" variant="h3" color="inherit" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            {post.description}
          </Typography>
        </div>
      </Grid>
    </Grid>
  );

  return (
    <React.Fragment>
      <Nav />
      <main>
        {withOverlayImage(OverlayContent, post.urlToImage)}
        <Grid item xs={12} md={12} className={classes.mainGrid}>
          <Typography variant="h6" gutterBottom>
            {'From the '}
            <Link href={post.url} target="_blank">
              {post.source.name}
            </Link>
          </Typography>
          <Divider />
          <Typography variant="body2" gutterBottom className={classes.mainGrid}>
            {post.content}
          </Typography>
        </Grid>
      </main>
    </React.Fragment>
  );
}

Post.propTypes = {
  location: PropTypes.object
};

export default Post;
