import React from 'react';
import logo from './logo.svg';
import './App.css';

import Select from "./components/Select.js"
import Button from "./components/Button.js"
import Input from "./components/Input.js"
import getRate from "./utils/getRate.js"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curs: ["USD", "EUR"],
      rates: {
        "USD": 1,
        "EUR": 0.8849
      },
      cur1: "USD",
      cur2: "EUR",
      amount1: 1,
      amount2: 0.8849
    }

    getRate('USD').then(res => {
      this.setState({ curs: [...Object.keys(res)], rates: res, amount2: this.state.amount1 * res[this.state.cur2] });
    });
  }

  /**
   * Handles swap button click. 
   * Swaps cur1 and cur2 state values, 
   * gets new rates from api and recalculates 
   * amount2 state value.
   */
  handleSwapClick() {
    let cur1Copy = this.state.cur1;
    this.setState({ cur1: this.state.cur2, cur2: cur1Copy });
    getRate(this.state.cur2).then(res => {
      this.setState({ curs: [this.state.cur1, ...Object.keys(res)], rates: {EUR: 1, ...res} });
      this.setState({ amount2: this.state.amount1 * res[cur1Copy] });
    });
  }

  /**
   * Handles input change. 
   * Recalculates amount1 and amount2 state values, 
   * according on the changed input's new value.
   * 
   * @param {Event} e 
   * @param {number} id - Different action is required depending on the id.
   */
  inputChange(e, id) {
    if (id === 1) {
      this.setState({ amount1: e.target.value });
      this.setState({ amount2: e.target.value * this.state.rates[this.state.cur2] });
    } else {
      this.setState({ amount2: e.target.value });
      this.setState({ amount1: e.target.value / this.state.rates[this.state.cur2] });
    }
  }

  /**
   * Handles select changes. 
   * Gets new rates from api.
   * Recalculates bottom input's value.
   * 
   * @param {event} e 
   * @param {number} id - Different action is required depending on the id.
   */
  selectChange(e, id) {
    if (id === 1) {
      this.setState({ cur1: e.target.value });
      getRate(e.target.value + "").then(res => {
        console.warn(res);
        this.setState({ curs: [e.target.value, ...Object.keys(res)], rates: {EUR: 1, ...res} });
        this.setState({ amount2: this.state.amount1 * this.state.rates[this.state.cur2] });
      });
    } else {
      this.setState({ cur2: e.target.value, amount2: this.state.amount1 * this.state.rates[e.target.value] });
    }
  }

  render() {

    return (
      <div className="App">
        <div className="erc">

          <div className="erc-container">
            <div className="erc-header">

              <div className="erc-logo">
                <img src={logo} className="App-logo" alt="logo" />
              </div>

              <div className="erc-header-title">
                Exchange Rate Calculator
          </div>

            </div>
            <div className="erc-main">
              <div className="erc-container">

                <div className="erc-main-title">
                  Chose the currency and the amounts to get the exchange rate
          </div>

                <div className="erc-main-row erc-main-row1">

                  <Select curs={this.state.curs} selected={this.state.cur1} curChange={(e) => { this.selectChange(e, 1); }} />
                  <Input amount={this.state.amount1} inputChange={(e) => { this.inputChange(e, 1); }} />

                </div>

                <div className="erc-main-row erc-main-row2">

                  <Button text="Swap" handleSwapClick={() => { this.handleSwapClick() }} />
                  <div className="erc-main-row2-coefficient">1 {this.state.cur1} = {this.state.rates[this.state.cur2]} {this.state.cur2}</div>

                </div>

                <div className="erc-main-row erc-main-row3">

                  <Select curs={this.state.curs} selected={this.state.cur2} curChange={(e) => { this.selectChange(e, 2); }} />
                  <Input amount={this.state.amount2} inputChange={(e) => { this.inputChange(e, 2); }} />

                </div>

              </div>
            </div>
          </div>


        </div>
      </div>
    );
  }

}

export default App;
