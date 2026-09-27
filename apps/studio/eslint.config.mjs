import nextVitals from 'eslint-config-next/core-web-vitals';
import root from '../../eslint.config.mjs';

const config = [
  ...nextVitals,
  ...root,
  { ignores: ['.next/**', '.open-next/**', '.wrangler/**', 'next-env.d.ts'] },
];

export default config;
