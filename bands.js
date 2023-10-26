import fs from "fs";
import Band from "./band.js";

export default class Musicians {
  orginList = []
  list = [];

  constructor ( bandsMembers = [] ) {
    this.orginList = this.loadMusicians();
    this.list = this.loadMusicians();

    console.log( "Before init - ", this.list );
    if ( bandsMembers.length > 0 ) {
      this.setMusicians( bandsMembers );
    }
    console.log( "After init - ", this.list );
  }

  loadMusicians () {
    const data = JSON.parse( fs.readFileSync( "musicians1.json" ) );
    const tempList = [];

    for ( let i = 0; i < data.length; i++ ) {
      tempList.push( new Musician( data[ i ].name, data[ i ].picked ) );
    }

    return tempList;
  }

  setMusicians ( bandsMembers ) {
    for ( let i = 0; i < bandsMembers.length; i++ ) {
      const index = this.orginList.findIndex( element => element.name === bandsMembers[ i ] );
      console.log( "Index - ", index );
      if ( index >= 0 ) {
        this.pickMusician( index );
      }
    }
  }

  // addMusicianToList ( newMusician ) {
  //   if ( newMusician.length < 3 || newMusician.length > 25 ) {
  //     console.log( "Måste skriva in minst 3 tecken och max 25" );
  //   } else if ( this.orginList.includes( newMusician ) ) {
  //     console.log( `${ newMusician } finns redan.` );
  //   } else {
  //     this.orginList.push( new Musician( newMusician ) );
  //     this.updateFile()
  //   }
  // }

  addMusicianToList ( name, picked, info, dateOfBirth, currentBands, previousBands, instruments, pickedInstruments ) {
    this.orginList.push( new Musician( name, picked, info, dateOfBirth, currentBands, previousBands, instruments, pickedInstruments ) );
    this.updateFile()
  }

  printList () {
    for ( let i = 0; i < this.list.length; i++ ) {
      console.log( `${ i + 1 }. ${ this.list[ i ].name } - ${ this.list[ i ].picked }` );
    }
  }

  pickMusician ( index ) {
    this.list[ index ].picked = !this.list[ index ].picked;
  }

  listLength () {
    return this.list.length;
  }

  listOfPickedMusicians () {
    const templist = [];

    for ( let i = 0; i < this.list.length; i++ ) {
      if ( this.list[ i ].picked ) {
        templist.push( this.list[ i ].name )
      }
    }

    return templist;
  }

  updateFile () {
    fs.writeFileSync( "musicians1.json", JSON.stringify( this.orginList, null, 2 ) )
  }
}

class Musician {

  name;
  picked;
  info;
  dateOfBirth;
  currentBands = [];
  previousBands = [];
  instruments = [];
  pickedInstruments;

  constructor ( name, picked = false, info, dateOfBirth, currentBands, previousBands, instruments, pickedInstruments = false ) {
    this.name = name;
    this.picked = picked;
    this.info = info;
    this.dateOfBirth = dateOfBirth;
    this.currentBands = currentBands;
    this.previousBands = previousBands;
    this.instruments = instruments;
    this.pickedInstruments = pickedInstruments;
  }
}
