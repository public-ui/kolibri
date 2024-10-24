<script setup lang="ts">
import { KolButton, KolInputDate } from '@public-ui/vue';

const date = defineModel('date');
date.value = new Date();

const handleDateInput = (event) => {
	date.value = event.target._value;
};

const increaseDate = () => {
	date.value = new Date(date.value.getTime() + 1000 * 60 * 60 * 24);
};
</script>

<template>
	<main>
		<KolInputDate _label="Date Input" :_value="date" @input="handleDateInput" />
		<KolButton _label="increase" :_on="{ onClick: increaseDate }" />
		<pre>
value: {{ JSON.stringify(date) }} ({{ typeof date }})
			</pre
		>
	</main>
</template>

<style>
html {
	font-family: sans-serif;
}
</style>
