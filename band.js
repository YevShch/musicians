export default class Band {
  #nameBand;
  #infoBand;
  #yearOfCreation;
  #yearOfBreakup;
  #currentMembersList;
  #previousMembersList;



  constructor ( nameBand, infoBand, yearOfCreation, yearOfBreakup, currentMembersList, previousMembersList ) {
    this.#nameBand = nameBand;
    this.#infoBand = infoBand;
    this.#yearOfCreation = yearOfCreation;
    this.#yearOfBreakup = yearOfBreakup;
    this.#currentMembersList = currentMembersList;
    this.#previousMembersList = previousMembersList;


  }

  get nameBand () {
    return this.#nameBand;
  }

  set nameBand ( newNameBand ) {
    this.#nameBand = newNameBand;
  }

  get infoBand () {
    return this.#infoBand;
  }

  set infoBand ( newInfoBand ) {
    this.#infoBand = newInfoBand;
  }

  get yearOfCreation () {
    return this.#yearOfCreation;
  }
  set yearOfCreation ( newYearOfCreation ) {
    this.#yearOfCreation = newYearOfCreation;
  }

  get yearOfBreakup () {
    return this.#yearOfBreakup;
  }
  set yearOfBreakup ( newYearOfBreakup ) {
    this.#yearOfBreakup = newYearOfBreakup;
  }

  get currentMembersList () {
    return this.#currentMembersList
  }
  set currentMembersList ( newCurrentMemembersList ) {
    this.#currentMembersList = newCurrentMemembersList;
  }

  get previousMembersList () {
    return this.#previousMembersList;
  }
  set previousMembersList ( newPreviousMembersList ) {
    this.#previousMembersList = newPreviousMembersList;
  }


  // Skapar ett objekt med bands egenskaps information. 
  // Används när vi ska skicka in till "bands.json". 
  dataInfo () {
    return {
      "name of the band": this.#nameBand,
      "infoMusician": this.#infoBand,
      "year of creation": this.#yearOfCreation,
      " year of breakup": this.#yearOfBreakup,
      "current members of the band": this.#currentMembersList,
      "previous members of the band": this.#previousMembersList
    }
  }
}
