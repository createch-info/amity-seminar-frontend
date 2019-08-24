<template>
  <b-card   title="Login" class="mylogin">
    <b-card-body>
      <b-container fluid>
        <b-row class="my-1">
          <b-col sm="3">
            <label>User Name/Email</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="user.email" type="email"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label>Password</label>
          </b-col>
          <b-col sm="9">
            <b-form-input  v-model="user.password" type="password"></b-form-input>
          </b-col>
        </b-row>
      </b-container>
    </b-card-body>
    <b-card-footer  align="center" >
        <b-button @click="login" variant="primary"  >Login</b-button>
    </b-card-footer>
    <Loadder v-if="isProcess" />
  </b-card>
</template>
<script>
import Loadder from '@/components/Loadder'
import Extra from './../extra'
import EventBus from './../eventBus'
export default {
  components:{
Loadder
  },
    data(){
        return{
          isProcess:false,
            user:{
                email:'admin@admin.com',
                password:'123456789'
            }
        }
    },
    methods:{
        login(){
          this.isProcess=true
            this.$http.post('login',this.user).then(responce=>{
                Extra.storeToken({
                    access_token:`Bearer ${responce.token}`
                }).then(res=>{
                   this.isProcess=false
                   this.$root.$emit("ADMIN_LOGIN")
                 
                   document.location.href="/education/#/admin"
              

                })
            }).catch(error=>{
this.isProcess=false
            })
        }
    }
}
</script>
<style>
@media (min-width:769px) {
.card.mylogin {
    width: 500px;
    margin: 0px auto;
}  
}

@media (max-width:768px) {
.card.mylogin {
    width: 100%;
    margin: 0px auto;
}  
}

</style>


