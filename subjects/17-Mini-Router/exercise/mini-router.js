import React from "react";
import {createHashHistory} from "history";

/*
How to use the history library:

// read the current URL
history.location

// listen for changes to the URL
history.listen(() => {
  history.location // is now different
})

// change the URL
history.push('/something')
*/

const RouterContext = React.createContext();

class Router extends React.Component {
  history = createHashHistory();

  state = {
    location: this.history.location,
  };

  componentDidMount() {
    this.history.listen(() => {
      this.setState({location: this.history.location});
    })
  }

  handleLinkClick = (to) => {
    this.history.push(to);
  };

  render() {
    return <RouterContext.Provider value={{
      location: this.state.location,
      onClick: this.handleLinkClick,
    }}>{this.props.children}</RouterContext.Provider>;
  }
}

class Route extends React.Component {

  render() {
    const {path, render, component: Component} = this.props;
    return <RouterContext.Consumer>
      {context => (context.location.pathname === path) ? (render ? render() : <Component/>) : null}
    </RouterContext.Consumer>;
  }
}

class Link extends React.Component {
  handleClick = (event, onClick) => {
    event.preventDefault();
    onClick(this.props.to);
  };

  render() {
    return (
      <RouterContext.Consumer>
        {context =>
          <a href={`#${this.props.to}`} onClick={e => this.handleClick(e, context.onClick)}>
            {this.props.children}
          </a>
        }
      </RouterContext.Consumer>
    );
  }
}

export {Router, Route, Link};
