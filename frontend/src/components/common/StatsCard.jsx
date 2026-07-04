import React from 'react';

const StatsCard = ({ stats }) => {
  const Icon = stats?.icon;

  if (!stats) return null;

  return (
     <div className="group relative overflow-hidden rounded-2xl border border-[#27272A] bg-[#18181B] p-6 transition-all duration-300 hover:border-[#7C3AED]/40 hover:shadow-[0_0_30px_rgba(124,58,237,.12)]">
      {/* Glow */}
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#7C3AED]/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-[#71717A]">
            {stats.title}
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-white">
            {stats.value}
          </h2>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7C3AED]/10 text-[#7C3AED] transition-all duration-300 group-hover:bg-[#7C3AED] group-hover:text-white">
          <Icon size={28} />
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
