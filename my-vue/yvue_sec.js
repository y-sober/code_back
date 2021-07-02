// 响应式数据
function defineReactive(obj, key, val) {
	console.log('lala')
	Object.defineProperty(obj, key, {
		get() {
			return val
		},
		set(v) {
			console.log('set', val)
			if (v !== val) {
				//保证如果newVal是对象依然可以响应式处理
				observe(v)
				val = v
			}
		},
	})
}

function set(obj, key, val) {
	defineReactive(obj, key, val)
}

function observe(obj) {
	if (typeof obj !== 'object' && obj !== null) {
		return
	}
	//遍历obj所有的key
	new Observe(obj)
}

function proxy(vm) {
	Object.keys(vm.$data).forEach((key) => {
		Object.defineProperty(vm, key, {
			get() {
				return vm.$data[key]
			},
			set(v) {
				vm.$data[key] = v
			},
		})
	})
}

//我的vue
class YVue {
	constructor(options) {
		this.$options = options
		this.$data = options.data
		// data响应式处理
		observe(this.$data)
		//	代理data里的数据
		proxy(this)
		//解析标签
		new Compile(options.el, this)
	}
}

//根据数据的类型做相应的数据响应式处理
class Observe {
	constructor(value) {
		this.value = value
		if (Array.isArray(value)) {
		
		} else {
			
			this.walk(value)
		}
	}
	
	//数据响应式
	walk(obj) {
		console.log(obj)
		Object.keys(obj).forEach(key => {
			defineReactive(obj, key, obj[key])
		})
	}
}

//解析模板
//1、处理插值表达式
//2、处理指令和事件
class Compile {
	constructor(el, vm) {
		console.log(vm)
		this.$vm = vm
		this.$el = document.querySelector(el)
		this.compile(this.$el)
	}
	
	compile(el) {
		//遍历el所有子节点
		const childNodes = el.childNodes
		childNodes.forEach(node => {
			if (node.nodeType === 1) {
				//	元素 处理指令
				console.log(node.nodeName, '元素')
				const attrs = node.attributes
				Array.from(attrs).forEach(attr => {
					//	y---
					const attrName = attr.name
					const exp = attr.value
					if (attrName.startsWith('y-')) {
						const dir = attrName.substring(2)
						this[dir] && this[dir](node, exp)
					}
				})
			} else if (this.isInter(node)) {
				//	文本
				this.compileText(node)
			}
			if (node.childNodes) {
				this.compile(node)
			}
		})
	}
	
	//编译文本
	compileText(node) {
		console.log(this.$vm, RegExp.$1)
		node.textContent = this.$vm[RegExp.$1.trim()]
	}
	
	//编译html
	html(node, exp) {
		node.innerHTML = this.$vm[exp]
	}
	//编译text
	text(node,exp){
		node.textContent = this.$vm[exp]
	}
	// 是否插值表达式
	isInter(node) {
		return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
	}
	
	
}
