import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import prettierPlugin from 'eslint-plugin-prettier'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import globals from 'globals'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

const { browser, node } = globals

export default defineConfigWithVueTs(
	globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

	pluginVue.configs['flat/essential'],
	vueTsConfigs.recommended,
	skipFormatting,

	{
		name: 'app/files-to-lint',
		files: ['**/*.{ts,mts,tsx,vue}'],
		languageOptions: {
			globals: {
				...browser,
				...node
			}
		},
		plugins: {
			prettier: prettierPlugin,
			'@typescript-eslint': tsPlugin
		},
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/naming-convention': [
				'error',
				{
					selector: 'function',
					filter: '^use[A-Z]',
					format: ['camelCase']
				}
			],

			'vue/component-api-style': ['error', ['script-setup']],
			'vue/html-indent': ['error', 'tab'],
			'vue/script-indent': 'off',
			'vue/multi-word-component-names': 'off',
			'vue/no-v-html': 'off',
			'vue/html-self-closing': [
				'error',
				{
					html: {
						void: 'always',
						normal: 'never',
						component: 'always'
					},
					svg: 'always',
					math: 'always'
				}
			],
			'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
			'vue/component-name-in-template-casing': ['error', 'PascalCase'],
			'vue/block-tag-newline': ['error', { singleline: 'always', multiline: 'always' }],
			'vue/padding-line-between-blocks': ['error', 'always'],
			'vue/prefer-true-attribute-shorthand': ['error', 'always'],
			'vue/attributes-order': 'error',
			'vue/order-in-components': 'error',
			'vue/attribute-hyphenation': ['error', 'always'],
			'vue/v-on-style': ['error', 'shorthand'],
			'vue/v-bind-style': ['error', 'shorthand'],
			'vue/require-style-attribute': 'off',
			'vue/no-multiple-template-root': 'off',

			'prettier/prettier': [
				'error',
				{
					indent: 'tab',
					useTabs: true,
					tabWidth: 1,
					semi: false,
					singleQuote: true,
					trailingComma: 'none',
					arrowParens: 'avoid',
					printWidth: 100,
					vueIndentScriptAndStyle: false,
					htmlWhitespaceSensitivity: 'ignore',
					endOfLine: 'auto'
				}
			],

			'func-style': ['error', 'declaration'],
			'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
		}
	}
)
