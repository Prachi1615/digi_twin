import { getProviders, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Button } from "@nextui-org/react";

const icons = {
  google: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24">
      <path fill="#EA4335" d="M24 9.5c3.6 0 6.4 1.4 8.5 2.7l6.3-6.3C34.8 2.2 29.9 0 24 0 14.4 0 6.2 5.9 2.4 14.4l7.2 5.6C12.1 12.1 17.5 9.5 24 9.5z" />
      <path fill="#34A853" d="M24 48c5.9 0 10.8-1.9 14.4-5.1l-6.3-6.3c-1.7 1.2-3.8 2.2-8.1 2.2-6.4 0-11.8-4.4-13.6-10.5H2.4l-7.2 5.7C6.2 42.1 14.4 48 24 48z" />
      <path fill="#4A90E2" d="M47.6 24.5c0-1.7-.2-3.4-.5-5H24v9.4h13.2c-.5 2.7-1.7 4.9-3.6 6.4l6.3 6.3c3.7-3.4 6.1-8.3 6.1-14.7z" />
    </svg>
  ),
  email: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path fill="currentColor" d="M12 13.4L2 7.8V18a2 2 0 002 2h16a2 2 0 002-2V7.8l-10 5.6z" />
      <path fill="currentColor" d="M2 6l10 5.6L22 6H2z" />
    </svg>
  ),
  twitter: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24">
      <path
        fill="currentColor"
        d="M6 6L24 24L42 6H36L24 18L12 6H6ZM6 42L24 24L42 42H36L24 30L12 42H6Z"
      />
    </svg>
  ),
  github: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path fill="currentColor" d="M12 2a10 10 0 00-3.16 19.48c.5.09.68-.22.68-.48v-1.7c-2.77.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.46-1.1-1.46-.91-.63.07-.62.07-.62 1 .07 1.52 1.02 1.52 1.02.9 1.53 2.35 1.09 2.93.83.09-.65.35-1.1.63-1.35-2.22-.25-4.55-1.11-4.55-4.93 0-1.09.39-1.99 1.02-2.7-.1-.25-.45-1.27.1-2.65 0 0 .83-.27 2.75 1.02a9.6 9.6 0 015 0c1.92-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.63.71 1.02 1.61 1.02 2.7 0 3.83-2.34 4.68-4.57 4.92.36.31.68.94.68 1.9v2.82c0 .27.18.58.68.48A10 10 0 0012 2z" />
    </svg>
  ),
  biometric: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path fill="currentColor" d="M12 2C10.4 2 9 3.4 9 5V11C9 12.6 10.4 14 12 14C13.6 14 15 12.6 15 11V5C15 3.4 13.6 2 12 2ZM6 12C4.4 12 3 13.4 3 15C3 16.6 4.4 18 6 18C7.6 18 9 16.6 9 15C9 13.4 7.6 12 6 12ZM18 12C16.4 12 15 13.4 15 15C15 16.6 16.4 18 18 18C19.6 18 21 16.6 21 15C21 13.4 19.6 12 18 12ZM6 6C7.6 6 9 7.4 9 9C9 10.6 7.6 12 6 12C4.4 12 3 10.6 3 9C3 7.4 4.4 6 6 6ZM18 6C19.6 6 21 7.4 21 9C21 10.6 19.6 12 18 12C16.4 12 15 10.6 15 9C15 7.4 16.4 6 18 6ZM12 8C13.6 8 15 9.4 15 11C15 12.6 13.6 14 12 14C10.4 14 9 12.6 9 11C9 9.4 10.4 8 12 8Z"/>
    </svg>
  )
  
  
  
};

export default function SignIn({ providers }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Set to true after the component mounts
  }, []);

  const authenticateWithBiometrics = async () => {
    try {
      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array([/* some random challenge bytes */]),
          allowCredentials: [
            {
              id: new Uint8Array([/* public key id */]),
              type: 'public-key',
            },
          ],
          timeout: 60000, // Timeout after 60 seconds
        },
      });

      const response = await fetch('/api/auth/biometric', {
        method: 'POST',
        body: JSON.stringify({ credential }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.success) {
        // Sign in the user
        signIn('biometric');
      } else {
        alert('Biometric authentication failed');
      }
    } catch (error) {
      console.error('Biometric authentication error:', error);
      alert('Biometric authentication failed');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(to bottom right, #9B35E3, #FF34FD)',
      }}
    >
      <h1 style={{ marginBottom: '20px', color: '#fff' }}>Sign In</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        {providers && isMounted && // Only render after the component has mounted
          Object.values(providers).map((provider) => (
            <div key={provider.name} style={{ margin: '0 10px' }}>
              <Button
                key={provider.id}
                onClick={() => signIn(provider.id)}
                isIconOnly
                aria-label={`Sign in with ${provider.name}`}
                color="primary"
              >
                {icons[provider.id] || <span>{provider.name}</span>}
              </Button>
            </div>
          ))}
        <div style={{ margin: '0 10px' }}>
          <Button
            onClick={authenticateWithBiometrics}
            isIconOnly
            aria-label="Sign in with Biometrics"
            color="primary"
          >
            {icons.biometric}
          </Button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
