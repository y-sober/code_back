//method.js
//软件交互相关方法
class Methods_langhuolan{
	/**
	 *
	 * @param {*} extendCls 最终继承类
	 */
	constructor(){
		/**
		 * 注册到window提供给软件端调用
		 */
	}
	async getDate(){
		const res =  await this.$http.get('http://rap2api.taobao.org/app/mock/template/2010132')
		console.log(res)
		return res
	}
}

export {Methods_langhuolan};
