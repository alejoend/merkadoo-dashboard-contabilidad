<template>
  <div class="col-xs-12 col-sm-6">
    <ul class="list-group">
      <app-server
        v-for="server in servers"
        :server="server"
        v-bind:key="server"
      ></app-server>
    </ul>
  </div>
</template>

<script>
import Server from "./Server.vue";

export default {
  data: function() {
    return {
      servers: [
        { id: 1, status: "Normal" },
        { id: 2, status: "Risky" },
        { id: 3, status: "Critical" },
        { id: 4, status: "Emergency" },
        { id: 5, status: "Catastrophe" }
      ]
    };
  },
  components: {
    appServer: Server
  }
};
</script>

<style lang="">
</style>
