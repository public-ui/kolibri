import { register } from '@public-ui/components'
import { defineCustomElements } from '@public-ui/components/dist/loader'
import { DEFAULT } from '@public-ui/themes'

export const ComponentLibrary = {
	install() {
		register(DEFAULT, defineCustomElements)
			.then(() => console.log('Components registered'))
			.catch(console.warn)
	}
}
