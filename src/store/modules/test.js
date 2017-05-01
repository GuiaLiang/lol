const state = {
	content: 'Hello'
}

const mutations = {
	test(state, {newContent}) {
		state.content = newContent;
	}
}

const actions = {
	testAction({commit}, data) {
		commit('test', data);
	}
}

export default {
	state,
	mutations,
	actions
}