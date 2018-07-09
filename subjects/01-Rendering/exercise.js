////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Render `DATA.title` in an <h1>
// - Render a <ul> with each of `DATA.items` as an <li>
// - Now only render an <li> for mexican food (hint: use DATA.items.filter(...))
// - Sort the items in alphabetical order by name (hint: use sort-by https://github.com/staygrimm/sort-by#example)
//
// Got extra time?
//
// - Add a <select> dropdown to make filtering on `type` dynamic
// - Add a <button> to toggle the sort order (hint: You'll need an `updateThePage`
//   function that calls `ReactDOM.render`, and then you'll need to call it in
//   the event handlers of the form controls)
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import sortBy from "sort-by";

const DATA = {
  title: "Menu",
  items: [
    { id: 1, name: "tacos", type: "mexican" },
    { id: 2, name: "burrito", type: "mexican" },
    { id: 3, name: "tostada", type: "mexican" },
    { id: 4, name: "mushy peas", type: "english" },
    { id: 5, name: "fish and chips", type: "english" },
    { id: 6, name: "black pudding", type: "english" },
    { id: 7, name: "hamburger", type: "american" },
    { id: 8, name: "apple pie", type: "american" },
  ]
};

const types = DATA.items
        .map(item => item.type)
        .sort()
        .filter((elem, pos, arr) => arr.indexOf(elem) == pos);

class Menu extends React.Component {

  state = { 
    selectedType: 'mexican',
    sortAsc: true,
  };

  render() {
    return <div>
        <h1>{DATA.title}</h1>
        <select value={this.state.selectedType} onChange={event => this.setState({selectedType: event.target.value})}>
          {types.map(type => <option key={type}>{type}</option>)}
        </select>
        <button onClick={() => this.setState({sortAsc: !this.state.sortAsc})}>
          Sort {this.state.sortAsc ? "descending" : "ascending"}
        </button>
        <ul>
          {DATA.items
            .filter(item => item.type === this.state.selectedType)
            .sort(sortBy((this.state.sortAsc ? '' : '-') + 'name'))
            .map(item => <li key={item.id}>{item.name}</li>)}
        </ul>
      </div>;
  }
}

ReactDOM.render(<Menu />, document.getElementById("app"));

require("./tests").run();
