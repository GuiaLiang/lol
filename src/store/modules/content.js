import {CONTENT_NAVBAR, CONTENT_NAVBAR_ACTION} from '../mutation-types'

const state = {
	navBar: []
};

const mutations = {
	[CONTENT_NAVBAR](state, data) {
		state.navBar = data;
	}
};

const actions = {
	[CONTENT_NAVBAR_ACTION]({commit}, data) {
		commit(CONTENT_NAVBAR, data);
	}
};

export default {
	state,
	mutations,
	actions
}

