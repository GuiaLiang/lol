import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Content from '@/components/Content'
import Lastest from '@/components/Lastest'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Login',
			component: Login
		},

		{
			path: '/index',
			name: 'Content',
			component: Content,
			children: [{
				path: 'lastest',
				component: Lastest
			}]
		}
	]
})
