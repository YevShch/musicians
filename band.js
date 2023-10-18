export default class Band {
  #nameBand;
  #checkedInBand;
  #infoBand;
  #yearOfCreation;
  #yearOfBreakup;
  #currentMembersList;
  #previousMembersList;
  


  constructor ( nameBand, checkedInBand = false, infoBand, yearOfCreation, yearOfBreakup = false, currentMembersList, previousMembersList ) {
    this.#nameBand = nameBand;
    this.#checkedInBand = checkedInBand;
    this.#infoBand = infoBand;
    this.#yearOfCreation = yearOfCreation;
    this.#yearOfBreakup = yearOfBreakup;
    this.#currentMembersList = currentMembersList;
    this.#previousMembersList = previousMembersList;
    

  }

  get nameBand () {
    return this.#nameBand;
  }

  get checkedInBand () {
    return this.#checkedInBand;
  }

  set nameBand ( newNameBand ) {
    this.#nameBand = newNameBand;
  }

  checkInAndOutBand () {
    this.#checkedInBand = !this.#checkedInBand;
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
  dataBandInfo () {
    return {
      "name of the band": this.#nameBand,
      "checkedIn": this.#checkedInBand,
      "infoMusician": this.#infoBand,
      "year of creation": this.#yearOfCreation,
      " year of breakup": this.#yearOfBreakup,
      "current members of the band": this.#currentBands,
      "previous members of the band": this.#previousBands
    }
  }
