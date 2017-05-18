<template>
	<div class="lastest-container">
		<div class="item" v-for="(val, i) in list">{{val.text}}-{{i}}</div>
	</div>
</template>

<script>
	export default {
		name: 'Lastest',

		data() {
			return {
				list: [{text: '文本'},{text: '文本'},{text: '文本'},{text: '文本'},{text: '文本'},{text: '文本'},{text: '文本'},{text: '文本'},{text: '文本'},{text: '文本'}]
			}
		}
	}
</script>

<style lang="scss">
	.lastest-container {
		width: 100%;

		.item {
			width: 100%;
			height: 2.8rem;
			vertical-align: middle;
		}
	}
</style>