import React, { useContext } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import BlurOnIcon from '@material-ui/icons/BlurOn';

import ContentItem from './ContentItem';
import ContextStore from '../ContextStore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
      width: '100%',
      minHeight: 400,
      backgroundColor: theme.palette.background.paper
    },
    exception: {
      marginTop: theme.spacing(2),
      width: '100%',
      minHeight: 400,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    exceptionIcon: {
      paddingBottom: theme.spacing(1),
      fontSize: theme.typography.pxToRem(100)
    }
  })
);

const RepositoryList: React.FC = () => {
  const classes = useStyles();
  const { appState } = useContext(ContextStore);

  return appState.isLoading ? (
    <div className={classes.exception}>
      <CircularProgress />
    </div>
  ) : appState.list.length > 0 ? (
    <List className={classes.root}>
      {appState.list.map(rItem => (
        <ContentItem key={rItem.id} {...rItem} />
      ))}
    </List>
  ) : (
    <div className={classes.exception}>
      <BlurOnIcon
        className={classes.exceptionIcon}
        fontSize="inherit"
        color="disabled"
      />
      <Typography variant="body2" color="textSecondary">
        {appState.errorMsg || 'no data.'}
      </Typography>
    </div>
  );
};

export default RepositoryList;
