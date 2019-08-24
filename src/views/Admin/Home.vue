<template>
  <b-container fluid>
    <Calendar :loading="loading" :first-day="1" :all-events="events" :showWeekNumberFlag="true"></Calendar>
  </b-container>
</template>
<script>
import Calendar from "@/components/Calendra/Calendar";
// import moment=require('moment');
import EventBus from './../../eventBus'
export default {
  components: {
    Calendar: Calendar
  },
  data() {
    return {
      events: [],
      loading: true
    };
  },

  created() {
    let _this = this;
    this.loadData(moment());
    this.$root.$on("CHANGE_MONTH", function(date) {
      _this.loadData(date);
    });

    this.$root.$on("DAY_SELECTED", function(date) {
      if (date.event.events.length > 0) {
        _this.eventSelected(date.event.events[0]);
      }
    });
  },
  methods: {
    eventSelected(ev) {
     if(this.$route.name != 'dashbord') return
      if (ev.isFull) {
        this.$router.push({ name: "bookingFully" });
      } else {
        this.$router.push({ name: "seminarscheduled", params: { id: ev.id } });
      }
    },
    loadData(start_date) {
      console.log('load data');
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
    }
  }
};
</script>
<style>

</style>

 
