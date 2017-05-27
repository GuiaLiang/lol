import {CONTENT_NAVBAR, CONTENT_NAVBAR_ACTION, CONTENT_NAVBAR_CHANGE, CONTENT_NAVBAR_CHANGE_ACTION} from '../mutation-types'

const state = {
	navBar: [],
	navIndex: 0
};

const mutations = {
	[CONTENT_NAVBAR](state, data) {
		state.navBar = data;
	},

	[CONTENT_NAVBAR_CHANGE](state, data) {
		state.navIndex = data;
	}
};

const actions = {
	[CONTENT_NAVBAR_ACTION]({commit}, data) {
		commit(CONTENT_NAVBAR, data);
	},

	[CONTENT_NAVBAR_CHANGE_ACTION]({commit}, data) {
		commit(CONTENT_NAVBAR_CHANGE, data);
	}
};

export default {
	state,
	mutations,
	actions
}

