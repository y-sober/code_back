import {Method} from './methods'
import {Methods_langhuolan} from './methods_langhuolan'
import {mixinsClass} from '@/util/uitl'

class API extends mixinsClass(Method, Methods_langhuolan) {
	constructor(http) {
		super()
		this.$http = http
	}
}

export {API}
