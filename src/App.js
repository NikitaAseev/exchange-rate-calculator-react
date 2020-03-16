import React from 'react';
import logo from './logo.svg';
import './App.css'; 

import Select from "./components/Select.js"
import Swap from "./components/Swap.js"
import MainInput from "./components/MainInput.js"

function getRate(val) {
  let url = "https://prime.exchangerate-api.com/v5/362616745a823e3c53fe4dd0/latest/" + val;
  return fetch(url).then(res => {
    return res.json().then(data => {
      let rates = data && data.conversion_rates ? data.conversion_rates : { "USD": 1, "EUR": 0.912211 };
      return rates;
    })
  });
}

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
      this.setState({ curs: Object.keys(res), rates: res });
    });

  }

  handleSwapClick() {
    let cur1Copy = this.state.cur1;
    getRate(this.state.cur2 + "").then(res => {
      this.setState({ curs: Object.keys(res), rates: res });
      this.setState({ amount2: this.state.amount1 * this.state.rates[this.state.cur2] });
    });
    this.setState({ cur1: this.state.cur2, cur2: cur1Copy });
  }

  inputChange(e, id) {
    if (id === 1) {
      this.setState({ amount1: e.target.value });
      this.setState({ amount2: e.target.value * this.state.rates[this.state.cur2] });
    } else {
      this.setState({ amount2: e.target.value });
      this.setState({ amount1: e.target.value / this.state.rates[this.state.cur2] });
    }
  }

  selectChange(e, id) {
    if (id === 1) {
      this.setState({ cur1: e.target.value });
      getRate(e.target.value + "").then(res => {
        console.warn(res);
        this.setState({ curs: Object.keys(res), rates: res });
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
          </div>

          <div className="erc-main">
            <div className="erc-container">

              <div className="erc-main-title">
                Chose the currency and the amounts to get the exchange rate
          </div>

              <div className="erc-main-row erc-main-row1">

                <Select curs={this.state.curs} selected={this.state.cur1} curChange={(e) => { this.selectChange(e, 1); }} />
                <MainInput amount={this.state.amount1} inputChange={(e) => { this.inputChange(e, 1); }} />

              </div>

              <div className="erc-main-row erc-main-row2">

                <Swap handleSwapClick={() => { this.handleSwapClick() }} />
                <div className="erc-main-row2-coefficient">1 {this.state.cur1} = {this.state.rates[this.state.cur2]} {this.state.cur2}</div>

              </div>

              <div className="erc-main-row erc-main-row3">

                <Select curs={this.state.curs} selected={this.state.cur2} curChange={(e) => { this.selectChange(e, 2); }} />
                <MainInput amount={this.state.amount2} inputChange={(e) => { this.inputChange(e, 2); }} />

              </div>

            </div>
          </div>

        </div>
      </div>
    );
  }

}

export default App;
