import { useEffect } from 'react';
import IntelligenceList from '../sections/IntelligenceList';

export default function IntelligencePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-16">
      <IntelligenceList />
    </main>
  );
}
