export default class Musician {
  musicianId;
  name;
  infoMusician;
  yearOfBirth;
  currentBands;
  previousBands;
  instruments;


  constructor ( musicianId, name, infoMusician, yearOfBirth, currentBands, previousBands, instruments ) {
    this.musicianId = musicianId;
    this.name = name;
    this.infoMusician = infoMusician;
    this.yearOfBirth = yearOfBirth;
    this.currentBands = currentBands;
    this.previousBands = previousBands;
    this.instruments = instruments;

  }
  
  
  // Skapar ett objekt med musikernas egenskaps information. 
  // Används när vi ska skicka in till "musicians.json". 
  dataInfo () {
    return {
      "id": this.musicianId,
      "name": this.name,
      "info about the musician": this.infoMusician,
      "year of birth": this.yearOfBirth,
      "current bands": this.currentBands,
      "previous bands": this.previousBands,
      "instruments": this.instruments
    };
  }
}
