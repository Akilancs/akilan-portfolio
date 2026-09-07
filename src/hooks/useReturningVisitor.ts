import { useState, useEffect } from 'react';

const VISITOR_KEY = 'akilan-portfolio-visited';

export function useReturningVisitor(): {
  isReturning: boolean;
  markVisited: () => void;
  journeyCompleted: boolean;
  markJourneyComplete: () => void;
} {
  const [isReturning, setIsReturning] = useState(false);
  const [journeyCompleted, setJourneyCompleted] = useState(false);

  useEffect(() => {
    try {
      const data = localStorage.getItem(VISITOR_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        setIsReturning(true);
        setJourneyCompleted(parsed.journeyCompleted ?? false);
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  const markVisited = () => {
    try {
      const existing = localStorage.getItem(VISITOR_KEY);
      const data = existing ? JSON.parse(existing) : {};
      data.lastVisit = Date.now();
      data.visitCount = (data.visitCount ?? 0) + 1;
      localStorage.setItem(VISITOR_KEY, JSON.stringify(data));
      setIsReturning(true);
    } catch {
      // localStorage unavailable
    }
  };

  const markJourneyComplete = () => {
    try {
      const existing = localStorage.getItem(VISITOR_KEY);
      const data = existing ? JSON.parse(existing) : {};
      data.journeyCompleted = true;
      localStorage.setItem(VISITOR_KEY, JSON.stringify(data));
      setJourneyCompleted(true);
    } catch {
      // localStorage unavailable
    }
  };

  return { isReturning, markVisited, journeyCompleted, markJourneyComplete };
}
