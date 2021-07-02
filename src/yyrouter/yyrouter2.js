let Vue

class VueRouter {
	constructor(options) {
		this.$options = options
		const initialState = window.location.hash.slice(1)||'/'
		Vue.util.defineReactive(this,'current',initialState)
		window.addEventListener('hashchange',()=>{
			this.current = window.location.hash.slice(1)
		})
	}
}

VueRouter.install = function (_Vue) {
	Vue = _Vue
	Vue.mixin({
		beforeCreate() {
			if (this.$options.router) {
				Vue.prototype.$router = this.$options.router
			}
		},
	})
	Vue.component('router-link', {
		props: {
			to: {
				type: String,
				required: true,
			},
		},
		render(createElement) {
			return createElement(
				'a', {attrs: {
						href: '#' + this.to,
						style: `color:pink`
					}
				},this.$slots.default
			)
		},
	})
	Vue.component('router-view',{
		render(createElement){
			let component = null
			const currentRoute = this.$router.$options.routes.find(route=>route.path === this.$router.current)
			console.log("-> this.$router", this.$router);
			if(currentRoute){
				component = currentRoute.component
			}
			return	createElement(component)
		}
	})
}
export default VueRouter
