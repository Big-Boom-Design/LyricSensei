import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface DemoContextType {
  isDemoMode: boolean;
  enableDemoMode: () => void;
  disableDemoMode: () => void;
  spotifyFailureDetected: boolean;
  setSpotifyFailureDetected: (failed: boolean) => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [spotifyFailureDetected, setSpotifyFailureDetected] = useState(false);

  useEffect(() => {
    if (spotifyFailureDetected && !isDemoMode) {
      setIsDemoMode(true);
    }
  }, [spotifyFailureDetected, isDemoMode]);

  const enableDemoMode = () => setIsDemoMode(true);
  const disableDemoMode = () => {
    setIsDemoMode(false);
    setSpotifyFailureDetected(false);
  };

  return (
    <DemoContext.Provider
      value={{
        isDemoMode,
        enableDemoMode,
        disableDemoMode,
        spotifyFailureDetected,
        setSpotifyFailureDetected,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemoMode() {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error("useDemoMode must be used within a DemoProvider");
  }
  return context;
}
