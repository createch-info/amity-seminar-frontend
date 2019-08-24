<template>
  <div class="row">
    <div class="col-sm-4">
      <button @click.stop="goPrev" class="btn btn-outline btn-primary" style="font-size:14px;">
        <i class="fa fa-backward" aria-hidden="true"></i>
        Previous
      </button>
      <!-- <div class="form-group">
               
      </div>-->
    </div>
    <div class="col-sm-4 header-center">
      <div class="title">{{title}}</div>

      <!-- <div class="btn-group"> -->

      <!-- <button @click.stop="goToday" class="btn btn-outline btn-default today-button">&dArr; Today</button> -->

      <!-- </div> -->
    </div>
    <div class="col-sm-4">
      <button style="float: right; font-size:14px;" @click.stop="goNext" class="btn btn-outline btn-primary" >
        Next
        <i class="fa fa-forward" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { CHANGE_MONTH } from "./actions";
import EventBus from './../../eventBus'
export default {
  data() {
    return {
      localeSelect: "en"
    };
  },
  props: {
    currentMonth: {},
    locale: {
      type: String
    }
  },
  computed: {
    title() {
      if (!this.currentMonth) return;
      return this.currentMonth.locale(this.locale).format("MMMM YYYY");
    }
  },
  methods: {
    goPrev() {
      let payload = moment(this.currentMonth)
        .subtract(1, "months")
        .startOf("month");
      this.$root.$emit(CHANGE_MONTH, payload);
    },
    goNext() {
      let payload = moment(this.currentMonth)
        .add(1, "months")
        .startOf("month");
       
     this.$root.$emit(CHANGE_MONTH, payload);
    },
    goToday() {
      this.$root.$emit(CHANGE_MONTH, moment());
    },
    setLocale() {
      
    }
  }
};
</script>
<style>
.full-calendar-header {
  display: flex;
  align-items: center;
}
.header-center {
  flex: 3;
  text-align: center;
}
.title {
  text-align: center;
  font-size: 1.5em;
  font-weight: bolder;
}
.language-select {
  display: inline-block;
  width: 50%;
}
</style>