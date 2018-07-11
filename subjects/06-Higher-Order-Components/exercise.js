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

import React, {Fragment} from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const withCat = Component => {
    return class extends React.Component {

        static propTypes = {
            mouse: PropTypes.shape({
                x: PropTypes.number.isRequired,
                y: PropTypes.number.isRequired
            })
        };

        render() {
            return <Fragment>
                <div className='cat' style={{top: this.props.mouse.y, left: this.props.mouse.x}}/>
                <Component {...this.props} />
            </Fragment>
        }
    }
};

const withMouse = Component => {
    return class extends React.Component {

        state = {
            x: 0,
            y: 0,
        };

        handleMouseMove = (e) => {
            this.setState({x: e.clientX, y: e.clientY});
        };

        render() {
            return <div onMouseMove={this.handleMouseMove}>
                <Component {...this.props} mouse={this.state}/>
            </div>;
        }
    };
};

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
