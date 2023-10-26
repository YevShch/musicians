import fs from "fs";
import Band from "./band.js";

export default class Bands {
  bandsList = [];
  
    
  ; // Lista som håller alla band-objekt.

  constructor () {
    this.fetchBandData();
  }

  
  get bandsList () {
    return this.bandsList;
  }

  // Läser in alla band från "bands.json". 
  fetchBandData () {
    const jsonString = fs.readFileSync( "bands.json" );
    const data = JSON.parse( jsonString );

    // Populerar #bandsList med band-objekt, då kommer vi få tillgång till alla metoder i Band-klassen.
    for ( let i = 0; i < data.length; i++ ) {
      this.bandsList.push( new Band(
        data[ i ].nameBand,
        data[ i ].infoBand,
        data[ i ].yearOfCreation,
        data[ i ].yearOfBreakup,
        data[ i ].currentMembersList,
        data[ i ].previuosMembersList ) );
    }
  }

  //Skriver ut index och band-objektens namn 
  printBands () {
    for ( let i = 0; i < this.bandsList.length; i++ ) {
      console.log( `${ i + 1 }. ${ this.bandsList[ i ].nameBand }` );
    }
  }

  //Skriver ut index, band-objektens namn och ifall dem är incheckade eller inte
  printInfoBand ( i ) {
    console.log( `
    ${ i + 1 }. ${ this.bandsList[ i ].nameBand }->
     ${ this.bandsList[ i ].infoBand } -> 
     ${ this.bandsList[ i ].yearOfCreation } ->
     ${ this.bandsList[ i ].yearOfBreakup }-> 
     ${ this.bandsList[ i ].currentMembersList } -> 
     ${ this.bandsList[ i ].previousMembersList }` );
  }



  addBandToList ( nameBand, infoBand, yearOfCreation, yearOfBreakup, currentMembersList, previousMembersList ) {
    this.bandsList.push( new Band( nameBand, infoBand, yearOfCreation, yearOfBreakup, currentMembersList, previousMembersList ) ); // Lägger till en ny band i #bandsList.
    this.updateJsonFile(); // Uppdaterar "bands.json".
  }


  addCurrentMusician(currentMembersList ) {
    this.bandsList.push( new Band(  currentMembersList ) ); // Lägger till en ny mysiker i bandlist.
    this.updateJsonFile();  
  }


  removeBandFromList ( index ) {
    this.bandsList.splice( index, 1 ); // Tar bort en band ifrån #bandsList.
    this.updateJsonFile(); // Uppdaterar "bands.json".
  }

  updateJsonFile () {
    let tempList = []; // Skapar en temporär lista som ska sparas i "bands.json".

    for ( let i = 0; i < this.bandsList.length; i++ ) {
      // Använder dataInfo som ger mig ett nytt objekt med alla band-objektet egenskaps information.
      // Om vi sparar band-objektet direkt, kommer inte informationen från privata egenskaper med.
      tempList.push( this.bandsList[ i ].dataInfo() );
    }

    fs.writeFileSync( './bands.json', JSON.stringify( tempList, null, 2 ), ( err ) => {
      if ( err ) throw err;
      console.log( 'Data written to file' );
    } );
  }

  getLength () {
    return this.bandsList.length;
  }
}

