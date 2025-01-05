import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const callbackUrl = '/';

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router, callbackUrl]);

  const handleSignIn = async () => {
    await signIn({ callbackUrl: '/' });
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '40px',
        background: 'linear-gradient(to bottom right, #9B35E3, #FF34FD)',
        minHeight: '100vh',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        backgroundAttachment: 'fixed',
      }}
    >
      {status === 'loading' ? (
        <p style={{ fontSize: '18px', fontWeight: '500', marginTop: '20px' }}>Loading...</p>
      ) : !session ? (
        <>
          <h1
            style={{
              fontSize: '36px',
              fontWeight: '700',
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              textShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)',
            }}
          >
            Welcome to Our Platform!
          </h1>
          <p
            style={{
              fontSize: '20px',
              fontWeight: '400',
              marginBottom: '20px',
              lineHeight: '1.6',
              maxWidth: '600px',
              textAlign: 'center',
              color: '#f2f2f2',
              marginBottom: '40px',
            }}
          >
            We're thrilled to have you here! Please sign in and start your journey with us. It's quick and easy!
          </p>
          <button
            onClick={handleSignIn}
            style={{
              padding: '14px 36px',
              background: '#000000',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontSize: '18px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
            }}
            onMouseOver={(e) => (e.target.style.background = '#00aaff')}
            onMouseOut={(e) => (e.target.style.background = 'linear-gradient(135deg, #0070f3, #00c6ff)')}
            onFocus={(e) => e.target.style.transform = 'scale(1.05)'}
            onBlur={(e) => e.target.style.transform = 'scale(1)'}
          >
            Sign In
          </button>
        </>
      ) : (
        <>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: '600',
              marginBottom: '20px',
            }}
          >
            Welcome back, {session.user.name}!
          </h1>
          <p
            style={{
              fontSize: '20px',
              fontWeight: '400',
              marginBottom: '20px',
              lineHeight: '1.6',
              color: '#f2f2f2',
              marginBottom: '40px',
            }}
          >
            You're successfully signed in as <strong>{session.user.email}</strong>.
          </p>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            style={{
              marginTop: '20px',
              padding: '14px 36px',
              background: 'linear-gradient(135deg, #ff6f61, #ff9c72)',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontSize: '18px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
              opacity: isLoggingOut ? 0.7 : 1,
            }}
            onMouseOver={(e) => (e.target.style.background = '#ff7a5b')}
            onMouseOut={(e) => (e.target.style.background = 'linear-gradient(135deg, #ff6f61, #ff9c72)')}
          >
            {isLoggingOut ? 'Signing out...' : 'Sign Out'}
          </button>
          <iframe
            src="https://trillion.investments/"
            style={{
              width: '100%',
              height: '400px',
              border: 'none',
              marginTop: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            }}
            title="Embedded Webpage"
          ></iframe>
        </>
      )}
    </div>
  );
}
