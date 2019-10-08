<template>
  <div class="rootdiv">
    <div>
      <b-navbar toggleable="lg" type="dark" variant>
        <b-navbar-brand :href="href">
          <b-img-lazy
            class="logo"
            src="https://www.amityhealthcaregroup.com/wp-content/uploads/2019/03/amity-logo-1.png"
          ></b-img-lazy>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="testing_main" is-nav v-if="isAdmin">
            <b-nav-item :active="$route.name === 'seminarCreate'" class="navlink" href="/education/#/admin/seminar/create">Create Seminar</b-nav-item>
            <b-nav-item :active="$route.name === 'seminarRegister'" href="/education/#/admin/seminar/register" class="navlink">Register</b-nav-item>
            <b-nav-item  :active="($route.name === 'seminarscheduled') || ($route.name === 'dashbord')"
              href="/education/#/admin/seminar/scheduled"
              class="navlink"
            >Scheduled Seminars</b-nav-item>
            <b-nav-item @click.stop="logout" href="#" class="navlink">LogOut</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="testing_main" is-nav v-else>
            <b-nav-item :active="false" class="navlink" href="https://amityhealthcaregroup.com" >HOME</b-nav-item>
            <b-nav-item href="https://amityhealthcaregroup.com/about-us/" class="navlink">ABOUT US</b-nav-item>
            <b-nav-item href="/#/" class="navlink">SERVICES</b-nav-item>
            <b-nav-item :active="true" href="https://amityhealthcaregroup.com/education/#/" class="navlink">EDUCATION</b-nav-item>
            <b-nav-item href="https://amityhealthcaregroup.com/resources/" class="navlink">RESOURCES</b-nav-item>
            <b-nav-item href="https://amityhealthcaregroup.com/contact/" class="navlink">CONTACT US</b-nav-item>
            <!-- <b-nav-item href="/#/" class="navlink buttonspecial">SUBMIT YOUR INQUIRY</b-nav-item> -->
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div class="page_header">{{$route.meta.title}}</div>
  </div>
</template>

<script>
import Extra from "./../extra";
import EventBus from './../eventBus'
export default {
  data() {
    return {
      isAdmin: Extra.isAuthenticated()
    };
  },
  computed: {
    href() {
      return Extra.isAuthenticated() ? "/#/admin" : "/";
    }
  },

created(){
    this.$root.$on("ADMIN_LOGIN",this.loginAdmin);
},

  watch: {
    $route: function(ob) {}
  },
  methods: {
    loginAdmin(){
        this.isAdmin=true
    },
    logout() {
      Extra.logout().then(res => {
        window.location.reload();
        this.$router.push({
          path: "/"
        });
      });
    }
  }
};
</script>

<style scoped>
.page_header {
  justify-content: center;
  align-items: center;
  display: flex;
  color: white;
  font-weight: 500;
  font-size: 23px;
  width: 100%;
  height: 50px;
  background-color: #003f8c;
  margin-bottom: 20px;
}
.submit_btn {
  width: 40px;
  background-color: #003f8c;
  border-radius: 25px;
  color: transparent;
  background-image: url("https://amityhealthcaregroup.com/wp-content/themes/medici/arrow_03.png");
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: center;
  border-radius: 0 25px 25px 0;
}
.active {
  color: #003f8c !important;
  border-radius: 50px;
  border: 2px solid transparent;
}
.custom_textBox {
  max-width: 100%;
  width: 250px;
  margin-right: 0px;
  height: 36px;
  padding: 0 5px;
  border: 2px solid #003f8c;
  border-right: none;
  border-radius: 25px 0 0 25px;
}
.testing_main {
  display: flex;
  flex: 1;
  justify-content: space-around;
}
@import url("https://fonts.googleapis.com/css?family=Rubik&display=swap");
.nav_main {
  height: 90px;
  padding-left: 15px;
  padding-right: 60px;
}
.nav-item > a {
  font-weight: 800;
  font-family: "Rubik", sans-serif !important;
  /* color: #003f8c !important; */
  text-decoration-color: #003f8c !important;
  border-radius: 50px;
  border: 2px solid transparent;
  text-transform: uppercase;
  text-decoration: none;
}

.nav-item > a:hover {
  color: #003f8c !important;
  border-radius: 50px;
  border: 2px solid #003f8c;
}
a.nav-link.active {
  color: #003f8c !important;
  border-radius: 50px;
  border: 2px solid #003f8c;
}
.logo {
  height: 100%;
  width: 67%;
}
.nav-link {
  color: black !important;
}
.row.pageheadertext {
  background: #003f8c;
  color: #fff;
  text-align: center;
  padding: 5px;
  display: block;

  margin-bottom: 30px !important;
}
h3.pageheadertext {
  margin: 0px !important;
  padding: 5px;
  text-transform: uppercase;
}
.label01.col {
  font-weight: 800;
  color: #000;
  text-align: left;
}
button.navbar-toggler {
  background: #003f8c;
  right: 0px;
  float: right !important;
}
.navbar-expand-lg .navbar-nav {
  display: inline !important;
}
@media (min-width: 769px) {
  a.nav-link {
    width: auto !important;
    float: left !important;
    margin: 0px 5px !important;
  }
}
@media (max-width: 768px) {
  a.nav-link {
    width: 100% !important;
  }
  a.nav-link.active {
    border: none;
  }
  .navbar-dark .navbar-brand {
    width: 70% !important;
    float: left !important;
  }
}
li.nav-item.navlink.buttonspecial a {
  background: #003f8c;
  color: #fff !important;
  padding: 5px 15px;
  float: right !important;
}
</style>
