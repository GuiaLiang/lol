<template>
	<div class="content-container">
		<div class="fresh-loading">
			<i ref="loading"></i>
			<span class="text"> {{freshText}} </span>
		</div>

		<div class="user-info-wrap" ref="userInfoWrap"></div>
		
		<div class="carousel-wrap" ref="carouselWrap">
			<!-- 传递参数时使用bind进行参数绑定，否则传递的“1”会被当成字符串而不是数值 -->
			<carousel :imgs="imgs" :delay="2000" :indexShow="true"></carousel>
			<navbar :content="this.navBar"></navbar>
		</div>

		<!-- <div class="content-wrap" ref="contentWrap"> -->
		<div class="content-wrap" ref="content" @touchstart.stop.prevent="contentTouchStart" @touchmove.stop.prevent="contentTouchMove" @touchend.stop.prevent="contentTouchEnd">
			<div class="slide-content-wrap" ref="slideContentWrap" :style="{width: this.navBar.length * 100 + '%', transform: 'translateX(' + initOffset + 'px)'}">
				<div class="slide-content" :style="{width: 100/navBar.length + '%'}" v-for="si in 6" key="slide-content-{{si}}">
				<!-- <div class="slide-content" v-for="si in 6" key="slide-content-{{si}}" @touchstart.stop.prevent="contentTouchStart" @touchmove.stop.prevent="contentTouchMove" @touchend.stop.prevent="contentTouchEnd"> -->
					<!-- 在for循环中，不能再通过使用this来访问vue的data，因为此时的this不是指向vue实例 -->
					<items :content="contents[si-1].content"></items>
					<!-- <div>{{Object.keys(this)}}</div> -->
				</div>
			</div>
				<!-- <div class="item" v-for="(val, i) in list">{{val.text}}-{{i}}</div> -->
			<!-- <router-view></router-view> -->
		</div>

		<div class="navga" ref="navga"></div>
	</div>
</template>

<script>
	import Carousel from '@/components/Carousel';
	import Navbar from '@/components/Navbar';
	import Items from '@/components/Items';
	import {CONTENT_NAVBAR_CHANGE_ACTION} from '@/store/mutation-types'

	export default {
		name: 'Content',
		
		components: {
			Carousel,
			Navbar,
			Items
		},

		data() {
			return {
				navBar: ['最新', '官方', '娱乐', '活动', '攻略', '收藏'],
				cache: {}, // 用于本组件成员的缓存
				freshText: '下拉更新',
				startPoint: {x: 0, y: 0},
				offset: 0,
				maxOffset: 0,
				isScroll: false,
				pollTimer: 0,
				slidePoint: {x: 0, y: 0},
				slideOffset: 0,
				isSlide: false,
				slideTimer: null,
				imgs: ['/static/images/content/ban1.jpg', '/static/images/content/ban2.jpg', '/static/images/content/ban3.jpg', '/static/images/content/ban4.jpg', '/static/images/content/ban5.jpg'],
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
			}
		},

		mounted() {
			let content = this.$refs.content;
			let navga = this.$refs.navga;
			let carouselWrap = this.$refs.carouselWrap;
			let loading = this.$refs.loading;
			let userInfoWrap = this.$refs.userInfoWrap;
			let slideContentWrap = this.$refs.slideContentWrap;
			this.cache['content'] = content;
			this.cache['navga'] = navga;
			this.cache['carouselWrap'] = carouselWrap;
			this.cache['loading'] = loading;
			this.cache['carouselWrapOffsetHeight'] = carouselWrap.offsetHeight;
			this.cache['loadingOffsetHeight'] = loading.parentNode.offsetHeight;
			this.cache['carouselContainer'] = carouselWrap.querySelector('.carousel-container');
			this.cache['userInfoWrap'] = userInfoWrap;
			this.cache['allContentWidth'] = content.offsetWidth * (this.navBar.length - 1);
			this.cache['contentWidth'] = content.offsetWidth;
			this.cache['slideContentWrap'] = slideContentWrap;
 			let list = content.querySelectorAll('.item');
 			if(list && list.length > 0) {
				let elem = list[list.length-1].getBoundingClientRect();
				let nav = navga.getBoundingClientRect();
				this.maxOffset = elem.bottom - nav.top;
 			}
		},

		updated() {
			if(this.offset < 0) {
				let content = this.cache.content;
				let navga = this.cache.navga;
				let list = content.querySelectorAll('.item');
				let elem = list[list.length-1].getBoundingClientRect();
				let nav = navga.getBoundingClientRect();
				this.maxOffset += elem.bottom - nav.top;
				console.log(this.maxOffset)
			}

			// 多做一次是为了防止卡顿导致的位移不到位的情况，原因还在待查
			this.$velocity(this.cache.slideContentWrap, {translateX: this.slideOffset + 'px'}, {duration: 0});
		},

		computed: {
			listview() {
				return this.list;
			},

			initOffset() {
				this.slideOffset = this.$store.state.content.navIndex * -this.cache['contentWidth'] || 0;
				return this.$store.state.content.navIndex * -this.cache['contentWidth'];
			}
		},

		methods: {
			contentTouchStart(e) {
				this.startPoint = {x: e.touches[0].pageX, y: e.touches[0].pageY};
				this.isScroll = true;
				this.offset = this.offset > 0? 0: this.offset;
				this.contentSlideStart(e);
			},

			contentTouchMove(e) {
				let cp = {x: e.touches[0].pageX, y: e.touches[0].pageY};

				if(Math.abs(this.startPoint.x - cp.x) > Math.abs(this.startPoint.y - cp.y)) {
					this.isScroll = false;
					this.contentSlideMove(e);
					return;
				}
				this.isSlide = false;
				let carouselWrap = this.cache.carouselWrap;
				let content = this.cache.content;
				let loading = this.cache.loading;
				let loadingOffsetHeight = this.cache.loadingOffsetHeight;
				let carouselWrapOffsetHeight = this.cache.carouselWrapOffsetHeight;
				if(this.isScroll) {
					if(cp.y > this.startPoint.y && this.offset > 0) {
						this.offset += (cp.y - this.startPoint.y) * 0.3;
						if(this.offset >= loadingOffsetHeight * 0.8) {
							this.freshText = '释放更新';
						}
					} else {
						this.offset += cp.y - this.startPoint.y;
					}

					if(this.offset < 0 && Math.abs(this.offset) > this.maxOffset) {
						this.offset = -this.maxOffset;
					}

					if(this.offset < 0 && Math.abs(this.offset) >= carouselWrapOffsetHeight/6) {
						this.cache.userInfoWrap.style.backgroundColor = 'rgba(0,0,0,.3)';
					}

					if(this.offset < 0 && Math.abs(this.offset) >= carouselWrapOffsetHeight/3) {
						this.cache.userInfoWrap.style.backgroundColor = 'rgba(0,0,0,.4)';
					}

					if(this.offset < 0 && Math.abs(this.offset) >= carouselWrapOffsetHeight/2) {
						carouselWrap.style.transform = 'translate3d(0, ' +(-carouselWrapOffsetHeight/2) + 'px, 0)';
						this.cache.userInfoWrap.style.backgroundColor = 'rgba(0,0,0,.5)';

						if(Math.abs(this.offset) >= this.maxOffset) {
							content.style.transform = 'translate3d(0, ' + (0-this.maxOffset) + 'px, 0)';
							this.isScroll = false;
							// 用于防止多次触发导致偏移差变大
							clearTimeout(this.pollTimer);
							// this.pollTimer = setTimeout(() => {
							// 	if(this.list.length < 16) {
							// 		this.list = this.list.concat([{text: '文本'},{text: '文本'}]);
							// 	}
							// 	this.isScroll = true;
							// }, 2000);
						} else {
							content.style.transform = 'translate3d(0, ' + this.offset + 'px, 0)';
						}

					} else if(this.offset >= 0) {
						// carouselWrap.style.transform = 'translate3d(0, 0, 0)';
						// content.style.transform = 'translate3d(0, 0, 0)';
						this.cache.userInfoWrap.style.backgroundColor = 'rgba(0,0,0,0)';
						this.cache.userInfoWrap.style.transform = 'translate3d(0, ' + this.offset + 'px, 0)';
						loading.style.animationPlayState = 'paused';
						carouselWrap.style.transform = 'translate3d(0, ' + this.offset + 'px, 0)';
						content.style.transform = 'translate3d(0, ' + this.offset + 'px, 0)';
						loading.parentNode.style.transform = 'translate3d(0, ' + this.offset + 'px, 0)';
					} else {
						//header.style.top = this.offset + 'px';
						// 通过同时translate轮播和展示列表的方式来实现同时移动或一个移动一个固定（translate固定某一个位置）
						carouselWrap.style.transform = 'translate3d(0, ' + this.offset + 'px, 0)';
						content.style.transform = 'translate3d(0, ' + this.offset + 'px, 0)';
					}

					this.startPoint = cp;
				}
			},

			contentTouchEnd(e) {
				if(this.isSlide) {
					this.contentSlideEnd(e);
					return;
				}
				
				this.isScroll = false;
				let loadingOffsetHeight = this.cache.loadingOffsetHeight;
				if(this.offset > 0) {
					let carouselWrap = this.cache.carouselWrap;
					let content = this.cache.content;
					let loading = this.cache.loading;
					let userInfoWrap = this.cache.userInfoWrap;
					if(this.offset >= loadingOffsetHeight * 0.8) {
						this.freshText = '刷新中';
						loading.style.animationPlayState = 'running';
						carouselWrap.style.transform = 'translate3d(0, 1.4rem, 0)';
						content.style.transform = 'translate3d(0, 1.4rem, 0)';
						loading.parentNode.style.transform = 'translate3d(0, 1.4rem, 0)';
						userInfoWrap.style.transform = 'translate3d(0, 1.4rem, 0)';

						setTimeout(() => {
							this.freshText = '下拉更新';
							loading.parentNode.style.transform = 'translate3d(0, 0, 0)';
							loading.style.animationPlayState = 'paused';
							carouselWrap.style.transform = 'translate3d(0, 0, 0)';
							content.style.transform = 'translate3d(0, 0, 0)';
							userInfoWrap.style.transform = 'translate3d(0, 0, 0)';
						}, 2000);
					} else {
						loading.parentNode.style.transform = 'translate3d(0, 0, 0)';
						loading.style.animationPlayState = 'paused';
						carouselWrap.style.transform = 'translate3d(0, 0, 0)';
						content.style.transform = 'translate3d(0, 0, 0)';
						userInfoWrap.style.transform = 'translate3d(0, 0, 0)';
					}
				}
			},

			contentSlideStart(e) {
				this.slidePoint = {x: e.touches[0].pageX, y: e.touches[0].pageY};
				this.cache.oldSlideOffset = this.slideOffset;
				this.isSlide = true;
			},

			contentSlideMove(e) {
				if(this.isSlide) {
					let curPoint = {x: e.touches[0].pageX, y: e.touches[0].pageY};
					this.slideOffset += curPoint.x - this.slidePoint.x;
					if(this.slideOffset > 0) {
						this.slideOffset = 0;
					} else if(Math.abs(this.slideOffset) > this.cache.allContentWidth) {
						this.slideOffset = -this.cache.allContentWidth;
					} 

					this.$velocity(this.cache.slideContentWrap, {translateX: this.slideOffset + 'px'}, { duration: 0 });
					this.slidePoint = curPoint;
				}
			},

			contentSlideEnd(e) {
				this.isSlide = false;
				let self = this;
				if(Math.abs(this.slideOffset - this.cache.oldSlideOffset) >= this.cache.contentWidth*0.5) {
					if(this.cache.oldSlideOffset > this.slideOffset) {
						this.slideOffset = this.cache.oldSlideOffset - this.cache.contentWidth;
						this.$store.dispatch(CONTENT_NAVBAR_CHANGE_ACTION, this.$store.state.content.navIndex+1);
					} else {
						this.slideOffset = this.cache.oldSlideOffset + this.cache.contentWidth;
						this.$store.dispatch(CONTENT_NAVBAR_CHANGE_ACTION, this.$store.state.content.navIndex-1);
					}
					// console.log(this.slideOffset)
					this.$velocity(this.cache.slideContentWrap, {translateX: this.slideOffset + 'px'}, {
						duration: 100,
						complete: function() {
							if(self.offset != 0) {
								self.cache.content.style.transform = 'translate3d(0, ' +(-self.cache.carouselWrapOffsetHeight/2) + 'px, 0)';
							} else {
								self.cache.content.style.transform = 'translate3d(0, 0, 0)';
							}

							// clearTimeout(self.slideTimer);
							// this.slideTimer = setTimeout(function() {
							// 	self.$velocity(self.cache.slideContentWrap, {translateX: self.slideOffset + 'px'}, { duration: 0 });
							// }, 0);
						}
					});
				} else {
					this.slideOffset = this.cache.oldSlideOffset;

					this.$velocity(this.cache.slideContentWrap, {translateX: this.slideOffset + 'px'}, { duration: 0 });
				}

				// clearTimeout(this.slideTimer);
				// this.slideTimer = setTimeout(function() {
				// 	let reg = /(-?\d+)/gi;
				// 	let temp = 0;
				// 	let match = self.cache.slideContentWrap.style.transform.match(reg);
				// 	temp = parseFloat(match[0]);
				// 	console.log(temp)
				// 	if(temp != self.slideOffset) {
				// 		self.$velocity(self.cache.slideContentWrap, {translateX: self.slideOffset + 'px'}, { duration: 0 });
				// 	}
				// }, 0);
				// this.slideTimer = setTimeout(() => {
				// 	this.$velocity(this.cache.slideContentWrap, {translateX: this.slideOffset + 'px'}, {duration: 0});
				// }, 0);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content-container {
		box-sizing: border-box;
		width: 100%;
		min-height: 100%;
		overflow: hidden;
		// display: flex;
		// flex-direction: column;
		position: relative;
		background-color: #fff;

		.user-info-wrap {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 1.2rem;
			background-color: rgba(0, 0, 0, 0);
			z-index: 20;
			color: #d8b868;
		}

		.fresh-loading {
			position: absolute;
			top: -1.4rem;
			width: 100%;
			height: 1.4rem;
			text-align: center;
			color: #bbb;

			i {
				display: block;
				margin: 0 auto;
				width: .74rem;
				height: .74rem;
				background-position: center;
				animation: updateAnimation .6s step-end infinite;
			}

			.text {
				display: inline-block;
				margin-top: 10px;
				font-size: 24px;
			}
		}

		.content-wrap {
			margin: 4.5rem 0 1.6rem;

			.slide-content-wrap {
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;

				.slide-content {
					flex-grow: 1;
				}
			}


			// .item {
			// 	width: 100%;
			// 	height: 2.8rem;
			// 	vertical-align: middle;
			// }
			// flex-grow: 1;
			// overflow-y: auto;
			// position: relative;
			// transition: transform .6s cubic-bezier(0.215, 0.61, 0.355, 1);

			// .carousel-wrap {
			// 	background-color: red;
			// 	width: 100%;
			// 	height: 4.4rem;
			// 	transform: translateZ(0);
			// }

			// .carouselfixed {
			// 	position: fixed;
			// 	top: -2.213rem;
			// }
		}

		.carousel-wrap {
			position: absolute;
			top: 0;
			z-index: 10;
			width: 100%;
			height: 4.4rem;
			// transition: transform .6s cubic-bezier(0.215, 0.61, 0.355, 1);
		}

		.navga {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 1.6rem;
			background-color: green;
		}
	}

	@keyframes updateAnimation {
		0% { background-image: url('../assets/images/loading/teemo_1.png'); }
		12.5% { background-image: url('../assets/images/loading/teemo_2.png'); }
		25% { background-image: url('../assets/images/loading/teemo_3.png'); }
		37.5% { background-image: url('../assets/images/loading/teemo_4.png'); }
		50% { background-image: url('../assets/images/loading/teemo_5.png'); }
		62.5% { background-image: url('../assets/images/loading/teemo_6.png'); }
		85% { background-image: url('../assets/images/loading/teemo_7.png'); }
		100% { background-image: url('../assets/images/loading/teemo_8.png'); }
	}
</style>