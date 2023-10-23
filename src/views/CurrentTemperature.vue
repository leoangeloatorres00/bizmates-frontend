<template>
  <div class="d-flex justify-content-between align-items-center">
    <div class="container d-flex flex-column justify-content-between p-2">
      <div>
        <h1 class="bold">{{ name }}</h1>
        <div v-for="(weather, index) in weathers" :key="index">
          <span>{{ weather.main }}</span>
        </div>
      </div>

      <h1 class="bold" v-html="temperature"></h1>
    </div>
    <div class="container d-flex justify-content-end">
      <div v-for="(weather, index) in weathers" :key="index">
        <i :class="`icon ${getWeatherIcon(weather.description)}`"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { getWeatherIcon } from "@/utils/data";
export default {
  props: ["data", "temperature"],
  data: () => {
    return {
      getWeatherIcon,
    };
  },
  computed: {
    name() {
      return this.data.name;
    },
    weathers() {
      return this.data.weather;
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
}
.icon {
  font-size: 7rem;
}
</style>
