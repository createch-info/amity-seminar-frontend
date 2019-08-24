<template>
  <div class="week-row" @click="showWeekNumber">
    <day :issmall="issmall" :dayselect="dayclicked" v-for="(day, index) in week" :day="day" :key="index"></day>
  </div>
</template>
<script>
import { WEEK_SELECTED } from "./actions";
import EventBus from './../../eventBus'
export default {
  components: {
    Day: require("./Day.vue").default
      ? require("./Day.vue").default
      : require("./Day.vue")
  },
  props: {
    dayclicked:{
        type:Number,
				default:0,
    },
    issmall:{
				   type:Boolean,
				   default:false
				   
			},
    week: {
      type: Array
    }
  },
  created() {
    let me = this;
    this.$root.$on(WEEK_SELECTED, function(payload) {
      if (payload.weekDate != me.week[0].date) {
        // me.showWeekNumberFlag = false;
      }
    });
  },
  methods: {
    showWeekNumber() {
      let me = this;
      // me.showWeekNumberFlag = true;
      this.$root.$emit(WEEK_SELECTED, { weekDate: me.week[0].date });
    }
  }
};
</script>
<style>
.week-row {
  width: 100%;
  border-left: 1px solid #e0e0e0;
  display: flex;
  /* cursor: pointer; */
}
.week-number {
  border: 1px solid #e1e1e1;
  border-right: 0px;
  border-radius: 5px 0 0 5px;
  background-color: #fafafa;
  text-align: right;
  position: absolute;
  width: 70px;
  left: -71px;
  padding: 8px 5px;
  cursor: pointer;
}
</style>