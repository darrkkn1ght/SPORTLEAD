const fs = require('fs');
const sharp = require('sharp');

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#111827"/>
  <rect x="0" y="0" width="1200" height="6" fill="#1B4332"/>
  <circle cx="1100" cy="100" r="350" fill="#1B4332" opacity="0.15"/>
  <circle cx="150" cy="550" r="250" fill="#2D6A4F" opacity="0.1"/>
  <text x="100" y="220" font-family="sans-serif" font-size="32" font-weight="bold" fill="#52B788" letter-spacing="4">SPORTLEAD AFRICA</text>
  <text x="100" y="320" font-family="sans-serif" font-size="48" font-weight="bold" fill="#FFFFFF">Building Better Sport Systems</text>
  <text x="100" y="385" font-family="sans-serif" font-size="48" font-weight="bold" fill="#FFFFFF">Across Africa.</text>
  <text x="100" y="460" font-family="sans-serif" font-size="24" fill="#9CA3AF">Infrastructure · Governance · Strategy · Institutional Development</text>
  <line x1="100" y1="510" x2="1100" y2="510" stroke="#374151" stroke-width="1"/>
  <text x="100" y="555" font-family="sans-serif" font-size="18" fill="#6B7280">sportleadafrica.com</text>
</svg>
`;

sharp(Buffer.from(svg))
  .jpeg({ quality: 90 })
  .toFile('public/images/og-image.jpg')
  .then(() => console.log('OG image created successfully'))
  .catch(err => console.error(err));
