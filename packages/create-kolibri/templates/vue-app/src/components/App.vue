<template>
	<div className="itzbund container mx-auto my-10 max-w-800px">
		<header className="text-center">
			<div className="grid grid-cols-2 items-center">
				<div>
					<KolKolibri className="block m-auto w-40" :_labeled="false"></KolKolibri>
				</div>
				<div>
					<img className="block m-auto h-25" :src="logo" alt="VueJS Logo" />
				</div>
			</div>
			<strong className="text-2xl">Willkommen zu KoliBri</strong>
		</header>
		<main className="grid md:grid-cols-2 gap-6 p-12">
			<KolAlert v-for="alert in alerts" :_type="alert.type" :_heading="alert.heading" _variant="card" :_level="2">
				<KolLink :_href="alert.link" :_label="alert.text" _target="_blank">
					<KolIcon _ariaLabel="" :_icon="alert.icon" />
				</KolLink>
			</KolAlert>
		</main>
	</div>
</template>

<script lang="ts">
import { KolKolibri, KolIcon, KolLink, KolAlert } from '@public-ui/vue';
import IMG_FRAMEWORK from '../assets/logo.vue.png';
import { defineComponent } from 'vue';

export default defineComponent({
	components: {
		KolKolibri,
		KolIcon,
		KolLink,
		KolAlert,
	},
	data() {
		return {
			alerts: [
				{ heading: 'Dokumentation', icon: 'fa-sharp fa-solid fa-book', link: 'https://public-ui.github.io/', text: 'Dokumentation öffnen', type: 'success' },
				{
					heading: 'Theming',
					icon: 'fa-solid fa-palette',
					link: 'https://public-ui.github.io/docs/concepts/styling/designer',
					text: 'KoliBri-Designer öffnen',
					type: 'info',
				},
				{ heading: 'Mitwirken', icon: 'fa-brands fa-github', link: 'https://github.com/public-ui/kolibri/', text: 'Github öffnen', type: 'warning' },
				{ heading: 'Kontakt', icon: 'fa-solid fa-envelope', link: 'mailto:kolibri@itzbund.de', text: 'E-Mail schreiben', type: 'error' },
			],
			logo: IMG_FRAMEWORK,
		};
	},
});
</script>
