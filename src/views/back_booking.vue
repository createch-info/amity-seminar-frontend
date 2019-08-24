  <b-row>
      <b-col md="8" sm="12" xl="8">
        <b-row>
          <b-col class="label01">
            <label v-text="`Seminar #${currentSeminar.id || ''}`"></label>
          </b-col>
          <b-col class="label01">
            <label
              v-text="`Date & time ${currentSeminar.seminar_date || ''} - ${currentSeminar.end_time || ''}`"
            ></label>
          </b-col>
        </b-row>
        <b-row v-if="currentSeminar.isFull" class="my-2">
          <span class="full_text">
            Seminar is currently full.
            <br>Please register for the next upcoming seminar
            <br>or contact the admin at: 720-353-7515
          </span>
        </b-row>
        <b-row class="my-2">
          <b-form-textarea
            id="textarea"
            v-model="currentSeminar.description"
            disabled
            rows="8"
            max-rows="8"
          ></b-form-textarea>
        </b-row>
        <b-row v-if="!currentSeminar.isFull" class="my-2">
          <b-form-group
            label-cols-sm="6"
            label-cols-lg="6"
            label-cols-md="6"
            id="input-group-2"
            label="Number Of registrants"
            label-for="input-2"
          >
            <b-form-input
              @change="changeRegistrants"
              @input="changeRegistrants"
              type="number"
              min="1"
              required
              v-model="currentSeminar.numberofregistrants"
              placeholder="Enter registrants..."
            ></b-form-input>
          </b-form-group>

          <b-row class="my-1 leftseat1">
            <b-col sm="6">
              <label :for="`type`" class="labelsi">Left Seat</label>
            </b-col>
            <b-col sm="6  ">
              <span class="form-control labelse">{{currentSeminar.empty_seat}}</span>
            </b-col>
          </b-row>
        </b-row>

        <b-row v-if="!currentSeminar.isFull" class="my-2">
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            id="input-group-2"
            label="Venue Address"
            label-for="input-2"
          >
            <b-form-textarea
              style="width:250px;"
              disabled
              rows="6"
              v-model="currentSeminar.venue_address"
            ></b-form-textarea>
          </b-form-group>

          <b-col style="margin-top:10px;">
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
          <b-row class="my-2" :key="index" v-for="(item,index) in registrants">
            <b-card border-variant="primary" class="card">
              <b-card-title>
                <div class="headerButton">
                  <span>{{`Registrant-${index +1}`}}</span>
                  <b-button @click="deleteRegistran(index)" variant="danger">X</b-button>
                  <!-- <b-button block href="#" :v-b-toggle="`accordion-${index}`" variant="info">Accordion 1</b-button> -->
                </div>
              </b-card-title>
              <!-- <b-collapse visible :id="`accordion-${index}`"  accordion="my-accordion" role="tabpanel"> -->
              <b-card-text>
                <b-form-group
                  label-cols-sm="4"
                  label-cols-lg="3"
                  id="input-group-2"
                  label="Name"
                  label-for="input-2"
                  :invalid-feedback="error[`registrants.${index}.name`] ? error[`registrants.${index}.name`][0] : '' "
                >
                  <b-form-input
                    :state="error[`registrants.${index}.name`] ? false : true"
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
                  :invalid-feedback="error[`registrants.${index}.email`] ? error[`registrants.${index}.email`][0] : '' "
                >
                  <b-form-input
                    :state="error[`registrants.${index}.email`] ? false : true"
                    type="email"
                    v-model="item.email"
                    required
                    placeholder="Enter Email"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  :invalid-feedback="error[`registrants.${index}.phoneNumber`] ? error[`registrants.${index}.phoneNumber`][0] : '' "
                  label-cols-sm="4"
                  label-cols-lg="3"
                  id="input-group-2"
                  label="Phone Number"
                  label-for="input-2"
                >
                  <b-form-input
                    :state="error[`registrants.${index}.phoneNumber`] ? false : true"
                    v-model="item.phoneNumber"
                    required
                    placeholder="Enter phone number"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  label-cols-sm="4"
                  label-cols-lg="3"
                  id="input-group-2"
                  label="Company Name"
                  label-for="input-2"
                  :invalid-feedback="error[`registrants.${index}.companyName`] ? error[`registrants.${index}.companyName`][0] : '' "
                >
                  <b-form-input
                    :disabled="String(item.applicable) === 'Not Applicable' ? true :false"
                    :state="error[`registrants.${index}.companyName`] ? false : true"
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
              </b-card-text>
              <!-- </b-collapse> -->
            </b-card>
          </b-row>
        </b-row>
      </b-col>
      <b-col md="4" sm="12" xl="4">
        <b-row>
          <!-- <b-col class="calclass"> -->
          <Calendar
            :issmall="true"
            :loading="loading"
            :first-day="1"
            :all-events="events"
            :showWeekNumberFlag="true"
          ></Calendar>
          <!-- </b-col> -->
        </b-row>
        <b-row v-if="!currentSeminar.isFull">
          <!-- <b-col class="my-1" cols="4" md="4" sm="12" xl="12"> -->
          <b-card>
            <b-form-group
              label-cols-sm="4"
              label-cols-lg="3"
              id="input-group-2"
              label="Seminar Fee ($)"
              label-for="input-2"
            >
              <b-form-input disabled v-model="currentSeminar.cost_per_seat"></b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="6"
              label-cols-lg="4"
              id="input-group-2"
              label="Number Of registrants"
              label-for="input-2"
            >
              <b-form-input
                @change="changeRegistrants"
                @input="changeRegistrants"
                type="number"
                min="1"
                required
                v-model="currentSeminar.numberofregistrants"
                placeholder="Enter registrants..."
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="4"
              label-cols-lg="3"
              id="input-group-2"
              label="Total Fee"
              label-for="input-2"
            >
              <span
                class="totalfees"
              >$ {{ parseFloat(currentSeminar.cost_per_seat || 0) * parseFloat(currentSeminar.numberofregistrants || 0)}}</span>
            </b-form-group>
          </b-card>

          <b-col class="my-1" cols="4" md="4" sm="12" xl="12">
            <b-col>
              <PayPal
                :button-style="myStyle"
                v-if="registrantsError"
                @payment-completed="processPayment"
                :amount="`${parseFloat(currentSeminar.cost_per_seat || 0) * parseFloat(currentSeminar.numberofregistrants || 0)}`"
                currency="USD"
                :experience="{
                input_fields: {
          no_shipping: 1
        }
              }"
                :items="[
               {
          name: currentSeminar.title,
          quantity: currentSeminar.numberofregistrants || 0,
          price: parseFloat(currentSeminar.cost_per_seat || 0),
          currency: 'USD'
          },
              ]"
                :client="paypal"
                env="sandbox"
              ></PayPal>
            </b-col>
          </b-col>
        </b-row>
      </b-col>

      <Loadder v-if="isProcess"/>
    </b-row>