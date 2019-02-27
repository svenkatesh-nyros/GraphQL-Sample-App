import React from 'react';
import PropTypes from 'prop-types';
import {Card, Divider} from 'semantic-ui-react';
import {ImageItem, ListItems, Title} from '../../../components';
import {styles} from './element';

const LandingGrids = ({gridData}) =>
  <Card.Group centered>
    {gridData.map((grid, index) =>
      <Card raised key={index} style={styles}>
        <Card.Content>
          <ImageItem size="mini" source={grid.topHeaderImage}/>
          <Divider hidden/>
          <Card.Header><Title size="small" name={grid.topHeaderContent}/></Card.Header>
          <Divider hidden/>
          <Card.Meta>{grid.headerContent}</Card.Meta>
          <Card.Description><ListItems {...grid} /></Card.Description>
        </Card.Content>
      </Card>
    )}
  </Card.Group>;

LandingGrids.propTypes = {
  gridData: PropTypes.array.isRequired
};

export default LandingGrids;
