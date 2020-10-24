import React, { useState, useEffect } from 'react';

const AWS_GATEWAY_URL = process.env.REACT_APP_AWS_GATEWAY_URL;
const CLAIM_JWT_URL = `${AWS_GATEWAY_URL}/api/auth/claim`;

const ClaimTrefleToken = () => {
  const [error, setError] = useState(null);


  useEffect(() => {
    fetch(CLAIM_JWT_URL,
      {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origin: 'http://localhost:3000' })
      }
    )
    .then(res => res.json())
    .then(
      (result) => {
        localStorage.setItem('trefleJwtToken', result['token'])
      },
      (error) => {
        setError(error);
        console.log(error);
      }
    )
  }, [])

  if (error) {
    return <div>Sorry there was a problem connecting! Please try refreshing the page. If that fails try again in a few minutes.</div>;
  } else {
    return <div>token received.</div>;
  }
}

export default ClaimTrefleToken;
