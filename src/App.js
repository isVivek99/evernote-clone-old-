import React from 'react';
import firebase from "firebase" ;
import 'firebase/storage';
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';
import './App.css';



class App extends React.Component {
 
  constructor(){
    super();
    this.state={
      selectedNoteIndex:null,
      selectedNote:null,
      notes:null
    };
  }


  render(){

    return( 
      <div className="app-container">
        {/* state contains following attributes 1. selectedNoteIndex, selectedNote, notes(array) */}
        <SidebarComponent 
          selectedNoteIndex={this.state.selectedNoteIndex} 
          notes={this.state.notes} 
          deleteNote={this.deleteNote} 
          selectNote={this.selectNote}
          newNote = {this.newNote}  
          >
        </SidebarComponent>

        {
          this.state.selectedNote?
          <EditorComponent
           selectedNote={this.state.selectedNote}
           selectedNoteIndex={this.state.selectedNoteIndex }
           noteUpdate={this.noteUpdate}
          ></EditorComponent> :
        null
        }
      </div> );
  }
  //on snapshot creates an object which contains all elements 
  // (say) serverUpdate is the object which has  an attribute docs 
  // docs must be an array  on which we map using an iterator 
  componentDidMount= ()=>{
    firebase.
      firestore()
      .collection('notes')
      .onSnapshot(serverUpdate =>{          
        const notes = serverUpdate.docs.map(doc=>{                                      
          const data = doc.data();                
          data['id'] = doc.id;
          return data;
        });
        console.log(notes);
        this.setState({ notes:notes });
      });
      
    }
    
    
    selectNote = (note, index) => {
      //console.log("note,index: "+note[0]+" "+index);
      this.setState({ selectedNoteIndex: index, selectedNote: note });
    }

    noteUpdate = (id, noteObj) => {
      firebase
        .firestore()
        .collection('notes')
        .doc(id)
        .update({
          title: noteObj.title,
          body: noteObj.body,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }

    newNote = async (title)=>{

      const note = {
        title:title,
        body:''
      };
      //newFromDB contains an array of noteObject
      const newFromDB = await firebase.firestore()
        .collection('notes')
        .add({
          title:note.title,
          body:note.body,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        //newFromDB.id is a string of autoID from db.
        const newID = newFromDB.id;
        
        console.log("newFromDB: "+newFromDB);
        console.log("newID: "+newID);
        
         this.setState({notes:[...this.state.notes, note]});

         /*this.state.notes.filter(note=>{
          console.log("note.id: "+note.id);
           if(note.id===newID){
            console.log("note.id(inside): "+note.id);
           }*/

        const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note=>_note.id===newID));
        console.log("newNoteIndex: "+newNoteIndex);
        this.setState({ selectedNote:this.state.notes[newNoteIndex], selectedNoteIndex:newNoteIndex });
    }

    deleteNote = async (note) => {
      const noteIndex = this.state.notes.indexOf(note);
      await this.setState({ notes: this.state.notes.filter(_note => _note !== note) });
      if(this.state.selectedNoteIndex === noteIndex) {
        this.setState({ selectedNoteIndex: null, selectedNote: null });
      } else {
        this.state.notes.length > 1 ?
        this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
        this.setState({ selectedNoteIndex: null, selectedNote: null });
      }
  
      firebase
        .firestore()
        .collection('notes')
        .doc(note.id)
        .delete();
    }
}


export default App;