let Vue

class VueRouter {
	constructor(options) {
		this.$options = options
		const initial = window.location.hash.slice(1) || '/'
		Vue.util.defineReactive(this,'current',initial)
		window.addEventListener('hashchange',() => {
			this.current = window.location.hash.slice(1)
		})
	}
}

VueRouter.install = function (_Vue) {
	Vue = _Vue
	Vue.mixin({
		beforeCreate() {
			console.log(this)
			if (this.$options.router) {
				Vue.prototype.$router = this.$options.router
			}
		},
	})
	Vue.component('router-link', {
		props: {
			to: {
				required: true,
				type: String,
			},
		},
		render(createElement) {
			return createElement('a', {
				attrs: {
					href: '#' + this.to
				}
			}, this.$slots.default)
		},
	})
	Vue.component('router-view', {
		render(createElement) {
			console.log(this)
			let component = null
			const currentRoute = this.$router.$options.routes.find(route=>route.path === this.$router.current)
			if(currentRoute){
				component = currentRoute.component
			}
			return createElement(component)
		},
	})
}
export default VueRouter
