<template>
	<div class="content-container">
		<div class="fresh-loading">
			<i></i>
			<span class="text"> {{freshText}} </span>
		</div>
		
		<div class="carousel-wrap" ref="carouselWrap"></div>

		<div class="content-wrap" ref="contentWrap">
			<!-- <div class="carousel-wrap" :class="{carouselfixed: isCarouselFixed}" ref="carouselWrap"></div> -->
			<div class="slide-content" ref="content" @touchstart.stop.prevent="contentTouchStart" @touchmove.stop.prevent="contentTouchMove" @touchend.stop.prevent="contentTouchEnd">
				<div class="item" v-for="(val, i) in list">{{val.text}}-{{i}}</div>
			</div>
			<!-- <router-view></router-view> -->
		</div>

		<div class="navga" ref="navga"></div>
	</div>
</template>

<script>
	export default {
		name: 'Content',

		data() {
			return {
				freshText: '下拉更新',
				startPoint: {x: 0, y: 0},
				offset: 0,
				maxOffset: 0,
				isScroll: false,
				list: [{text: '文本'},{text: '文本'},{text: '文本'},{text: '文本'},{text: '文本'},{text: '文本'},{text: '文本'},{text: '文本'},{text: '文本'},{text: '文本'}]
			}
		},

		mounted() {
			let content = this.$refs.content;
			let navga = this.$refs.navga;
			let list = content.querySelectorAll('.item');
			let elem = list[list.length-1].getBoundingClientRect();
			let nav = navga.getBoundingClientRect();
			this.maxOffset = elem.bottom - nav.top;
		},

		updated() {
			let content = this.$refs.content;
			let navga = this.$refs.navga;
			let list = content.querySelectorAll('.item');
			let elem = list[list.length-1].getBoundingClientRect();
			let nav = navga.getBoundingClientRect();
			this.maxOffset += elem.bottom - nav.top;
		},

		computed: {
			listview() {
				return this.list;
			}
		},

		methods: {
			contentTouchStart(e) {
				this.startPoint = {x: e.touches[0].pageX, y: e.touches[0].pageY};
				this.isScroll = true;
				this.offset = this.offset > 0? 0: this.offset;
			},

			contentTouchMove(e) {
				let cp = {x: e.touches[0].pageX, y: e.touches[0].pageY};
				let carouselWrap = this.$refs.carouselWrap;
				let content = this.$refs.content;
				if(this.isScroll) {
					this.offset += cp.y - this.startPoint.y;

					if(this.offset < 0 && Math.abs(this.offset) > this.maxOffset) {
						this.offset = -this.maxOffset;
					}

					if(this.offset < 0 && Math.abs(this.offset) >= carouselWrap.offsetHeight/2) {
						carouselWrap.style.transform = 'translate3d(0, ' +(-carouselWrap.offsetHeight/2) + 'px, 0)';

						if(Math.abs(this.offset) >= this.maxOffset) {
							content.style.transform = 'translate3d(0, ' + (0-this.maxOffset) + 'px, 0)';
							this.isScroll = false;
							setTimeout(() => {
								if(this.list.length < 16) {
									this.list = this.list.concat([{text: '文本'},{text: '文本'}]);
								}
								this.isScroll = true;
							}, 2000);
						} else {
							content.style.transform = 'translate3d(0, ' + this.offset + 'px, 0)';
						}

					} else if(this.offset >= 0) {
						carouselWrap.style.transform = 'translate3d(0, 0, 0)';
						content.style.transform = 'translate3d(0, 0, 0)';
					} else {
						//header.style.top = this.offset + 'px';
						carouselWrap.style.transform = 'translate3d(0, ' + this.offset + 'px, 0)';
						content.style.transform = 'translate3d(0, ' + this.offset + 'px, 0)';
					}

					this.startPoint = cp;
				}
			},

			contentTouchEnd(e) {
				this.isScroll = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content-container {
		width: 100%;
		min-height: 100%;
		overflow: hidden;
		// display: flex;
		// flex-direction: column;
		position: relative;
		background-color: #fff;

		.fresh-loading {
			position: absolute;
			top: -1rem;
			width: 100%;
			height: 1rem;
		}

		.content-wrap {
			margin: 4.4rem 0 1.6rem;

			.item {
				width: 100%;
				height: 2.8rem;
				vertical-align: middle;
			}
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
			background-color: red;
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
</style>