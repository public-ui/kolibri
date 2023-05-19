// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			script: [{ type: 'module', src: '/node_modules/@public-ui/components/dist/kolibri/kolibri.esm.js' }],
		},
	},
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
});
