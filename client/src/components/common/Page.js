import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const Page = ({ title, children }) => (
  <>
    <Helmet>
      <title> {title} | EEC</title>
    </Helmet>
    {children}
  </>
);

Page.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Page;
