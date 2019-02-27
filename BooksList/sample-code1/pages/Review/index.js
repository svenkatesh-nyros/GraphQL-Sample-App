import React, {Component} from 'react';
import Layout from '../../container';
import {Segmant} from '../../components';

class Review extends Component {
  render() {
    return (
      <Layout search={true}>
        <Segmant textAlign="center">Review Page</Segmant>
      </Layout>
    );
  }
}

export default Review;
