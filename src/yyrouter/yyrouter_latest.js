let Vue
class VueRouter {
	constructor(options){
		this.$options = options
		const initial = window.location.hash.slice(1) || '/'
		Vue.util.defineReactive(this,'current',initial)
		window.addEventListener('hashchange',()=>{
			this.current = window.location.hash.slice(1)
		})
	}
}
VueRouter.install = function(_Vue) {
	Vue = _Vue
	Vue.mixin({
		beforeCreate(){
			if(this.$options.router){
				Vue.prototype.$router = this.$options.router
			}
		}
	})
	Vue.component('router-link',{
		props: {
			to: {
				type: String,
				required: true,
			},
			
		},
		render(createElement){
			return createElement('a',{
				attrs: {
					href: '#' + this.to
				}
			},this.$slots.default)
		}
	})
	Vue.component('router-view',{
		render(createElement) {
			let component = null
			console.log("-> this.$options.", this.$router);
			const route = this.$router.$options.routes.find(route=>route.path===this.$router.current)
			if(route) component = route.component
			console.log(component,route)
			return createElement(component)
		}
	})
}
export default VueRouter
