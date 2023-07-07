import type { Plugin } from 'vue'
import { register } from '@public-ui/components'
import { BMF } from '@public-ui/themes'
export const ComponentLibrary: Plugin = {
	install() {
		register(BMF, []).catch(console.warn)
	}
}
