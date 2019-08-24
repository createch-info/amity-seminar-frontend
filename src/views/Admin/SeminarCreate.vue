<template>
  <b-form style="font-weight:bold;">
    <b-form-group
      id="input-group-1"
      label-cols-sm="12"
      label-cols-lg="3"
      label="Seminar Title:"
      label-for="input-horizontal"
      :invalid-feedback="errors.first('title')"
    >
      <b-form-input
        id="input-1"
        v-model="form.title"
        :state="errors.first('title') ? false : true"
        v-validate="'required|min:5'"
        name="title"
        placeholder="Seminar Title"
        :invalid-feedback="errors.first('title')"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      label-cols-sm="12"
      label-cols-lg="3"
      id="input-group-2"
      label="Capacity:"
      label-for="input-2"
      :invalid-feedback="errors.first('capacity')"
    >
      <b-form-input
        :state="errors.first('capacity') ? false : true"
        v-validate="'required'"
        type="number"
        name="capacity"
        min="1"
        id="input-2"
        v-model="form.capacity"
        placeholder="Enter Capacity"
      ></b-form-input>
    </b-form-group>
    <b-row>
      <b-col md="6">
        <b-form-group
          label-cols-sm="12"
          label-cols-lg="6"
          label-cols-md="6"
          id="input-group-2"
          label="Seminar Date:"
          label-for="input-2"
          :invalid-feedback="errors.first('seminar_date')"
        >
          <date-picker
            :class="[error.seminar_date ? 'error' : '']"
            id="input-2"
            name="seminar_date"
            :state="errors.first('seminar_date') ? false : true"
            v-validate="'required'"
            placeholder="Seminar Date"
            v-model="form.seminar_date"
            :config="options"
          ></date-picker>
          <div
            v-if="error.seminar_date"
            role="alert"
            aria-live="assertive"
            class="divError"
            aria-atomic="true"
          >{{error.seminar_date[0]}}</div>
        </b-form-group>
      </b-col>
      <b-col md="3">
        <b-form-group
          label-cols-sm="12"
          label-cols-lg="3"
          id="input-group-2"
          label="Start Time:"

          label-for="input-2"
          :invalid-feedback="errors.first('start_time')"
        >
          <b-form-input
            type="time"
            id="input-2"
            name="start_time"
            v-model="form.start_time"
            :state="errors.first('start_time') ? false : true"
            v-validate="'required'"
            ref="starttime"
            placeholder="Enter Start Time"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col md="3">
        <b-form-group
          label-cols-sm="12"
          label-cols-lg="3"
          id="input-group-2"
          label="End Time:"
          label-for="input-2"
          :invalid-feedback="errors.first('end_time')"
        >
          <b-form-input
            type="time"
            id="input-2"
            v-model="form.end_time"
            :state="errors.first('end_time') ? false : true"
            v-validate="'required|isBigger:starttime'"
            name="end_time"
            placeholder="Enter Capacity"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6">
        <b-form-group
          label-cols-sm="6"
          label-cols-lg="6"
          label-cols-md="6"
          id="input-group-2"
          label="Venue address:"
          label-for="input-2"
          :invalid-feedback="errors.first('venue_address')"
        >
          <b-form-textarea
            id="textarea"
            v-model="form.venue_address"
            :state="errors.first('venue_address') ? false : true"
            placeholder="Enter Venue Address"
            rows="8"
            name="venue_address"
            max-rows="6"
            v-validate="'required'"
          ></b-form-textarea>
        </b-form-group>
      </b-col>
      <b-col md="6">
        <GmapMap
          ref="mapRef"
          :center="currentCroods"
          :zoom="7"
          map-type-id="terrain"
          style="width: 500px; height: 200px"
          :options="{
   zoomControl: true,
   mapTypeControl: false,
   scaleControl: false,
   streetViewControl: false,
   rotateControl: false,
   fullscreenControl: true,
   disableDefaultUi: false
 }"
        >
          <gmap-marker
            @dragend="setLocation"
            v-if="currentCroods"
            :position="currentCroods"
            :clickable="true"
            :draggable="true"
            @click="setLocation"
          ></gmap-marker>
          <gmap-info-window v-if="currentCroods" :position="currentCroods"></gmap-info-window>
        </GmapMap>
      </b-col>
    </b-row>
    <b-form-group
      label-cols-sm="12"
      label-cols-lg="3"
      id="input-group-2"
      label="Description:"
      label-for="input-2"

      :invalid-feedback="errors.first('description')"
    >
      <b-form-textarea
        :state="errors.first('description') ? false : true"
        id="textarea"
        v-model="form.description"
        placeholder="Enter description..."
        rows="10"
        v-validate="'required'"
        name="description"
        max-rows="6"
      ></b-form-textarea>
    </b-form-group>
    <b-form-group
      :invalid-feedback="errors.first('cost_per_seat')"
      label-cols-sm="12"
      label-cols-lg="3"
      id="input-group-2"
      label="Cost Per Seat:"
      label-for="input-2"
    >
      <b-form-input
        type="number"
        min="1"
        id="input-2"
        name="cost_per_seat"
        v-model="form.cost_per_seat"
        :state="errors.first('cost_per_seat') ? false : true"
        v-validate="'required|decimal'"
        placeholder="Cost Per Seat"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      :invalid-feedback="errors.first('reminder_numbers')"
      label-cols-sm="12"
      label-cols-lg="3"
      id="input-group-2"
      label="No. of Reminders:"
      label-for="input-2"
    >
      <b-form-select
        :state="errors.first('reminder_numbers') ? false : true"
        @change="reSetschedules"
        name="reminder_numbers"
        placeholder="No. of Reminders"
        v-model="form.reminder_numbers"
        v-validate="'required'"
        :options="[1,2,3,4]"
      ></b-form-select>
    </b-form-group>
    <b-form-group
      label-cols-sm="12"
      label-cols-lg="3"
      id="input-group-2"
      label="Reminder schedule:"
      label-for="input-2"
    >
      <b-form-select
        placeholder="Reminder schedule"
        v-for="index in form.reminder_numbers || 0"
        :key="index"
        size="sm"
        class="mt-3"
        v-model="form.schedules[index]"
        :options="[
       {value:1,text:'1 Month Before'},
       {value:2,text:'1 Week Before'},
       {value:3,text:'2 Days Before'},
       {value:4,text:'24 Hours Before'},
       {value:5,text:'1 Hour Before'}
       ]"
      ></b-form-select>
    </b-form-group>
    <div class="footer_form">
      <b-button @click="onSubmit" variant="success">Create Seminar</b-button>
    </div>
    <Loadder v-if="isProcess"/>
  </b-form>
</template>
<script>

import http from "./../../http";
import "bootstrap/dist/css/bootstrap.css";
import datePicker from "vue-bootstrap-datetimepicker";
import "pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css";
import { gmapApi } from "vue2-google-maps";
import Loadder from "@/components/Loadder";
import { Validator } from "vee-validate";

Validator.extend('isBigger', (value, [otherValue]) => {
  return value >= otherValue;
}, {
  hasTarget: true
});



const dict = {
  custom: {
    title:
    {
      required: "Title is required"
    },
    capacity:
    {
      required: "Capacity is required"
    },
    description:
    {
      required: "Description is required"
    },
    venue_address: {
      required: "Venue address is required"
    },
    start_time: {
      required: "Start Time is required"
    },
    end_time: {
      required: "End Time is required",
      isBigger:'End time should be greater than start time'
    },
    cost_per_seat: {
      required: "Cost per seat is required"
    },
    reminder_numbers: {
      required: "No. of reminders is required"
    },
  }
};

Validator.localize("en", dict);

export default {
  data() {
    return {
      isProcess: false,
      currentCroods: {},
      date: new Date(),
      options: {
        format: "MM/DD/YYYY",
        useCurrent: false,
        minDate: new Date()
      },
      error: {},
      form: {
        start_time:`${moment().format("hh:mm")}`,
        end_time:`${moment().format("hh:mm")}`,
        title: null,
        capacity: 50,
        seminar_date: new Date(),
        description: null,
        schedules: []
      }
    };
  },
  components: {
    Loadder,
    datePicker
  },
  mounted() {
    let _this = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          _this.currentCroods = {
            ...position.coords,
            lat: parseFloat(position.coords.latitude),
            lng: parseFloat(position.coords.longitude)
          };
          _this.$refs.mapRef.$mapPromise.then(map => {
            map.panTo({
              lat: parseFloat(position.coords.latitude),
              lng: parseFloat(position.coords.longitude)
            });
          });
        },
        function(error) {
          alert(error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  },
  computed: {
    google: gmapApi
  },
  methods: {
    setLocation(ev) {
      let geocoder = new this.google.maps.Geocoder();
      let locations = {
        lat: ev.latLng.lat(),
        lng: parseFloat(ev.latLng.lng())
      };
      this.currentCroods = locations;
    },
    onSubmit(evt) {
      let _this = this

      this.$validator.validate().then(valid => {
        if (valid) {
          if(this.form.reminder_numbers && this.form.reminder_numbers != (this.form.schedules.length - 1)) 
          return  this.$swal({allowOutsideClick: false,
                title: 'please select all reminders schedules',
                type: "warning",
                showCloseButton: false,
                showCancelButton: false,
                focusConfirm: false,
                confirmButtonText: 'OK',
              });

          evt.preventDefault();
          this.isProcess = true;
          this.form.lat = this.currentCroods.lat;
          this.form.lng = this.currentCroods.lng;
          this.$http
            .post("seminar", this.form)
            .then(res => {
              let title = this.form.title;
              this.isProcess = false;
              // this.$swal(`You have successfully created seminar ${title}.`);
              this.$swal({allowOutsideClick: false,
                title: `You have successfully created seminar </span>"${title}".`,
                type: "success",
                
                showCloseButton: false,
                showCancelButton: false,
                focusConfirm: false,
                confirmButtonText: 'OK',
                //confirmButtonAriaLabel: "Create another seminar",
              }).then(respon=>{
                 this.form = {
                title: "",
                capacity: 45,
                seminar_date: new Date(),
                description: null,
                schedules: []
                 };

                     _this.$router.push({
                       name:'seminarscheduled'
                 });

              });
              
              // (this.isProcess = false((this.error = {}))),
              //   this.$swal("Save successfully ");
            })
            .catch(error => {
              this.isProcess = false;
              this.error = error.errors;
            });
        } else {
          this.$swal({allowOutsideClick: false,
         //   title: "Validation",
            text: "Please fill all required detail",
            type: "warning"
            // showCancelButton: false,
          });
        }
      });

      return;
    },
    reSetschedules() {
      this.form.schedules = [];
    }
  }
};
</script>
<style>
.footer_form {
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
}
.error {
  border: red solid 1px;
}
.divError {
  width: 100%;
  font-size: 80%;
  color: #dc3545;
  line-height: 2;
}
input {
  border: solid 1px #000 !important;
}
label {
  width: 160px;
  padding: 5px 0px !important;
}
textarea {  
  border: solid 1px #000 !important;
}
select {
  border: solid 1px #000 !important;
}
.swal2-content
{
  font-size:18px;
}
.swal2-title
{
  font-size:18px;
  font-weight: 100
}
@media(max-width: 768px){
  .vue-map-container{
    max-width: 100%!important;
  }
}
</style>
