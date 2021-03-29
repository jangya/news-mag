import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Link from '@material-ui/core/Link';
import Skeleton from '@material-ui/lab/Skeleton';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

const FeaturedPost = (props) => {
  const classes = useStyles();
  const { post, apiOptions } = props;
  const postPath = `/${apiOptions.country}/${apiOptions.category}/post/${post && post.id}`;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component={RouterLink} to={{
        pathname: postPath,
        state: {
          post: post
        }
      }} >
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {!post ? <Skeleton /> : post.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {!post ? <Skeleton /> : post.publishedAt}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {!post ? <Skeleton /> : post.description}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                {!post ? <Skeleton width="50%" /> : <Link src={post.url} target="new">Continue reading...</Link>}
              </Typography>
            </CardContent>
          </div>
          <Hidden xsDown>
            {!post ? (
              <Skeleton animation="wave" variant="rect" className={classes.media} />
            ) : (
              <CardMedia className={classes.cardMedia} image={post.urlToImage} title={post.title} />
            )}
          </Hidden>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
  apiOptions: PropTypes.object
};

export default FeaturedPost;
