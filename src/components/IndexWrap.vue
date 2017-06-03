<template>
	<div class="index-container">
		<router-view></router-view>
		<div class="navga" ref="navga">
			<div class="tag" @touchend="changeTab(i,$event)" v-for="(val, i) in tabs" :data-type="val.type">
				<img v-show="i === curTabIndex" :src="val.checked" alt="tab图标">
				<img v-show="i !== curTabIndex" :src="val.uncheck" alt="tab图标">
				<span class="text" :class="{curtab: i === curTabIndex}">{{val.text}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import {CONTENT_TAB_CHANGE_ACTION} from '@/store/mutation-types'
	export default {
		name: 'IndexWrap',

		computed: {
			tabs() {
				return this.$store.state.content.tabArr;
			},

			curTabIndex() {
				return this.$store.state.content.tabIndex;
			},

			curType() {
				return this.navBar[this.$store.state.content.navIndex].type;
			}
		},

		methods: {
			changeTab(i, e) {
				this.$store.dispatch(CONTENT_TAB_CHANGE_ACTION, i);
				let target = e.target;
				while(target.className.indexOf('tag') < 0) {
					target = target.parentNode;
				}
				let type = target.getAttribute('data-type');
				switch(type) {
					case 'news':
						this.$router.push('/content/news');
						break;
					case 'friends':
						this.$router.push('/content/friends');
						break;
					default:
						break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.index-container {
		box-sizing: border-box;
		width: 100%;
		min-height: 100%;
		overflow: hidden;

		.navga {
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 30;
			width: 100%;
			height: 1.6rem;
			line-height: 0;
			background-color: #e8e8e8;

			.tag {
				display: inline-block;
				height: 100%;
				width: 25%;
				box-sizing: border-box;
				position: relative;

				img {
					width: 0.72rem;
					height: 0.72rem;
					position: absolute;
				    top: 50%;
				    left: 50%;
				    transform: translate(-50%,-75%);
				}

				.text {
					color: #000;
					font-size: 28px;
					height: 0.72rem;
					line-height: 0.72rem;
					display: inline-block;
					text-align: center;
					position: absolute;
				    bottom: 25%;
				    left: 50%;
				    transform: translate(-50%,50%);

					&.curtab {
						color: #d8b868;
					}
				}
			}
		}
	}
</style>