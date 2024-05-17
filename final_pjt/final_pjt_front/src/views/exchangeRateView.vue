<template>
    <div>
      <h1>Data from API</h1>
      <p>{{ data }}</p>
      <!-- <pre>{{ data }}</pre> -->
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        data: null,
      };
    },
    mounted() {
      this.get_exchange_rate();
    },
    methods: {
      async get_exchange_rate() {
        try {
          const response = await axios.get('http://localhost:8000/api/get_exchange_rate/');
          this.data = response.data;
        } catch (error) {
          console.error('Error get exchange rate data:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>


  pre {
            background-color: #f8f9fa; /* Light grey background */
            padding: 15px;            /* Padding around the content */
            border-radius: 5px;       /* Rounded corners */
            border: 1px solid #dee2e6; /* Light grey border */
            color: 1px solid black;
            overflow: auto;           /* Enable scrolling if content overflows */
        }
  </style>
  