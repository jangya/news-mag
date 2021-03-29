
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import { Link as RouterLink } from 'react-router-dom';
import SearchBar from './searchBar';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  }
}));
const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

const Header = (props) => {
  const classes = useStyles();
  const [ openSearch, setOpenSearch ] = useState(false);
  const { title } = props;

  const toggleSearchBar = () => {
    setOpenSearch(!openSearch);
  };
  const RenderHeader = () => (
    <React.Fragment>
       <LinkRouter underline="none" to={'/'} >
        <Avatar alt="Country" src="/gb.svg">C</Avatar>
      </LinkRouter>
      <Typography
        variant="h4"
        color="inherit"
        align="center"
        noWrap
        className={classes.toolbarTitle}
      >
        {title}
      </Typography>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar} disableGutters>
        {openSearch ? <SearchBar toggleSearchBar={toggleSearchBar} /> : <RenderHeader />}
        <IconButton onClick={toggleSearchBar}>
          {openSearch ? <CloseIcon /> : <SearchIcon />}
        </IconButton>
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  countries: PropTypes.array,
  title: PropTypes.string,
};

export default Header;
