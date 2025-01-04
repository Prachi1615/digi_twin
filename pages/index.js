import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  const handleLogout = () => {
    signOut();
  };

  const handleSignIn = async () => {
    await signIn();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px',
        background: 'linear-gradient(to bottom right, #9B35E3, #FF34FD)',
        minHeight: '100vh',
        color: '#fff',
      }}
    >
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : !session ? (
        <>
          <p>Not signed in</p>
          <button
            onClick={handleSignIn}
            style={{
              padding: '10px 20px',
              backgroundColor: '#0070f3',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Sign in
          </button>
        </>
      ) : (
        <>
          <p>Signed in as {session.user.email}</p>
          <button
            onClick={handleLogout}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              backgroundColor: '#ff6f61',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Sign out
          </button>
          <iframe
            src="https://trillion.investments/"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              marginTop: '10px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
            title="Embedded Webpage"
          ></iframe>
        </>
      )}
    </div>
  );
}
