import React from 'react';
import { Helmet } from 'react-helmet';
import theme from '../theme';

const Header: React.FC = () => {
  return (
    <Helmet>
      <title>topic list</title>
      <meta name="theme-color" content={theme.palette.primary.main} />
    </Helmet>
  );
};

export default Header;
