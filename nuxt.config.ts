// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	srcDir:"src-ui",
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@import "~/assets/scss/vars.scss";',
				},
			},
		},
	},
	css: ["~/assets/scss/main.scss"],
	//modules: ["@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
	experimental: {
		viewTransition: true,
	},
	components: [
		{
		  path: '~/components', // will get any components nested in let's say /components/test too
		  pathPrefix: false,
		},
	],
	modules: [
		'@pinia/nuxt',
	],
})
