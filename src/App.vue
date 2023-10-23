<template>
  <div id="app">
    <div class="container">
      <div class="d-flex p-4 gap-3">
        <div class="card sidebar p-3">
          <SidebarWithSearch
            :data="data"
            :cities="cities"
            @getCityName="getCityName"
            @getPlaceByNameData="getPlaceByNameData"
          ></SidebarWithSearch>
        </div>
        <div class="card main no-border d-grid gap-3">
          <div class="card main-items no-border">
            <TempUnitToggle @tempUnit="changeTempUnit"></TempUnitToggle>
            <CurrentTemperature
              :data="data"
              :temperature="temperature"
            ></CurrentTemperature>
          </div>
          <div class="card main-items p-3">
            <h6>Forecast</h6>
            <ForecastTemperature
              :forecast="forecast"
              :forecasttemperatures="forecasttemperatures"
            ></ForecastTemperature>
          </div>
          <div class="card main-items p-3">
            <h6>Other Informations</h6>
            <OtherInfo :data="info"></OtherInfo>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPlace, getPlaceByName, addPlace } from "@/api/place";
import { getWeatherByCity, getForeCastByCity } from "@/api/weather";

import SidebarWithSearch from "./components/SidebarWithSearch.vue";
import TempUnitToggle from "./components/TempUnitToggle.vue";

import OtherInfo from "./views/OtherInfo.vue";
import CurrentTemperature from "./views/CurrentTemperature.vue";
import ForecastTemperature from "./views/ForecastTemperature.vue";

export default {
  components: {
    OtherInfo,
    TempUnitToggle,
    CurrentTemperature,
    ForecastTemperature,
    SidebarWithSearch,
  },
  data: () => {
    return {
      getWeatherByCity,
      getForeCastByCity,

      addPlace,
      getPlace,
      getPlaceByName,

      data: {},
      info: {},
      forecast: {},

      kelvin: 0,
      celsius: 0,
      fahrenheit: 0,

      location: [],
      celsiuses: [],
      fahrenheits: [],

      city: null,
      search: null,

      isTemperatureFahrenheit: true,
    };
  },

  mounted() {
    this.getPlaceData();
  },
  computed: {
    temperature() {
      return this.isTemperatureFahrenheit
        ? `${this.fahrenheit}&deg;F`
        : `${this.celsius}&deg;C`;
    },
    forecasttemperatures() {
      const fahrenheits = JSON.parse(JSON.stringify(this.fahrenheits));
      const celsiuses = JSON.parse(JSON.stringify(this.celsiuses));
      return this.isTemperatureFahrenheit ? fahrenheits : celsiuses;
    },
  },
  watch: {
    search(val) {
      if (val != null) {
        let location = [...this.location].filter((item) => item.name == val);
        this.cities = location.map((item) => item.name);
        return;
      }
      this.cities = [...this.location].map((item) => item.name);
    },
    data() {
      this.getCurrentTemperature();
    },
    city(val) {
      if (val != null && val != "") {
        this.getWeatherData();
        this.getForeCastData();
        return;
      }
    },
  },
  methods: {
    getCityName(city) {
      this.city = city;
    },
    changeTempUnit(isUnitFahrenheit) {
      this.isTemperatureFahrenheit = isUnitFahrenheit;
    },
    getCurrentTemperature() {
      this.kelvin = this.data.main.temp;
      const temperature = parseFloat(this.kelvin - 273.15);
      this.celsius = temperature.toFixed(2);
      this.fahrenheit = (temperature * (9 / 5) + 32).toFixed(2);

      let rain = 0;
      let item = JSON.parse(JSON.stringify(this.data));

      if ("rain" in item) {
        rain = item.rain["1h"];
      }

      this.info = {
        rain: rain,
        wind: this.data.wind.speed,
        sunset: this.data.sys.sunset,
        sunrise: this.data.sys.sunrise,
      };
    },
    getPlaceData() {
      const data = {
        name: this.city,
      };

      this.getPlace(data).then((res) => {
        this.location = res.data;
        this.city = this.location[0].name;
        this.cities = [...this.location].map((item) => item.name);

        this.getWeatherData();
        this.getForeCastData();
      });
    },
    getPlaceByNameData(city) {
      const data = {
        city: city,
      };

      this.getPlaceByName(data).then((res) => {
        if (res.length == 0) {
          alert("No city name exist");
        } else {
          this.addPlaceData(city);
        }
      });
    },
    addPlaceData(city) {
      let name = city;
      const data = {
        name: name.charAt(0).toUpperCase() + name.slice(1),
      };

      this.addPlace(data).then((res) => {
        this.location = res.data;
        this.city = this.location[0].name;
        this.cities = [...this.location].map((item) => item.name);

        this.getWeatherData();
        this.getForeCastData();
      });
    },
    getWeatherData() {
      const data = {
        city: this.city,
      };

      this.getWeatherByCity(data).then((res) => {
        this.data = res;
      });
    },
    getForeCastData() {
      this.celsiuses = [];
      this.fahrenheits = [];

      const data = {
        city: this.city,
      };

      this.getForeCastByCity(data).then((res) => {
        this.forecast = res;

        for (let index = 0; index < this.forecast.list.length; index++) {
          const element = this.forecast.list[index];
          const item = JSON.parse(JSON.stringify(element));
          const temperature = item.main.temp;
          const temp = parseFloat(temperature - 273.15);
          this.celsiuses.push(`${temp.toFixed(2)}&deg;C`);
          this.fahrenheits.push(`${(temp * (9 / 5) + 32).toFixed(2)}&deg;F`);
        }
      });
    },
  },
};
</script>

<style scoped>
.card {
  min-height: calc(100vh - 3rem);
}

.main {
  width: 100%;
}

.sidebar {
  width: 500px;
}

.no-border {
  border: 0px;
}

.main-items {
  min-height: 100%;
}

@media screen and (max-width: 1000px) {
  .container > div {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    min-height: 100%;
    max-height: 250px;
  }

  .sidebar-items {
    width: 100%;
    margin-top: 0px;
  }
}
</style>
