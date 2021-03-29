
import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import { matchPath, useLocation } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { ucfirst } from '../../common/utils';

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
const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

const Nav = (props) => {
  const classes = useStyles();
  const { categories } = props;
  const { pathname } = useLocation();
  const urlPath = matchPath(pathname, {
    path: "/:country/:category",
    exact: true
  });
  const { category = 'general', country = 'gb' } = (urlPath && urlPath.isExact && urlPath.params) || {};
  const activeClass = item => category === item ? classes.active : '';

  return (
    <nav>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary} disableGutters>
        {categories.map((item) => (
          <LinkRouter
            color='inherit'
            noWrap
            key={item}
            variant="body2"
            to={`/${country}/${item}`}
            underline="none"
            className={`${classes.toolbarLink} ${activeClass(item)}`}
          >
            {ucfirst(item)}
          </LinkRouter>
        ))}
      </Toolbar>
    </nav>
  );
}

Nav.propTypes = {
  categories: PropTypes.array
};

export default Nav;
