import React from 'react'
import {Button, Grid, Image} from 'semantic-ui-react'

class Headers extends React.Component {

  render() {
    return (
      <Grid style={{margin: 5, height: 100}}>
        <Grid.Row style={{justifyContent: 'space-between'}}>
          <Grid.Row>
            <Image src='/static/images/TempLogo.jpg' size='tiny' verticalAlign='bottom'/>
            <span style={{padding: 10, fontSize: 18, fontWeight: 600}}>Inspired the content from logo</span>
          </Grid.Row>
          <Grid.Row>
            <Button secondary>Home</Button>
            <Button secondary>Sign Up</Button>
            <Button secondary>Login</Button>
          </Grid.Row>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Headers
