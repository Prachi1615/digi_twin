   // pages/dashboard.tsx
   import { useSession, signOut } from 'next-auth/react';
   import { useEffect } from 'react';
   import { useRouter } from 'next/router';

   const Dashboard = () => {
     const { data: session, status } = useSession();
     const router = useRouter();

     // Redirect to home if not authenticated
     useEffect(() => {
       if (status === "loading") return; // Do nothing while loading
       if (!session) router.push('/'); // Redirect to home if not authenticated
     }, [session, status, router]);

     if (status === "loading") {
       return <div>Loading...</div>; // Show loading state
     }

     return (
       <div style={styles.container}>
         <h1>Welcome to the Dashboard</h1>
         {session && (
           <div>
             <p>Hello, {session.user.name}!</p>
             <p>Your email: {session.user.email}</p>
             <button onClick={() => signOut()}>Sign Out</button>
           </div>
         )}
       </div>
     );
   };

   const styles = {
     container: {
       display: 'flex',
       flexDirection: 'column',
       alignItems: 'center',
       justifyContent: 'center',
       height: '100vh',
       backgroundColor: '#f4f4f4',
       textAlign: 'center',
     },
   };

   export default Dashboard;