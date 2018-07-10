////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Fill in the test stubs to make the tests pass
////////////////////////////////////////////////////////////////////////////////
import "./mocha-setup";

import React from "react";
import ReactDOM from "react-dom";
import { Simulate } from "react-dom/test-utils";
import expect from "expect";

import Tabs from "./components/Tabs";

const FixtureData = [
  {
    label: "USA",
    content: "Land of the Free, Home of the brave"
  },
  { label: "Brazil", content: "Sunshine, beaches, and Carnival" },
  { label: "Russia", content: "World Cup 2018!" }
];

describe("when <Tabs> is rendered", () => {
  let node;
  let tabs;
  beforeEach(() => {
    node = document.createElement("div");
    ReactDOM.render(<Tabs data={FixtureData} />, node);
    tabs = node.querySelectorAll(".Tab");
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  it("renders the USA tab", () => {
    expect(tabs[0].innerText).toEqual(
      FixtureData[0].label);
  });

  it("renders the Brazil tab", () => {
      expect(tabs[1].innerText).toEqual(
          FixtureData[1].label);
  });

  it("renders the Russia tab", () => {
      expect(tabs[2].innerText).toEqual(
          FixtureData[2].label);
  });

  it("activates the first tab", () => {
      expect(tabs[0].style.borderBottomColor).toEqual(
          "rgb(0, 0, 0)");
  });

  it("does not activate the second tab", () => {
      expect(tabs[1].style.borderBottomColor).toEqual(
          "rgb(204, 204, 204)");
  });

  describe("after clicking the second tab", () => {
    beforeEach(() => {
      Simulate.click(tabs[1]);
    });

    it("activates the second tab", () => {
        expect(tabs[1].style.borderBottomColor).toEqual(
            "rgb(0, 0, 0)");
    });

    it("deactivates the first tab", () => {
        expect(tabs[0].style.borderBottomColor).toEqual(
            "rgb(204, 204, 204)");
    });

    it("puts the correct content in the panel", () => {
      expect(node.querySelector(".TabPanel").innerText).toEqual(
          "Sunshine, beaches, and Carnival");
    });
  });
});
