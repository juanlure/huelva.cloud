'use client';

import { useState, useEffect } from 'react';

export default function TimeWidget() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('es-ES', { 
        timeZone: 'Europe/Madrid',
        hour: '2-digit', 
        minute: '2-digit' 
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  if (!time) return <span style={{ opacity: 0 }}>--:--</span>;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 500, fontFamily: 'var(--font-sans)' }}>
      <span>🕒</span>
      <span>{time}</span>
      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8em' }}>Huelva</span>
    </div>
  );
}
