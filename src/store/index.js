import Vue from 'vue'
import Vuex from 'vuex'
import loading from './modules/loading.js'
import content from './modules/content.js'
import friends from './modules/friends.js'

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		loading,
		content,
		friends
	}
})