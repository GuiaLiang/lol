import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Content from '@/components/Content'
import IndexWrap from '@/components/IndexWrap'
import Friends from '@/components/Friends'

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
			name: 'Content1',
			component: Content
		},

		{
			path: '/content',
			name: 'IndexWrap',
			component: IndexWrap,
			children: [
				{
					path: 'news',
					name: 'Content',
					component: Content
				},
				{
					path: 'friends',
					name: 'Friends',
					component: Friends
				}
			]
		}
	]
})
