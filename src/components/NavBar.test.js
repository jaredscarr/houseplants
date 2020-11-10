import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import NavBar from './NavBar';

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

it("Shows logout button if authenticated", async () => {

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<NavBar id="123" />, container);
  });

  expect(container.textContent).toContain("Logout");

});
