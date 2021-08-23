
import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import { matchPath, useLocation } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import { ucfirst } from '../../common/utils';

const useStyles = makeStyles((theme) => ({
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
    '&:hover': {
      borderBottom: `2px solid ${theme.palette.primary.dark}`
    }
  },
  active: {
    borderBottom: `2px solid ${theme.palette.primary.dark}`,
    color: theme.palette.primary.dark
  },
}));
const LinkRouter = (props) => <Link {...props} component={RouterLink} />;
const categories = {
  'general': 'home',
  'business':'business', 
  'entertainment':'headset',
  'science':'emoji_objects_icon',
  'health':'favorite',
  'sports':'sports',
  'technology':'memory'
};

const Nav = () => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const urlPath = matchPath(pathname, {
    path: ["/:country/:category", "/:country"]
  });
  const { category = 'general', country = 'in' } = (urlPath && urlPath.params) || {};
  const activeClass = item => category === item ? classes.active : '';

  return (
    <nav>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary} disableGutters>
        {Object.keys(categories).map((item) => (
          <LinkRouter
            color='inherit'
            noWrap
            key={item}
            variant="body2"
            to={`/${country}/${item}`}
            underline="none"
            className={`${classes.toolbarLink} ${activeClass(item)}`}
          >
            <Icon fontSize="small">{categories[item]}</Icon>
            {ucfirst(item)}
          </LinkRouter>
        ))}
      </Toolbar>
    </nav>
  );
}

export default Nav;
