import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter,Link } from 'react-router-dom';
import {Route} from "react-router";
import {fetchTokens} from './actions/token'


class App extends Component {

  static propTypes = {
    token: PropTypes.shape({
       requesting: PropTypes.bool,
       errors: PropTypes.array,
       successful: PropTypes.bool,
       tokens: PropTypes.array
      })
  }


  componentWillReceiveProps(nextProps, nextState){
    console.log("compo will receive props", nextProps)
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("comp did upfate",this.props)
  }


  componentDidMount() {
    this.props.dispatch(fetchTokens())


  }


  render() {
    const {token:{tokens,requesting}} = this.props
    console.log("tokens?",tokens)
    return (
    <div id="root">
      <h1>Top Tokens</h1>
      {requesting && ( <p className="loader">Loading..</p>)}
        <ul>
        {tokens.map(
          (token,i) => {
            console.log(token,i)
            var tokenAddress = `https://ethplorer.io/address/${token.address}`
            return (

            <li key={i}>
              <React.Fragment>
              <h2>{token.name} - {token.symbol}</h2>
              <p>{token.price.rate}</p>
              </React.Fragment>
            </li>

            )
          })
        }
        </ul>



    </div>
    );
  }
}

const connected = connect(
        state => ({
          token: state.token
        })
      )(App)

export default withRouter(connected);






