// ============================================================
// CopilotIcon.tsx — Copilot-inspired swirl icon (React)
// NOT using @fluentui/react-icons or official Microsoft trademarked assets.
// ============================================================

import React from 'react';

interface CopilotIconProps {
  size?: number;
  borderColor?: string;
}

export default function CopilotIcon({
  size = 32,
  borderColor = '#191970',
}: CopilotIconProps) {
  const gradientId = 'copilotGradient';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2196F3" />
          <stop offset="50%" stopColor="#9C27B0" />
          <stop offset="100%" stopColor="#00BCD4" />
        </linearGradient>
      </defs>

      {/* Circular border */}
      <circle cx={24} cy={24} r={22} fill="white" stroke={borderColor} strokeWidth={2} />

      {/* Curved swirl path (figure-8 / lemniscate style) */}
      <path
        d="M24 8C40 8 40 24 24 24C8 24 8 40 24 40C40 40 40 24 24 24C8 24 8 8 24 8"
        stroke={`url(#${gradientId})`}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

// Usage example:
// <CopilotIcon size={28} borderColor="#191970" />
