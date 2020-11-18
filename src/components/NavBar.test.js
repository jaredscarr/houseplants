import React from 'react';
import {cleanup, render} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './NavBar';

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

afterEach(cleanup);

it('Authenticated view renders logout button', () => {
  const { getByTestId } = render(
    <Router><NavBar /></Router>,
  );
  // this will error if the button is not rendered because it will not find it
  // Signaling that the login button is in fact being rendered
  expect(getByTestId('logout-button')).toBeTruthy();

});

it('Authenticated view renders menu', () => {
  const { getByTestId } = render(
    <Router><NavBar /></Router>,
  );
  
  expect(getByTestId('simple-menu')).toBeTruthy();
});
