<template>
    <div class="parent_div_cal">
        <div class="lodder" v-if="loading" >
			<b-spinner variant="primary" label="Spinning"></b-spinner>
		</div>
        <div v-if="error" class="error"></div>
        <div class="panel panel-default">
        
            <div class="panel-body">
                <div class="row">
                    <div class="col-sm-12">
                        <calendar-header :current-month="currentMonth"
                                         :first-day="firstDay"
                                         :locale="appLocale">
                        </calendar-header>

                        <div class="full-calendar-body">
                            <div class="weeks">
                                <strong :key="dayIndex" class="week" v-for="dayIndex in 7">{{ (dayIndex - 1) | weekDayName(firstDay, appLocale) }}</strong>
                            </div> 

                            <div class="dates" ref="dates">
                                <week :issmall="issmall" v-for="(week, index) in Weeks"
                                      :firstDay="firstDay"
                                      :key="index"
									  :dayclicked="daysync"
                                      :week="week">
                                </week>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import EventBus from './../../eventBus'
	import moment from 'moment';
	import {CHANGE_MONTH} from './actions';

	export default {
		data () {
			return {
				error: null,
				currentYear:moment(this.currentDate).format('YYYY'),
				checker:"",
				currentMonth: moment(this.currentDate).startOf('month')
			}
		},
		props: {
			daysync:{
				type:Number,
				default:0
			},
			currentDate:{
			  type:String,
			  default:moment().toString()
			},
			issmall:{
				   type:Boolean,
				   default:false
				   
			},
			loading:{
				type:Boolean,
				default:false
			},
			allEvents: {
				type: Array,
				default: function () {
					return [];
				}
			},
			showWeekNumberFlag:{
				  type:Boolean,
				  default:true
			},
			firstDay: {
				type: Number | String,
				validator (val) {
					let res = parseInt(val);
					return res >= 0 && res <= 6
				},
				default: 0
			}
		},
		components: {
			'CalendarHeader': require('./Header.vue').default?require('./Header.vue').default:require('./Header.vue'),
			'Week': require('./Week.vue').default?require('./Week.vue').default:require('./Week.vue'),
		},
		created () {
			let me = this;
			this.$root.$on(CHANGE_MONTH, function (payload) {
				me.currentMonth = payload;
			});
		},
			computed: {
				
			monthupdater()
			{
				if(this.selectedMonth)
				{
					this.checker="if";
					this.currentMonth=this.selectedMonth;
					return this.selectedMonth;
				}	
				else
				{
					this.checker="else";
					this.currentMonth=moment().startOf('month');
					return moment().startOf('month');
				}
			
			},
			Weeks () {
				let monthMomentObject = this.getMonthViewStartDate(this.currentMonth, this.firstDay);
				let weeks = [], week = [];

				let daysInCurrentMonth = this.currentMonth.daysInMonth();

				for ( let weekIndex=0; weekIndex < 5; weekIndex++) {

					week = [];
					for (let dayIndex=0; dayIndex < 7; dayIndex++) {

						week.push(this.getDayObject(monthMomentObject, dayIndex));

						monthMomentObject.add(1, 'day');
					}

					weeks.push(week);
				}

				let diff = daysInCurrentMonth-weeks[4][6].date.format('D');


				if(diff > 0 && diff < 3){
					week = [];
					for (let dayIndex=0; dayIndex < 7; dayIndex++) {

						week.push(this.getDayObject(monthMomentObject, dayIndex));

						monthMomentObject.add(1, 'day');
					}

					weeks.push(week);
				}

				return weeks;
			},
			appLocale : function () {
				return 'en';
			},
			events: function () {
				return this.allEvents;
			}
		},
		methods: {
			getEvents (date) {
				return this.events.filter(event => {
					return date.isSame(event.date, 'day')?event:null;
				});
			},

			getMonthViewStartDate (date, firstDay) {
				firstDay = parseInt(firstDay);

				let start = moment(date).locale(this.appLocale);
				let startOfMonth = moment(start.startOf('month'));

				start.subtract(startOfMonth.day(), 'days');

				if (startOfMonth.day() < firstDay) {
					start.subtract(7, 'days');
				}

				start.add(firstDay, 'days');

				return start;
			},

			getDayObject(monthMomentObject, dayIndex){
				let events= this.getEvents(monthMomentObject)				 
				return {
					isPast: moment(monthMomentObject).add(1,'day') < moment(),
					isToday: monthMomentObject.isSame(moment(), 'day'),
					isCurrentMonth: monthMomentObject.isSame(moment(), 'month'),
					weekDay: dayIndex,
					isWeekEnd: (dayIndex == 5 || dayIndex == 6),
					date: moment(monthMomentObject),
					events: events,
					hasEvent:events.length > 0 ? true :false
				};
			},
		},
		filters: {
			weekDayName (weekday, firstDay, locale) {
				firstDay = parseInt(firstDay);
				const localMoment = moment().locale(locale);
				return localMoment.localeData().weekdaysShort()[(weekday + firstDay) % 7];
			}
		}
	}

</script>
<style>
.isBigFont p {
    color: #000;
    padding: 0px 0px 0px 0px;
    font-size: 20px !important;
    text-align: left;
}
.parent_div_cal{
  height: 100%;
  width: 100%;
  position: relative
}
.lodder{
	background-color: rgba(226, 221, 221,0.5);
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}
.panel{
	width: 100%
}
    ul, p {
        margin: 0;
        padding: 0;
    }

    .full-calendar-body {
        margin-top: 20px;
    }
    .weeks {
        display: flex;
        border-top: 1px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
        border-left: 1px solid #e0e0e0;
    }
    .week {
        flex: 1;
        padding: 5px;
        text-align: center;
        border-right: 1px solid #e0e0e0;
    }

    .dates {
        position: relative;
    }
</style>