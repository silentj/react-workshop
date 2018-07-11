////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Modify <ListView> so that it only renders the list items that are visible!
//
// Got extra time?
//
// - Render fewer rows as the size of the window changes (hint: Listen
//   for the window's "resize" event)
// - Remember the scroll position when you refresh the page
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import * as RainbowListDelegate from "./RainbowListDelegate";

class ListView extends React.Component {
    static propTypes = {
        numRows: PropTypes.number.isRequired,
        rowHeight: PropTypes.number.isRequired,
        renderRowAtIndex: PropTypes.func.isRequired
    };

    divRef = React.createRef();

    state = {
        scrollTop: 0,
        clientHeight: 0,
    };

    handleScroll = e => {
        this.setState({scrollTop: e.target.scrollTop});
    };

    componentDidMount() {
        this.adjustClientHeight();
        window.addEventListener('resize', this.adjustClientHeight);
    }

    adjustClientHeight = () => this.setState({clientHeight: this.divRef.clientHeight});

    render() {
        const {numRows, rowHeight, renderRowAtIndex} = this.props;
        const totalHeight = numRows * rowHeight;

        const firstElementShown = Math.floor(this.state.scrollTop / this.props.rowHeight);
        const firstElementPosition = firstElementShown * this.props.rowHeight;

        const lastElementShown = Math.min(numRows,
            Math.ceil((this.state.scrollTop + this.state.clientHeight) / this.props.rowHeight));

        const items = [];

        let index = firstElementShown;
        while (index < lastElementShown) {
            items.push(<li key={index}>{renderRowAtIndex(index)}</li>);
            index++;
        }

        return (
            <div style={{height: "100vh", overflowY: "scroll"}}
                 onScroll={this.handleScroll}
                 ref={ref => this.divRef = ref}>
                <div style={{height: totalHeight, boxSizing: 'border-box', paddingTop: firstElementPosition }}>
                    <ol>{items}</ol>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <ListView
        numRows={500000}
        rowHeight={RainbowListDelegate.rowHeight}
        renderRowAtIndex={RainbowListDelegate.renderRowAtIndex}
    />,
    document.getElementById("app")
);
