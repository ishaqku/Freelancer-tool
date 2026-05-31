import React, { useEffect } from 'react';
import { cn } from '../lib/utils';

interface AdBannerProps {
  slot: string;
  format?: "responsive" | "fluid" | "auto";
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ slot, format = "auto", className }) => {
  useEffect(() => {
    // Load AdSense script
    if (typeof window !== 'undefined') {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense error", e);
      }
    }
  }, []);

  return (
    <div className={cn("my-4 text-center text-xs text-slate-400 bg-slate-100 flex items-center justify-center min-h-[90px] rounded-lg border border-slate-200 border-dashed", className)}>
      <p>Advertisement Placement ({slot})</p>
      {/* 
      <ins className={`adsbygoogle ${className}`}
        style={{ display: 'block' }}
        data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true" />
      */}
    </div>
  );
};
