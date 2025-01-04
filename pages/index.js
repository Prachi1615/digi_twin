import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter(); // Initialize useRouter hook

  const handleLogout = () => {
    signOut();
  };

  const handleSignIn = async () => {
    await signIn(); // Sign in the user
    router.push('/'); // Redirect to the homepage after signing in
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
        background: 'linear-gradient(to bottom right, #4CAF50, #2196F3)',
        minHeight: '100vh',
        color: '#fff',
      }}
    >
      {!session ? (
        <>
          <p>Not signed in</p>
          <button
            onClick={handleSignIn} // Use the handleSignIn function here
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
            src="https://trillion.investments/" // Replace with your desired webpage URL
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
