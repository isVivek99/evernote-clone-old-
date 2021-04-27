import React from 'react';
import firebase from "firebase" ;
import 'firebase/storage';
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';


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
        Hello commene
        <SidebarComponent></SidebarComponent>
        <EditorComponent></EditorComponent>
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
}



export default App;