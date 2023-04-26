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
								<kol-button _label="Primary" _icon="codicon codicon-home" _variant="primary"></kol-button>
							</div>
							<div class="text-center">
								<kol-button _label="Secondary" v-bind:_icon="{ right: 'codicon codicon-edit' }" _variant="secondary"></kol-button>
							</div>
							<div class="text-center">
								<kol-button _label="Danger" _icon="codicon codicon-trash" _variant="danger"></kol-button>
							</div>
							<div class="text-center">
								<kol-button _label="Ghost" v-bind:_icon="{ right: 'codicon codicon-lightbulb' }" _variant="ghost"></kol-button>
							</div>
						</div>
						<div class="grid gap-2">
							<div class="text-center">
								<kol-button _label="Primary" _icon="codicon codicon-home" _icon-only _variant="primary"></kol-button>
							</div>
							<div class="text-center">
								<kol-button _label="Secondary" _icon="codicon codicon-edit" _icon-only _tooltip-align="right" _variant="secondary"></kol-button>
							</div>
							<div class="text-center">
								<kol-button _label="Danger" _icon="codicon codicon-trash" _icon-only _tooltip-align="bottom" _variant="danger"></kol-button>
							</div>
							<div class="text-center">
								<kol-button _label="Ghost" _icon="codicon codicon-lightbulb" _icon-only _tooltip-align="left" _variant="ghost"></kol-button>
							</div>
						</div>
					</div>
					<div slot="footer" class="p-2 grid grid-cols-[1fr_auto] gap-4 items-end">
						<kol-select v-bind:_list="options" v-bind:_on="on" v-bind:_value="[value]">Styleguide</kol-select>
						<kol-button
							_label="Übernehmen"
							_icon="codicon codicon-reply"
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
		label: 'Bundes-Styleguide',
		value: 'bpa',
	},
	{
		label: 'BMF-Styleguide',
		value: 'bmf',
	},
	// {
	// 	label: 'DEZY-Styleguide',
	// 	value: 'desy-v2',
	// },
	{
		label: 'European Commission-Styleguide',
		value: 'ecl-ec',
	},
	{
		label: 'European Union-Styleguide',
		value: 'ecl-eu',
	},
	{
		label: 'ITZBund-Styleguide',
		value: 'itzbund',
	},
	{
		label: 'MAPZoll-Styleguide',
		value: 'mapz',
	},
	{
		label: 'Freistaat Thüringen',
		value: 'th',
	},
	{
		label: 'Zoll-Designsystem',
		value: 'zoll-v2',
	},
];

const local = window.localStorage.getItem('kolibri');
let value = 'ecl-eu';
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
