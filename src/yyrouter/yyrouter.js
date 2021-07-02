//1、插件
//2、两个组件 router-view 、 router-link

//全局生命Vue 用于保存传进来的Vue
let Vue

class VueRouter {
	constructor(options) {
		//保存new VueRouter传进来的配置及路由信息
		this.$options = options
		//路由默认值
		const initial = window.location.hash.slice(1) || '/'
		//利用Vue的defineReactive方法使current变为响应式数据
		Vue.util.defineReactive(this, 'current', initial)
		window.addEventListener('hashchange', () => {
			this.current = window.location.hash.slice(1)
		})
	}
}

VueRouter.install = function (_Vue) {
	Vue = _Vue
	//全局混入用来在每个组件挂在$router
	Vue.mixin({
		// 		疑问：为什么要写在beforeCreate里面？
		// 解决：因为create阶段组件已经生成了，this实例已经创建了，而beforeCreate才刚开始。这样HelloWorld组件可以this调用来获取testa的值
		beforeCreate() {
			//this指向Vue实例object
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
					href: '#' + this.to,
				},
			}, this.$slots.default)
		},
	})
	
	Vue.component('router-view', {
		render(createElement) {
			let component = null
			console.log(this.$router.$options)
			const route = this.$router.$options.routes.find(route=>route.path === this.$router.current)
			if(route){
				component = route.component
			}
			return createElement(component)
		},
	})
}
export default VueRouter
