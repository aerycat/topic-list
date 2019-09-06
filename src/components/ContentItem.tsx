import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import StarIcon from '@material-ui/icons/Star';

import { RepositoryItem } from '../types';

const numberShortForK = (n: number): string => {
  return n > 1000 ? Math.round(n / 1000) + 'k' : `${n}`;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inline: {
      display: 'inline'
    },
    starsCount: {
      position: 'absolute',
      top: 14,
      right: 8,
      padding: '0 4px',
      backgroundColor: theme.palette.secondary.light
    },
    starsCountText: {
      fontSize: theme.typography.caption.fontSize,
      fontWeight: theme.typography.subtitle2.fontWeight,
      color: theme.palette.primary.contrastText
    },
    starsCountIcon: {
      marginRight: 1,
      verticalAlign: 'text-top'
    }
  })
);

const ContentItem: React.FC<RepositoryItem> = props => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={props.name} src={props.avatar_url} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Link href={props.html_url} color="inherit" target="_blank">
              {props.name}
            </Link>
          }
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {props.full_name}
              </Typography>
              {props.description ? ` - ${props.description}` : ''}
            </React.Fragment>
          }
        />
        <div className={classes.starsCount}>
          <Typography className={classes.starsCountText}>
            <StarIcon fontSize="inherit" className={classes.starsCountIcon} />
            {numberShortForK(props.stargazers_count)}
          </Typography>
        </div>
      </ListItem>
      <Divider variant="inset" component="li" />
    </React.Fragment>
  );
};

export default ContentItem;
