export default class Musician {
  #name;
  #checkedIn;
  #infoMusician;
  #yearOfBirth;
  #currentBands;
  #previousBands;
  #instruments;


  constructor ( name, checkedIn = false, infoMusician, yearOfBirth, currentBands, previousBands, instruments ) {
    this.#name = name;
    this.#checkedIn = checkedIn;
    this.#infoMusician = infoMusician;
    this.#yearOfBirth = yearOfBirth;
    this.#currentBands = currentBands;
    this.#previousBands = previousBands;
    this.#instruments = instruments;

  }

  get name () {
    return this.#name;
  }

  get checkedIn () {
    return this.#checkedIn;
  }

  set name ( newName ) {
    this.#name = newName;
  }

  checkInAndOut () {
    this.#checkedIn = !this.#checkedIn;
  }

  get infoMusician () {
    return this.#infoMusician;
  }

  set infoMusician ( newInfoMusician ) {
    this.#infoMusician = newInfoMusician;
  }

  get yearOfBirth () {
    return this.#yearOfBirth;
  }
  set yearOfBirth ( newYearOfBirth ) {
    this.#yearOfBirth = newYearOfBirth;
  }

  get currentBands () {
    return this.#currentBands
  }
  set currentBands ( newCurrentBands ) {
    this.#currentBands = newCurrentBands;
  }

  get previousBands () {
    return this.#previousBands;
  }
  set previousBands ( newPreviousBands ) {
    this.#previousBands = newPreviousBands;
  }

  get instruments () {
    return this.#instruments;
  }
  set instruments ( newInstruments ) {
    this.#instruments = newInstruments;
  }
  // Skapar ett objekt med musikernas egenskaps information. 
  // Används när vi ska skicka in till "musicians.json". 
  dataInfo () {
    return {
      "name": this.#name,
      "checkedIn": this.#checkedIn,
      "infoMusician": this.#infoMusician,
      "year of birth": this.#yearOfBirth,
      "current bands": this.#currentBands,
      "previous bands": this.#previousBands,
      "instruments": this.#instruments
    };
  }
}
