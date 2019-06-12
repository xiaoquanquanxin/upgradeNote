<template>
	<div>{{msg}}
	<p v-text="txt"></p>
	</div>
</template>

<script>
    export default {
        name: 'BusinessTop',
        data() {
            return {
                msg: '这是BusinessTop',
	            txt:'businessTop'
            }
        }
    }
</script>

<style>
	@import "./index.css";

</style>
