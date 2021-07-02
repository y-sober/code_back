<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <p>
        If Element is successfully added to this project, you'll see an
        <code v-text="'<el-button>'"></code>
        below
      </p>
      <el-button>el-button</el-button>
	    <div class="scroll">
		    <el-select v-model="value" placeholder="请选择">
			    <el-option
					    v-for="item in options"
					    :key="item.value"
					    :label="item.label"
					    :value="item.value">
			    </el-option>
		    </el-select>
		    <div style="height: 500px;width: 100%"></div>
	    </div>
	    
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
	mounted(){
		console.log(this.$api)
  	this.$api.getDate().then(res=>{
		  console.log(res)
	  })
	},
	data() {
		return {
			value: '',
			options: [{
				value: '选项1',
				label: '黄金糕'
			}, {
				value: '选项2',
				label: '双皮奶'
			}, {
				value: '选项3',
				label: '蚵仔煎'
			}, {
				value: '选项4',
				label: '龙须面'
			}, {
				value: '选项5',
				label: '北京烤鸭'
			}],
		}
	},
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
	height: 200vh;
}
.scroll{
	height: 400px;
	overflow-y: scroll;
}
</style>
