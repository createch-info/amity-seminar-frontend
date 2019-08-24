<template>
    <div class="panel no-margin" :class="[event.color]" @click="showEventDetails">
         <div class="panel-heading event-title" :class="{'clickable-event':isDaySelected,'text-color': isPast}"><a href="#" style="color:black;text-decoration:underline;"> Seminar: {{event.title}} </a></div>
    </div>
</template>

<script>
import EventBus from './../../eventBus'
    export default {
        props: {
            event: {
                type: Object
            },
            isDaySelected: {
                type: Boolean
            },
            isPast:{
                type:Boolean
            }
        },
        methods: {
            showEventDetails() {
                if(this.isDaySelected){
                   this.$root.$emit("EVENT_SELECTED", this.event);
                    // alert(this.event.title+' is selected. Can you help implement this too?');
                }
            }
        }
    }
</script>
<style>
    .event-title {
        padding: 0px 5px;
        font-size: 12px;
        font-weight: 700;
        color: white
    }
    .text-color{
        color: black !important
    }
</style>