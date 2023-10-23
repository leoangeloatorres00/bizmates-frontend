<template>
  <div class="form-check">
    <input
      class="form-check-input"
      type="checkbox"
      v-model="isUnitFahrenheit"
      :checked="isUnitFahrenheit"
    />
    <label class="form-check-label" for="flexCheckChecked">
      Show Fahrenheit
    </label>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      isUnitFahrenheit: true,
    };
  },
  watch: {
    isUnitFahrenheit(val) {
      this.changeTemperatureUnit(val);
    },
  },
  methods: {
    changeTemperatureUnit(isUnitFahrenheit) {
      this.$emit("tempUnit", isUnitFahrenheit);
    },
  },
};
</script>
