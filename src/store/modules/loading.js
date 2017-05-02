import {LOADING_STATUS_CHANGE, LOADING_STATUS_ACTION} from '../mutation-types'

const state = {
	status: 'hidden',
	msg: '正在登录'
};

const mutations = {
	[LOADING_STATUS_CHANGE](state, data) {
		if(data.msg) {
			state.msg = data.msg;
		} else {
			state.msg = '正在登录';
		}

		state.status = data.status;
	}
}

const actions = {
	[LOADING_STATUS_ACTION]({commit}, data) {
		commit(LOADING_STATUS_CHANGE, data);
	}
}

export default {
	state,
	mutations,
	actions
}