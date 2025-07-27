import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVitest from '@vitest/eslint-plugin';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
    rules: {
      'vue/max-attributes-per-line': ['warn', {
        singleline: 3,
        multiline: 3
      }],
      'vue/singleline-html-element-content-newline': ['off'],
      'eol-last': ['error', 'always'],
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2, {
        SwitchCase: 1,
        ignoredNodes: [
          'TemplateLiteral',
          'Program > ExpressionStatement > TemplateLiteral',
          'Program',
          'ExpressionStatement > CallExpression'
        ]
      }],
      'vue/script-indent': ['error', 2, {
        baseIndent: 1,
        switchCase: 1,
        ignores: []
      }],
      'vue/html-indent': ['error', 2, {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true
      }]
    }
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  ...pluginVue.configs['flat/essential'],
  ...defineConfigWithVueTs(vueTsConfigs.recommended),

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },
];
