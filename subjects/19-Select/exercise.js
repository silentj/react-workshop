////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make this work like a normal <select> box!
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class Select extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    defaultValue: PropTypes.any
  };

  state = {
    value: this.props.defaultValue,
    isOpen: false,
  };

  isControlled() {
    return this.props.value != null;
  }

  getValue() {
    return this.isControlled() ? this.props.value : this.state.value;
  }

  handleLabelClick = (e, newValue) => {
    this.setState(prevState => {
      return {isOpen: !prevState.isOpen}
    })
  };

  handleChildClick = newValue => {
    const newState = this.isControlled() ?
      {
        isOpen: false,
      } :
      {
        isOpen: false,
        value: newValue,
      };
    this.setState(newState);
    if (this.props.onChange) {
      this.props.onChange(newValue);
    }
  };

  render() {
    const selectedChild = React.Children.toArray(this.props.children).find(child => child.props.value === this.getValue());
    return (
      <div className="select">
        <div className="label" onClick={this.handleLabelClick}>
          {selectedChild.props.children} <span className="arrow">▾</span>
        </div>
        {this.state.isOpen ? <div className="options">{React.Children.map(this.props.children, child =>
          React.cloneElement(child, {_onClick: () => this.handleChildClick(child.props.value)}))
        }</div> : null}
      </div>
    );
  }
}

class Option extends React.Component {
  static propTypes = {
    _onClick: PropTypes.func,
  };

  render() {
    return <div className="option" onClick={this.props._onClick}>{this.props.children}</div>;
  }
}

class App extends React.Component {
  state = {
    selectValue: "dosa"
  };

  setToMintChutney = () => {
    this.setState({ selectValue: "mint-chutney" });
  };

  render() {
    return (
      <div>
        <h1>Select</h1>

        <h2>Uncontrolled</h2>

        <Select defaultValue="tikka-masala">
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>

        <h2>Controlled</h2>

        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <p>
          <button onClick={this.setToMintChutney}>
            Set to Mint Chutney
          </button>
        </p>

        <Select
          value={this.state.selectValue}
          onChange={value => this.setState({ selectValue: value })}
        >
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
