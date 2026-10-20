import React from 'react';
import { bentoItems } from '../data/samfireData';
import PlatformIcon from './PlatformIcon';

export default function PlatformsOverview() {
  // Extract unique platforms preserving order of first appearance
  const platformMap = new Map();
  bentoItems.forEach((item) => {
    if (!platformMap.has(item.platform)) {
      platformMap.set(item.platform, {
        platform: item.platform,
        brandColor: item.brandColor,
        handle: item.handle,
      });
    }
  });
  const platforms = Array.from(platformMap.values());

  return (
    <section className="my-8">
      <h2 className="text-xl font-bold text-white mb-4">Plateformes</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {platforms.map((p) => (
          <div
            key={p.platform}
            className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border"
            style={{ borderColor: p.brandColor }}
          >
            <PlatformIcon platform={p.platform} className="w-6 h-6" />
            <span className="text-white">{p.platform}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

