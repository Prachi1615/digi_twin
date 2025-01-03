import { useRouter } from 'next/router';

export default function Welcome() {
  const router = useRouter();

  const handleLogout = () => {
    // Add your logout logic here
    alert('Logged out successfully!');
    router.push('/api/auth/signin'); // Redirect to sign-in page
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #6e45e2, #88d3ce)',
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1>Welcome Back!</h1>
      <p style={{ marginTop: '10px', fontSize: '18px', maxWidth: '400px' }}>
        We're excited to have you here. Feel free to explore and make the most out of your experience.
      </p>
      <button
        onClick={handleLogout}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#ff6f61',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Logout
      </button>
    </div>
  );
}
