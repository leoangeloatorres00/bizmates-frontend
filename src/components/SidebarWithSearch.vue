<template>
  <div class="d-grid gap-2">
    <v-autocomplete
      ref="input"
      solo-filled
      density="compact"
      variant="solo-filled"
      placeholder="Search for cities"
      :items="cities"
      v-model="search"
    >
      <template #no-data>
        <div class="p-2">
          <button
            class="btn btn-primary"
            style="width: 100%"
            @click="getPlaceByNameData()"
          >
            Add Places
          </button>
        </div>
      </template>
    </v-autocomplete>

    <div class="sidebar-items-container">
      <div>
        <div
          v-for="(item, index) in cities"
          :key="index"
          @click="getCityName(item)"
        >
          <div class="card p-2 my-2" style="min-height: 100%; cursor: pointer">
            <p class="mb-0">{{ item }}</p>
            <span style="font-size: 8px">{{
              city == item ? "Selected" : ""
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "cities"],
  computed: {
    city() {
      return this.data.name;
    },
  },
  methods: {
    getPlaceByNameData() {
      this.$emit("getPlaceByNameData", this.$refs.input.value);
    },
    getCityName(item) {
      this.$emit("getCityName", item);
    },
  },
};
</script>

<style scoped>
.sidebar-items-container {
  max-height: calc(100vh - 150px);
}

.sidebar-items-container > div {
  height: 100%;
  overflow-y: auto;
}

@media screen and (max-width: 1000px) {
  .sidebar-items-container {
    max-height: 150px;
  }
}
</style>
