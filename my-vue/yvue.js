//数据响应式
function defineReactive(obj, key, val) {
	//递归
	observe(val)
	Object.defineProperty(obj, key, {
		get() {
			console.log('get', key)
			return val
		},
		set(newVal) {
			// console.log('set', key)
			if (newVal !== val) {
				val = newVal
				observe(newVal)
			}
		},
	})
}

//代理
function proxy(vm) {
	Object.keys(vm.$data).forEach(key => {
		Object.defineProperty(vm, key, {
			get() {
				return vm.$data[key]
			},
			set(newVal) {
				if (newVal !== vm.$data[key]) {
					vm.$data[key] = newVal
				}
			},
		})
	})
}

function observe(obj) {
	if (typeof obj !== 'object' || obj === null) {
		return
	}
	Object.keys(obj).forEach(key => {
		defineReactive(obj, key, obj[key])
	})
	new Observe(obj)
}

class YVue {
	constructor(options) {
		this.$options = options
		this.$data = options.data
		//data数据响应式
		observe(this.$data)
		
		// 代理
		proxy(this)
		
		//	解析dom树
		new Compile(options.el, this)
	}
}

//根据传入的数据类型做相应的数据响应式
class Observe {
	constructor(value) {
		this.value = value
		if (Array.isArray(value)) {
			//	todo
		} else {
			this.walk(value)
		}
	}
	
	walk(obj) {
		Object.keys(obj).forEach((key) => defineReactive(obj, key, obj[key]))
	}
}

//解析模板
//1、处理插值
// 2、处理指令和时间
// 3、以上两者初始化和更新
class Compile {
	constructor(el, vm) {
		this.$vm = vm
		this.$el = document.querySelector(el)
		if (this.$el) {
			this.compile(this.$el)
		}
	}
	
	compile(el) {
		//	遍历el子节点，判断他们类型做相应的处理
		const childNodes = el.childNodes
		childNodes.forEach(node => {
			if (node.nodeType === 1) {
				//	元素
				//	处理指令和事件
				const attrs = node.attributes
				Array.from(attrs).forEach(attr => {
					//	y-xxx='abc'
					const attrName = attr.name
					const exp = attr.value
					if (attrName.startsWith('y-')) {
						const dir = attrName.substr(attrName)
					}
				})
			} else if (this.isInter(node)) {
				//	文本
				console.log('插值', node.textContent)
				this.compileText(node)
			}
			//	递归变异dom树
			if (node.childNodes) {
				this.compile(node)
				
			}
		})
	}
	
	//  是否插值表达式
	isInter(node) {
		return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
	}
	
	//	编译文本
	compileText(node) {
		node.textContent = this.$vm[RegExp.$1]
	}
	
	// 编译Html
	text(node, exp) {
		this.update(node, exp, 'text')
	}
	
	// 编译textºº‚º
	html(node, exp) {
		node.innerHTML = this.$vm[exp]
	}
	
	update(node, exp, dir) {
		//	1.初始化
		const fn = this[dir + 'Updater']
		fn && fn(node, this.$vm[exp])
		//	2、更新
	}
}

// 监听器：负责依赖更新
class Watcher {
	constructor(vm, key, updateFn) {
		this.vm = vm
		this.key = key
		this.updateFn = updateFn
	}
	
	//未来被Dep调用
	update() {
		this.updateFn.call(this.vm, this.vm[this.key])
	}
}
