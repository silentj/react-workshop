import React from "react";

class Provider extends React.Component {

  componentDidMount() {
    this.props.store.subscribe(state => {
      // .. do something
    })
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default Provider;
