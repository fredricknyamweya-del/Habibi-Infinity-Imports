import { useEffect, useState } from 'react';
import { getAds } from '../../api/ads.js';
import Badge from '../ui/Badge.jsx';
import LeaderboardAd from './LeaderboardAd.jsx';
import PromoCard from './PromoCard.jsx';

export default function AdSlot({ placement = 'leaderboard', className = '' }) {
  const [ads, setAds] = useState([]);
  useEffect(() => {
    let active = true;
    getAds(placement).then((result) => {
      const list = Array.isArray(result) ? result : result.items || result.ads || [];
      if (active) setAds(list);
    });
    return () => { active = false; };
  }, [placement]);
  if (!ads.length) return null;
  return (
    <aside aria-label="Sponsored content" className={className}>
      {placement === 'leaderboard'
        ? <LeaderboardAd ad={ads[0]} />
        : placement === 'in-grid'
          ? <PromoCard ad={ads[0]} />
          : <div className="rounded-card border border-white/10 bg-charcoal p-4"><Badge>Sponsored</Badge><div className="mt-3"><PromoCard ad={ads[0]} /></div></div>}
    </aside>
  );
}