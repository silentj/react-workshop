////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Render a tab for each country with its name in the tab
// - When you click on a tab, make it appear to be active while the others
//   appear inactive
// - Render the correct content for the selected tab in the panel
//
// Got extra time?
//
// - Make <Tabs> generic so that it doesn't know anything about
//   country data (Hint: good propTypes help)
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const styles = {};

styles.tab = {
    display: "inline-block",
    padding: 10,
    margin: 10,
    borderBottom: "4px solid",
    borderBottomColor: "#ccc",
    cursor: "pointer"
};

styles.activeTab = {
    ...styles.tab,
    borderBottomColor: "#000"
};

styles.panel = {
    padding: 10
};

const labelType = PropTypes.shape({
    label: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
});

class Tabs extends React.Component {
    static propTypes = {
        data: PropTypes.arrayOf(labelType).isRequired
    };

    state = {
        activeIndex: 0,
    };

    render() {
        return (
            <div className="Tabs">
                {this.props.data.map((item, index) =>
                    <div key={index}
                         className="Tab"
                         style={(this.state.activeIndex === index) ? styles.activeTab : styles.tab}
                         onClick={() => this.setState({activeIndex: index})}>
                        {item.label}
                    </div>)}
                <div className="TabPanel" style={styles.panel}>
                    {this.props.data[this.state.activeIndex].description}
                </div>
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Countries</h1>
                <Tabs data={this.props.countries}/>
            </div>
        );
    }
}

const DATA = [
    {
        id: 1,
        name: "USA",
        description: "Land of the Free, Home of the brave"
    },
    {
        id: 2,
        name: "Brazil",
        description: "Sunshine, beaches, and Carnival"
    },
    {id: 3, name: "Russia", description: "World Cup 2018!"}
];

ReactDOM.render(
    <App countries={DATA.map(item => ({label: item.name, description: item.description}))}/>,
    document.getElementById("app")
);

require("./tests").run();
