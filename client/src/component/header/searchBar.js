import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
  },
  searchIcon: {
    paddingRight: theme.spacing(2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      '&:focus': {
        width: '100%',
      },
    },
  },
}));

const SearchBar = (props) => {
  const classes = useStyles();
  const { toggleSearchBar } = props;
  const [ searchText, setSearchText ] = useState('');
  const history = useHistory();

  const handleSearch = (e) => {
    history.push({
      pathname: '/search',
      search: `?q=${searchText}`
    });
    e.preventDefault();
  };

  const handleChange = (e) => {
    const inputValue = e.target.value.trim();
    setSearchText(inputValue);
  };
  return (
    <React.Fragment>
      <form className={classes.search} onSubmit={handleSearch}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          value={searchText}
          inputProps={{ 'aria-label': 'search' }}
          autoFocus
          onChange={handleChange}
          onBlur={toggleSearchBar}
        />
      </form>
    </React.Fragment>
  );
}

SearchBar.propTypes = {
  toggleSearchBar: PropTypes.fn
};

export default SearchBar;