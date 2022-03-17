const wolox = require('eslint-config-wolox-node');
module.exports = { ...wolox, rules: { ...wolox.rules, 'linebreak-style': 0 } };
