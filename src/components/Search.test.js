import React from "react"
import { render, unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"
import Search from "./Search"

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders user data", async () => {
  const fakePlant = {
    "data": [],
    "links": {
      "self": "/api/v1/plants/search?q=cocos",
      "first": "/api/v1/plants/search?page=1&q=cocos",
      "last": "/api/v1/plants/search?page=1&q=cocos"
    },
    "meta": {
      "total": 0
    }
  }

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakePlant)
    })
  );  

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<Search id="123" />, container);
  });

  expect(container.textContent).toContain(fakePlant.data);

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});