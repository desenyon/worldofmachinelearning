'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface XPContextType {
  totalXP: number;
  completedTutorials: string[];
  completedProjects: string[];
  redeemedItems: string[];
  addTutorialXP: (tutorialId: string) => void;
  addProjectXP: (projectId: string) => void;
  redeemItem: (itemId: string, cost: number) => boolean;
  canAfford: (cost: number) => boolean;
}

const XPContext = createContext<XPContextType | undefined>(undefined);

const TUTORIAL_XP = 1;
const PROJECT_XP = 10;
const STORAGE_KEY = 'world-of-ml-xp';

interface StoredXPData {
  totalXP: number;
  completedTutorials: string[];
  completedProjects: string[];
  redeemedItems: string[];
}

export function XPProvider({ children }: { children: ReactNode }) {
  const [totalXP, setTotalXP] = useState(0);
  const [completedTutorials, setCompletedTutorials] = useState<string[]>([]);
  const [completedProjects, setCompletedProjects] = useState<string[]>([]);
  const [redeemedItems, setRedeemedItems] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data: StoredXPData = JSON.parse(stored);
        setTotalXP(data.totalXP || 0);
        setCompletedTutorials(data.completedTutorials || []);
        setCompletedProjects(data.completedProjects || []);
        setRedeemedItems(data.redeemedItems || []);
      } catch {
        console.error('Failed to parse stored XP data');
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (isLoaded) {
      const data: StoredXPData = {
        totalXP,
        completedTutorials,
        completedProjects,
        redeemedItems,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [totalXP, completedTutorials, completedProjects, redeemedItems, isLoaded]);

  const addTutorialXP = (tutorialId: string) => {
    if (!completedTutorials.includes(tutorialId)) {
      setCompletedTutorials(prev => [...prev, tutorialId]);
      setTotalXP(prev => prev + TUTORIAL_XP);
    }
  };

  const addProjectXP = (projectId: string) => {
    if (!completedProjects.includes(projectId)) {
      setCompletedProjects(prev => [...prev, projectId]);
      setTotalXP(prev => prev + PROJECT_XP);
    }
  };

  const canAfford = (cost: number) => totalXP >= cost;

  const redeemItem = (itemId: string, cost: number) => {
    if (canAfford(cost) && !redeemedItems.includes(itemId)) {
      setTotalXP(prev => prev - cost);
      setRedeemedItems(prev => [...prev, itemId]);
      return true;
    }
    return false;
  };

  return (
    <XPContext.Provider
      value={{
        totalXP,
        completedTutorials,
        completedProjects,
        redeemedItems,
        addTutorialXP,
        addProjectXP,
        redeemItem,
        canAfford,
      }}
    >
      {children}
    </XPContext.Provider>
  );
}

export function useXP() {
  const context = useContext(XPContext);
  if (context === undefined) {
    throw new Error('useXP must be used within an XPProvider');
  }
  return context;
}
