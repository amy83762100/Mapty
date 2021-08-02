"use strict";
class Workout {
  date = new Date();
  id = (Date.now() + "").slice(-10);

  constructor(coords, distance, duration) {
    // this.date = ...
    // this.id
    this.coords = coords;
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  _setDescription() {
    // prettier-ignore
    const months = ["January","February","March","April","May","June","July","August","September","October","Novenber","December"];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()} ${(this.date.getHours() + "").padStart(2, 0)}:${(
      this.date.getMinutes() + ""
    ).padStart(2, 0)}:${(this.date.getSeconds() + "").padStart(2, 0)}`;
  }
}
class Running extends Workout {
  type = "running";
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this._calcPace();
    this._setDescription();
  }
  _calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
class Cycling extends Workout {
  type = "cycling";
  constructor(coords, distance, duration, elevGain) {
    super(coords, distance, duration);
    this.elevGain = elevGain;
    this._calcSpeed();
    this._setDescription();
  }
  _calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}
const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form_input-type");
const inputDistance = document.querySelector("#distance");
const inputDuration = document.querySelector("#duration");
const inputCadence = document.querySelector("#cadence");
const inputElevGain = document.querySelector("#elevGain");
const btnShowSortOptions = document.querySelector(".btn_sort");
const containerSortOptions = document.querySelector(".sort_option");
const btnSort = document.querySelector(".btn_oldest");
const btnSortOldest = document.querySelector(".btn_oldest");
const btnSortNewest = document.querySelector(".btn_newest");
const btnOverview = document.querySelector(".btn_overview");
const btnDeleteAll = document.querySelector(".btn_deleteAll");
const btnYesDelete = document.querySelector(".btn_yesDelete");
const btnNoDelete = document.querySelector(".btn_noDelete");
const btnToggleSideBar = document.querySelector(".btn_closeSideBar");
const confirmationMsg = document.querySelector(".confirmation_msg");
const sidebarContent = document.querySelector(".sidebarContent");
class App {
  #map;
  #mapZoom = 15;
  #mapEven;
  #workouts = [];
  #sortOption = 0;
  constructor() {
    // Get user's position
    this._getPosition();

    // Get data from local storage
    this._getLocalStorage();

    // Attach event handlers
    btnToggleSideBar.addEventListener("click", this._toggleSideBar);
    btnShowSortOptions.addEventListener("click", this._showSortOptions);
    btnSortNewest.addEventListener("click", this._sortWorkout.bind(this, 0));
    btnSortOldest.addEventListener("click", this._sortWorkout.bind(this, 1));
    btnDeleteAll.addEventListener("click", this._toggleConfirmationMsg);
    btnYesDelete.addEventListener("click", this._deleteAll.bind(this));
    btnNoDelete.addEventListener("click", this._toggleConfirmationMsg);
    btnOverview.addEventListener("click", this._overview.bind(this));
    form.addEventListener("submit", this._newWorkout.bind(this));
    inputType.addEventListener("change", this._toggleElevationField);
    containerWorkouts.addEventListener(
      "click",
      this._workoutClicked.bind(this)
    );
    containerWorkouts.addEventListener(
      "submit",
      this._modifyWorkout.bind(this)
    );
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("Could not get your position");
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];
    this.#map = L.map("map").setView(coords, this.#mapZoom);
    //"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on("click", this._showForm.bind(this));
    this.#workouts.forEach((workout) => this._renderWorkoutMarker(workout));
  }

  _showForm(mapE) {
    if (sidebarContent.classList.contains("hidden"))
      sidebarContent.classList.remove("hidden");
    this.#mapEven = mapE;
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputCadence.closest(".form_row").classList.toggle("form_row-hidden");
    inputElevGain.closest(".form_row").classList.toggle("form_row-hidden");
  }
  _validInput = (...values) => values.every((value) => Number.isFinite(value));
  _allPositive = (...values) => values.every((value) => value > 0);
  _newWorkout(event) {
    event.preventDefault();
    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEven.latlng;
    let workout;

    // If workout is running. create running object
    if (type === "running") {
      const cadence = +inputCadence.value;
      if (
        !this._validInput(distance, duration, cadence) ||
        !this._allPositive(distance, duration, cadence)
      )
        // Check if data is valid
        return alert("Inputs have to be positive numbers!");

      workout = new Running([lat, lng], distance, duration, cadence);
    }
    // If workout cycling. create cycling object
    if (type === "cycling") {
      const elevGain = +inputElevGain.value;
      if (
        !this._validInput(distance, duration, elevGain) ||
        !this._allPositive(distance, duration)
      )
        // Check if data is valid
        return alert("Inputs have to be positive numbers!");
      workout = new Cycling([lat, lng], distance, duration, elevGain);
    }
    // Add new object to workout array
    this.#workouts.push(workout);
    // Render workout on map as marker
    this._renderWorkoutMarker(workout);
    // Render workout on list
    this._renderWorkoutList(workout);
    // Hide form + clear input fields
    this._hideForm();
    // remove sort
    this._sortWorkout(0);
    // Set local storage to all workouts
    this._setLocalStorage();
  }
  _modifyWorkout(event) {
    event.preventDefault();
    if (!event.target.classList.contains("workout_form")) return;
    let index = this._findWorkout(event);
    const workout = this.#workouts[index];
    const distance = +event.target.children[0].children[1].value;
    const duration = +event.target.children[1].children[1].value;
    if (workout.type === "running") {
      const cadence = +event.target.children[3].children[1].value;
      console.log(
        this._validInput(distance, duration, cadence),
        this._allPositive(distance, duration, cadence)
      );
      if (
        !this._validInput(distance, duration, cadence) ||
        !this._allPositive(distance, duration, cadence)
      )
        // Check if data is valid
        return alert("Inputs have to be positive numbers!");
      workout.cadence = cadence;
      workout.pace = duration / distance;
    }
    if (workout.type === "cycling") {
      const elevGain = event.target.children[3].children[1].value;
      if (
        !this._validInput(distance, duration, elevGain) ||
        !this._allPositive(distance, duration)
      )
        // Check if data is valid
        return alert("Inputs have to be positive numbers!");
      workout.elevGain = elevGain;
      workout.speed = distance / (duration / 60);
    }
    workout.distance = distance;
    workout.duration = duration;
    console.log(workout);
    this._setLocalStorage();
    location.reload();
  }
  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${workout.description}`
      )
      .openPopup();
  }
  _renderWorkoutList(workout) {
    let html = `<li class="workout workout-${workout.type}" data-id="${
      workout.id
    }">
    <h2 class="workout_title">${workout.description}</h2>
    <button type="button" class="workout_closeBtn">&times;</button>
    <form class="workout_form">
    <div class="workout_details">
      <label class="workout_icon">${
        workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"
      }</label>
      <input value="${
        workout.distance
      }" class="workout_input workout_input-distance" type="text" />
      <span class="workout_unit">km</span>
    </div>
    <div class="workout_details">
      <label class="workout_icon">⏱</label>
      <input value="${
        workout.duration
      }" class="workout_input workout_input-duration" type="text" />
      <span class="workout_unit">min</span>
    </div>`;
    if (workout.type === "running") {
      html += `<div class="workout_details">
      <span class="workout_icon">⚡️</span>
      <span class="workout_value">${workout.pace.toFixed(1)}</span>
      <span class="workout_unit">min/km</span>
    </div>
    <div class="workout_details">
      <label class="workout_icon">🦶🏼</label>
      <input value="${
        workout.cadence
      }" class="workout_input workout_input-cadence" type="text" />
      <span class="workout_unit">spm</span>
    </div>
    <button type="submit" class="form_btn"></button>
    </form>
  </li>`;
    }
    if (workout.type === "cycling") {
      html += `
      <div class="workout_details">
        <span class="workout_icon">⚡️</span>
        <span class="workout_value">${workout.speed.toFixed(1)}</span>
        <span class="workout_unit">km/h</span>
      </div>
      <div class="workout_details">
        <span class="workout_icon">⛰</span>
        <input value="${
          workout.elevGain
        }" class="workout_input workout_input-elevGain" type="text"/>
        <span class="workout_unit">m</span>
      </div>
      <button type="submit" class="form_btn"></button>
      </form>
    </li>`;
    }
    containerWorkouts.insertAdjacentHTML("afterbegin", html);
  }
  _hideForm() {
    form.style.display = "none";
    form.classList.add("hidden");
    setTimeout(() => (form.style.display = "grid"), 1000);

    inputDistance.value = inputDuration.value = inputCadence.value = inputElevGain.value =
      "";
  }
  _findWorkout(event) {
    const workoutEl = event.target.closest(".workout");
    if (!workoutEl) return;
    const index = this.#workouts.findIndex(
      (workout) => workout.id === workoutEl.dataset.id
    );
    return index;
  }
  _workoutClicked(event) {
    // findWorkout
    let index = this._findWorkout(event);
    if (index === undefined) return;
    const found = this.#workouts[index];
    // const found = this.#workouts.find(
    //   (workout) => workout.id === workoutEl.dataset.id
    // );
    // moveToPopup
    this.#map.setView(found.coords, this.#mapZoom);
    // closeWorkout
    if (event.target.classList.contains("workout_closeBtn")) {
      this.#workouts.splice(index, 1);
      this._setLocalStorage();
      location.reload();
    }
  }
  _setLocalStorage() {
    localStorage.setItem("workouts", JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("workouts"));
    if (!data) return;

    this.#workouts = data;
    this.#workouts.forEach((workout) => this._renderWorkoutList(workout));
  }
  _showSortOptions() {
    containerSortOptions.classList.toggle("hidden");
  }
  _sortWorkout(option) {
    let tmpWorkouts;
    containerSortOptions.classList.add("hidden");
    containerWorkouts.innerHTML = "";
    this.#sortOption = option;
    if (this.#sortOption === 0) {
      tmpWorkouts = this.#workouts;
    }
    if (this.#sortOption === 1) {
      tmpWorkouts = this.#workouts
        .slice()
        .sort((recent, old) => old.id - recent.id);
    }

    tmpWorkouts.forEach((workout) => this._renderWorkoutList(workout));
  }
  _overview() {
    // if there are no workouts return
    if (this.#workouts.length === 0) return;

    // find lowest and highest lat and long to make map bounds that fit all markers
    const latitudes = this.#workouts.map((w) => {
      return w.coords[0];
    });
    const longitudes = this.#workouts.map((w) => {
      return w.coords[1];
    });
    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLong = Math.min(...longitudes);
    const maxLong = Math.max(...longitudes);
    // fit bounds with coordinates
    this.#map.fitBounds(
      [
        [maxLat, minLong],
        [minLat, maxLong],
      ],
      { padding: [70, 70] }
    );
  }
  _toggleConfirmationMsg() {
    confirmationMsg.classList.toggle("hidden");
  }
  reset() {
    localStorage.removeItem("workouts");
    location.reload();
  }
  _deleteAll() {
    confirmationMsg.classList.toggle("hidden");
    this.reset();
  }
  _toggleSideBar() {
    sidebarContent.classList.toggle("hidden");
    btnToggleSideBar.textContent = sidebarContent.classList.contains("hidden")
      ? "≡"
      : "×";
  }
}
const app = new App();
//@43.7690267,-79.3785276,15z
