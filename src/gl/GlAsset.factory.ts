import { Descriptor } from 'hybrids'
import { GlContext } from './gl-context.base'

export default function GlAssetFactory<H extends GlContext>({get, set, connect, observe}: Descriptor<H>): Descriptor<H> {
	return {
		get,
		set,
		connect: (host, value, invalidate) => {
			connect && connect(host, value, invalidate)
			return (host, value) => host?.scene.remove(value)
		},
		observe: (host, value, last) => {
			observe && observe(host, value, last)
			value?.isObject3D && host.scene.add(value)
			// keep an immutable outline of items in the scene
			if(value?.isObject3D) {
				host.outline = [
					...host.outline,
					value,
				]
			}
		},
	}
}
