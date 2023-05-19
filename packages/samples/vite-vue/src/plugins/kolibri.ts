import type { Plugin } from 'vue'
import { defineCustomElements } from '@public-ui/components/dist/loader'
import { register } from '@public-ui/components'
import { MAPZ } from '@public-ui/themes'

export const ComponentLibrary: Plugin = {
	install() {
		register(MAPZ, defineCustomElements)
			.then(() => console.log('Components registered'))
			.catch(console.warn)
	}
}
