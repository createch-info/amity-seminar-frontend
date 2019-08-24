<template>
<div   class="mainDiv d-flex justify-content-center mb-3">
  <b-spinner  variant="primary" label="Loading..."></b-spinner>
</div>
</template>
<script>
export default {
    methods:{
        getStyle(){
            
            return {
                height:`${$(document).height()}px !important`
            }
        }
    }
}
</script>

<style>
.mainDiv{
    justify-content: center;
    align-items: center;
        width: 100%;
    height: 100%;
   background-color: rgba(226, 221, 221,0.5);
    display: table;
    flex: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
}
  
 
</style>

