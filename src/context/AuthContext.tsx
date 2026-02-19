// context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  User as FirebaseUser,
  sendEmailVerification
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  serverTimestamp,
  Timestamp,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';

// ============== TYPES ==============
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  streak: number;
  createdAt: Date;
  lastActive?: Date;
  studyGoals?: {
    daily: number; // minutes
    weekly: number; // minutes
  };
  preferences?: {
    emailNotifications: boolean;
    studyReminders: boolean;
    theme: 'light' | 'dark' | 'system';
  };
  stats?: {
    totalStudyHours: number;
    certificatesCompleted: number;
    longestStreak: number;
  };
  emailVerified?: boolean;
}

interface AuthContextType {
  // State
  user: User | null;
  isLoading: boolean;
  error: string | null;
  
  // Auth Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  
  // Profile Actions
  updateUserProfile: (data: Partial<User>) => Promise<void>;
  updateUserEmail: (newEmail: string, password: string) => Promise<void>;
  updateUserPassword: (currentPassword: string, newPassword: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  
  // Helper Functions
  refreshUser: () => Promise<void>;
  clearError: () => void;
}

// ============== CONTEXT ==============
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============== PROVIDER ==============
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ============== AUTH STATE LISTENER ==============
  useEffect(() => {
    console.log('🟡 Setting up auth state listener...');
    
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('🟡 Auth state changed:', firebaseUser ? 'User logged in' : 'No user');
      
      setFirebaseUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          // Fetch additional user data from Firestore
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log('🟢 User data fetched from Firestore');
            
            // Convert Firestore timestamps to Date objects
            const createdAt = userData.createdAt instanceof Timestamp 
              ? userData.createdAt.toDate() 
              : new Date(userData.createdAt);
            
            const lastActive = userData.lastActive instanceof Timestamp 
              ? userData.lastActive.toDate() 
              : userData.lastActive ? new Date(userData.lastActive) : undefined;

            setUser({
              id: firebaseUser.uid,
              name: firebaseUser.displayName || userData.name || '',
              email: firebaseUser.email || '',
              avatar: firebaseUser.photoURL || userData.avatar,
              streak: userData.streak || 0,
              createdAt,
              lastActive,
              studyGoals: userData.studyGoals || { daily: 120, weekly: 600 },
              preferences: userData.preferences || {
                emailNotifications: true,
                studyReminders: true,
                theme: 'light'
              },
              stats: userData.stats || {
                totalStudyHours: 0,
                certificatesCompleted: 0,
                longestStreak: 0
              },
              emailVerified: firebaseUser.emailVerified
            });
          } else {
            console.log('🟡 No user document found, creating one...');
            
            // Create user document if it doesn't exist
            const newUser = {
              name: firebaseUser.displayName || '',
              email: firebaseUser.email,
              streak: 0,
              createdAt: serverTimestamp(),
              lastActive: serverTimestamp(),
              studyGoals: { daily: 120, weekly: 600 },
              preferences: {
                emailNotifications: true,
                studyReminders: true,
                theme: 'light'
              },
              stats: {
                totalStudyHours: 0,
                certificatesCompleted: 0,
                longestStreak: 0
              }
            };
            
            try {
              await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
              console.log('🟢 User document created in Firestore');
              
              setUser({
                id: firebaseUser.uid,
                name: firebaseUser.displayName || '',
                email: firebaseUser.email || '',
                streak: 0,
                createdAt: new Date(),
                studyGoals: newUser.studyGoals,
                preferences: {
                  ...newUser.preferences,
                  theme: (['light', 'dark', 'system'].includes(newUser.preferences.theme)
                    ? newUser.preferences.theme
                    : 'light') as 'light' | 'dark' | 'system'
                },
                stats: newUser.stats,
                emailVerified: firebaseUser.emailVerified
              });
            } catch (firestoreError) {
              console.error('🔴 Firestore error creating user document:', firestoreError);
              // Still set user with basic info even if Firestore fails
              setUser({
                id: firebaseUser.uid,
                name: firebaseUser.displayName || '',
                email: firebaseUser.email || '',
                streak: 0,
                createdAt: new Date(),
                emailVerified: firebaseUser.emailVerified
              });
            }
          }
        } catch (err) {
          console.error('🔴 Error fetching user data:', err);
          // Still set user with basic info from Firebase Auth
          setUser({
            id: firebaseUser.uid,
            name: firebaseUser.displayName || '',
            email: firebaseUser.email || '',
            streak: 0,
            createdAt: new Date(),
            emailVerified: firebaseUser.emailVerified
          });
        }
      } else {
        setUser(null);
      }
      
      setIsLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // ============== UPDATE LAST ACTIVE ==============
  useEffect(() => {
    if (user && firebaseUser) {
      // Update last active timestamp (but not too frequently)
      const updateLastActive = async () => {
        try {
          await updateDoc(doc(db, 'users', firebaseUser.uid), {
            lastActive: serverTimestamp()
          });
        } catch (err) {
          // Silently fail - not critical
          console.log('Could not update last active');
        }
      };
      
      // Only update every 5 minutes to avoid too many writes
      const lastUpdate = localStorage.getItem('lastActiveUpdate');
      const now = Date.now();
      
      if (!lastUpdate || now - parseInt(lastUpdate) > 5 * 60 * 1000) {
        updateLastActive();
        localStorage.setItem('lastActiveUpdate', now.toString());
      }
    }
  }, [user, firebaseUser]);

  // ============== CLEAR ERROR ==============
  const clearError = () => setError(null);

  // ============== SIGNUP ==============
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('🟡 Attempting signup for:', email);
      
      // Validate inputs
      if (!name.trim()) throw new Error('Name is required');
      if (!email.trim()) throw new Error('Email is required');
      if (password.length < 6) throw new Error('Password must be at least 6 characters');
      
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newFirebaseUser = userCredential.user;
      console.log('🟢 User created in Auth:', newFirebaseUser.uid);

      // Update profile with display name
      await updateProfile(newFirebaseUser, { 
        displayName: name 
      });
      console.log('🟢 Profile updated with name');

      // Send verification email
      await sendEmailVerification(newFirebaseUser);
      console.log('🟢 Verification email sent');

      // Create user document in Firestore
      const userData = {
        name,
        email,
        streak: 0,
        createdAt: serverTimestamp(),
        lastActive: serverTimestamp(),
        studyGoals: {
          daily: 120,
          weekly: 600
        },
        preferences: {
          emailNotifications: true,
          studyReminders: true,
          theme: 'light'
        },
        stats: {
          totalStudyHours: 0,
          certificatesCompleted: 0,
          longestStreak: 0
        }
      };

      try {
        await setDoc(doc(db, 'users', newFirebaseUser.uid), userData);
        console.log('🟢 User document created in Firestore');
      } catch (firestoreError) {
        console.error('🔴 Firestore error:', firestoreError);
        // Don't throw - user is still created in Auth
        setError('Account created but failed to save additional data. Please refresh.');
      }

    } catch (err: any) {
      console.error('🔴 Signup error:', err);
      
      // Handle specific Firebase errors
      let errorMessage = 'Signup failed. Please try again.';
      
      switch (err.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered. Please log in instead.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password signup is not enabled. Please contact support.';
          break;
        default:
          errorMessage = err.message || 'Signup failed. Please try again.';
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // ============== LOGIN ==============
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('🟡 Attempting login for:', email);
      
      if (!email.trim()) throw new Error('Email is required');
      if (!password.trim()) throw new Error('Password is required');
      
      await signInWithEmailAndPassword(auth, email, password);
      console.log('🟢 Login successful');
      
    } catch (err: any) {
      console.error('🔴 Login error:', err);
      
      let errorMessage = 'Login failed. Please try again.';
      
      switch (err.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          errorMessage = 'Invalid email or password.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later.';
          break;
        default:
          errorMessage = err.message || 'Login failed. Please try again.';
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // ============== LOGOUT ==============
  const logout = async () => {
    try {
      console.log('🟡 Logging out...');
      await signOut(auth);
      console.log('🟢 Logout successful');
    } catch (err: any) {
      console.error('🔴 Logout error:', err);
      setError('Failed to log out. Please try again.');
      throw err;
    }
  };

  // ============== UPDATE PROFILE ==============
  const updateUserProfile = async (data: Partial<User>) => {
    if (!firebaseUser) {
      throw new Error('No user logged in');
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('🟡 Updating profile...');
      
      // Update Firebase Auth profile if name or avatar changed
      if (data.name || data.avatar) {
        await updateProfile(firebaseUser, {
          displayName: data.name || firebaseUser.displayName,
          photoURL: data.avatar || firebaseUser.photoURL
        });
      }
      
      // Update Firestore document
      const updateData: any = { ...data };
      delete updateData.id; // Don't update ID
      delete updateData.email; // Don't update email here
      delete updateData.emailVerified; // Don't update this
      
      await updateDoc(doc(db, 'users', firebaseUser.uid), {
        ...updateData,
        updatedAt: serverTimestamp()
      });
      
      // Update local user state
      setUser(prev => prev ? { ...prev, ...data } : null);
      
      console.log('🟢 Profile updated successfully');
    } catch (err: any) {
      console.error('🔴 Profile update error:', err);
      setError('Failed to update profile. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // ============== UPDATE EMAIL ==============
  const updateUserEmail = async (newEmail: string, password: string) => {
    if (!firebaseUser) {
      throw new Error('No user logged in');
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('🟡 Updating email...');
      
      // Re-authenticate user
      const credential = EmailAuthProvider.credential(firebaseUser.email!, password);
      await reauthenticateWithCredential(firebaseUser, credential);
      
      // Update email
      await updateEmail(firebaseUser, newEmail);
      
      // Update Firestore
      await updateDoc(doc(db, 'users', firebaseUser.uid), {
        email: newEmail,
        updatedAt: serverTimestamp()
      });
      
      // Update local state
      setUser(prev => prev ? { ...prev, email: newEmail } : null);
      
      console.log('🟢 Email updated successfully');
    } catch (err: any) {
      console.error('🔴 Email update error:', err);
      
      let errorMessage = 'Failed to update email.';
      if (err.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      } else if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already in use.';
      }
      
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // ============== UPDATE PASSWORD ==============
  const updateUserPassword = async (currentPassword: string, newPassword: string) => {
    if (!firebaseUser) {
      throw new Error('No user logged in');
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('🟡 Updating password...');
      
      // Re-authenticate user
      const credential = EmailAuthProvider.credential(firebaseUser.email!, currentPassword);
      await reauthenticateWithCredential(firebaseUser, credential);
      
      // Update password
      await updatePassword(firebaseUser, newPassword);
      
      console.log('🟢 Password updated successfully');
    } catch (err: any) {
      console.error('🔴 Password update error:', err);
      
      let errorMessage = 'Failed to update password.';
      if (err.code === 'auth/wrong-password') {
        errorMessage = 'Current password is incorrect.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'New password should be at least 6 characters.';
      }
      
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // ============== RESET PASSWORD ==============
  const resetPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('🟡 Sending password reset email to:', email);
      
      if (!email.trim()) {
        throw new Error('Email is required');
      }
      
      await sendPasswordResetEmail(auth, email);
      console.log('🟢 Password reset email sent');
    } catch (err: any) {
      console.error('🔴 Password reset error:', err);
      
      let errorMessage = 'Failed to send reset email.';
      if (err.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      }
      
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // ============== SEND VERIFICATION EMAIL ==============
  const sendVerificationEmail = async () => {
    if (!firebaseUser) {
      throw new Error('No user logged in');
    }
    
    try {
      await sendEmailVerification(firebaseUser);
      console.log('🟢 Verification email sent');
    } catch (err) {
      console.error('🔴 Send verification email error:', err);
      setError('Failed to send verification email.');
      throw err;
    }
  };

  // ============== REFRESH USER ==============
  const refreshUser = async () => {
    if (!firebaseUser) {
      return;
    }
    
    try {
      console.log('🟡 Refreshing user data...');
      
      // Reload Firebase user
      await firebaseUser.reload();
      
      // Refresh Firestore data
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        setUser(prev => prev ? {
          ...prev,
          name: firebaseUser.displayName || userData.name || prev.name,
          avatar: firebaseUser.photoURL || userData.avatar || prev.avatar,
          streak: userData.streak || prev.streak,
          studyGoals: userData.studyGoals || prev.studyGoals,
          preferences: userData.preferences || prev.preferences,
          stats: userData.stats || prev.stats,
          emailVerified: firebaseUser.emailVerified
        } : null);
      }
      
      console.log('🟢 User data refreshed');
    } catch (err) {
      console.error('🔴 Refresh user error:', err);
    }
  };

  // ============== PROVIDER VALUE ==============
  const value: AuthContextType = {
    user,
    isLoading,
    error,
    login,
    logout,
    signup,
    updateUserProfile,
    updateUserEmail,
    updateUserPassword,
    resetPassword,
    sendVerificationEmail,
    refreshUser,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// ============== HOOK ==============
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};