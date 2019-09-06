import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import GithubIcon from './GithubIcon'
import {repository} from '../../package.json'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingBottom: theme.spacing(3)
    }
  })
)

const Copyright: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit" href={repository.url} target="_blank">
        <GithubIcon /> 
      </Link>
    </Typography>
    </div>
  );
}

export default Copyright