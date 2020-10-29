import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import DeletePlant from "./DeletePlant";

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

it("delete plant from database recieves response", async () => {
  const fakeResponse = [{"statusCode": 200, "body": "Plant removed successfully."}]

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeResponse)
    })
  );

  const onChange = jest.fn();
  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<DeletePlant onChange={onChange} userId={"1"} plantId={143638} />, container);
  });

  // get ahold of the button element, and trigger some clicks on it
  const button = document.querySelector("[data-testid=removeToggleButton]");
  expect(button.innerHTML).toBe("Remove");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(button.innerHTML).toBe("Removed");
  global.fetch.mockRestore();
});