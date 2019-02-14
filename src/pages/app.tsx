import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import { withRouter,Link } from 'react-router-dom';
import {Route} from "react-router";
import * as myActions from './actions/token'
import {FetchTokens} from './actions/token'
import {TokenState} from './reducers/token'
import { bindActionCreators } from "redux";

interface StateProps {
  token: {
    requesting: boolean,
    errors: [],
    successful: boolean,
    tokens: [Token]
  }
 }

 interface Token {
   name: string,
   symbol: string,
   address: string,
   price: {rate: string}

 }

interface State {}

interface DispatchProps {
  fetchTokens():FetchTokens
}

type Props = StateProps & DispatchProps;


class App extends Component<Props, State> {

  constructor(props: Props) {
        super(props);
  }



  componentWillReceiveProps(nextProps: State, nextState: State){
    console.log("compo will receive props", nextProps)
  }

  componentDidUpdate(prevProps: State, prevState: State) {
    console.log("comp did upfate",this.props)
  }


  componentDidMount() {
    const {fetchTokens} = this.props
    console.log("call!!!")
    fetchTokens()


  }


  render() {
    const {token: {tokens,requesting} } = this.props
    console.log("tokens?",tokens)
    return (
    <div id="root">
      <h1>Top Tokens</h1>
      {requesting && ( <p className="loader">Loading..</p>)}
        <ul>
        {tokens.map(
          (token: Token, i: number) => {
            //console.log(token,i)
            var tokenAddress = `https://ethplorer.io/address/${token.address}`
            return (

            <li key={i}>
              <React.Fragment>
              <h2>{token.name} - {token.symbol}</h2>
              <p>{token.price.rate}</p>
              </React.Fragment>
            </li>

            )
          }
        )}
        </ul>



    </div>
    );
  }
}

// const mapStateToProps = (state: TokenState): Props => ({
//    token: state.token
// })
// state => ({
//           token: state.token
//         }),

function mapDispatchToProps(dispatch:any) {
  return bindActionCreators(myActions, dispatch)
}
function mapStateToProps(state:any) {
  return {
    token: state.token
  };
}
const connected = connect<StateProps, DispatchProps, any>(mapStateToProps, mapDispatchToProps)(App)

export default withRouter(connected);







