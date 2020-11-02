import React from "react"
import { render, unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"
import Dashboard from "./Dashboard"

jest.mock('@okta/okta-react', () => ({
    useOktaAuth: () => ({
      authState: {
        isAuthenticated: true
      },
      authService: {
        handleAuthentication: jest.fn(),
        getUser: jest.fn().mockImplementation(() => Promise.resolve('1'))
      }
    })
  })
);

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

it("recieves data from call to gateway", async () => {

  const fakeResponse = [{"id": 1, "user_id": "1", "plant_id": 143638}]

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeResponse)
    })
  );  

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<Dashboard id="123" />, container);
  });

  expect(container.textContent).toContain("User DashboardWelcome, !143638Remove");

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});