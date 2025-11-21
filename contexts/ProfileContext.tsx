import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { UserProfile } from '../types';
import { DEFAULT_AUTHOR } from '../constants';

interface ProfileContextType {
  user: UserProfile;
  setProfile: (user: UserProfile) => void;
  resetProfile: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(DEFAULT_AUTHOR);

  const setProfile = useCallback((newUser: UserProfile) => {
    setUser(newUser);
  }, []);

  const resetProfile = useCallback(() => {
    setUser(DEFAULT_AUTHOR);
  }, []);

  return (
    <ProfileContext.Provider value={{ user, setProfile, resetProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
