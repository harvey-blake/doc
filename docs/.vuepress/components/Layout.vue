<template>
	<div class="ad">
		<span> 白天搞智能合约，晚上撸前端代码，只要咖啡还续着，凌晨照样在线！会说 Solidity、PHP、Node.js，还有 Vue 和 HTML 的“方言”，代码不怕我不写，就怕写完跑太快。Bug？那都是小场面，一出手就搞定。我的宗旨是——交付准时，调试无敌，客户满意才是真理！</span>
		<a-button type="primary" @click="open">合作联系</a-button>
	</div>
</template>
<script setup>
	import { Carousel as ACarousel, Button as AButton } from "ant-design-vue";

	const open = () => {
		window.open("https://t.me/eduvue", "_blank");
	};
	// console.log(AntDesignVue);
</script>
<style scoped lang="scss">
	.ad {
		margin-top: 40px;
		padding: 20px;
		border-radius: 8px;
		background-color: rgba(255, 229, 100, 0.3);
		line-height: 1.5; /* 相对行高，推荐值 */
		font-family: -apple-system, "BlinkMacSystemFont", "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		gap: 10px;
		.ant-btn-primary:not(:disabled):hover {
			background-color: #262626;
		}
		.ant-btn-primary {
			background-color: #262626;
			font-size: 20px;
			height: 60px;
			padding: 12px 25px;
		}
	}
	/* For demo */
</style>
