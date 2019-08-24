<template>
  <b-container>
      <v-row>
        <v-col>
          <span style="background-color:#A9A9A9; padding:10px;">&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp; <b>Expired Sessions</b>
          &nbsp;&nbsp;
          <span style="background-color:#007bff; padding:10px;">&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp; <b>Upcomming Sessions</b>
        </v-col>
        <br/><br/>
      </v-row>
      <v-row> 
        <v-col>
          <Calendar :loading="loading" :first-day="1" :all-events="events" :showWeekNumberFlag="true"></Calendar>
        </v-col>
      </v-row>
  </b-container>
</template>

<script>
import Calendar from "@/components/Calendra/Calendar";
import EventBus from './../eventBus'
export default {
  components: {
    Calendar: Calendar
  },
  name: "home",
  created() {
    let _this = this;
    this.loadData(moment());
   this.$root.$on("CHANGE_MONTH", function(date) {
      _this.loadData(date);
    });
    // this.$root.$on("EVENT_SELECTED", function(event) {
    //   _this.eventSelected(event)
    // });
    this.$root.$on("DAY_SELECTED", function(date) {
       if(date.event.events.length > 0){
               _this.eventSelected(date.event.events[0])
       }
       
    });
  },
  methods: {
     loadData(start_date) {
      this.loading = true;
      this.$http
        .get("seminar", {
          params: {
            start_date: start_date.toString()
          }
        })
        .then(responce => {
          this.events = responce;
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
        });
    },
    eventSelected(ev) {
    if(this.$route.name != 'home') return
      if (ev.isFull) {
        this.$router.push({ name: "bookingFully" });
      } else {
        this.$router.push({ name: "booking", params: { id: ev.id } });
      }
      //
    }
  },
  beforeDestroy(){
      //this.$root.$off("DAY_SELECTED")    
  },
  
  data() {
    return {
       events: [],
      loading:true
    };
  },
};
</script>


