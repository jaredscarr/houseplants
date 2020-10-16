import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { unmountComponentAtNode } from 'react-dom'
import { MemoryRouter } from 'react-router-dom'

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

it('full app rendering/navigating', async () => {
  jest.mock('@okta/okta-react', () => ({
    useOktaAuth: () => ({
      authState: { isAuthenticated: true},
      authService: { handleAuthentication: jest.fn() }
    })
  }));
  render(<App />, { wrapper: MemoryRouter })

  expect(await screen.findByText(/My plants/i)).toBeInTheDocument()
})
