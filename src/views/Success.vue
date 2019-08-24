<template>
  <b-container>
    <div class="show_div">
    <div class="successDiv">You have successfully registered for Seminar "{{f_title}}"</div>
    
   <b> <span>
      Confirmation will be emailed to :
    </span>
    <span>
      {{this.emails}}
    </span></b><br/>
    <span style="color:red;">If you do not receive confirmation email within 15 minutes, please check your junk/spam folder and mark Amity message as 'Not spam'</span> 
    <br>
    <span class="info">
     For any questions or cancellation requests, please contact Amity's administrator at: 303-690-2749 or eg@amityhealthcaregroup.com
    </span>
    <br>
    <b-button @click="$router.push({ path: '/' })" variant="success">BACK TO SEMINARS</b-button> 
    </div>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      title: null,
      emails:''
    };
  },
  computed: {
    f_title() {
      return this.title;
    }
  },
  mounted() {
    this.title = this.$route.params.title;
    this.emails = this.$route.params.emails
  }
};
</script>
<style>
.show_div{
  justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
}
.info{
      font-size: 18px;
    font-weight: 700;
    margin-top: 50px;
}
  .successDiv{
     margin-bottom: 50px;
   
    border: green solid 2px;
    border-top-width: 5px;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: block;
    color: green;
 
    font-weight: 800;

    padding: 20px;
    text-align: center;
  }
</style>
