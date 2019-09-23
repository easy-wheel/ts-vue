<template>
    
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component({
    components: {}
})
export default class Nav extends Vue {
    menuList: Array<object> = [
        {
            path: '',
            name: ''
        }
    ]
}
</script>

<style lang="less" scoped>
    
</style>