<template>
	<div class="friend-container" ref="friendContainer">
		<div class="header-wrap" @touchend="changeTab" ref="headerWrap">
			<div class="title friend" data-type="friend" :class="{cur: curTab==='friend'}">好友</div>
			<div class="title message" data-type="message" :class="{cur: curTab==='message'}">消息</div>
			<div class="add-icon" @touchend="showAddContent"></div>

			<div class="add-oper-wrap" v-show="isShowAdd">
				<div class="item"><span class="create-chat">发起群聊</span></div>
				<div class="item"><span class="add-friend">添加好友</span></div>
				<div class="item"><span class="friend-subscribe">好友订阅</span></div>
			</div>
		</div>

		<div class="content-wrap" ref="contentWrap" @touchstart="scrollStart">
			<div class="item friend-wrap">
				<div class="search-wrap">
					<span class="text">搜索你的好友</span>
				</div>
				<div class="friend-entry-wrap">
					<span class="text">好友动态</span>
				</div>

				<div class="app-friend-wrap" data-key="app" @touchend="changeSubContentStatus">
					<span class="text friend-hidden">掌盟好友</span>
				</div>
				<div class="app-friend-content">
					<div class="sub-content" v-for="(val, i) in appFriends">
						<span class="text friend-hidden">{{val.type}}</span>
						<div class="friend-item-wrap">
							<div class="friend-item" v-for="(f, index) in val.data"></div>
						</div>
					</div>
				</div>

				<div class="game-friend-wrap" data-key="game" @touchend="changeSubContentStatus">
					<span class="text friend-hidden">游戏好友</span>
				</div>
				<div class="game-friend-content" v-show="gameSubShow">
					<div class="sub-content" key="sub-content-{{i}}" v-for="(val, i) in gameFriends">
						<div class="text-wrap" @touchend.stop="changeSubContentChildrenStatus">
							<span class="text friend-hidden">{{val.type}}</span>
							<span class="online-wrap">{{val.onlineNum}} / {{val.data.length}}</span>
						</div>
						<div class="friend-item-wrap" :style="{display: 'none'}">
							<div class="friend-item" v-for="(f, index) in val.data">
								<div class="item-wrap avater-wrap">
									<img :src="f.avater" alt="avater" class="avater">
								</div>
								<div class="item-wrap info">
									<div class="name">
										<span class="name-text" :class="{boy: f.sex==='boy', girl: f.sex==='girl'}">{{f.name}}</span>
									</div>
									<div class="nickname">{{f.nickname}}</div>
								</div>
								<div class="item-wrap oper">
									<div class="chat-oper">聊天</div>
									<div class="status" :class="{online: f.isOnline, offline: !f.isOnline}">{{onlineText(f.isOnline)}}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="item chat-wrap"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Friends',

		mounted() {
			let navga = document.querySelector('.navga');
			let friendContainer = this.$refs.friendContainer;
			let headerWrap = this.$refs.headerWrap;
			let contentWrap = this.$refs.contentWrap;
			let navgaHeight = navga.offsetHeight;
			let height = friendContainer.offsetHeight;
			let width = friendContainer.offsetWidth;
			this.cache.wrapWidth = width;
			friendContainer.style.height = height - navgaHeight + 'px';
			contentWrap.style.height = height - navgaHeight - headerWrap.offsetHeight + 'px';
		},

		computed: {
			appFriends() {
				return this.$store.state.friends.app;
			},

			gameFriends() {
				return this.$store.state.friends.game;
			}
		},

		methods: {
			changeTab(e) {
				let target = e.target;
				if(target.className.indexOf('title') > -1 && target.className.indexOf('cur') < 0) {
					let type = target.getAttribute('data-type');
					this.curTab = type;
				}
			},

			showAddContent() {
				this.isShowAdd = !this.isShowAdd;
			},

			onlineText(isOnline) {
				if(isOnline) {
					return "游戏在线";
				}

				return "游戏离线";
			},

			changeSubContentStatus(e) {
				if(this.isScrollAction()) {
					return;
				}

				var target = e.target;
				var key = target.getAttribute('data-key');
				if(!this.cache[key+'-sub-content']) {
					let elem = target.querySelector('.text');
					this.cache[key+'-sub-content'] = elem;
				}

				let textElem = this.cache[key+'-sub-content'];
				if(textElem.className.indexOf('hidden') > -1) {
					textElem.className = textElem.className.replace('hidden', 'show');
				} else {
					textElem.className = textElem.className.replace('show', 'hidden');
				}

				if(key === 'game') {
					this.gameSubShow = !this.gameSubShow;
				} else {
					this.appSubShow = !this.appSubShow;
				}
			},

			changeSubContentChildrenStatus(e) {
				if(this.isScrollAction()) {
					return;
				}

				let target = e.target;
				let itemWrap = target.nextSibling.nextSibling;
				let cssStyle = window.getComputedStyle(itemWrap);
				let text = target.querySelector('.text');
				if(cssStyle.display && cssStyle.display === 'none') {
					itemWrap.style.display = 'block';
				} else {
					itemWrap.style.display = 'none';
				}

				if(text.className.indexOf('hidden') > -1) {
					text.className = text.className.replace('hidden', 'show');
				} else {
					text.className = text.className.replace('show', 'hidden');
				}
			},

			isScrollAction() {
				let now = +new Date();
				if(now - this.cache.scrollStartTime <= 200 && !this.isScroll) {
					return false;
				}

				return true;
			},

			scrollStart(e) {
				this.cache.scrollStartTime = +new Date();
			}
		},

		data() {
			return {
				curTab: 'friend',
				isShowAdd: false,
				gameSubShow: false,
				appSubShow: false,
				isScroll: false,
				cache: {}
			}
		}
	}
</script>

<style lang="scss">
	@mixin addContent($img) {
		content: "";
		float: left;
		width: 0.56rem;
		height: 0.56rem;
		margin-top: 0.22rem;
		margin-left: 0.22rem;
		background: url('../assets/images/content/#{$img}') center no-repeat / contain;

	}

	%friendWrap {
		width: 100%;
		height: 1.2rem;
		background-color: #fff;
		line-height: 1.2rem;
		font-size: 30px;
		border-bottom: 1px solid #ddd;
	}

	%friendHidden {
		content: "";
		position: absolute;
		right: -0.4rem;
		top: 50%;
		transform: translateY(-50%);
		width: 0.24rem;
		height: 0.24rem;
		background: url('../assets/images/arrow_down.png') center no-repeat / contain;
	}

	%friendShow {
		content: "";
		position: absolute;
		right: -0.4rem;
		top: 50%;
		transform: translateY(-50%);
		width: 0.24rem;
		height: 0.24rem;
		background: url('../assets/images/arrow_up.png') center no-repeat / contain;
	}

	.friend-container {
		width: 100%;
		height: 100%;
		background-color: #f3f3f3;

		.header-wrap {
			width: 100%;
			height: 1rem;
			background: url('../assets/images/header_bg_big.jpg')  center no-repeat / cover;
			position: relative;

			.add-oper-wrap {
				position: absolute;
				top: 108%;
				right: 8%;
				width: 3.2rem;
				height: 3rem;
				background-color: rgba(0, 0, 0, .8);
				color: #fff;
				font-size: 28px;
				text-align: right;
				line-height: 1rem;

				&:before {
					content: "";
					position: absolute;
					top: -8%;
					right: 2%;
					transform: translateX(-0.2665rem);
					width: 0;
					height: 0;
					border: 0.14rem solid rgba(0, 0, 0, .8);
					border-top-color: transparent;
					border-left-color: transparent;
					border-right-color: transparent;

				}

				.item {
					width: 100%;
					height: 1rem;
					box-sizing: border-box;
					border-bottom: 1px solid rgba(199,199,199,.6);
					padding-right: .5rem;

					&:last-child {
						border: none;
					}
				}

				.create-chat {
					&:before {
						@include addContent('create_new_conversion.png');
					}
				}

				.add-friend {
					&:before {
						@include addContent('add_new_friend.png');
					}
				}

				.friend-subscribe {
					&:before {
						@include addContent('subscribe_friend.png');
					}
				}
			}

			.add-icon {
				width: .533rem;
				height: .533rem;
				text-align: center;
				position: absolute;
				right: 10%;
				top: 50%;
				transform: translateY(-55%);
				color: #e4ce95;
				background: url('../assets/images/content/add_friend_btn_normal.png') center no-repeat / contain;
			}

			.title {
				width: 1.04rem;
				text-align: center;
				color: #e4ce95;
				position: absolute;
				top: 50%;
				transform: translateY(-55%);
				font-size: 30px;

				&.cur {
					font-size: 32px;
					color: #dedede;

					&:after {
						position: absolute;
						content: "";
						bottom: -0.16rem;
						left: 0;
						background: url('../assets/images/content/pager_tab_selected.png') center no-repeat / contain;
						width: 1.04rem;
						height: 0.1467rem;
					}
				}

				&.friend {
					left: 35%;
				}

				&.message {
					right: 35%;
				}
			}
		}

		.content-wrap {
			width: 200%;
			overflow-y: auto;

			.item {
				float: left;
				width: 50%;
				height: 100%;
			}

			.friend-wrap {
				background-color: #f3f3f3;

				.search-wrap {
					width: 96%;
					height: 0.8rem;
					margin: 0.2rem auto 0;
					background-color: #fff;
					line-height: 0.8rem;
					color: #ccc;

					.text {
						margin-left: 0.8rem;
						position: relative;

						&:before {
							content: "";
							position: absolute;
							width: 0.4rem;
							height: 0.4rem;
							background: url('../assets/images/content/search_icon.png') center no-repeat / contain;
							top: 50%;
							left: -0.5rem;
							transform: translateY(-50%);
						}
					}
				}

				.friend-entry-wrap {
					width: 100%;
					height: 1.2rem;
					background-color: #fff;
					line-height: 1.2rem;
					margin-top: 0.3rem;
					font-size: 30px;
					position: relative;

					&:before {
						content: "";
						position: absolute;
						left: 0.2rem;
						top: 50%;
						transform: translateY(-55%);
						width: 0.5867rem;
						height: 0.5733rem;
						background: url('../assets/images/content/friend_trend_entry.png') center no-repeat / contain;
					}

					&:after {
						content: "";
						position: absolute;
						right: 0.3rem;
						top: 50%;
						transform: translateY(-50%);
						width: 0.1333rem;
						height: 0.24rem;
						background: url('../assets/images/arrow_right.png') center no-repeat / contain;
					}

					.text {
						margin-left: 0.88rem;
					}
				}

				.friend-hidden {
					&:before {
						@extend %friendHidden;
					}
				}

				.friend-show {
					&:before {
						@extend %friendShow;
					}
				}

				.app-friend-wrap {
					margin-top: .4rem;
					@extend %friendWrap;

					.text {
						margin-left: 0.2rem;
						position: relative;
					}
				}

				.game-friend-wrap {
					@extend %friendWrap;

					.text {
						margin-left: 0.2rem;
						position: relative;
					}
				}

				.app-friend-content {
					.text {
						margin-left: 0.2rem;
						position: relative;
					}

					.friend-hidden {
						&:before {
							@extend %friendHidden;
						}
					}

					.friend-show {
						&:before {
							@extend %friendShow;
						}
					}
				}

				.game-friend-content {
					width: 100%;
    				line-height: 1.2rem;
    				position: relative;

    				.sub-content {
    					background-color: #fff;
    					border-bottom: 1px solid #ddd;

    					&:last-child {
    						border-bottom: none;
    					}

						.text-wrap {
							width: 100%;
							height: 1.2rem;

							.online-wrap {
								position: absolute;
								right: 0.3rem;
								font-size: 28px;
								color: #808080;
							}

							.text {
								margin-left: 0.4rem;
								font-size: 28px;
								color: #808080;
								position: relative;
							}

							.friend-hidden {
								&:before {
									@extend %friendHidden;
								}
							}
						}

						.friend-item-wrap {
							border-top: 1px solid #ddd;
							background-color: #fff;

							.friend-item {
								box-sizing: border-box;
								width: 100%;
								height: 2rem;
								padding: 0.2rem;
								display: flex;
								border-top: 1px solid #ddd;

								&:first-child {
									border-top: none;
								}

								.avater-wrap {
									width: 1.6rem;
									height: 1.6rem;
									overflow: hidden;
									border-radius: 50%;
								}

								.info {
									flex-grow: 1;
									padding-left: 0.4rem;
									line-height: 0.8rem;

									.boy {
										position: relative;

										&:after {
											content: "";
											position: absolute;
											right: -50%;
											top: 50%;
											transform: translateY(-50%);
											background: url('../assets/images/content/friend_sex_boy.png') center no-repeat / contain;
											width: 0.3334rem;
											height: 0.3334rem;
										}
									}

									.girl {
										position: relative;

										&:after {
											content: "";
											position: absolute;
											right: -50%;
											top: 50%;
											transform: translateY(-50%);
											background: url('../assets/images/content/friend_sex_girl.png') center no-repeat / contain;
											width: 0.3334rem;
											height: 0.3334rem;
										}
									}

									.nickname { 
										position: relative;
										text-indent: 0.5rem;

										&:before {
											content: "";
											position: absolute;
											width: 0.4rem;
											height: 0.4rem;
											left: 0;
											top: 50%;
											transform: translateY(-50%);
											background: url('../assets/images/content/friend_game_role.png') center no-repeat / contain;
										}
									}
								}

								.oper {
									width: 1.6rem;
									height: 1.6rem;
									line-height: 0.8rem;

									.chat-oper {
										box-sizing: border-box;
										text-align: center;
										color: #d8b868;
										border: 2px solid #d8b868;
										height: 0.8rem;
									}

									.status {
										position: relative;
										text-align: center;
										height: 0.8rem;
										text-indent: 0.2rem;
									}

									.offline {
										color: #aaa;

										&:before {
											content: "";
											position: absolute;
											left: 0;
											top: 50%;
											transform: translateY(-50%);
											width: 0.2rem;
											height: 0.2rem;
											border-radius: 50%;
											background-color: #aaa;
										}
									}

									.online {
										color: #00a94c;

										&:before {
											content: "";
											position: absolute;
											left: 0;
											top: 50%;
											transform: translateY(-50%);
											width: 0.2rem;
											height: 0.2rem;
											border-radius: 50%;
											background-color: #00a94c;
										}
									}
								}
							}
						}
    				}

				}
			}

			.chat-wrap {
				background-color: #fff;
			}
		}
	}
</style>