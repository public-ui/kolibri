import { nodeConfig } from '@public-ui/eslint-config';

export default nodeConfig({ files: ['bin/**/*.mjs', 'src/**/*.mjs', 'test/**/*.mjs'] });
