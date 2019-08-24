<template>
  <div>
    <v-row>
        <v-col>
          <span style="background-color:#A9A9A9; padding:10px;">&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp; <b>Expired Sessions</b>
          &nbsp;&nbsp;
          <span style="background-color:#007bff; padding:10px;">&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp; <b>Upcomming Sessions</b>
        </v-col>
        <br/><br/>
        <a href="#content" id="top"></a>
    </v-row>
    <b-row>
      <b-col>
        <Calendar :loading="loading" :first-day="1" :current-date="currentSeminar._correct_date" :all-events="events" :showWeekNumberFlag="true"></Calendar>
      </b-col>
    </b-row>
    <span id="content"></span>
    <b-row v-if="currentSeminar.id" class="mt-3" >
      <b-col v-if="!isUpdate" md="9" sm="12" xl="9" >
        <b-row style="margin:0px!important">
          <b-col class="label01">
            <label v-text="`${currentSeminar.title || ''}`"></label>
          </b-col>
          <b-col class="label01" style="text-align:right;">
           <label
              v-text="`${formatedSeminarDate} ${currentSeminar.seminar_date ? currentSeminar.seminar_date.split(' - ').pop():''} - ${currentSeminar.end_time || ''}`"
            ></label>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col sm="2">
            <label for="textarea-default" style="font-weight:bold;">Description:</label>
          </b-col>
          <b-col sm="10">
            <read-more more-str="read more" :text="currentSeminar.description" link="#" less-str="read less" :max-chars="250"></read-more>
            <!-- <b-form-textarea
              id="textarea-default"
              v-model="currentSeminar.description"
              placeholder="Description"
              rows="3"
              :disabled="isEnable"
              max-rows="6"
            ></b-form-textarea> -->
          </b-col>
        </b-row>

        <b-row class="mt-3">
          <b-col sm="2">
            <label for="textarea-default" style="font-weight:bold;">Slots:</label>
          </b-col>
          <b-col sm="8">
            <b-form-input :disabled="isEnable" v-model="currentSeminar.capacity"></b-form-input>
          </b-col>
          <!-- <b-col sm="2">
            <b-button @click="isEnable = false" v-if="isEnable" variant="primary">Update</b-button>
            <b-button @click="saveSlots" v-else variant="success">Save</b-button>
          </b-col> -->
        </b-row>
        <b-row class="mt-2">
          <b-col sm="2">
            <label for="textarea-default" style="font-weight:bold;">Registrants Count:</label>
          </b-col>
          <b-col sm="8">
            <b-form-input disabled v-model="currentSeminar.registrants_count"></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mt-2">
          <b-col sm="2">
            <label for="textarea-default" style="font-weight:bold;">Venue Address:</label>
          </b-col>
          <b-col md="4" sm="12">
            {{currentSeminar.venue_address}}
            <!-- <b-form-textarea disabled rows="3" v-model="currentSeminar.venue_address"></b-form-textarea> -->
          </b-col>
          <b-col md="4" sm="12">
            <GmapMap
              v-if="currentCroods.lat"
              ref="mapRef"
              :center="currentCroods"
              :zoom="10"
              map-type-id="terrain"
              style="width: 250px; height: 157px"
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
                v-if="currentCroods"
                :position="currentCroods"
                :clickable="false"
                :draggable="false"
              ></gmap-marker>
              <gmap-info-window
                v-if="currentSeminar.venue_address"
                :position="currentCroods"
              >{{currentSeminar.venue_address}}</gmap-info-window>
            </GmapMap>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col sm="2">
            <label for="textarea-default" style="font-weight:bold;">Cost per seat:</label>
          </b-col>
          <b-col sm="8">
            <b-form-input disabled v-model="currentSeminar.FormatedCost"></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mt-2">
          <b-col sm="2">
            <label for="textarea-default" style="font-weight:bold;">Reminder:</label>
          </b-col>
          <b-col sm="8">
            <b-form-input disabled v-model="currentSeminar.reminder_numbers"></b-form-input>
          </b-col>
        </b-row>


           <b-row class="mt-2">
          <b-col sm="2">
            <label for="textarea-default" style="font-weight:bold;">Reminder Schedules:</label>
          </b-col>
          
          <b-col sm="8">
            <b-form-select
              required
              v-for="(item,index) in currentSeminar.schedules"
              :key="index"
              size="sm"
              class="mt-3"
             disabled
              v-model="currentSeminar.schedules[index]"
       :options="[
       {value:1,text:'1 Month Before'},
       {value:2,text:'1 Week Before'},
       {value:3,text:'2 Days Before'},
       {value:4,text:'24 Hours Before'},
       {value:5,text:'1 Hour Before'}
       ]"
       
            ></b-form-select>  
          </b-col>
        </b-row>

      </b-col>
      <b-col md="9" sm="12" xl="9" style="font-weight:bold;" v-else>
        <b-form @submit="onSubmit">
          <b-form-group
            id="input-group-1"
            label-cols-sm="12"
            label-cols-lg="3"
            label="Seminar Title:"
            label-for="input-horizontal"
            :invalid-feedback="error.title ? error.title[0] : '' "
          >
            <b-form-input
              id="input-1"
              v-model="currentSeminar.title"
              :state="error.title ? false : true"
              required
              placeholder="Seminar Title"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="12"
            label-cols-lg="3"
            id="input-group-2"
            label="Capacity:"
            label-for="input-2"
            :invalid-feedback="error.capacity ? error.capacity[0] : '' "
          >
            <b-form-input
              :state="error.capacity ? false : true"
              type="number"
              id="input-2"
              v-model="currentSeminar.capacity"
              required
              placeholder="Enter Capacity"
            ></b-form-input>
          </b-form-group>
          <b-row>
            <b-col sm="12" md="3">
              <label for="textarea-default">Seminar Date:</label>
            </b-col>
            <b-col sm="12" md="9">
              <date-picker
              disabled
                :class="[error.seminar_date ? 'error' : '']"
                id="input-2"
                required
                placeholder="Seminar Date"
                v-model="currentSeminar.seminar_date"
                :state="error.seminar_date ? false : true"
                :config="{
                      format: 'MM/DD/YYYY',
                    useCurrent: false,
                    minDate: new Date()
                        }"
              ></date-picker>
            </b-col>

            <b-col>
              <b-form-group
                label-cols-sm="12"
                label-cols-lg="6"
                id="input-group-2"
                label="Start Time:"
                label-for="input-2"
                :invalid-feedback="error.start_time ? error.start_time[0] : '' "
              >
                <b-form-input
                disabled
                  :state="error.start_time ? false : true"
                  type="time"
                  id="input-2"
                  v-model="currentSeminar.start_time"
                  required
                  placeholder="Enter Start Time"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                label-cols-sm="12"
                label-cols-lg="6"
                id="input-group-2"
                label="End Time:"
                label-for="input-2"
                :invalid-feedback="error.end_time ? error.end_time[0] : '' "
              >
                <b-form-input
                disabled
                  :state="error.end_time ? false : true"
                  type="time"
                  id="input-2"
                  v-model="currentSeminar.end_time"
                  required
                  placeholder="Enter Capacity"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6" sm="6" lg="6">
              <b-form-group
                label-cols-sm="12"
                label-cols-lg="6"
                label-cols-md="6"
                id="input-group-2"
                label="Venue Address:"
                label-for="input-2"
                :invalid-feedback="error.venue_address ? error.venue_address[0] : '' "
              >
                <b-form-textarea
                  :state="error.venue_address ? false : true"
                  id="textarea"
                  v-model="currentSeminar.venue_address"
                  placeholder="Enter Venue Address"
                  rows="10"
                  max-rows="6"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="6">
              <GmapMap
                ref="mapRef"
                :center="currentCroods"
                :zoom="7"
                map-type-id="terrain"
                style="width: 350px; height: 250px"
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
            :invalid-feedback="error.description ? error.description[0] : '' "
          >
            <b-form-textarea
              :state="error.description ? false : true"
              id="textarea"
              v-model="currentSeminar.formated_description"
              placeholder="Enter description..."
              rows="10"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>
          <b-form-group
            :invalid-feedback="error.cost_per_seat ? error.cost_per_seat[0] : '' "
            label-cols-sm="12"
            label-cols-lg="3"
            id="input-group-2"
            label="Cost Per Seat:"
            label-for="input-2"
          >
          <b-form-input  :state="error.FormatedCost ? false : true" disabled v-model="currentSeminar.FormatedCost"></b-form-input>
            <!-- <b-form-input
            disabled
              :state="error.FormatedCost ? false : true"
              type="number"
              id="input-2"
              v-model="currentSeminar.FormatedCost"
              required
              placeholder="Cost Per Seat"
            ></b-form-input> -->
          </b-form-group>
          <b-form-group
            :invalid-feedback="error.reminder_numbers ? error.reminder_numbers[0] : '' "
            label-cols-sm="12"
            label-cols-lg="3"
            id="input-group-2"
            label="No. of Reminders:"
            label-for="input-2"
          >
            <b-form-select
              :state="error.reminder_numbers ? false : true"
              @change="reSetschedules"
              required
              v-model="currentSeminar.reminder_numbers"
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
              required
              v-for="index in parseInt(currentSeminar.reminder_numbers)"
              :key="index"
              size="sm"
              class="mt-3"
              :id="`select-${index}`"
              v-model="currentSeminar.schedules[index -1]"
             :options="[
       {value:1,text:'1 Month Before'},
       {value:2,text:'1 Week Before'},
       {value:3,text:'2 Days Before'},
       {value:4,text:'24 Hours Before'},
       {value:5,text:'1 Hour Before'}
       ]"
            ></b-form-select>
          </b-form-group>
          <b-row style="justify-content:center">
            <b-button type="submit" variant="success">Update Seminar</b-button>
          </b-row>

        </b-form>
      </b-col>

      <b-col md="3" sm="12" xl="3">
        <!-- <b-row class="mt-1">
          <b-button block class="button-style" variant="success">REGISTRANTS DETAILS</b-button>
        </b-row> -->
        <b-row class="mt-1" v-if="!isUpdate">
          <b-button class="button-style"
            :disabled="!currentSeminar.id"
            block
            @click="isUpdate = !isUpdate"
            variant="success"
          >UPDATE SEMINAR</b-button>
        </b-row>

        <b-row class="mt-1">
          <b-button class="button-style"
            :disabled="!currentSeminar.id"
            block
            @click="deleteSeminar"
            variant="success"
          >DELETE SEMINAR</b-button>
        </b-row>
        <b-row class="mt-1">
          <b-button class="button-style"
            block
            :disabled="!currentSeminar.id"
            @click="deleteRegister"
            variant="success"
          >DELETE REGISTRANTS</b-button>
        </b-row>
      </b-col>
    </b-row>

    <!-- Table -->
    <b-row class="mt-5" v-if="!isUpdate && currentSeminar.id">
      <b-col lg="12" sm="12" xs="12" md="12">
        <b-form-input v-model="search" placeholder="type to search"></b-form-input>
      </b-col>
      <b-col class="mt-2">
        <vuetable
          ref="vuetable"
          track-by="id"
          :per-page="10"
          :first-page="0"
          :api-url="`https://testing.amityhealthcaregroup.com/education/api/admin/seminar/registrants/${currentSeminar.id}?query=${search}`"
          :fields="columns"
          data-path="data"
          pagination-path
          @vuetable:pagination-data="onPaginationData"
        ></vuetable>
        <vuetable-pagination
          :css="pagination"
          @vuetable-pagination:change-page="onChangePage"
          ref="pagination"
        ></vuetable-pagination>
      </b-col>
    </b-row>
     
    <Loadder v-if="isProcess"/>
    <!-- <Loadder/> -->
  </div>
</template>
<script>
import "fullcalendar/dist/fullcalendar.css";
import datePicker from "vue-bootstrap-datetimepicker";
import "pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css";
import Calendar from "@/components/Calendra/Calendar";
import Loadder from "@/components/Loadder";
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetableFieldCheckbox from "vuetable-2/src/components/VuetableFieldCheckbox.vue";
import VuetableFieldSequence from "vuetable-2/src/components/VuetableFieldSequence.vue";
import { gmapApi } from "vue2-google-maps";
import EventBus from './../../eventBus'

export default {
  components: {
    Calendar,
    Vuetable,
    Loadder,
    datePicker
  },
  data() {
    return {
      loading: false,
      events: [],
      isProcess: false,
      currentCroods: {},
      changeddate:'date', 
      day:1,
      columns: [
        {
          name: VuetableFieldSequence, // <----
          title: "#",
          titleClass: "center aligned",
          dataClass: "right aligned"
        },
        {
          name: VuetableFieldCheckbox, // <----
          titleClass: "center aligned",
          dataClass: "center aligned"
        },
        { title: "Registrant Name", name: "name" },
        { title: "Email", name: "email" },
        { title: "Phone", name: "FormatNumber" },
        { title: "Company", name: "companyName" }
      ],
      error: {},
      search: "",
      isEnable: true,
      isUpdate: false,
      currentSeminar: {},
      pagination: {
        wrapperClass: "pagination b-pagination pagination-md float-right",
        activeClass: "page-link active",
        disabledClass: "disabled",
        pageClass: "page-item page-link",
        linkClass: "page-item page-link",
        paginationClass: "pagination",
        paginationInfoClass: "float-left",
        dropdownClass: "form-control",
        icons: 
        {
          first: "fa fa-chevron-left",
          prev: "fa fa-chevron-left",
          next: "fa fa-chevron-right",
          last: "fa fa-chevron-right"
        }
      },
      config: {
        defaultView: "month",
        showNonCurrentDates: false,
        header: {
          left: "prev",
          center: "title",
          right: "next"
        }
      }
    };
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
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    deleteRegister() {
      if (!this.currentSeminar.id) return;
      let delete_d = this.$refs.vuetable.selectedTo;
      if (delete_d.length === 0) return;
      let _this = this
      this.$swal({
        title: "Are you sure you want to delete selected registrants?",
        text: "You can't undo this action",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        allowOutsideClick: false,
      }).then(result => {
        if (result.value) {
          this.isProcess = true;
          this.$http
            .delete(`seminar/registran/${this.currentSeminar.id}`, {
              params: {
                ids: delete_d,
              }
            })
            .then(responce => {
              _this.isProcess = false;
              _this.$refs.vuetable.refresh();
              _this.$swal({allowOutsideClick: false,
              type: "success",
                title:" Registrants successfully deleted and refund processed",
                confirmButtonText: "OK",

               allowOutsideClick: false,
              }).then(respon=>{
                   window.location.reload();
              });
            });
        }
      });
    },
    deleteSeminar() {
      let _this = this
      this.$swal({allowOutsideClick: false,
        title: `Are you sure you want to delete seminar "${this.currentSeminar.title}"?`,
        text: "you can't undo this action",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.isProcess = true;
          this.$http
            .delete(`seminar/${this.currentSeminar.id}`)
            .then(responce => {
              _this.isProcess = false;
              _this.$swal({allowOutsideClick: false,
                type: "success",
                title:`Seminar "${_this.currentSeminar.title}" deleted successfully`,
                allowOutsideClick: false,
              }).then(res => {
                  window.location.reload();
              });
              // _this.loadData(_this.changeddate);
              // _this.currentSeminar = {};
              //  _this.error = {};
               
            });
        }
      });
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.currentSeminar.lat = this.currentCroods.lat;
      this.currentSeminar.lng = this.currentCroods.lng;
      this.currentSeminar.description=this.currentSeminar.formated_description;

      this.isProcess = true;
      this.$http
        .put(`seminar/${this.currentSeminar.id}`, this.currentSeminar)
        .then(res => {
          this.isProcess = false;
          this.isUpdate = false
          this.$swal({
              type: "success",
                title: `You have successfully updated  "${this.currentSeminar.title}" seminar`,
                allowOutsideClick: false
              }).then(res => window.location.reload());
        })
        .catch(error => {
          this.error = error.errors;
        });
    },
    reSetschedules() {
      this.currentSeminar.schedules = [];
    },

    eventSelected(ev) {
      this.isProcess = true;
      this.$http.get(`seminar/${ev.id}`).then(responce => {
       this.currentSeminar = responce;
         this.isProcess = false;
        if (responce.lat && String(responce.lat).trim()) {
          this.currentCroods = {
            lat: parseFloat(responce.lat),
            lng: parseFloat(responce.lng)
          };
        } else {
          this.currentCroods = {};
        }

        if(!this.isProcess)
          document.getElementById('top').click();
      });
    },

    saveSlots() {
      this.isProcess = true;
      this.$http
        .post(`seminar/updateslot/${this.currentSeminar.id}`, {
          slot: this.currentSeminar.capacity
        })
        .then(resp => {
          this.isProcess = false;
          this.isEnable = true;
        });
    },
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
    }
  },
  created() {
    let _this = this;
    this.loadData(moment());
    this.$root.$on("CHANGE_MONTH", function(date) {
      _this.changeddate=date;
      _this.loadData(date);
    });

    this.$root.$on("DAY_SELECTED", function(date) {
      if (date.event.events.length > 0) {
        _this.eventSelected(date.event.events[0]);
      } else {
      }
    });

    if(this.$route.params.id){
      this.eventSelected({
        id:this.$route.params.id,
      })
    }
  },
  computed: {
    google: gmapApi,
    formatedSeminarDate() {
      return this.currentSeminar.seminar_date
        ? moment(this.currentSeminar.seminar_date.split(" - ")[0]).format(
            "MM/DD/YYYY"
          )
        : "";
    },
  }
};
</script>
<style>
.label01.col {
  font-weight: 800;
  color: #000;
  text-align: left;
}
.label01.col {
  padding: 0px;
}
.button-style
{
  margin:6px 0px;
  border-radius:16px;
  width:70%;
  margin-left:30px;
}
.swal2-content
{
  font-size:18px;
}
.swal2-title
{
  font-weight:100;
  font-size:18px;
}
.swal2-styled.swal2-confirm
{
  padding: 5px 20px;
}
.swal2-styled.swal2-cancel
{
  padding: 5px 20px;
}
.vuetable-body-wrapper {
    width: 100%!;
    overflow: scroll!important;
}
@media (max-width:768px){
  .vue-map-container{
    max-width: 100%!important;
  }
}

pre {
            overflow-x: auto;
            font-family:'Avenir', Helvetica, Arial, sans-serif;
            white-space: pre-wrap;
            white-space: -moz-pre-wrap;
            white-space: -pre-wrap;
            white-space: -o-pre-wrap;
            word-wrap: break-word;
         }
</style>
