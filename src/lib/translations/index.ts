import i18n, { type Config } from 'sveltekit-i18n';

const languages = ['en', 'id'];
const config: Config = {
	loaders: languages
		.map((locale) => [
			{
				locale,
				key: 'common',
				loader: async () => (await import(`./${locale}/common.json`)).default
			},
			{
				locale,
				key: 'home',
				routes: ['/'], // you can use regexes as well!
				loader: async () => (await import(`./${locale}/home.json`)).default
			},
			{
				locale,
				key: 'daily-info',
				routes: ['/daily-info'], // you can use regexes as well!
				loader: async () => (await import(`./${locale}/daily-info.json`)).default
			}
		])
		.reduce((p, n) => [...p, ...n], [])
};

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);
