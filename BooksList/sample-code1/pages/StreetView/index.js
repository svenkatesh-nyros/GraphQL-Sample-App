import React from 'react';
import Config from '../../components/Head';
import {Segmant, StreetView} from '../../components';

const View = () => {
  return (
    <div>
      <Config/>
      <Segmant>
        <StreetView/>
      </Segmant>
    </div>
  );
};

export default View;
