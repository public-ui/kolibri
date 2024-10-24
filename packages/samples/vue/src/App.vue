<script setup lang="ts">
import { KolButton, KolInputDate, KolInputText } from '@public-ui/vue';

const date = defineModel<Date>('date');
date.value = new Date();

const handleDateInput = (event: Event) => {
	date.value = (event.target as HTMLKolInputDateElement)._value as Date;
};

const increaseDate = () => {
	date.value = new Date((date.value?.getTime() ?? 0) + 1000 * 60 * 60 * 24);
};

const text = defineModel<Date>('text');
text.value = 'Hello, World!';
</script>

<template>
	<main>
		<KolInputDate _label="Date Input" :_value="date" @input="handleDateInput" />
		<KolButton _label="increase" :_on="{ onClick: increaseDate }" />
		<pre>
value: {{ JSON.stringify(date) }} ({{ typeof date }})
			</pre
		>

		<KolInputText _label="Text Input w/ v-model" v-model="text" />
		<pre>
value: {{ JSON.stringify(text) }} ({{ typeof text }})
			</pre
		>
	</main>
</template>

<style>
html {
	font-family: sans-serif;
}
</style>
