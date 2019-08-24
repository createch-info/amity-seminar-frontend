<template>
  <div>

    <b-container>
      <b-row>
          <b-col cols="4">
             <b-form-group label="From:">
                <b-form-select
                  id="input-3"
                  :options="input1"
                  required
                ></b-form-select>
              </b-form-group>
          </b-col>
          
          <b-col>
            mnaskj
          </b-col>
      </b-row>
      <br>  
      <b-row>
        <b-col>
          <b-form-input v-model="text" placeholder="Enter your name"></b-form-input>
        </b-col>
      </b-row>
      <br>
      <b-row>
          <b-col cols="4">
             <b-form-group label="To:">
                <b-form-select
                  id="input-3"
                  :options="input1"
                  required
                ></b-form-select>
              </b-form-group>
          </b-col>
          
          <b-col>
            Balance:0
          </b-col>
      </b-row>
    <br>
      <b-row>
        <b-col>
          <b-form-input v-model="text" placeholder="Enter your name"></b-form-input>
        </b-col>
      </b-row>
    <br>
       <b-row>
          <b-col cols="4">
             <b-form-group label="Exchange Rate:">
                <b-form-select
                  id="input-3"
                  :options="input1"
                  required
                ></b-form-select>
              </b-form-group>
          </b-col>
          
          <b-col>
            Balance:0
          </b-col>
      </b-row>

    </b-container>
    <!-- <b-form-group id="input-group-3" label="From:" label-for="input-3">
        <b-form-select
          id="input-3"
          :options="foods"
          required
        ></b-form-select>
      </b-form-group> -->
  </div>
</template>

<script>
export default {
  data()
  {
    return{
      
      input1: [
          'Programming',
          'Design',
          'Vue',
          'Vuetify'
        ]
    }
  }  
}
</script>

<style>

</style>
