<template>
  <div id="app">
    <Header/>
    <b-container class="main" fluid>
         <router-view :key="$route.fullPath"/>
    </b-container>
    <Footer/>
  </div>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  components:{
    Header,
    Footer
  }
}
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.css';
@import '~bootstrap-vue/dist/bootstrap-vue.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}
@media(min-width:1200px){
.container{
  max-width: 1260px!important;
}
}
.main{
  position: relative;
  margin: 0;
  padding: 0;
}
.fa-icon {
    top: .125em;
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
  border-width: .2rem;
}
</style>
