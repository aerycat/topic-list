import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import { SortType, ActionType } from '../types';
import { PageSizePresets } from '../constant';
import ContextStore from '../ContextStore';
import queryRepositories from '../api';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    width: '100%'
  },
  section: {
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const SearchBar: React.FC = () => {
  const classes = useStyles();
  const [sortBy, setSortBy] = useState(SortType.DEFAULT);
  const [pageSize, setPageSize] = useState(10);
  const [keyword, setKeyword] = useState('');
  const [displayMenu, setDisplayMenu] = useState(false);

  const { dispatch } = useContext(ContextStore);

  const changeKeyword = (e: React.ChangeEvent<{ value: unknown }>) => {
    setKeyword(e.target.value as string);
  };
  const changeSortBy = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSortBy(e.target.value as SortType);
  };
  const changePageSize = (e: React.ChangeEvent<{ value: unknown }>) => {
    setPageSize(e.target.value as number);
  };
  const toggleDisplayMenu = () => {
    setDisplayMenu(!displayMenu);
  };
  const queryData = async () => {
    const k = keyword.trim();
    if (k !== '') {
      dispatch({ type: ActionType.FETCH_DATA_REQUEST });
      try {
        const data = await queryRepositories({
          topic: keyword,
          sort: sortBy,
          per_page: pageSize
        });
        dispatch({
          type: ActionType.FETCH_DATA_SUCCESS,
          playload: data
        });
      } catch (error) {
        dispatch({
          type: ActionType.FETCH_DATA_FAILURE,
          playload: 'something wrong.'
        });
      }
    }
  };
  const queryDataByKeyDown = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      queryData();
    }
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.section}>
        <InputBase
          className={classes.input}
          onChange={changeKeyword}
          onKeyDown={queryDataByKeyDown}
          placeholder="topic"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton
          onClick={queryData}
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          onClick={toggleDisplayMenu}
          className={classes.iconButton}
          aria-label="directions"
        >
          <MenuIcon color={displayMenu ? 'primary' : 'inherit'} />
        </IconButton>
      </div>
      {displayMenu && (
        <React.Fragment>
          <Divider orientation="horizontal" />
          <div className={classes.section}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="label-sort-by">sort</InputLabel>
              <Select
                value={sortBy}
                onChange={changeSortBy}
                inputProps={{
                  name: 'sort',
                  id: 'label-sort-by'
                }}
              >
                {Object.values(SortType).map((value: string) => (
                  <MenuItem value={value} key={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="label-page-size">quantity</InputLabel>
              <Select
                value={pageSize}
                onChange={changePageSize}
                inputProps={{
                  name: 'quantity',
                  id: 'label-page-size'
                }}
              >
                {PageSizePresets.map(pageSize => (
                  <MenuItem value={pageSize} key={pageSize}>
                    {pageSize}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </React.Fragment>
      )}
    </Paper>
  );
};

export default SearchBar;
