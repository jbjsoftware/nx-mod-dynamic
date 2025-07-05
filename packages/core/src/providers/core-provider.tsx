import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { UIProvider } from '@repo/ui';

// Core state interface
interface CoreState {
  isInitialized: boolean;
  user: User | null;
  theme: 'light' | 'dark' | 'system';
  loading: boolean;
  error: string | null;
}

// User interface
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Core actions
type CoreAction =
  | { type: 'INITIALIZE' }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' | 'system' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// Initial state
const initialState: CoreState = {
  isInitialized: false,
  user: null,
  theme: 'system',
  loading: false,
  error: null,
};

// Reducer function
function coreReducer(state: CoreState, action: CoreAction): CoreState {
  switch (action.type) {
    case 'INITIALIZE':
      return { ...state, isInitialized: true };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

// Context interface
interface CoreContextType {
  state: CoreState;
  dispatch: React.Dispatch<CoreAction>;
  // Helper functions
  initialize: () => void;
  setUser: (user: User | null) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Create context
const CoreContext = createContext<CoreContextType | undefined>(undefined);

// Provider props
interface CoreProviderProps {
  children: ReactNode;
  defaultTheme?: 'light' | 'dark' | 'system';
  storageKey?: string;
}

// Core provider component
export function CoreProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'core-theme',
}: CoreProviderProps) {
  const [state, dispatch] = useReducer(coreReducer, {
    ...initialState,
    theme: defaultTheme,
  });

  // Helper functions
  const initialize = () => dispatch({ type: 'INITIALIZE' });
  const setUser = (user: User | null) =>
    dispatch({ type: 'SET_USER', payload: user });
  const setTheme = (theme: 'light' | 'dark' | 'system') =>
    dispatch({ type: 'SET_THEME', payload: theme });
  const setLoading = (loading: boolean) =>
    dispatch({ type: 'SET_LOADING', payload: loading });
  const setError = (error: string | null) =>
    dispatch({ type: 'SET_ERROR', payload: error });

  const contextValue: CoreContextType = {
    state,
    dispatch,
    initialize,
    setUser,
    setTheme,
    setLoading,
    setError,
  };

  return (
    <CoreContext.Provider value={contextValue}>
      <UIProvider defaultTheme={state.theme} storageKey={storageKey}>
        {children}
      </UIProvider>
    </CoreContext.Provider>
  );
}

// Custom hook to use the core context
export function useCore(): CoreContextType {
  const context = useContext(CoreContext);
  if (context === undefined) {
    throw new Error('useCore must be used within a CoreProvider');
  }
  return context;
}

// Export types
export type { CoreState, User, CoreAction, CoreContextType };
