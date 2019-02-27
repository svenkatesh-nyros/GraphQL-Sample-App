import React from 'react'
import {Pagination} from 'semantic-ui-react'

const Paginations = () => (
  <Pagination
    defaultActivePage={1}
    firstItem={null}
    lastItem={null}
    pointing
    secondary
    totalPages={1}
  />
)

export default Paginations
