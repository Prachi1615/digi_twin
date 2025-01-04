import { getProviders, signIn } from 'next-auth/react';

export default function SignIn({ providers }) {
  const authenticateWithBiometrics = async () => {
    try {
      const credential = await navigator.credentials.get({
        publicKey: {
          // WebAuthn public key credentials options
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

      // Send this credential to your backend for verification
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
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name} style={{ marginBottom: '10px' }}>
            <button
              onClick={() => signIn(provider.id)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      <div style={{ marginTop: '1px' }}>
        <button
          onClick={authenticateWithBiometrics}
          style={{
            padding: '10px 20px',
            backgroundColor: '#000000',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Sign in with Biometric
        </button>
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
