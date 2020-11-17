import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';
// Must wrap the component in a Router
import { BrowserRouter as Router } from 'react-router-dom';
// the component to test
import Search from './Search';

const TREFLE_BASE_URL = process.env.REACT_APP_BASE_URL;

jest.mock('@okta/okta-react', () => ({
    useOktaAuth: () => ({
      authState: {
        isAuthenticated: true
      },
      authService: {
        handleAuthentication: jest.fn(),
        getUser: jest.fn().mockImplementation(() => Promise.resolve(
          {
            "sub": "00uid4BxXw6I6TV4m0g3",
            "name": "John Doe",
            "nickname": "Jimmy",
            "given_name": "John",
            "middle_name": "James",
            "family_name": "Doe",
            "profile": "https://example.com/john.doe",
            "zoneinfo": "America/Los_Angeles",
            "locale": "en-US",
            "updated_at": 1311280970,
            "email": "john.doe@example.com",
            "email_verified": true,
            "address": {
              "street_address": "123 Hollywood Blvd.",
              "locality": "Los Angeles",
              "region": "CA",
              "postal_code": "90210",
              "country": "US"
            },
            "phone_number": "+1 (xxx) xxx-xxxx"
          }
        ))
      }
    })
  })
);

// declare which API requests to mock
const server = setupServer(
  // capture "GET /greeting" requests
  rest.get(`${TREFLE_BASE_URL}/plants/search`, (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(ctx.json({ data: [{'id': 1, 'common_name': 'palm'} ]}))
  })
)

// establish API mocking before all tests
beforeAll(() => server.listen())
// reset any request handlers that are declared as a part of our tests
afterEach(() => server.resetHandlers())
// clean up once the tests are done
afterAll(() => server.close())

const setup = () => {
  const utils = render(<Router><Search /></Router>)
  const input = utils.getByTestId('search-input')
  return {
    input,
    ...utils,
  }
}

test('Input renders value', async () => {
  const { input } = setup()
  fireEvent.change(input, { target: { value: 'palm' } })
  expect(input.value).toBe('palm')
})

test('Check response is rendered', async () => {
  // Arrange
  const { input } = setup()
  fireEvent.change(input, { target: { value: 'palm' } })
  // expect(input.value).toBe('palm')
  // Act
  fireEvent.click(screen.getByTestId('search-button'))
  // Assert
  await waitFor(() =>
    // getByRole throws an error if it cannot find an element
    screen.getByText('palm')
  )
  expect(screen.getByText('palm'))
})
