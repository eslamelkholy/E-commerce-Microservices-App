const path = require('path');

module.exports = {
  apps: ['payment'].map((name) => ({
    name,
    cwd: path.resolve(__dirname, `../servers/${name}`),
    script: 'ts-node -T ./index.ts',
    watch: ['.', '../shared', '../../node_modules'],
    instance_var: 'INSTANCE_ID',
    env: {
      NODE_ENV: 'development',
      NODE_PATH: path.resolve(__dirname, './node_modules'),
    },
  })),
};
