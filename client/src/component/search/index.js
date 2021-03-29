import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Snackbar from '@material-ui/core/Snackbar';
import { fetchPosts } from '../home';
import { useHistory } from 'react-router';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
  },
  tileBar: {

  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const Search = (props) => {
  const classes = useStyles();
  const { location, width } = props;
  const [posts, setPosts] = useState([]);
  const [response, setResponse] = useState({ success: false, msg: 'Loading..' });
  const [isLoaded, setIsLoaded] = useState(false);
  const history = useHistory();
  console.log(location, isLoaded);

  useEffect(async () => {
    setIsLoaded(false);
    setResponse({ success: false, msg: 'Loading..' });
    let results = [];
    try {
      results = await fetchPosts('everything', location.search);
      setIsLoaded(true);
      setPosts(results);
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
  }, [props.location.search]);

  const getGridListCols = () => {
    if (isWidthUp('md', width)) {
      return 4;
    }
    if (isWidthUp('sm', width)) {
      return 3;
    }
    if (isWidthUp('xs', width)) {
      return 1;
    }
    return 4;
  };
  const openPost = (post, id) => {
    history.push({
      pathname: `/search/post/${id}`,
      state: {
        post: post
      }
    });
  };
  
  return (
    <div className={classes.root}>
      <GridList cellHeight={300} className={classes.gridList} cols={getGridListCols()}>
        <GridListTile key="Subheader" cols={getGridListCols()} style={{ height: 'auto' }}>
          <ListSubheader component="div">Search results for: <b>{location.search.slice(3)}</b></ListSubheader>
        </GridListTile>
        {posts.map((post, index) => (
          <GridListTile key={post.urlToImage} onClick={() => openPost(post, index)}>
            <img src={post.urlToImage} alt={post.title} />
            <GridListTileBar
              title={post.title}
              subtitle={<span>by: {post.author}</span>}
              actionIcon={
                <IconButton title={post.description} className={classes.icon} >
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={!response.success}
        message={response.msg}
        autoHideDuration={6000}
      />
    </div>
  );
};

Search.propTypes = {
  location: PropTypes.object,
  width: PropTypes.object
};

export default withWidth()(Search);
