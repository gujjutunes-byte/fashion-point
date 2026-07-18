'use client';

import { useEffect, useState } from 'react';

function getTimeLeft(end) {
  const diff = Math.max(0, end - Date.now());
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
}

export default function CountdownTimer({ hoursFromNow = 72 }) {
  const [end] = useState(() => Date.now() + hoursFromNow * 3600000);
  const [time, setTime] = useState(() => getTimeLeft(end));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(end)), 1000);
    return () => clearInterval(id);
  }, [end]);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="flex justify-center gap-3 sm:gap-5 mt-8">
      {[
        ['DAYS', time.d],
        ['HOURS', time.h],
        ['MINS', time.m],
        ['SECS', time.s],
      ].map(([label, value]) => (
        <div key={label} className="glass rounded-xl px-4 sm:px-6 py-3 sm:py-4 min-w-[70px] sm:min-w-[90px]">
          <p className="font-display text-2xl sm:text-4xl text-gold">{pad(value)}</p>
          <p className="text-[10px] tracking-widest text-bone/50 mt-1">{label}</p>
        </div>
      ))}
    </div>
  );
}
