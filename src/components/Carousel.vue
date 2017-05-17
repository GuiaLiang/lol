<template>
	<div class="carousel-container">
		<div class="carousel-content" ref="carouselContent" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
			<ul class="wrap" :style="{width: (imgs.length+2)*100+'%', transform: 'translateX(-' + 100/(imgs.length+2)+'%)'}" ref="carouselContentWrap">
				<li class="item" key="carousel-content-0" :style="{background: 'url('+imgs[imgs.length-1]+') center / cover no-repeat', width: 100/(imgs.length+2)+'%'}"></li>
				<li class="item" v-for="(val, i) in imgs" key="carousel-content-{{i+1}}" :style="{background: 'url('+val+') center / cover no-repeat', width: 100/(imgs.length+2)+'%'}">
					<!-- <img :src="val" alt="轮播图"> -->
				</li>
				<li class="item" key="carousel-content-{{imgs.length+1}}" :style="{background: 'url('+imgs[0]+') center / cover no-repeat', width: 100/(imgs.length+2)+'%'}"></li>
			</ul>
		</div>
		<div class="carousel-index" v-show="indexShow">
			<ul class="wrap">
				<li class="item" v-for="(val, i) in imgs" key="carousel-index-{{i}}" :class="{cur: curIndex===i}"></li>
			</ul>
		</div>
	</div>
</template>

<script>
// $element.velocity({
//     width: "500px",
//     property2: value2
// }, {
//     /* Velocity's default options */
//     duration: 400,
//     easing: "swing",
//     queue: "",
//     begin: undefined,
//     progress: undefined,
//     complete: undefined,
//     display: undefined,
//     visibility: undefined,
//     loop: false,
//     delay: false,
//     mobileHA: true
// });

	export default {
		name: 'Carousel',

		data() {
			return {
				curIndex: 0,
				timerId: 0,
				offsetWidth: 0,
				offset: 0,
				isPlay: true,
				point: {},
				cache: {}
			}
		},

		mounted() {
			this.offsetWidth = this.$refs.carouselContent.offsetWidth;
			this.offset = -this.offsetWidth;
			this.cache.carouselContentWrap = this.$refs.carouselContent.querySelector('.wrap');
			this.cache.carouselContent = this.$refs.carouselContent;
			this.play();
		},

		props: {
			imgs: {
				type: Array,
				required: true
			},

			indexShow: {
				type: Boolean,
				required: true
			},

			delay: {
				type: Number,
				default: 500
			}
		},

		methods: {
			touchStart(e) {
				// 用于阻止自动滚动
				clearTimeout(this.timerId);
				this.isPlay = false;

				// 用于阻止点击滑动后的再次自动滚动
				clearTimeout(this.cache.touchTimerId);
				this.point = {x: e.touches[0].pageX, y: e.touches[0].pageY};
				this.cache.offset = this.offset;
			},

			touchMove(e) {
				let curPoint = {x: e.touches[0].pageX, y: e.touches[0].pageY};
				this.offset += curPoint.x - this.point.x;

				//this.cache.carouselContentWrap.style.transform = "translateX(" + this.offset + 'px)';
				this.$velocity(this.cache.carouselContentWrap, {translateX: this.offset + 'px'}, {duration: 0});
				this.point = curPoint;
			},

			touchEnd(e) {
				let self = this;
				if(this.cache.offset > this.offset) {
					this.offset = this.cache.offset - this.offsetWidth;

					if(this.curIndex < this.imgs.length-1) {
						this.curIndex++;
					} else {
						this.curIndex = 0;
					}
				} else {
					this.offset = this.cache.offset + this.offsetWidth;

					if(this.curIndex > 0) {
						this.curIndex--;
					} else {
						this.curIndex = this.imgs.length-1;
					}
				}

				this.$velocity(this.cache.carouselContentWrap, {translateX: this.offset + 'px'}, { 
						duration: 300, 
						complete: function() {
							if(self.offset === -self.offsetWidth * (self.imgs.length+1)) {
								self.offset = -self.offsetWidth;
								self.$velocity(self.cache.carouselContentWrap, {
									translateX: self.offset+'px'
								}, { duration: 0 });
							} else if(self.offset === 0) {
								self.offset = -self.offsetWidth * self.imgs.length;
								self.$velocity(self.cache.carouselContentWrap, {
									translateX: self.offset+'px'
								}, { duration: 0 });
							}

							self.cache.touchTimerId = setTimeout(() => {
								self.isPlay = true;
								self.play();
							}, 3000);
						}
				});
			},

			play() {
				this.timerId = setTimeout(() => {
					if(this.isPlay) {
						let self = this;
						this.offset -= this.offsetWidth;
						if(this.curIndex < this.imgs.length-1) {
							this.curIndex++;
						} else {
							this.curIndex = 0;
						}
						this.$velocity(this.cache.carouselContentWrap, {translateX: this.offset + 'px'}, {
							complete: function() {
								if(self.offset === -self.offsetWidth * (self.imgs.length+1)) {
									self.offset = -self.offsetWidth;
									self.$velocity(self.cache.carouselContentWrap, {
										translateX: self.offset+'px'
									}, { duration: 0 });
								} else if(self.offset === 0) {
									self.offset = -self.offsetWidth * self.imgs.length;
									self.$velocity(self.cache.carouselContentWrap, {
										translateX: self.offset+'px'
									}, { duration: 0 });
								}
							}
						});

						this.play();
					}
				}, this.delay);
			}
		}
	}
</script>

<style lang="scss">
	.carousel-container {
		position: relative;
		width: 100%;
		height: 3.4rem;
		z-index: 20;

		.carousel-content {
			width: 100%;
			height: 100%;
			overflow: hidden;

			.wrap {
				height: 100%;
				overflow: hidden;
				line-height: 0;

				.item {
					float: left;
					// width: 20%;
					height: 100%;
				}
			}
		}

		.carousel-index {
			position: relative;
			bottom: .3rem;
			height: .15rem;

			.wrap {
				width: 100%;
				height: .15rem;
				line-height: 0;
				text-align: center;
				position: absolute;
				bottom: 0;

				.item {
					display: inline-block;
					border-radius: 30%;
					width: .15rem;
					height: .15rem;
					margin: 0 .2rem;
					background-color: rgb(123, 89, 2);

					&.cur {
						background-color: #f7d107;
					}
				}
			}
		}
	}
</style>