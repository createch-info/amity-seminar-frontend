<template>
  <full-calendar
    ref="calendar"
    :event-sources="eventSources"
  
    :config="config"
  ></full-calendar>
</template>
<script>
import "fullcalendar/dist/fullcalendar.css";
import { FullCalendar } from "vue-full-calendar";
import moment from "moment";
export default {
  components: {
    FullCalendar
  },
  data() {
    return {
      
      config: {
        defaultView: "month",
        showNonCurrentDates: false,
        header: {
          left: "",
          center: "title",
          right: "prev,next"
        },
        
        
      },
      selected: {}
    };
  },

  mounted() {
    this.getData();
  },

  methods: {
    getData(start_date, end_date) {
      this.$http
        .get("seminar", {
          params: {
            start_date,
            end_date
          }
        })
        .then(responce => {
          this.events = responce;
        });
    },
    refreshEvents() {
      this.$refs.calendar.$emit("refetch-events");
    },
     
  },
  computed: {
    eventSources() {
      const self = this;
      return [
        {
          events(start, end, timezone, callback) {
            self.$http
              .get("seminar", {
                params: {
                  start_date: start.toDate(),
                  end_date: end.toDate()
                }
              })
              .then(responce => {
                callback(responce);
              });
          }
        }
      ];
    }
  }
};
</script>

