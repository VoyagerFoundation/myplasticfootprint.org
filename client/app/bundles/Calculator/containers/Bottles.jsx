import React, { PropTypes } from 'react';
import BottlesWidget from '../components/BottlesWidget';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import * as calculatorActionCreators from '../actions/calculatorActionCreators';

function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  // Note the use of `$$` to prefix the property name because the value is of type Immutable.js
  return { $$bottlesStore: state.$$calculatorStore.get('bottles') };
}

// Simple example of a React "smart" component
const Bottles = (props) => {
  const { dispatch, $$bottlesStore } = props;
  const actions = bindActionCreators(calculatorActionCreators, dispatch);
  const { addSmallBottles, removeSmallBottles } = actions;
  const small_bottles = $$bottlesStore.get('small_bottles');
  const big_bottles = $$bottlesStore.get('big_bottles');

  // This uses the ES2015 spread operator to pass properties as it is more DRY
  // This is equivalent to:
  // <CalculatorWidget $$helloWorldStore={$$helloWorldStore} actions={actions} />
  return (
    <BottlesWidget {...{ 
      addSmallBottles, removeSmallBottles,
      small_bottles, big_bottles
    }} />
  );
};

Bottles.propTypes = {
  dispatch: PropTypes.func.isRequired,

  // This corresponds to the value used in function select above.
  // We prefix all property and variable names pointing to Immutable.js objects with '$$'.
  // This allows us to immediately know we don't call $$helloWorldStore['someProperty'], but
  // instead use the Immutable.js `get` API for Immutable.Map
  $$bottlesStore: PropTypes.instanceOf(Immutable.Map).isRequired,
};

// Don't forget to actually use connect!
// Note that we don't export Calculator, but the redux "connected" version of it.
// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(select)(Bottles);