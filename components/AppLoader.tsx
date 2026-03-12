'use client';

import { useState } from 'react';
import LoadingScreen from './LoadingScreen';

export default function AppLoader({ children }: { children: React.ReactNode }) {
  const [loadingDone, setLoadingDone] = useState(false);

  return (
    <>
      {!loadingDone && <LoadingScreen onDone={() => setLoadingDone(true)} />}
      {children}
    </>
  );
}