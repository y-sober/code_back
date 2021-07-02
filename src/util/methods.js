//软件交互相关方法
class Method{
	/**
	 *
	 * @param {*} extendCls 最终继承类
	 */
	constructor(){
		/**
		 * 注册到window提供给软件端调用
		 */
	}
	async postForm(){
		return await this.$http.post('/lalala/ds')
	}
}

export {Method};
