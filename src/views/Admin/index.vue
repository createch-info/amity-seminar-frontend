<template>
  <b-container class="">
        <router-view :key="$route.fullPath"/>
  </b-container>
</template>
<style>
@import "~bootstrap/dist/css/bootstrap.css";
@import "~bootstrap-vue/dist/bootstrap-vue.css";
 .adminView{
       padding-left: 10%;
    padding-right: 10%;
    padding-top: 5%;
 }
.main {
  margin: 0;
  /* padding: 0; */
}
.fa-icon {
  top: 0.125em;
  position: relative;
}
.b-main-content {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  margin-right: 0;
  margin-left: 0;
}
.b-form-1 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  margin-right: 0;
  margin-left: 0;
  border-width: 0.2rem;
}

</style>

