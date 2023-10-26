export default class Band {
  bandId;
  nameBand;
  infoBand;
  yearOfCreation;
  yearOfBreakup;
  currentMembersList;
  previousMembersList;



  constructor ( bandId, nameBand, infoBand, yearOfCreation, yearOfBreakup, currentMembersList = [], previousMembersList = [] ) {
    this.bandId = bandId;
    this.nameBand = nameBand;
    this.infoBand = infoBand;
    this.yearOfCreation = yearOfCreation;
    this.yearOfBreakup = yearOfBreakup;
    this.currentMembersList = currentMembersList;
    this.previousMembersList = previousMembersList;

  }

  addMember ( musicianId, joined, left, instrument ) {
    this.currentMembersList.push( { musicianId, joined, left, instrument } );

  }


  dataInfo () {
    return {
      "id of band": this.bandId,
      "name of the band": this.nameBand,
      "info about the band": this.infoBand,
      "year of creation": this.yearOfCreation,
      " year of breakup": this.yearOfBreakup,
      "current members of the band": this.currentMembersList,
      "previous members of the band": this.previousMembersList
    }
  }
}
