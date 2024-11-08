<template>
	<div class="indexview">
		<a-divider style="border-color: #7cb305" dashed>Services</a-divider>
		<div class="list">
			<a-image :width="200" src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
			<div class="text">
				<div class="title">
					<div class="tites">
						<span style="font-size: 20px; font-weight: bold">Website Creation</span>
						<span>We carefully take the time to listen to our customers and help them build what is right for them. </span>
					</div>
					<span>Our passion for building websites is based on three principles; honesty, quality and professionalism.</span>
				</div>
				<div><a-button type="primary">Primary Button</a-button> <a-button>Primary Button</a-button></div>
			</div>
		</div>
		<div class="list">
			<div class="text">
				<div class="title">
					<div class="tites">
						<span style="font-size: 20px; font-weight: bold">Website Creation</span>
						<span>We carefully take the time to listen to our customers and help them build what is right for them. </span>
					</div>
					<span>Our passion for building websites is based on three principles; honesty, quality and professionalism.</span>
				</div>
				<div><a-button type="primary">Primary Button</a-button> <a-button>Primary Button</a-button></div>
			</div>
			<a-image :width="200" src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
		</div>
		<div class="list">
			<a-image :width="200" src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
			<div class="text">
				<div class="title">
					<div class="tites">
						<span style="font-size: 20px; font-weight: bold">Website Creation</span>
						<span>We carefully take the time to listen to our customers and help them build what is right for them. </span>
					</div>
					<span>Our passion for building websites is based on three principles; honesty, quality and professionalism.</span>
				</div>
				<div><a-button type="primary">Primary Button</a-button> <a-button>Primary Button</a-button></div>
			</div>
		</div>
	</div>
</template>

<script setup>
	// import imageSrc from "./logo.png"; // 使用 import 引入图片
	import { Divider as ADivider } from "ant-design-vue";
	import { Image as AImage } from "ant-design-vue";
	import { Button as AButton } from "ant-design-vue";
</script>

<style lang="scss">
	.indexview {
		.ant-divider-inner-text {
			font-size: 35px;
		}
		.ant-btn-primary:not(:disabled):hover {
			background-color: #262626;
		}
		.ant-btn-primary {
			background-color: #262626;
		}
		.ant-btn-default:not(:disabled):hover {
			border: 1px solid rgb(217, 217, 217);
			color: #262626;
		}

		.list {
			display: flex;
			padding-bottom: 60px;
			flex-direction: row;
			justify-content: space-between;
			gap: 20px;
			.text {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.title {
					display: flex;
					flex-direction: column;
					gap: 20px;
					.tites {
						display: flex;
						flex-direction: column;
						gap: 5px;
					}
				}
			}
		}
	}
</style>
