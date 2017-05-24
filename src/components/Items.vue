<template>
	<div class="items-container">
		<div class="item" v-for="(val, i) in this.content">
			<div class="left">
				<div class="img" :style="{background: 'url(' + val.img + ') no-repeat center / cover'}"></div>
			</div>
			<div class="right">
				<span class="title">{{val.title}}</span>
				<span class="article">{{val.article | subArticle}}</span>
				<span class="wrap">
					<span class="time">{{val.time | timeFormatter}}</span>
					<span class="read">{{val.read}}</span>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Items',

		props: {
			content: {
				type: Array,
				required: true
			}
		},

		filters: {
			subArticle(value) {
				if(typeof value === 'string') {
					if(value.length > 27) {
						return value.substring(0, 27) + '...';
					}
				}

				return value;
			},

			timeFormatter(value) {
				let now = +new Date();
				let time = +new Date(value);
				let diff = now - time;
				if(diff < 24*3600*1000) {
					if(diff / 60000 < 60) {
						return Math.floor(diff / 60000) + '分钟前';
					} else {
						return Math.ceil(diff / 60000 / 60) + '小时前';
					}
				} else {
					return value.substring(5, 16);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.items-container {
		width: 100%;
		padding: .2rem 5%;
		box-sizing: border-box;
		background-color: rgba(204, 204, 204, 0.2);

		.item {
			box-sizing: border-box;
			width: 100%;
			height: 2.4rem;
			vertical-align: middle;
			padding: .2rem;
			background-color: #fff;

			.left {
				float: left;
				width: 2.6rem;
				height: 2rem;

				.img {
					display: inline-block;
					width: 100%;
					height: 100%;
				}
			}

			.right {
				box-sizing: border-box;
				height: 2rem;
				overflow: hidden;
				padding-left: .2rem;

				.title {
					display: inline-block;
					width: 100%;
					height: 0.6rem;
					font-size: 28px;
					font-weight: bold;
				}

				.article {
					display: inline-block;
					width: 100%;
					height: 1rem;
					color: #ccc;
				}

				.wrap {
					display: inline-block;
					width: 100%;
					height: 0.4rem;
					line-height: 0.4rem;

					.time {
						display: inline-block;
						margin-right: .2rem;
						color: #ccc;
					}

					.read {
						color: #ccad60;
					}
				}
			}
		}
	}
</style>