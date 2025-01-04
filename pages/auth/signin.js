import { getProviders, signIn } from 'next-auth/react';

export default function SignIn({ providers }) {
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
      {Object.values(providers).map((provider) => (
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
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
