<template>
  <div class="d-flex gap-4" style="overflow: auto">
    <div
      class="forecast-items"
      v-for="(forecast, index) in forecasts"
      :key="index"
    >
      <p class="mb-0">{{ getForeCastTime(forecast.dt_txt) }}</p>
      <i :class="getWeatherIcon(forecast.weather[0].description)"> </i>
      <div>
        <span v-html="forecasttemperatures[index]"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { getTime, getWeatherIcon } from "@/utils/data";
export default {
  props: {
    forecast: {
      type: Object,
      default: () => {
        return {};
      },
    },
    forecasttemperatures: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data: () => {
    return {
      getTime,
      getWeatherIcon,
    };
  },
  computed: {
    forecasts() {
      return Object.prototype.hasOwnProperty.call(this.forecast, "list")
        ? this.forecast.list
        : {};
    },
  },
  methods: {
    getForeCastTime(date) {
      let time = date.split(" ");
      let times = time[1].split(":");

      let hours = times[0];
      let minutes = times[1];
      return this.getTime(hours, minutes);
    },
  },
};
</script>

<style scoped>
.forecast-items {
  text-align: center;
  margin: 0 10px;
}

.forecast-items > i {
  font-size: 2.8rem;
}

.forecast-items > p {
  font-size: 0.8rem;
}

.forecast-items span {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
