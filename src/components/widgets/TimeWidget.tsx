'use client';

import { useState, useEffect } from 'react';

export default function TimeWidget() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('es-ES', {
        timeZone: 'Europe/Madrid',
        hour: '2-digit',
        minute: '2-digit',
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return <span className="opacity-0">--:--</span>;

  return (
    <div className="flex items-center gap-2 text-[0.92rem] font-medium text-navy/70">
      <span className="text-base">🕒</span>
      <span>{time}</span>
      <span className="hidden md:inline text-navy/35">·</span>
      <span className="hidden md:inline text-navy/45 text-[0.82rem] uppercase tracking-[0.14em]">Huelva</span>
    </div>
  );
}
