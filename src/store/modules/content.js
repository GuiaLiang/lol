import {CONTENT_NAVBAR, CONTENT_NAVBAR_ACTION, CONTENT_NAVBAR_CHANGE, CONTENT_NAVBAR_CHANGE_ACTION, CONTENT_ITEMS_UPDATE, CONTENT_ITEMS_UPDATE_ACTION, CONTENT_TAB_CHANGE, CONTENT_TAB_CHANGE_ACTION} from '../mutation-types'

const state = {
	navBar: [],
	navIndex: 0,
	tabIndex: 0,
	tabArr: [
		{
			uncheck: '/static/images/tab/tab_news.png', checked: '/static/images/tab/tab_news_checked.png', text: '资讯', type: 'news'
		}, 
		{
			uncheck: '/static/images/tab/tab_friend.png', checked: '/static/images/tab/tab_friend_checked.png', text: '好友', type: 'friends'
		},
		{
			uncheck: '/static/images/tab/tab_discovery.png', checked: '/static/images/tab/tab_discovery_checked.png', text: '发现', type: 'discovery'
		},
		{
			uncheck: '/static/images/tab/tab_me.png', checked: '/static/images/tab/tab_me_checked', text: '我'
, type: 'me'		}
	],
	contents: [
		{
			type: 'lastest',
			content: [{img: '/static/images/content/ban5.jpg', title: 'lastest-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-24 21:00:00', read: '208.0万阅'}, {img: '/static/images/content/ban5.jpg', title: 'lastest-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'},{img: '/static/images/content/ban5.jpg', title: 'lastest-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'},{img: '/static/images/content/ban5.jpg', title: 'lastest-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'},{img: '/static/images/content/ban5.jpg', title: 'lastest-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'},{img: '/static/images/content/ban5.jpg', title: 'lastest-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'}]
		},
		{
			type: 'offical',
			content: [{img: '/static/images/content/ban5.jpg', title: 'offical-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'}, {img: '/static/images/content/ban5.jpg', title: 'offical-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'},{img: '/static/images/content/ban5.jpg', title: 'offical-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'},{img: '/static/images/content/ban5.jpg', title: 'offical-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'},{img: '/static/images/content/ban5.jpg', title: 'offical-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'},{img: '/static/images/content/ban5.jpg', title: 'offical-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'}]
		},
		{
			type: 'funny',
			content: [{img: '/static/images/content/ban5.jpg', title: 'funny-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'}, {img: '/static/images/content/ban5.jpg', title: 'funny-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'},{img: '/static/images/content/ban5.jpg', title: 'funny-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'},{img: '/static/images/content/ban5.jpg', title: 'funny-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'},{img: '/static/images/content/ban5.jpg', title: 'funny-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'},{img: '/static/images/content/ban5.jpg', title: 'funny-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'}]
		},
		{
			type: 'activities',
			content: [{img: '/static/images/content/ban5.jpg', title: 'activities-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'}, {img: '/static/images/content/ban5.jpg', title: 'activities-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'},{img: '/static/images/content/ban5.jpg', title: 'activities-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'},{img: '/static/images/content/ban5.jpg', title: 'activities-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'},{img: '/static/images/content/ban5.jpg', title: 'activities-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'},{img: '/static/images/content/ban5.jpg', title: 'activities-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'}]
		},
		{
			type: 'strategy',
			content: [{img: '/static/images/content/ban5.jpg', title: 'strategy-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'}, {img: '/static/images/content/ban5.jpg', title: 'strategy-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'},{img: '/static/images/content/ban5.jpg', title: 'strategy-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'},{img: '/static/images/content/ban5.jpg', title: 'strategy-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'},{img: '/static/images/content/ban5.jpg', title: 'strategy-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'},{img: '/static/images/content/ban5.jpg', title: 'strategy-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'}]
		},
		{
			type: 'collection',
			content: [{img: '/static/images/content/ban5.jpg', title: 'collection-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'}, {img: '/static/images/content/ban5.jpg', title: 'collection-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'},{img: '/static/images/content/ban5.jpg', title: 'collection-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'},{img: '/static/images/content/ban5.jpg', title: 'collection-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'},{img: '/static/images/content/ban5.jpg', title: 'collection-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'},{img: '/static/images/content/ban5.jpg', title: 'collection-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-23 21:00:00', read: '208.0万阅'}]
		}
	]
};

const mutations = {
	[CONTENT_NAVBAR](state, data) {
		state.navBar = data;
	},

	[CONTENT_NAVBAR_CHANGE](state, data) {
		state.navIndex = data;
	},

	[CONTENT_TAB_CHANGE](state, data) {
		state.tabIndex = data;
	},

	[CONTENT_ITEMS_UPDATE](state, data) {
		let arr = [];
		switch(data.type) {
			case 'lastest':
				arr.push({img: '/static/images/content/ban4.jpg', title: 'lastest-新增-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-24 21:00:00', read: '208.0万阅'});
				arr.push({img: '/static/images/content/ban4.jpg', title: 'lastest-新增-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-24 21:00:00', read: '208.0万阅'});
				state.contents[0].content = state.contents[0].content.concat(arr);
				break;
			case 'offical':
				arr.push({img: '/static/images/content/ban4.jpg', title: 'offical-新增-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-24 21:00:00', read: '208.0万阅'});
				arr.push({img: '/static/images/content/ban4.jpg', title: 'offical-新增-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-24 21:00:00', read: '208.0万阅'});
				state.contents[1].content = state.contents[1].content.concat(arr);
				break;
			case 'funny':
				arr.push({img: '/static/images/content/ban4.jpg', title: 'funny-新增-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-24 21:00:00', read: '208.0万阅'});
				arr.push({img: '/static/images/content/ban4.jpg', title: 'funny-新增-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-24 21:00:00', read: '208.0万阅'});
				state.contents[2].content = state.contents[2].content.concat(arr);
				break;
			case 'activities':
				arr.push({img: '/static/images/content/ban4.jpg', title: 'activities-新增-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-24 21:00:00', read: '208.0万阅'});
				arr.push({img: '/static/images/content/ban4.jpg', title: 'activities-新增-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-24 21:00:00', read: '208.0万阅'});
				state.contents[3].content = state.contents[3].content.concat(arr);
				break;
			case 'strategy': 
				arr.push({img: '/static/images/content/ban4.jpg', title: 'strategy-新增-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-24 21:00:00', read: '208.0万阅'});
				arr.push({img: '/static/images/content/ban4.jpg', title: 'strategy-新增-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-24 21:00:00', read: '208.0万阅'});
				state.contents[4].content = state.contents[4].content.concat(arr);
				break;
			case 'collection':
				arr.push({img: '/static/images/content/ban4.jpg', title: 'collection-新增-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-24 21:00:00', read: '208.0万阅'});
				arr.push({img: '/static/images/content/ban4.jpg', title: 'collection-新增-这是最新的资讯', article: '一次次与冠军失之交臂的UZI，让很多人担心他心灰意冷会选择退役', time: '2017-05-24 21:00:00', read: '208.0万阅'});
				state.contents[5].content = state.contents[5].content.concat(arr);
				break;
			default:
				console.warn('no type match!');
		}
	}
};

const actions = {
	[CONTENT_NAVBAR_ACTION]({commit}, data) {
		commit(CONTENT_NAVBAR, data);
	},

	[CONTENT_NAVBAR_CHANGE_ACTION]({commit}, data) {
		commit(CONTENT_NAVBAR_CHANGE, data);
	},

	[CONTENT_ITEMS_UPDATE_ACTION]({commit}, data) {
		commit(CONTENT_ITEMS_UPDATE, data);
	},

	[CONTENT_TAB_CHANGE_ACTION]({commit}, data) {
		commit(CONTENT_TAB_CHANGE, data);
	}
};

export default {
	state,
	mutations,
	actions
}

