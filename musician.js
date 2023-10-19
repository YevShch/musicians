export default class Musician {
  #name;
  #infoMusician;
  #yearOfBirth;
  #currentBands;
  #previousBands;
  #instruments;


  constructor ( name, infoMusician, yearOfBirth, currentBands, previousBands, instruments ) {
    this.#name = name;
    this.#infoMusician = infoMusician;
    this.#yearOfBirth = yearOfBirth;
    this.#currentBands = currentBands;
    this.#previousBands = previousBands;
    this.#instruments = instruments;

  }

  get name () {
    return this.#name;
  }

  set name ( newName ) {
    this.#name = newName;
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
      "infoMusician": this.#infoMusician,
      "yearOfBirth": this.#yearOfBirth,
      "currentBands": this.#currentBands,
      "previousBands": this.#previousBands,
      "instruments": this.#instruments
    };
  }
}
