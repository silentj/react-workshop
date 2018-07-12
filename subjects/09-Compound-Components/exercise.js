////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Implement a radio group form control with the API found in <App>.
//
// - Clicking a <RadioOption> should update the value of <RadioGroup>
// - The selected <RadioOption> should pass the correct value to its <RadioIcon>
// - The `defaultValue` should be set on first render
//
// Got extra time?
//
// - Implement an `onChange` prop that communicates the <RadioGroup>'s state
//   back to the <App> so it can use it to render something
// - Implement keyboard controls on the <RadioGroup>
//   - Hint: Use tabIndex="0" on the <RadioOption>s so the keyboard will work
//   - Enter and space bar should select the option
//   - Arrow right, arrow down should select the next option
//   - Arrow left, arrow up should select the previous option
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class RadioGroup extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
  };

  state = {
    selectedValue: this.props.defaultValue,
  };

  onChange(newValue) {
    this.setState({selectedValue: newValue});
    if (this.props.onChange) {
      this.props.onChange(newValue);
    }
  }

  render() {
    return <div>{React.Children.map(this.props.children, (child, index) => {
      const value = child.props.value;
      const selected = this.state.selectedValue === value;
      return React.cloneElement(child, {_selected: selected, _onSelect: () => {this.onChange(value);}})
    })}</div>;
  }
}

class RadioOption extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    _selected: PropTypes.bool,
    _onSelect: PropTypes.func,
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      this.props._onSelect(e);
    }
  };

  render() {
    return (
      <div onClick={this.props._onSelect} tabIndex="0" onKeyDown={this.handleKeyDown}>
        <RadioIcon isSelected={this.props._selected} /> {this.props.children}
      </div>
    );
  }
}

class RadioIcon extends React.Component {
  static propTypes = {
    isSelected: PropTypes.bool.isRequired
  };

  render() {
    return (
      <div
        style={{
          borderColor: "#ccc",
          borderWidth: 3,
          borderStyle: this.props.isSelected ? "inset" : "outset",
          height: 16,
          width: 16,
          display: "inline-block",
          cursor: "pointer",
          background: this.props.isSelected ? "rgba(0, 0, 0, 0.05)" : ""
        }}
      />
    );
  }
}

class App extends React.Component {
  static defaultValue = "fm";

  state = {
    selectedOption: App.defaultValue,
  };

  render() {
    return (
      <div>
        <h1>♬ I'm listening to: {this.state.selectedOption} ♫</h1>

        <RadioGroup defaultValue="fm" onChange={(newValue) => {this.setState({selectedOption: newValue})}}>
          <RadioOption value="am">AM</RadioOption>
          <RadioOption value="fm">FM</RadioOption>
          <RadioOption value="tape">Tape</RadioOption>
          <RadioOption value="aux">Aux</RadioOption>
        </RadioGroup>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById("app"));
