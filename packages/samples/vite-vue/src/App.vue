<template>
	<div class="itzbund container">
		<header>
			<div class="logo_grid">
				<KolKolibri class="logo" :_labeled="false"></KolKolibri>
				<img class="logo" src="./assets/logo.svg" alt="VueJS Logo" />
			</div>
			<strong>Willkommen zu KoliBri</strong>
		</header>
		<main>
			<KolAlert
				v-for="alert in alerts"
				:key="alert.text"
				:_type="alert.type"
				:_heading="alert.heading"
				_variant="card"
				:_level="2"
			>
				<KolLink :_href="alert.link" :_label="alert.text" _target="_blank">
					<KolIcon _ariaLabel="" :_icon="alert.icon" />
				</KolLink>
			</KolAlert>
		</main>
	</div>
</template>

<script lang="ts">
import { KolKolibri, KolIcon, KolLink, KolAlert } from '@public-ui/vue'
import { defineComponent } from 'vue'

export default defineComponent({
	components: {
		KolKolibri,
		KolIcon,
		KolLink,
		KolAlert
	},
	data() {
		return {
			alerts: [
				{
					heading: 'Dokumentation',
					icon: 'fa-sharp fa-solid fa-book',
					link: 'https://public-ui.github.io/',
					text: 'Dokumentation öffnen',
					type: 'success'
				},
				{
					heading: 'Theming',
					icon: 'fa-solid fa-palette',
					link: 'https://public-ui.github.io/docs/concepts/styling/designer',
					text: 'KoliBri-Designer öffnen',
					type: 'info'
				},
				{
					heading: 'Mitwirken',
					icon: 'fa-brands fa-github',
					link: 'https://github.com/public-ui/kolibri/',
					text: 'Github öffnen',
					type: 'warning'
				},
				{
					heading: 'Kontakt',
					icon: 'fa-solid fa-envelope',
					link: 'mailto:kolibri@itzbund.de',
					text: 'E-Mail schreiben',
					type: 'error'
				}
			]
		}
	}
})
</script>

<style scoped lang="scss">
.container {
	margin: 2.5rem auto;
	max-width: 800px;
}
header {
	text-align: center;
	strong {
		font-size: 1.5rem;
		line-height: 2rem;
	}
}
.logo_grid {
	display: grid;
	place-items: center;

	@media (min-width: 768px) {
		grid-template-columns: 1fr 1fr;
	}
	.logo {
		width: 10rem;
	}
}
main {
	display: grid;
	gap: 1.5rem;
	padding: 3rem;

	@media (min-width: 768px) {
		grid-template-columns: 1fr 1fr;
	}
}
</style>
