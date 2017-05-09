import React, { Component } from 'react';
import HeadMetaTags from '../../components/headMetaTags';

class About extends Component {
  render() {
    let title='Page Not Found | 404';
    return (
      <div>
        <HeadMetaTags title={title} />
        <h1>Page Not Found</h1>
      </div>
    );
  }
}

export default About;
