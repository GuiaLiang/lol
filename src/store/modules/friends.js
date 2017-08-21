import {CONTENT_FRIEND, CONTENT_FRIEND_ACTION} from '../mutation-types'

const state = {
	app: [{type: '我的好友', onlineNum: 0, data: [{ avater: '/static/images/content/avater.png', name: '王尼玛', nickname: '张全蛋', sex: 'boy', isOnline: false },
		{ avater: '/static/images/content/avater.png', name: '王尼玛', nickname: '张全蛋', sex: 'boy', isOnline: true },
		{ avater: '/static/images/content/avater.png', name: '王尼玛', nickname: '张全蛋', sex: 'girl', isOnline: false },
		{ avater: '/static/images/content/avater.png', name: '王尼玛', nickname: '张全蛋', sex: 'boy', isOnline: false },
		{ avater: '/static/images/content/avater.png', name: '王尼玛', nickname: '张全蛋', sex: 'girl', isOnline: false }
	]}, {type: '最佳损友', onlineNum: 0, data: [{ avater: '/static/images/content/avater.png', name: '王尼玛', nickname: '张全蛋', sex: 'boy', isOnline: false },
		{ avater: '/static/images/content/avater.png', name: '王尼玛', nickname: '张全蛋', sex: 'boy', isOnline: false },
		{ avater: '/static/images/content/avater.png', name: '王尼玛', nickname: '张全蛋', sex: 'girl', isOnline: false },
		{ avater: '/static/images/content/avater.png', name: '王尼玛', nickname: '张全蛋', sex: 'boy', isOnline: false },
		{ avater: '/static/images/content/avater.png', name: '王尼玛', nickname: '张全蛋', sex: 'girl', isOnline: false }
	]}],
	game: [{type: '我的好友', onlineNum: 0, data: [{ avater: '/static/images/content/avater.png', name: '王尼玛', nickname: '张全蛋', sex: 'boy', isOnline: false },
		{ avater: '/static/images/content/avater.png', name: '王尼玛', nickname: '张全蛋', sex: 'boy', isOnline: true },
		{ avater: '/static/images/content/avater.png', name: '王尼玛', nickname: '张全蛋', sex: 'girl', isOnline: false },
		{ avater: '/static/images/content/avater.png', name: '王尼玛', nickname: '张全蛋', sex: 'boy', isOnline: false },
		{ avater: '/static/images/content/avater.png', name: '王尼玛', nickname: '张全蛋', sex: 'girl', isOnline: false }
	]}, {type: '最佳损友', onlineNum: 0, data: [{ avater: '/static/images/content/avater.png', name: '王尼玛', nickname: '张全蛋', sex: 'boy', isOnline: false },
		{ avater: '/static/images/content/avater.png', name: '王尼玛', nickname: '张全蛋', sex: 'boy', isOnline: false },
		{ avater: '/static/images/content/avater.png', name: '王尼玛', nickname: '张全蛋', sex: 'girl', isOnline: false },
		{ avater: '/static/images/content/avater.png', name: '王尼玛', nickname: '张全蛋', sex: 'boy', isOnline: false },
		{ avater: '/static/images/content/avater.png', name: '王尼玛', nickname: '张全蛋', sex: 'girl', isOnline: false }
	]}]
};

const mutations = {
	[CONTENT_FRIEND](state, data) {

	}
};

const actions = {
	[CONTENT_FRIEND_ACTION]({commit}, data) {
		commit(CONTENT_FRIEND, data);
	}
};

export default {
	state,
	mutations,
	actions
}