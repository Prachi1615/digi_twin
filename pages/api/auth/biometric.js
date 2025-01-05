// /pages/api/auth/biometric.js

import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  if (req.method === 'POST') {
    const { credential, isFirstTime } = req.body;

    if (isFirstTime) {
      // Handle biometric registration for first-time users
      const registrationResult = await registerBiometric(credential, session.user.email);
      if (registrationResult.success) {
        return res.json({ success: true, message: 'Biometric registration successful' });
      } else {
        return res.json({ success: false, message: 'Biometric registration failed' });
      }
    } else {
      // Biometric authentication for existing users
      const isBiometricValid = await verifyBiometric(credential);
      if (isBiometricValid) {
        return res.json({ success: true });
      } else {
        return res.json({ success: false });
      }
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

// Custom function for first-time biometric registration
async function registerBiometric(credential, userEmail) {
  // Save the credential (public key) to your database
  // This is where you would link the credential with the user's account in your DB

  const success = await saveBiometricCredential(userEmail, credential);
  
  return success
    ? { success: true }
    : { success: false, message: 'Error saving biometric credential' };
}

// Custom function for saving biometric credential (public key) to the database
async function saveBiometricCredential(userEmail, credential) {
  // This function should store the user's biometric credential securely in your DB
  // Typically, you would save the credential's public key and any other necessary information (e.g., userEmail, creation date)

  // For the sake of example, we'll assume the saving operation is successful
  console.log(`Saving biometric data for ${userEmail}:`, credential);

  // Simulate success
  return true;
}

// Custom biometric validation function for login (existing users)
async function verifyBiometric(credential) {
  // Perform biometric verification, e.g., using WebAuthn or another method
  // Simulating a successful match for the sake of the example

  console.log('Verifying biometric credential:', credential);

  return true;  // Simulate a successful match
}
