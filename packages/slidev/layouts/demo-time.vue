<template>
	<default>
		<div v-bind:data-theme="value" class="grid grid-cols-2 items-center">
			<div>
				<slot />
			</div>
			<div class="grid gap-2">
				<kol-card class="pl-8" _heading="Button-Komponente" _has-footer>
					<div slot="content" class="p-2 grid grid-cols-[1.5fr_1fr] items-center">
						<div class="grid gap-2">
							<div class="text-center">
								<kol-button _label="Primary" _icon="icofont-ui-home" _variant="primary"></kol-button>
							</div>
							<div class="text-center">
								<kol-button _label="Secondary" v-bind:_icon="{right: 'icofont-ui-edit'}" _variant="secondary"></kol-button>
							</div>
							<div class="text-center">
								<kol-button _label="Danger" _icon="icofont-ui-delete" _variant="danger"></kol-button>
							</div>
							<div class="text-center">
								<kol-button _label="Ghost" v-bind:_icon="{right: 'icofont-ui-flash-light'}" _variant="ghost"></kol-button>
							</div>
						</div>
						<div class="grid gap-2">
							<div class="text-center">
								<kol-button _label="Primary" _icon="icofont-ui-home" _icon-only _variant="primary"></kol-button>
							</div>
							<div class="text-center">
								<kol-button _label="Secondary" _icon="icofont-ui-edit" _icon-only _tooltip-align="right" _variant="secondary"></kol-button>
							</div>
							<div class="text-center">
								<kol-button _label="Danger" _icon="icofont-ui-delete" _icon-only _tooltip-align="bottom" _variant="danger"></kol-button>
							</div>
							<div class="text-center">
								<kol-button _label="Ghost" _icon="icofont-ui-flash-light" _icon-only _tooltip-align="left" _variant="ghost"></kol-button>
							</div>
						</div>
					</div>
					<div slot="footer" class="p-2 grid grid-cols-[1fr_auto] gap-4 items-end">
						<kol-select v-bind:_list="options" v-bind:_on="on" v-bind:_value="[value]">Styleguide</kol-select>
						<kol-button
							_label="Übernehmen"
							_icon="icofont-ui-reply"
							_icon-only
							@click="buttonOn.onClick"
							v-bind:_on="buttonOn"
							_variant="secondary"
						></kol-button>
					</div>
				</kol-card>
			</div>
		</div>
	</default>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import Default from '../theme/layouts/default.vue';

const options = [
	{
		disabled: true,
		label: 'Bundes-Styleguide (WIP)',
		value: 'bpa',
	},
	{
		label: 'BMF-Styleguide',
		value: 'bmf',
	},
	{
		label: 'DEZY-Styleguide (untested)',
		value: 'desy-v2',
	},
	{
		label: 'European Commission-Styleguide (untested)',
		value: 'ecl-ec',
	},
	{
		disabled: true,
		label: 'European Union-Styleguide (untested)',
		value: 'ecl-eu',
	},
	{
		label: 'ITZBund-Styleguide (untested)',
		value: 'itzbund',
	},
	{
		label: 'MAPZoll-Styleguide',
		value: 'mapz',
	},
	{
		label: 'Freistaat Thüringen (untested)',
		value: 'th',
	},
	{
		label: 'Zoll-Designsystem (untested)',
		value: 'zoll-v2',
	},
];

const local = window.localStorage.getItem('kolibri');
let value = 'itzbund';
if (local) {
	try {
		const json = JSON.parse(local);
		if (typeof json.theme === 'string') {
			value = json.theme;
		}
	} catch (e) {}
}

const on = {
	onChange: (_event, v) => {
		if (Array.isArray(v) && typeof v[0] === 'string' && value !== v[0]) {
			window.localStorage.setItem(
				'kolibri',
				JSON.stringify({
					theme: v[0],
				})
			);
		}
	},
};

const buttonOn = {
	onClick: () => {
		console.log('click');
		window.location.reload();
	},
};

defineComponent({ Default });
</script>
