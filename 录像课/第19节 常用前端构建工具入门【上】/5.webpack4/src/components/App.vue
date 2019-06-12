<template>
	<div class="hello">123
		<h1>{{ msg }}</h1>
<!--		<BusinessTop/>-->
	</div>
</template>
<script>
    import BusinessTop from './BusinessTop'

    export default {
        name: 'HelloWorld',
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