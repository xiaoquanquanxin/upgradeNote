<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
		<BusinessTop/>
	</div>
</template>
<script>
    import BusinessTop from './BusinessTop/index.vue'


    export default {
        name: 'App',
        template: BusinessTop,
        components: {
            BusinessTop
        },
        data() {
            return {
                msg: '这是App.vue'
            }
        }
    }

</script>