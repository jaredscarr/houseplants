import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import AddPlant from "./AddPlant";

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

it("add plant to database recieves response", async () => {
  const fakeResponse = [{"statusCode": 200, "body": "Plant added successfully."}]

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeResponse)
    })
  );

  const onChange = jest.fn();
  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<AddPlant onChange={onChange} userId={"1"} plantId={143638} />, container);
  });

  // get ahold of the button element, and trigger some clicks on it
  const button = document.querySelector("[data-testid=addToggleButton]");
  expect(button.innerHTML).toBe("Add");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(button.innerHTML).toBe("Added");
  global.fetch.mockRestore();
});