////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Make `withMouse` a "higher-order component" that sends the mouse position
//   to the component as props (hint: use `event.clientX` and `event.clientY`).
//
// Got extra time?
//
// - Make a `withCat` HOC that shows a cat chasing the mouse around the screen!
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

function withCat(Component) {
    return class WithCat extends React.Component {

        render() {
            return <div className='cat' style={{top: this.props.mouse.y, left: this.props.mouse.x}}>
                <Component {...this.props} />
            </div>
        }
    }
}

function withMouse(Component) {
    return class WithMouse extends React.Component {

        state = {
            x: 0,
            y: 0,
        };

        componentDidMount() {
            window.addEventListener('mousemove', (e) => {
                this.setState({x: e.clientX, y: e.clientY});
            })
        }

        render() {
            return <Component {...this.props} mouse={{x: this.state.x, y: this.state.y}}/>
        }
    };
}

class App extends React.Component {
    static propTypes = {
        mouse: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired
        })
    };

    render() {
        const {mouse} = this.props;

        return (
            <div className="container">
                {mouse ? (
                    <h1>
                        The mouse position is ({mouse.x}, {mouse.y})
                    </h1>
                ) : (
                    <h1>We don't know the mouse position yet :(</h1>
                )}
            </div>
        );
    }
}

const AppWithCatAndMouse = withMouse(withCat(App));

ReactDOM.render(<AppWithCatAndMouse/>, document.getElementById("app"));
