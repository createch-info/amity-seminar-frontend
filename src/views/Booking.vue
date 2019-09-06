<template>
  <b-container>
    <b-row v-if="isProcess">
      <b-col>
      </b-col>
    </b-row>
    <b-row v-if="!isProcess">
        <b-col md="8" sm="12" lg="8" class="calender-root">
        <b-row>
          <b-col>
            <b-button to="/" variant="primary">Back To Calendar</b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="label01">
            <label v-text="`${currentSeminar.title || ''}`"></label>
          </b-col>
          <b-col class="label02">
            <label
              v-text="` ${formatedSeminarDate} ${currentSeminar.seminar_date ? currentSeminar.seminar_date.split(' - ').pop():''} - ${currentSeminar.end_time || ''}`"
            ></label>
          </b-col>
        </b-row>

        <b-row v-if="currentSeminar.isFull && !currentSeminar.isPast">
          <span class="full_text col">
            Seminar is currently full.
            <br />Please register for the next upcoming seminar
            <br />or email the administrator at eg@amityhealthcaregroup.com or call at 303-690-2749 to be waitlisted for the event
          </span>
        </b-row>
        
        <b-row style="margin-bottom:-20px;">
            <b-col>
                         <b><b-form-group
                          label-cols-sm="6"
                          label-cols-lg="6"
                          label-cols-md="6"
                          label="Seminar Description:"
                        >  </b-form-group></b>
            </b-col>
        </b-row>
        
        <b-row class="mt-2">
          <b-col>
            <!-- <div v-html="currentSeminar.description"></div> -->
            <read-more more-str="read more" :text="currentSeminar.description" link="#" less-str="read less" :max-chars="250"></read-more>
            <!-- <b-form-textarea v-model="currentSeminar.description" disabled rows="8" max-rows="8"></b-form-textarea> -->
          </b-col>
        </b-row>
        
        <b-row  class="mt-2">
          <b-col>
            <b-row>
              <b-col> 
                <b><b-form-group
                  label-cols-sm="6"
                  label-cols-lg="6"
                  label-cols-md="6"
                  label="Venue Address:"
                  class="venue-address"
                ></b-form-group> </b>
              </b-col>
            </b-row>
             <b-row >
                  <b-col>
                     <read-more more-str="read more" :text="currentSeminar.venue_address" link="#" less-str="read less" :max-chars="250"></read-more>
                      
                      <!-- <b-form-textarea disabled rows="6" style="background-color:white;border:none;resize: none;outline:none;" v-model="currentSeminar.venue_address"></b-form-textarea> -->
                      <br/>
                  </b-col>
              </b-row>
          </b-col>
          <b-col style="padding-top:38px;">
            <GmapMap
              v-if="currentCroods.lat"
              ref="mapRef"
              :center="currentCroods"
              :zoom="15"
              map-type-id="terrain"
              style="width: 250px; height: 157px;"
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
              >{{currentSeminar.formated_venue_address}}</gmap-info-window>
            </GmapMap>
          </b-col>
        </b-row>
        
        <br/>

         <div> <!-- v-if="currentSeminar.isPast"> -->
            <b-row><!-- v-if="currentSeminar.isFull"-->
              <b-col sm="12">
                <label :for="`type`" class="labelsi col-form-label"><b>Fee:</b></label>
              </b-col>
              <b-col sm="12">
                <span>{{currentSeminar.FormatedCost}}</span>
              </b-col>
            </b-row>
          </div>

        <b-row v-if="!currentSeminar.isFull" class="mt-2">
          <!-- <b-col>
            <b-form-group
              label-cols-sm="3"
              label-cols-lg="3"
              label-cols-md="3"
              id="input-group-2"
              label="Number Of registrants"
              label-for="input-2"
          >-->
          <!-- <b-form-input
                @change="changeRegistrants"
                @input="changeRegistrants"
                type="number"
                min="1"
                required
                v-model="currentSeminar.numberofregistrants"
                placeholder="Enter registrants..."
          ></b-form-input>-->
          <!-- <label class="form-control">{{registrants.length || 0}}</label>
            </b-form-group>
          </b-col>-->

          <!-- <b-col>
            <b-row>
              <b-col sm="3">
                <label :for="`type`" class="labelsi col-form-label">Seats Available</label>
              </b-col>
              <b-col sm="9  ">
                <span class="form-control labelse">{{currentSeminar.empty_seat}}</span>
              </b-col>
            </b-row>
          </b-col>-->
        </b-row>

        <!-- <div>
          <b-button @click="addNewReg" variant="primary">ADD NEW REGISTRANT</b-button>
        
        </div>-->
   </b-col>
          
    <b-col>
              <b-row class="calender">
              <!-- <Calendar
                v-if="!loading"
                :issmall="true"
                :loading="loading"
                :first-day="1"
                :current-date="currentSeminar._correct_date"
                :daysync="day"
                :all-events="events"
                :showWeekNumberFlag="true"
              ></Calendar> -->

                <Calendar
                :issmall="true"
                v-if="!isProcess"
                :loading="loading"
                :first-day="1"
                :daysync="day"
                :current-date="currentSeminar._correct_date"
                :all-events="events"
                :showWeekNumberFlag="true"
              ></Calendar>
            </b-row>
    </b-col>
  </b-row>

    <b-row >
      <b-col md="12" sm="12" lg="8">
       
     <div v-if="!currentSeminar.isPast">
      <b-row v-if="!currentSeminar.isFull" class="mt-2">          
          <b-col
            class="mt-2"
            md="12"
            sm="12"
            lg="12"
            :key="index"
            v-for="(item,index) in registrants"
          >
            <b-card no-body class="mb-1">
              <b-card-header
                header-tag="header"
                class="p-1"
                role="tab"
                style="background-color:#E8ECEF;"
              >
                <div class="card_header">
                  <div>
                    <span>
                      <b>{{ item.name ? item.name:`Registrant-${index +1}`}}</b>
                    </span>
                  </div>
                  <div>
                    <b-button
                      @click="removeReg(index)"
                      class="trash"
                      v-if="index > 0"
                      variant="danger"
                  
                    >
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </b-button>
                    <b-button  v-b-toggle="'collapse-' + index" variant="primary" class="rotatebtn">
                      <i class="fa fa-chevron-down" aria-hidden="true"></i>
                    </b-button>
                    <!-- <b-button @click="deleteRegistran(index)" variant="danger">X</b-button> -->
                  </div>
                </div>
              </b-card-header>
              <b-collapse :id="'collapse-'+index" visible accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <b-form-group
                    label-cols-sm="4"
                    label-cols-lg="3"
                    id="input-group-2"
                    label="Name (First Last)"
                    label-for="input-2"
                    :invalid-feedback="l_error[`registrants.${index}.name`] ? l_error[`registrants.${index}.name`][0] : '' "
                  >
                    <b-form-input
                      :state="l_error[`registrants.${index}.name`] ? false : true"
                      v-model="item.name"
                      required
                      placeholder="Enter Name"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group
                    label-cols-sm="4"
                    label-cols-lg="3"
                    id="input-group-2"
                    label="Email"
                    label-for="input-2"
                    :invalid-feedback="l_error[`registrants.${index}.email`] ? l_error[`registrants.${index}.email`][0] : '' "
                  >
                    <b-form-input
                      :state="l_error[`registrants.${index}.email`] ? false : true"
                      type="email"
                      v-model="item.email"
                      required
                      placeholder="Enter Email"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group
                    :invalid-feedback="l_error[`registrants.${index}.phoneNumber`] ? l_error[`registrants.${index}.phoneNumber`][0] : '' "
                    label-cols-sm="4"
                    label-cols-lg="3"
                    id="input-group-2"
                    label="Phone Number"
                    label-for="input-2"
                  >
                    <the-mask
                      placeholder="Enter Phone number"
                      :class="{'is-invalid':l_error[`registrants.${index}.phoneNumber`] ? true:false,'is-valid':l_error[`registrants.${index}.phoneNumber`] ? false:true}"
                      label="US Phone"
                      mask="+1 (###) ###-####"
                      class="form-control"
                      v-model="item.phoneNumber"
                    ></the-mask>
                  </b-form-group>
                  <b-form-group
                    label-cols-sm="4"
                    label-cols-lg="3"
                    id="input-group-2"
                    label="Company Name"
                    label-for="input-2"
                    :invalid-feedback="l_error[`registrants.${index}.companyName`] ? l_error[`registrants.${index}.companyName`][0] : '' "
                  >
                    <b-form-input
                      :disabled="String(item.applicable) === 'Not Applicable' ? true :false"
                      :state="l_error[`registrants.${index}.companyName`] ? false : true"
                      v-model="item.companyName"
                      required
                      placeholder="Enter company name"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group label-cols-sm="4" label-cols-lg="3">
                    <b-form-checkbox
                      :id="`checkbox-${index}`"
                      v-model="item.applicable"
                      @change="checkBoxChange($event,index)"
                      name="checkbox-1"
                      value="Not Applicable"
                      unchecked-value="Applicable"
                    >Not Applicable</b-form-checkbox>
                  </b-form-group>
                  <b-form-group label-cols-sm="4" label-cols-lg="3" label="Choice of Communication">
                    <b-form-radio-group
                      :id="`radio-group-${index}`"
                      v-model="item.choice_of_communication"
                      :name="`radio-sub-component-${index}`"
                    >
                      <b-form-radio value="Email Only">Email Only</b-form-radio>
                      <b-form-radio value="Email & Text">Email & Text</b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>
                </b-card-body>
              </b-collapse>
            </b-card>
          </b-col>
           <b-col style="text-align:right;margin-bottom:-10px;">
             <b-button @click="addNewReg" variant="success">
                <i class="fa fa-plus" aria-hidden="true">&nbsp;&nbsp;Registrant</i>
            </b-button>
          </b-col>
        </b-row>
      </div>    
          
      </b-col>
      
     <b-col style="position:relative;margin:0px;top:30px">    
       <!-- <b-col>    -->
         <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <div v-if="!currentSeminar.isPast" style="position:absolute;margin:0px;bottom:20px;width:90%;">
          <b-row v-if="!currentSeminar.isFull" class="mt-2 fee-detail myboxD" style="font-weight:bold;">
            <b-row style="width:100%;" sm="12" md="12" lg="12">
              <b-col sm="6">Seminar Fee:</b-col>
              <b-col  >
                <span class="form-control">${{formatMoney(currentSeminar.cost_per_seat)}}</span>
              </b-col>
            </b-row>
            <b-row class="mt-2" style="width:100%" sm="12" md="12" lg="12">
              <b-col sm="6">Number of registrants:</b-col>
              <b-col>
                <label class="form-control">{{registrants.length || 0}}</label>
              
              </b-col>
            </b-row>

            <b-row class="mt-2" style="width:100%" sm="12" md="12" lg="12">
              <b-col sm="6">Total Fee: </b-col>
              <b-col>
                <span
                  class="form-control totalfees"
                >${{ formatMoney(parseFloat(currentSeminar.cost_per_seat || 0) * parseFloat(registrants.length || 0))}}</span>
              </b-col>
            </b-row>
          </b-row>
          
          <b-row v-if="!currentSeminar.isFull" class="mt-2 pr-3 pl-3">
            <b-col block="" sm="12" md="12" lg="12" >
                <PayPal 
                  :button-style="myStyle"
                  v-if="registrantsError"
                  
                  @payment-completed="processPayment"
                  :amount="`${(parseFloat(currentSeminar.cost_per_seat || 0) * parseFloat(registrants.length || 0)).toFixed(2)}`"
                  currency="USD"
                  :experience="{
                      input_fields: {
                no_shipping: 1
              }
                    }"
                  :client="paypal"
                  env="sandbox"
                ></PayPal>

                <span v-if="!currentSeminar.isPast">
                    <button v-if="!registrantsError || currentSeminar.isFull" disabled class="dummybutton">Buy Now</button>
                  </span>   
              
            </b-col>
          </b-row>
        </div>  
      </b-col>
    </b-row>
    <!-- <b-modal id="modal-center" centered hide-footer hide-header>
      <div class="modelDiv">
        <span style="font-weight: 800;">Disclaimer</span>

        <div class="hrDiv"></div>
        <span style="text-align: center;font-size: 15px;
    margin-top: 5px;">
          You are begin re-directed to a third party site. Please
          acknowledge the disclaimer before proceeding further
        </span>
      </div>
      <div class="modelDivPay">
        <PayPal
          :button-style="myStyle"
          @payment-completed="processPayment"
          :amount="`${parseFloat(currentSeminar.cost_per_seat || 0) * parseFloat(registrants.length || 0)}`"
          currency="USD"
          :experience="{
                input_fields: {
          no_shipping: 1
        }
              }"
          :client="paypal"
          env="sandbox"
        ></PayPal>
        <b-button pill @click="$bvModal.hide('modal-center')" style="width: 200px;
    height: 38px;">Cancel</b-button>
      </div>
    </b-modal> -->
    <Loadder v-if="isProcess" />
  
  </b-container>
</template>

<script>
import EventBus from "./../eventBus";
import Calendar from "@/components/Calendra/Calendar";
import PayPal from "vue-paypal-checkout";
import Loadder from "@/components/Loadder";
import moment from "moment";
import { TheMask } from "vue-the-mask";

export default {
  beforeDestroy() {},
  components: {
    TheMask,
    Calendar: Calendar,
    PayPal,
    Loadder
  },
  data() {
    return {
      day:0,
     myStyle: {
        label: "buynow",
        size: "responsive",
        shape: "pill",
        color: "blue"
      },
      loading: false,
      events: [],
      isProcess: false,
      paypal: {
        sandbox:
          "AT1L2reKiixvOpfviW4EasOTaQXKhigqLpIIbBeHQfUWPYi_XWoWat8ppdsYZMwdmHsCj1dx6NnG36YN",
        production: "<production client id>"
      },
      error: {},
      registrants: [
        {
          name: null,
          phoneNumber: null,
          email: null,
          companyName: null,
          applicable: "Applicable",
          choice_of_communication: "Email Only"
        }
      ],
      currentCroods: {},
      currentSeminar: {
          description:''
      }
    };
  },
  created() {
    let _this = this;
    
    if (this.$route.params.id) {
      this.loadData(this.$route.params.id);
    }

    // this.loadEventData(moment());
    
    this.$root.$on("CHANGE_MONTH", function(date) {
      _this.loadEventData(date);
    });
    
    this.$root.$on("DAY_SELECTED", function(date) {
      if (date.event.events.length > 0) {
        _this.eventSelected(date.event.events[0]);
      } else {
      }
    }); 
  },
  methods: {
    removeReg(index) {

      //this.registrants = this.registrants.filter((item,i) =>  i != index );
      this.registrants = this.registrants.filter((item,i) =>  i != index );
      
      delete this.l_error[`registrants.${index}.name`]
      delete this.l_error[`registrants.${index}.email`]
      delete this.l_error[`registrants.${index}.phoneNumber`]
      delete this.l_error[`registrants.${index}.companyName`]

      if(index!=this.registrants.length)
      {
        delete this.l_error[`registrants.${this.registrants.length}.name`]
        delete this.l_error[`registrants.${this.registrants.length}.email`]
        delete this.l_error[`registrants.${this.registrants.length}.phoneNumber`]
        delete this.l_error[`registrants.${this.registrants.length}.companyName`]
      }
      
    },
    addNewReg() {
      let _this = this;
      let length = this.registrants.length || 0;
      if (length >= this.currentSeminar.empty_seat) {
        this.$swal({allowOutsideClick: false,
          title: "Seminar is near capacity",
          // text: `The selected seminar has only ${this.currentSeminar.empty_seat} available slots. Would you like to proceed?`,
           text: `There are only ${
            this.currentSeminar.empty_seat
          } seats available. Would you like to proceed with registration?`,
          showCancelButton: true,
          type: "warning",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes",
          cancelButtonText: "No"
        }).then(result => {
          if (result.value) {
          } else {
            this.$swal({allowOutsideClick: false,
              title: "Contact Us",
              type: "info",
              text:
                "Please Contact Admin at 303-690-2749 or email at eg@amityhealthcaregroup.com for further assistance",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Home"
            }).then(result => {
              _this.$router.push({ name: "home" });
            });
          }
        });
      } else {
        _this.changeRegistrants();
      }
    },
    deleteRegistran(index) {
      this.registrants.splice(index, 1);
      delete this.error[`registrants.${index}.phoneNumber`];
      delete this.error[`registrants.${index}.companyName`];
      delete this.error[`registrants.${index}.email`];
      delete this.error[`registrants.${index}.name`];
      this.currentSeminar.numberofregistrants =
        this.currentSeminar.numberofregistrants > 0
          ? this.currentSeminar.numberofregistrants - 1
          : 0;
    },
    processPayment(payment) {
      this.isProcess = true;
this.$bvModal.hide('modal-center')
      this.$http
        .post("checkValidashion", {
          registrants: this.registrants,
          seminar: this.currentSeminar.id
        })
        .then(success => {
          this.SaveBooking(
            payment.id,
            payment.payer.payer_info.payer_id,
            payment.payer.payment_method,
            payment.transactions[0].related_resources[0].sale.id
          );
        })
        .catch(error => {
          this.isProcess = false; 
          this.error = error.errors;
        });
    },

    SaveBooking(payment_id, payer_id,payment_method,sale_id) {
      this.$http
        .post("seminar/booking", {
          payment_id,
          payer_id,
          payment_method,
          sale_id,
          registrants: this.registrants,
          seminar: this.currentSeminar.id
        })
        .then(responce => {
          let paramsEmail = this.registrants.map((item,i) => (item.email));
          let title = this.currentSeminar.title;
          this.isProcess = false;
          this.currentSeminar = {};
          this.registrants = [];
          this.error = {};
          this.$router.push({ name: "success", params: { title: title,emails: paramsEmail.join(',').replace(',',', ') } });
        })
        .catch(error => {
          this.error = error.errors;
        });
    },
    genrateCalender(type) {},
    changeRegistrants(ev) {
      this.registrants.push({
        name: null,
        phoneNumber: null,
        email: null,
        companyName: null,
        applicable: "Applicable",
        choice_of_communication: "Email Only"
      });
    },
    eventSelected(ev) {
      this.isProcess = true;
      this.$http.get(`seminar/${ev.id}`).then(responce => {
        this.registrants=[{ "name": null, "phoneNumber": null, "email": null, "companyName": null, "applicable": "Applicable", "choice_of_communication": "Email Only" }];
        this.error={};
        this.currentSeminar = responce;
        if (responce.lat && String(responce.lat).trim()) {
          this.currentCroods = {
            lat: parseFloat(responce.lat),
            lng: parseFloat(responce.lng)
          };
        } else {
          this.currentCroods = {};
        }
        this.day=this.currentSeminar.day;
        this.isProcess = false;
      });
    },
    checkBoxChange(value, index) {
      if (value === "Not Applicable") {
        this.registrants[index].companyName = null;
      }
    },
    loadData(id) {
      this.isProcess = true;
      this.$http
        .get(`seminar/${id}`)
        .then(responce => {
          this.currentSeminar = responce;          
          
          if (responce.lat && String(responce.lat).trim()) {
            this.currentCroods = {
              lat: parseFloat(responce.lat),
              lng: parseFloat(responce.lng)
            };
          } else {
            this.currentCroods = {};
          }
          this.day=this.currentSeminar.day; 
           this.loadEventData(moment(responce._correct_date));
          this.isProcess = false;
        })
        .catch(error => {
          this.isProcess = false;
        });
    },
    loadEventData(start_date) {
      this.loading = true;
      this.$http
        .get("seminar", {
          params: {
            start_date: start_date.toString()
          }
        })
        .then(responce => {
          this.events = responce;
          this.day=this.currentSeminar.day; 
          console.log('here');
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
        });
    },

    formatMoney(n) {
      let c = isNaN((c = Math.abs(c))) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt((n = Math.abs(Number(n) || 0).toFixed(c)))),
        j = (j = i.length) > 3 ? j % 3 : 0;

      return (
        s +
        (j ? i.substr(0, j) + t : "") +
        i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
        (c
          ? d +
            Math.abs(n - i)
              .toFixed(c)
              .slice(2)
          : "")
      );
    },  
  
    addNewRegistrant() {
      let _this = this;
      let numberofregistrants = this.currentSeminar.numberofregistrants || 0;
      if (newValue > this.currentSeminar.empty_seat) {
        this.$swal({allowOutsideClick: false,
          title: "Seminar is near capacity",
           text: `There are only ${
            this.currentSeminar.empty_seat
          } seats available. Would you like to proceed with registration?`,
          //text: `The selected seminar has only ${this.currentSeminar.empty_seat} available slots. Would you like to proceed?`,
          type: "warning",
          showCancelButton: true, 
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes",
          cancelButtonText: "No"
        }).then(result => {
          if (result.value) {
            _this.currentSeminar.numberofregistrants =
              _this.currentSeminar.empty_seat;
            _this.changeRegistrants(_this.currentSeminar.empty_seat);
          } else {
            this.$swal({allowOutsideClick: false,
              title: "Contact Us",
              text:
                "Please Contact Admin at 303-690-2749  or email at eg@amityhealthcaregroup.com for further assistance",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Home"
            }).then(result => {
              _this.$router.push({ name: "home" });
            });
          }
        });
      }
    }
  },
  computed: {
    
    formatePhoneNumber() {
      return (
        phone.substr(0, 3) + "-" + phone.substr(3, 3) + "-" + phone.substr(6, 4)
      );
    },
    formatedSeminarDate() {
      return this.currentSeminar.seminar_date
        ? moment(this.currentSeminar.seminar_date.split(" - ")[0]).format(
            "MM/DD/YYYY"
          )
        : "";
    },
    registrantsError() {
      let _this = this;
      if (!this.currentSeminar.id) {
        this.error = {
          ...this.error,
          seminar: ["Please Select a Seminar"]
        };
      } else {
        delete this.error["seminar"];
      }

      if (this.registrants.length === 0) {
        this.error = {
          ...this.error,
          registrants: ["please add at last one registrants"]
        };
      } else {
        delete this.error["registrants"];
      }
      this.registrants.forEach((r_item, r_index) => {
        if (!r_item.name) {
          _this.error = {
            ..._this.error,
            [`registrants.${r_index}.name`]: ["Registrant name is required"]
          };
        } else {
          delete _this.error[`registrants.${r_index}.name`];
        }

        if (!r_item.email) {
          _this.error = {
            ..._this.error,
            [`registrants.${r_index}.email`]: ["Registrant email is required"]
          };
        } else if (!/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(r_item.email)) {
          _this.error = {
            ..._this.error,
            [`registrants.${r_index}.email`]: [
              "The email is not in valid format"
            ]
          };
        } else {
          delete _this.error[`registrants.${r_index}.email`];
        }
        if (!r_item.phoneNumber) {
          _this.error = {
            ..._this.error,
            [`registrants.${r_index}.phoneNumber`]: ["Phone mumber is required"]
          };
        }else {
          console.log('r_item.phoneNumber',r_item.phoneNumber,r_item.phoneNumber.length < 10)
          if(r_item.phoneNumber.length < 10){
            _this.error = { 
            ..._this.error,
            [`registrants.${r_index}.phoneNumber`]: ["Invalid phone mumber"]
          };
          }else{
          _this.$delete(_this.error, `registrants.${r_index}.phoneNumber`);
          }
        }

        if (!r_item.companyName) {
          if (String(r_item.applicable).toUpperCase() === "NOT APPLICABLE") {
            _this.$delete(_this.error, `registrants.${r_index}.companyName`);
          } else {
            _this.error = {
              ..._this.error,
              [`registrants.${r_index}.companyName`]: [
                "Company name is required"
              ]
            };
          }
        } else {
          _this.$delete(_this.error, `registrants.${r_index}.companyName`);
        }
      });
      return !Object.keys(_this.error).length > 0;
    },

    l_error() {
      return this.error;
    }
  },
  
  watch: {
    "currentSeminar.numberofregistrants": function(newValue) {
      let _this = this; 
      if (newValue > this.currentSeminar.empty_seat) {
        this.$swal({allowOutsideClick: false,
          title: "Seminar is near capacity",
          type: "warning",
           text: `There are only ${
            this.currentSeminar.empty_seat
          } seats available. Would you like to proceed with registration?`,
         // text: `The selected seminar has only ${this.currentSeminar.empty_seat} available slots. Would you like to proceed?`,
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes",
          cancelButtonText: "No"
        }).then(result => {
          if (result.value) {
            _this.currentSeminar.numberofregistrants =
              _this.currentSeminar.empty_seat;
            _this.changeRegistrants(_this.currentSeminar.empty_seat);
          } else {
            this.$swal({allowOutsideClick: false,
              title: "Contact Us",
              text:
                "Please Contact Admin at 720-353-7515 or email at eg@amityhealthcaregroup.com for further assistance",
              //   type: "warning",
              showCancelButton: false,
              confirmButtonColor: "3085d6",
              confirmButtonText: "Home"
            }).then(result => {
              _this.$router.push({ name: "home" });
            });
          }
        });
      }
    }
  }
};
</script>
<style  >
.hrDiv {
  height: 2px;
  width: 100%;
  background: rgba(0, 0, 0, 0.1);
  margin-top: 18px;
}
.modelDiv {
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.modelDivPay {
  display: flex;
  justify-content: space-evenly;
  margin-top: 10%;
}
.card_header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.parent_div {
  padding-left: 8%;
  padding-right: 8%;
  padding-top: 4%;
}
.full_text {
  color: red;
  font-weight: 700;
  text-align: -webkit-auto;
}
.trash
{
   margin-right:10px;
   border-radius:50%; 
   font-size:12px;
   height:40px;width:40px;
}

.card {
  margin-top: 15px;
}
.card > .card-body {
  padding: 0px !important;
}
.card > .card-body > .card-title {
  display: flex;
  color: white;
  background-color: rgb(11, 37, 105);
  font-size: 16px !important;
  padding: 10px !important;
}
.label01 {
  font-weight: 800;
  color: #000;
  text-align: left;
}

.labelse {
  background: #e9ecef;
  color: black;
}
.vue-map-container {
  width: 100% !important;
  border: solid 1px #ced4da;
  border-radius: 7px;
}
.paypal-button {
  width: 100%;
}
span.totalfees {
  line-height: 1.2;
  text-align: left;
  border: solid;

  width: 100% !important;
  border: solid #0077d7;
}
.fee-detail {
  margin: 40px 0 40px 0 !important;
}

.was-validated.form-control:invalid,
.form-control.is-invalid {
  border-color: #000 !important;
}
.panel-body {
  padding: 15px !important;
}
.title {
  font-size: 18px !important;
}
.myboxD {
  margin: 0px !important;
  padding: 10px 5px;
  border: solid 1px #0078d7;
}
button.btn.rotatebtn.btn-primary.collapsed {
  font-size:12px;
  -ms-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
  border-radius: 50%;
  height: 40px;
  width: 40px;
}
button.btn.rotatebtn.btn-primary {
  font-size:12px;
  border-radius: 50%;
  height: 40px;
  width: 40px;
}
.swal2-content {
  font-size: 18px;
}
.swal2-title {
  font-size: 18px;
  font-weight: 100;
}
.venue-address {
  margin-bottom: 0 !important
}
.label01 {
    font-weight: 800;
    color: #000;
    text-align: left;
    width: 40%!important;
    padding: 15px 5px;
    font-size: 14px;
    float: left;
}
.label02 {
    text-align: left;
    width: 60%;
    float: left;
    font-size: 14px;
    font-weight: 800;
    padding: 15px 5px;
}
.dummybutton
{
    font-weight: bold;
    font-size: 20px;
    padding:8px;
    text-align: 'center';
     background:gray; /*#009cde; */
    border-radius: 30px;
    color: #fff;
    border: 1px solid transparent;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    border: none;
    vertical-align: top;
    cursor: pointer;
    outline: none;
    overflow: hidden;

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