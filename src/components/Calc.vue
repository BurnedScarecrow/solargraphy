<template>
  <div class="calc">
    <div class="calc-info">
      <div class="info-header">
        <h3>Калькулятор</h3>
        <img src="../assets/info.svg" alt="" />
      </div>
      <div class="dividor"></div>
      <p>
        Чтобы правильно рассчитать размер отверстия и отступ от него до дна
        банки, нужно указаь:
      </p>
      <ul>
        <li>Место и период съемки</li>
        <li>Диаметр банки</li>
        <li>Чувствительноcть бумаги</li>
      </ul>
    </div>
    <div class="interactive container">
      <DatePicker id="date" v-model="dateRange" color="blue" is-dark is-range />
      <div id="map"></div>

      <div class="input-square">
        <label for="tzcode">
          Zone: <input type="text" id="tzcode" v-model="tzCode" />
        </label>
        <label for="gmt">
          UTC:
          <input
            type="number"
            id="gmt"
            @change="
              {
                shift = calculateB();
              }
            "
            v-model="gmtdiff"
          />
        </label>

        <label for="lat">
          Широта:
          <input type="number" id="lat" v-model="plat" />
        </label>
        <label for="lng">
          Долгота:
          <input type="number" id="lng" v-model="plon" />
        </label>

        <div class="dividor"></div>

        <label for="pot_D">
          Диаметр банки (см):
          <input
            type="number"
            id="pot_D"
            @change="diameterCange"
            v-model="diameter"
          />
        </label>

        <div class="dividor"></div>

        <span>
          Чувствительность бумаги больше в
          <select
            id="sensetivity"
            v-model="sensetivity"
            @change="calculateHole"
          >
            <option value="0.0004">фиолетовой</option>
            <option value="0.00048">сине-зеленой</option>
            <option value="0.00053">красной</option>
          </select>
          части спектра
        </span>
      </div>
      <div id="result">
        <span class="err" v-if="err">{{ err }}</span>
        <div class="text">
          H: {{ Math.round(parseFloat(shift) * 100) / 100 }} см <br />
          D: {{ Math.round(parseFloat(hole) * 100) / 100 }} мм
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import timezones from "timezones-list";
import geoTz from "geo-tz";

let mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

export default {
  data() {
    return {
      day: "2021-07-22T12:00",
      plat: 59.936376, // широта 28.55405, //
      plon: 30.3106712, // долгота -81.3814927712, //
      gmtdiff: 3, // часовой пояс +- от гринвича
      azimuth: 0,
      altitude: 0,
      diameter: 5,
      sensetivity: 0.00048,
      shift: 0,
      hole: 0,
      tzCode: "",
      dateRange: null,
      map: null,
      marker: null,
      zoom: 10,
      err: "",
    };
  },
  watch: {
    dateRange: function (newVal) {
      if (newVal.start && newVal.end) {
        const date_start =
          newVal.start < newVal.end ? newVal.start : newVal.end;
        const date_end = newVal.start < newVal.end ? newVal.end : newVal.start;
        const diffTime = Math.abs(date_end - date_start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        let maxShift = 0;
        for (let i = 0; i <= diffDays; i += 1) {
          let tmp_date = new Date(date_start);
          let cur_day = new Date(tmp_date.setDate(date_start.getDate() + i));
          this.day = cur_day;
          let cur_shift = this.calculateB();
          if (cur_shift > maxShift) {
            maxShift = cur_shift;
          }
        }
        this.shift = maxShift;
      }
    },
    plat: function (newLat) {
      this.marker.setLngLat([this.plon, newLat]);
      this.shift = this.calculateB();
    },

    plon: function (newLon) {
      this.marker.setLngLat([newLon, this.plat]);
      // this.map.setCenter([newLon, this.plat]);
      this.shift = this.calculateB();
    },
  },
  mounted() {
    this.dateRange = {
      start: new Date(new Date().setHours(12, 0, 0, 0)),
      end: new Date(new Date().setHours(12, 0, 0, 0)),
    };

    mapboxgl.accessToken =
      "pk.eyJ1IjoiYnVybmVkc2NhcmVjcm93IiwiYSI6ImNrcmFnem9lbDRmeTcydXFobDF2bWgwZm0ifQ._skB0CyFThdvVWBn72L7tA";
    this.map = new mapboxgl.Map({
      container: "map",
      center: [this.plon, this.plat],
      zoom: this.zoom,
      style: "mapbox://styles/mapbox/streets-v11",
    });

    this.map.addControl(new mapboxgl.FullscreenControl());
    this.map.addControl(new mapboxgl.NavigationControl());

    this.marker = new mapboxgl.Marker({
      color: "#1f2933",
      draggable: true,
      anchor: "center",
    })
      .setLngLat([this.plon, this.plat])
      .addTo(this.map);

    this.marker.on("dragend", this.setNewPos);

    this.shift = this.calculateB();
    this.calculateHole();
  },
  methods: {
    diameterCange() {
      this.shift = this.calculateB();
    },
    getTimeZone() {
      let codes = [];
      try {
        codes = geoTz(this.plat, this.plon);
      } catch (error) {
        return -1;
      }
      let tzCode = "";
      if (codes.length < 1) {
        return -2;
      } else {
        tzCode = codes[0];
        if (!tzCode) {
          return -3;
        }
      }
      this.tzCode = tzCode;
      let utc = timezones.find((x) => x.tzCode === tzCode)?.utc;
      let gmt;

      if (!utc) {
        utc = tzCode.split("GMT")[1];
        if (utc.length > 0) {
          gmt = -parseInt(utc);
        } else {
          gmt = 0;
        }
      } else {
        gmt =
          utc[0] === "-"
            ? -(
                parseInt(utc.split("-")[1].split(":")[0]) +
                parseInt(utc.split("-")[1].split(":")[1] / 60)
              )
            : parseInt(utc.split("+")[1].split(":")[0]) +
              parseInt(utc.split("+")[1].split(":")[1] / 60);
      }
      this.gmtdiff = gmt;
      return 0;
    },
    setNewPos() {
      let pos = this.marker.getLngLat();
      this.plat = pos.lat;
      this.plon = pos.lng;
      let tmp = this.dateRange;
      this.dateRange = { start: "", end: "" };
      setTimeout(() => {
        this.dateRange = tmp;
      }, 500);
    },
    to360range(num) {
      if (num > 360) return num - Math.floor(num / 360) * 360;
      else if (num < 0) return num + (Math.floor(-num / 360) + 1) * 360;
      else return num;
    },
    calculateHole() {
      this.hole = 1.9 * Math.sqrt(Math.abs(this.altitude) * this.sensetivity);
    },
    calculateB() {
      let errCode = this.getTimeZone();
      if (errCode == -1 || errCode == -2) {
        this.err = "Часовой пояс не определён";
        return;
      }
      this.err = "";

      let inputDate = new Date(this.day);
      this.day =
        Date.UTC(
          inputDate.getFullYear(),
          inputDate.getMonth(),
          inputDate.getDate(),
          inputDate.getHours(),
          inputDate.getMinutes(),
        ) -
        this.gmtdiff * 60 * 60 * 1000;
      inputDate.setTime(this.day);

      const Y = inputDate.getFullYear();
      const M = inputDate.getMonth() + 1;
      const D = inputDate.getDate();

      const d =
        367 * Y -
        Math.floor((7 * (Y + Math.floor((M + 9) / 12))) / 4) +
        Math.floor((275 * M) / 9) +
        D -
        730530;

      //longitude of perihelion
      const w = 282.9404 + 4.70935 * Math.pow(10, -5) * d;
      //eccentricity
      const e = 0.016709 - 1.151 * Math.pow(10, -9) * d;
      //mean anomaly
      const mean = this.to360range(356.047 + 0.9856002585 * d);
      //obliquity of the ecliptic
      const oblecl = 23.4393 - 3.563 * Math.pow(10, -7) * d;
      //mean longitude
      const L = this.to360range(w + mean);

      //eccentric anomaly
      const E =
        mean +
        (180 / Math.PI) *
          e *
          Math.sin((mean * Math.PI) / 180) *
          (1 + e * Math.cos((mean * Math.PI) / 180));

      //rectangular coordinates in the plane of the ecliptic, where the X axis points towards the perihelion
      const x_rect = Math.cos((E * Math.PI) / 180) - e;
      const y_rect = Math.sin((E * Math.PI) / 180) * Math.sqrt(1 - e * e);

      const r = Math.sqrt(x_rect * x_rect + y_rect * y_rect);
      const v = (180 / Math.PI) * Math.atan2(y_rect, x_rect);

      const lon = this.to360range(v + w);

      //ecliptic rectangular coordinates
      const x = r * Math.cos((lon * Math.PI) / 180);
      const y = r * Math.sin((lon * Math.PI) / 180);
      const z = 0.0;

      //rotate to equatorial coordinates
      let xequat = x;
      let yequat =
        y * Math.cos((oblecl * Math.PI) / 180) +
        z * Math.sin((oblecl * Math.PI) / 180);
      let zequat =
        y * Math.sin((oblecl * Math.PI) / 180) +
        z * Math.cos((oblecl * Math.PI) / 180);

      //convert to RA and Declination
      const RA = (180 / Math.PI) * Math.atan2(yequat, xequat);
      const Decl = (180 / Math.PI) * Math.asin(zequat / r);

      //Sidereal Time at the Greenwich meridian at 00:00 right now
      const GMST0 = L / 15 + 12;
      const UT = inputDate.getUTCHours() + inputDate.getUTCMinutes() / 60;
      const preSIDTIME = GMST0 + UT + this.plon / 15;
      const SIDTIME = preSIDTIME - 24 * Math.floor(preSIDTIME / 24);

      //hour angle
      const HA = this.to360range(15 * (SIDTIME - RA / 15));

      const x_dec =
        Math.cos((HA * Math.PI) / 180) * Math.cos((Decl * Math.PI) / 180);
      const y_dec =
        Math.sin((HA * Math.PI) / 180) * Math.cos((Decl * Math.PI) / 180);
      const z_dec = Math.sin((Decl * Math.PI) / 180);

      const xhor =
        x_dec * Math.sin((this.plat * Math.PI) / 180) -
        z_dec * Math.cos((this.plat * Math.PI) / 180);
      const yhor = y_dec;
      const zhor =
        x_dec * Math.cos((this.plat * Math.PI) / 180) +
        z_dec * Math.sin((this.plat * Math.PI) / 180);

      this.azimuth = this.to360range(
        Math.atan2(yhor, xhor) * (180 / Math.PI) + 180,
      );
      this.altitude = Math.asin(zhor) * (180 / Math.PI);

      const B = this.diameter * Math.tan((this.altitude * Math.PI) / 180);
      if (B >= 13.5) {
        this.err = "Здесь солнце слишком высоко";
      } else {
        this.err = "";
      }
      return B;
    },
  },
};
</script>

<style lang="scss">
.calc {
  padding-top: 0px;
  margin-top: 0px;
  display: flex;
  flex-wrap: wrap;

  .calc-info {
    width: calc(80% - 40px);
    padding: 20px;
    margin: 0 auto 20px auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: justify;
    border-radius: 0.5rem;
    border: 1px solid #4a5568;
    background: #1a202c;
    p {
      margin: 10px 0 0 0;
    }

    .info-header {
      margin-bottom: 10px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        font-weight: 300;
        font-size: 1.4em;
        margin: 0;
        padding: 0;
      }
      img {
        height: 2em;
      }
    }
  }

  .interactive {
    width: 80%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    justify-content: center;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: "date other result" "map map result";
    display: grid;
    gap: 20px;

    #date {
      width: 100%;
      height: 270px;
      height: max-content;
    }

    #map {
      grid-area: map;
      overflow: hidden;
      width: 100%;
      height: 270px;
      background-color: #1a202c;
      border: 1px solid #4a5568;
      border-radius: 0.5rem;
    }

    #result {
      grid-area: result;
    }

    .gmt-picker {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
}

.input-square {
  display: flex;
  height: 270px;
  grid-area: other;
  flex-direction: column;
  justify-content: center;
  color: var(--light);
  background-color: #1a202c;
  border: 1px solid #4a5568;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 0.5rem;
  label {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  input,
  select,
  option {
    font-family: "Jura", sans-serif;
    font-size: 1em;
    color: var(--light);
    background: transparent;
    box-sizing: border-box;
    border: none;
    background: #1a202c;
    outline: none;
    margin: 3px 0;
    -webkit-appearance: none;
  }

  #tzcode {
    font-family: "Jura", sans-serif;
    text-align: right;
    width: 150px;
    padding-right: 15px;
  }

  #lat,
  #lng,
  #gmt,
  #pot_D {
    font-family: "Jura", sans-serif;
    width: 100px;
    text-align: right;
  }

  span {
    width: 100%;
    text-align: justify;
  }
  #sensetivity {
    border: 1px solid var(--purple);
    border-radius: 0.2rem;
    padding: 0px 5px;
    font-family: "Jura", sans-serif;
    font-size: 1em;
  }
}
#result {
  margin: 20px auto;
  width: 250px;
  height: 402px;
  background: url("../assets/can_calc.svg");
  background-size: cover;
  position: relative;
  transform: translateX(10px);

  .err {
    width: 70%;
    border-radius: 0.5rem;
    border: 1px solid var(--red);
    background: var(--red-tr);
    position: absolute;
    top: 10px;
    left: 11%;
    text-align: center;
    padding: 2px;
    box-sizing: border-box;
  }

  .text {
    position: absolute;
    top: 66px;
    left: 77px;
  }
}

@media screen and (max-width: 991px) {
  .calc .calc-info {
    width: calc(90% - 40px);
    margin: 0 auto 20px auto;
  }
  .calc .interactive {
    display: grid;
    width: 90%;
    gap: 10px;
    align-items: center;
    margin: 0 auto;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 260px 405px;
    grid-template-areas: "date other" "map result";

    #map {
      grid-area: map;
      margin: 0;
      width: 100%;
      height: 100%;
    }
    #date {
      grid-area: date;
      width: 100%;
      height: 260px;
      margin: 0 auto;
    }

    .input-square {
      grid-area: other;
      height: 260px;
      width: 100%;
    }

    #result {
      grid-area: result;
      width: 250px;
      height: 402px;
      background: url("../assets/can_calc.svg");
      background-size: cover;
    }
  }
}

@media screen and (max-width: 659px) {
  .calc .interactive {
    display: grid;
    width: 100%;
    margin: 0 auto;
    gap: 10px;
    align-items: center;
    grid-template-columns: 1fr;
    grid-template-rows: 70vh 1fr 1fr;
    grid-template-areas: "map" "date" "other" "result";
    #map {
      grid-area: map;
      margin: 0 auto;
      width: 90%;
    }
    #date {
      width: 90%;
      grid-area: date;
      margin: 0 auto;
    }
    #result {
      width: 250px;
      height: 402px;
      background: url("../assets/can_calc.svg");
      background-size: cover;
      margin: 0 auto;
    }
    .input-square {
      height: fit-content;
      width: 90%;
      grid-area: other;
      margin: 0 auto;
    }
  }
}
</style>
