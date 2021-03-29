// Implement Breadcrumbs with router

import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Toolbar from '@material-ui/core/Toolbar';
import { useHistory } from 'react-router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    '&:hover': {
      borderBottom: `2px solid ${theme.palette.primary.dark}`
    }
  },
  active: {
    borderBottom: `2px solid ${theme.palette.primary.dark}`,
  },
}));

const Nav = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <nav>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary} disableGutters>
        <IconButton
          color='primary'
          onClick={() => history.goBack()}
        >
          <ArrowBackIcon />
        </IconButton>
      </Toolbar>
    </nav>
  );
}

Nav.propTypes = {
  categories: PropTypes.array
};

export default Nav;
