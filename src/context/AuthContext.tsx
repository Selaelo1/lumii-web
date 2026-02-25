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
  sendEmailVerification,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { auth, db } from '../config/firebase';

// ============== TYPES ==============
export interface User {
  // Core Auth
  id: string;
  name: string;
  email: string;
  avatar?: string;
  
  // Profile Info
  bio?: string;
  currentRole?: string;
  experienceLevel?: 'beginner' | 'intermediate' | 'advanced';
  targetCertifications?: string[];
  preferredStudyTime?: 'morning' | 'afternoon' | 'evening';
  reminderTime?: string;
  
  // Study Goals
  studyGoals?: {
    daily: number; // minutes
    weekly: number; // minutes
  };
  
  // Preferences
  preferences?: {
    emailNotifications: boolean;
    studyReminders: boolean;
    theme: 'light' | 'dark' | 'system';
  };
  
  // Stats
  streak: number;
  createdAt: Date;
  lastActive?: Date;
  stats?: {
    totalStudyHours: number;
    certificatesCompleted: number;
    longestStreak: number;
  };
  
  // Status
  emailVerified?: boolean;
  isProfileComplete?: boolean;
}

interface AuthContextType {
  // State
  user: User | null;
  isLoading: boolean;
  error: string | null;
  
  // Auth Actions
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  
  // Profile Actions
  updateUserProfile: (data: Partial<User>) => Promise<void>;
  updateUserEmail: (newEmail: string, password: string) => Promise<void>;
  updateUserPassword: (currentPassword: string, newPassword: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  
  // Profile Setup
  completeProfileSetup: (profileData: Partial<User>) => Promise<void>;
  isProfileComplete: () => boolean;
  
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

  // ============== CHECK IF PROFILE IS COMPLETE ==============
  const isProfileComplete = () => {
    if (!user) return false;
    
    return !!(
      user.isProfileComplete === true || (
        user.name &&
        user.bio !== undefined &&
        user.currentRole !== undefined &&
        user.experienceLevel !== undefined &&
        user.studyGoals?.daily &&
        user.studyGoals?.weekly &&
        user.preferences
      )
    );
  };

  // ============== AUTH STATE LISTENER ==============
  useEffect(() => {
    console.log('🟡 Setting up auth state listener...');
    
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('🟡 Auth state changed:', firebaseUser ? 'User logged in' : 'No user');
      
      setFirebaseUser(firebaseUser);

      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log('🟢 User data fetched from Firestore');

            const createdAt = userData.createdAt instanceof Timestamp
              ? userData.createdAt.toDate()
              : new Date(userData.createdAt);

            const lastActive = userData.lastActive instanceof Timestamp
              ? userData.lastActive.toDate()
              : userData.lastActive ? new Date(userData.lastActive) : undefined;

            setUser({
              id: firebaseUser.uid,
              name: firebaseUser.displayName || userData.name || '',
              email: firebaseUser.email ? firebaseUser.email : '',
              avatar: firebaseUser.photoURL || userData.avatar,
              
              bio: userData.bio || '',
              currentRole: userData.currentRole || '',
              experienceLevel: userData.experienceLevel || 'beginner',
              targetCertifications: userData.targetCertifications || [],
              preferredStudyTime: userData.preferredStudyTime || 'morning',
              reminderTime: userData.reminderTime || '09:00',
              
              studyGoals: userData.studyGoals || { daily: 120, weekly: 600 },
              
              preferences: userData.preferences || {
                emailNotifications: true,
                studyReminders: true,
                theme: 'light'
              },
              
              streak: userData.streak || 0,
              createdAt,
              lastActive,
              stats: userData.stats || {
                totalStudyHours: 0,
                certificatesCompleted: 0,
                longestStreak: 0
              },
              
              emailVerified: firebaseUser.emailVerified,
              isProfileComplete: userData.isProfileComplete || false
            });
          } else {
            console.log('🟡 No user document found, creating one...');
            
            const newUser = {
              name: firebaseUser.displayName || '',
              email: firebaseUser.email,
              bio: '',
              currentRole: '',
              experienceLevel: 'beginner',
              targetCertifications: [],
              preferredStudyTime: 'morning',
              reminderTime: '09:00',
              studyGoals: { daily: 120, weekly: 600 },
              preferences: {
                emailNotifications: true,
                studyReminders: true,
                theme: 'light'
              },
              streak: 0,
              createdAt: serverTimestamp(),
              lastActive: serverTimestamp(),
              stats: {
                totalStudyHours: 0,
                certificatesCompleted: 0,
                longestStreak: 0
              },
              isProfileComplete: false
            };

            try {
              await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
              console.log('🟢 User document created in Firestore');

              const userObj: User = {
                id: firebaseUser.uid,
                name: firebaseUser.displayName || newUser.name || '',
                email: firebaseUser.email || newUser.email || '',
                avatar: firebaseUser.photoURL || undefined,
                bio: newUser.bio,
                currentRole: newUser.currentRole,
                experienceLevel: newUser.experienceLevel as 'beginner' | 'intermediate' | 'advanced',
                targetCertifications: newUser.targetCertifications,
                preferredStudyTime: newUser.preferredStudyTime as 'morning' | 'afternoon' | 'evening',
                reminderTime: newUser.reminderTime,
                studyGoals: newUser.studyGoals,
                preferences: {
                  emailNotifications: newUser.preferences.emailNotifications,
                  studyReminders: newUser.preferences.studyReminders,
                  theme: newUser.preferences.theme as 'light' | 'dark' | 'system'
                },
                streak: newUser.streak,
                createdAt: new Date(),
                lastActive: new Date(),
                stats: newUser.stats,
                emailVerified: firebaseUser.emailVerified,
                isProfileComplete: false
              };
              setUser(userObj);
            } catch (firestoreError) {
              console.error('🔴 Firestore error creating user document:', firestoreError);
              setUser({
                id: firebaseUser.uid,
                name: firebaseUser.displayName || '',
                email: firebaseUser.email || '',
                streak: 0,
                createdAt: new Date(),
                emailVerified: firebaseUser.emailVerified,
                isProfileComplete: false
              });
            }
          }
        } catch (err) {
          console.error('🔴 Error fetching user data:', err);
          setUser({
            id: firebaseUser.uid,
            name: firebaseUser.displayName || '',
            email: firebaseUser.email || '',
            streak: 0,
            createdAt: new Date(),
            emailVerified: firebaseUser.emailVerified,
            isProfileComplete: false
          });
        }
      } else {
        setUser(null);
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ============== UPDATE LAST ACTIVE ==============
  useEffect(() => {
    if (user && firebaseUser) {
      const updateLastActive = async () => {
        try {
          await updateDoc(doc(db, 'users', firebaseUser.uid), {
            lastActive: serverTimestamp()
          });
        } catch (err) {
          console.log('Could not update last active');
        }
      };
      
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
      
      if (!name.trim()) throw new Error('Name is required');
      if (!email.trim()) throw new Error('Email is required');
      if (password.length < 6) throw new Error('Password must be at least 6 characters');

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newFirebaseUser = userCredential.user;
      console.log('🟢 User created in Auth:', newFirebaseUser.uid);

      await updateProfile(newFirebaseUser, {
        displayName: name
      });
      console.log('🟢 Profile updated with name');

      await sendEmailVerification(newFirebaseUser);
      console.log('🟢 Verification email sent');

      const userData = {
        name,
        email,
        bio: '',
        currentRole: '',
        experienceLevel: 'beginner',
        targetCertifications: [],
        preferredStudyTime: 'morning',
        reminderTime: '09:00',
        studyGoals: {
          daily: 120,
          weekly: 600
        },
        preferences: {
          emailNotifications: true,
          studyReminders: true,
          theme: 'light'
        },
        streak: 0,
        createdAt: serverTimestamp(),
        lastActive: serverTimestamp(),
        stats: {
          totalStudyHours: 0,
          certificatesCompleted: 0,
          longestStreak: 0
        },
        isProfileComplete: false
      };

      try {
        await setDoc(doc(db, 'users', newFirebaseUser.uid), userData);
        console.log('🟢 User document created in Firestore');
        
        const newUserObj: User = {
          id: newFirebaseUser.uid,
          name: newFirebaseUser.displayName || name,
          email: newFirebaseUser.email || email,
          avatar: newFirebaseUser.photoURL || undefined,
          bio: '',
          currentRole: '',
          experienceLevel: 'beginner',
          targetCertifications: [],
          preferredStudyTime: 'morning',
          reminderTime: '09:00',
          studyGoals: { daily: 120, weekly: 600 },
          preferences: {
            emailNotifications: true,
            studyReminders: true,
            theme: 'light'
          },
          streak: 0,
          createdAt: new Date(),
          lastActive: new Date(),
          stats: {
            totalStudyHours: 0,
            certificatesCompleted: 0,
            longestStreak: 0
          },
          emailVerified: newFirebaseUser.emailVerified,
          isProfileComplete: false
        };
        
        setUser(newUserObj);
        setFirebaseUser(newFirebaseUser);
        
      } catch (firestoreError) {
        console.error('🔴 Firestore error:', firestoreError);
        setError('Account created but failed to save additional data. Please refresh.');
        setUser({
          id: newFirebaseUser.uid,
          name: newFirebaseUser.displayName || name,
          email: newFirebaseUser.email || email,
          streak: 0,
          createdAt: new Date(),
          emailVerified: newFirebaseUser.emailVerified,
          isProfileComplete: false
        });
        setFirebaseUser(newFirebaseUser);
      }
    } catch (err: any) {
      console.error('🔴 Signup error:', err);
      
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

  // ============== COMPLETE PROFILE SETUP ==============
  const completeProfileSetup = async (profileData: Partial<User>) => {
    if (!firebaseUser) {
      throw new Error('No user logged in');
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('🟡 Completing profile setup...');
      
      if (profileData.name && profileData.name !== firebaseUser.displayName) {
        await updateProfile(firebaseUser, {
          displayName: profileData.name
        });
      }

      const updateData = {
        ...profileData,
        isProfileComplete: true,
        updatedAt: serverTimestamp()
      };

      delete (updateData as any).id;
      delete (updateData as any).email;
      delete (updateData as any).emailVerified;

      await updateDoc(doc(db, 'users', firebaseUser.uid), updateData);
      console.log('🟢 Profile setup completed in Firestore');

      setUser(prev => prev ? {
        ...prev,
        ...profileData,
        isProfileComplete: true
      } : null);
      
      console.log('✅ Profile setup completed successfully');
    } catch (err: any) {
      console.error('🔴 Profile setup error:', err);
      setError('Failed to complete profile setup. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // ============== LOGIN ==============
  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('🟡 Attempting login for:', email);
      
      if (!email.trim()) throw new Error('Email is required');
      if (!password.trim()) throw new Error('Password is required');

      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      
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
      
      if (data.name || data.avatar) {
        await updateProfile(firebaseUser, {
          displayName: data.name || firebaseUser.displayName,
          photoURL: data.avatar || firebaseUser.photoURL
        });
      }

      const updateData: any = { ...data };
      delete updateData.id;
      delete updateData.email;
      delete updateData.emailVerified;

      await updateDoc(doc(db, 'users', firebaseUser.uid), {
        ...updateData,
        updatedAt: serverTimestamp()
      });

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
      
      const credential = EmailAuthProvider.credential(firebaseUser.email!, password);
      await reauthenticateWithCredential(firebaseUser, credential);

      await updateEmail(firebaseUser, newEmail);

      await updateDoc(doc(db, 'users', firebaseUser.uid), {
        email: newEmail,
        updatedAt: serverTimestamp()
      });

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
      
      const credential = EmailAuthProvider.credential(firebaseUser.email!, currentPassword);
      await reauthenticateWithCredential(firebaseUser, credential);

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

  // ============== RESET PASSWORD (CUSTOM) ==============
  const resetPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('🟡 Sending custom password reset email to:', email);
      
      if (!email.trim()) {
        throw new Error('Email is required');
      }

      // Call your custom Cloud Function
      const functions = getFunctions();
      const sendCustomReset = httpsCallable(functions, 'sendCustomPasswordReset');
      
      const result = await sendCustomReset({ email });
      console.log('🟢 Custom password reset email sent:', result.data);
      
    } catch (err: any) {
      console.error('🔴 Password reset error:', err);
      
      let errorMessage = 'Failed to send reset email.';
      
      if (err.code === 'functions/internal') {
        errorMessage = 'Unable to send reset email. Please try again later.';
      } else if (err.code === 'auth/user-not-found') {
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
      
      await firebaseUser.reload();

      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();

        setUser(prev => prev ? {
          ...prev,
          name: firebaseUser.displayName || userData.name || prev.name,
          avatar: firebaseUser.photoURL || userData.avatar || prev.avatar,
          bio: userData.bio || prev.bio,
          currentRole: userData.currentRole || prev.currentRole,
          experienceLevel: userData.experienceLevel || prev.experienceLevel,
          targetCertifications: userData.targetCertifications || prev.targetCertifications,
          preferredStudyTime: userData.preferredStudyTime || prev.preferredStudyTime,
          reminderTime: userData.reminderTime || prev.reminderTime,
          studyGoals: userData.studyGoals || prev.studyGoals,
          preferences: userData.preferences || prev.preferences,
          streak: userData.streak || prev.streak,
          stats: userData.stats || prev.stats,
          isProfileComplete: userData.isProfileComplete || prev.isProfileComplete,
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
    completeProfileSetup,
    isProfileComplete,
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