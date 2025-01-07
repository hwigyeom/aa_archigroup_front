/* global module */
module.exports = {
  extends: ['stylelint-config-standard'],
  override: [
    {
      files: ['*.ts'],
      customSyntax: 'postcss-lit',
    },
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen'],
      },
    ],
  },
};
