<template>
  <div class="container d-flex px-2">
    <div>
      <div class="d-flex align-items-center gap-2">
        <i class="icon bi bi-sunrise"></i>
        <p class="mb-0">Sunrise</p>
      </div>
      <span>
        {{ getTimes(sunrise) }}
      </span>
    </div>
    <div>
      <div class="d-flex align-items-center gap-2">
        <i class="icon bi bi-sunset"></i>
        <p class="mb-0">Sunset</p>
      </div>
      <span>
        {{ getTimes(sunset) }}
      </span>
    </div>
  </div>
  <div class="container d-flex p-2">
    <div>
      <div class="d-flex align-items-center gap-2">
        <i class="icon bi bi-droplet"></i>
        <p class="mb-0">Chance of rain</p>
      </div>
      <span>{{ rain }}%</span>
    </div>
    <div>
      <div class="d-flex align-items-center gap-2">
        <i class="icon bi bi-wind"></i>
        <p class="mb-0">Wind</p>
      </div>
      <span>{{ wind }}km/h </span>
    </div>
  </div>
</template>

<script>
import { getTime, getHours, getMinutes } from "@/utils/data";
export default {
  props: ["data"],
  data: () => {
    return {
      getTime,
      getHours,
      getMinutes,
    };
  },
  computed: {
    sunset() {
      return this.data.sunset;
    },
    sunrise() {
      return this.data.sunrise;
    },
    rain() {
      return this.data.rain;
    },
    wind() {
      return this.data.wind;
    },
  },
  methods: {
    getTimes(milliseconds) {
      let hours = this.getHours(milliseconds);
      let minutes = this.getMinutes(milliseconds);
      return this.getTime(hours, minutes);
    },
  },
};
</script>

<style scoped>
.container > div {
  width: 50%;
}
.icon {
  font-size: 1.2rem;
}

span {
  font-size: 1.2rem;
  font-weight: bolder;
}
</style>
