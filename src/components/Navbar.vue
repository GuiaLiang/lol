<template>
	<div class="nav-container" ref="navContainer">
		<ul class="wrap" ref="navWrap" :style="{width: content.length * 22 + '%'}">
			<li class="item" v-for="(val, i) in content" key="nav-{{i}}" @touchstart="slideStart" @touchend.stop.prevent="slideEnd($event,i)">{{val}}</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'Navbar',

		data() {
			return {
				content: ['最新', '官方', '娱乐', '活动', '攻略','收藏'],
				startTime: 0,
				cache: {}
			};
		},

		mounted() {
			let navWrap = this.$refs.navWrap;
			let navContainer = this.$refs.navContainer;
			let item = navWrap.querySelector('.item');
			this.cache.navWrap = navWrap;
			this.cache.navContainer = navContainer;
			this.cache.navContainerWidth = navContainer.offsetWidth;
			this.cache.navWrapWidth = navWrap.offsetWidth;
			this.cache.itemWidth = item.offsetWidth;
		},

		methods: {
			slideStart(e) {
				this.startTime = +new Date();
			},
			// 通过$event来传递响应的event对象
			slideEnd(e, i) {
				let end = +new Date();
				if(end - this.startTime < 250) {
					// 计算选中导航栏居中的位置，以5个显示为标准，左边两个右边两个，计算方式如下：
					// 1、当所选导航栏左边少于两个兄弟时，translateX为0；
					// 2、当所选导航栏右边少于两个兄弟时（通过导航栏总长度－当前导航栏index < 3），translateX为 wrap宽度－container宽度
					// 3、当所选导航栏左右各有大于等于两个兄弟时，先向左偏移至只有两个导航出现在可视区域，比如左边有3个，先向左偏移1个，使其只有2个出现在可视区域；然后加上由当前所选导航栏的中心点（2个导航栏＋0.5个导航栏）减去container的中心点（container宽度 ／ 2）的差
					if(i < 2) {
						this.$velocity(this.cache.navWrap, { translateX: 0 });
					} else if(this.content.length - i < 3) {
						this.$velocity(this.cache.navWrap, { translateX: this.cache.navContainerWidth - this.cache.navWrapWidth + 'px' });
					} else {
						let offset = (2 - i) * this.cache.itemWidth + (this.cache.navContainerWidth/2 - this.cache.itemWidth * 2.5);
						this.$velocity(this.cache.navWrap, { translateX: offset+'px' });

					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.nav-container {
		position: relative;
		width: 100%;
		height: 1rem;
		background-color: #fff;
		overflow: hidden;

		&:before {
			content: "";
			position: absolute;
			left: 0;
			width: 6%;
			height: 100%;
		    z-index: 10;	
			background-color: #fff;
			box-shadow: 9px 0px 20px 0px #fff;
		}

		&:after {
			content: "";
			position: absolute;
			top: 0;
			right: 0;
			width: 6%;
			height: 100%;
		    z-index: 10;	
			background-color: #fff;
			box-shadow: -9px 0px 20px 0px #fff;
		}

		.wrap {
			height: 100%;
			line-height: 1rem;
			text-align: center;
			font-size: 26px;
			display: flex;

			.item {
				flex-grow: 1;
				height: 100%;
			}
		}
	}
</style>