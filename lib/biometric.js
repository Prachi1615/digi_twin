export const registerBiometric = async (credential, email) => {
    try {
      // Here, you would normally use WebAuthn to register the biometric credential
      // For now, we'll just simulate this by storing the credential as a JSON object
  
      const user = await prisma.user.update({
        where: { email },
        data: { biometricCredentials: credential }, // Save the public key or biometric credential
      });
  
      return user ? { success: true } : { success: false };
    } catch (error) {
      console.error('Error during biometric registration:', error);
      return { success: false, message: 'Registration failed' };
    }
  };
  
  export const verifyBiometric = async (credential, email) => {
    try {
      // Verify the biometric credential (e.g., public key) against the stored one
      const user = await prisma.user.findUnique({
        where: { email },
      });
  
      if (!user || !user.biometricCredentials) {
        return false; // No credential stored for this user
      }
  
      // Compare credentials (this should use actual WebAuthn verification in a real-world app)
      return compareBiometricCredentials(user.biometricCredentials, credential);
    } catch (error) {
      console.error('Error during biometric verification:', error);
      return false;
    }
  };
  
  const compareBiometricCredentials = (storedCredential, providedCredential) => {
    // This would be a more complex cryptographic check in a real-world scenario
    return JSON.stringify(storedCredential) === JSON.stringify(providedCredential);  // For demo purposes
  };
  