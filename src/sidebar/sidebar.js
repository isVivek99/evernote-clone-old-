
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebaritem/sidebarItem';

class SidebarComponent extends React.Component {

    constructor(){
        super();
        this.state = {
            addingNote: false,
            title:null
        }
    }

    render(){

        const {notes, selectedNoteIndex, classes} = this.props;

        if(notes){
            return(
                <div className={classes.sidebarContainer}>
                    <Button
                    onClick={this.newNoteBtnClick}
                    className={classes.newNoteBtn}>{this.state.addingNote? 'cancel': 'newnote'}</Button>
                    {
                        this.state.addingNote ?
                        <div>
                            <input type="text" 
                            className={classes.newNoteInput}
                            placeholder="enter new title"
                            onKeyUp={(e)=>{this.updateTitle(e.target.value)}}
                            />
                            <Button
                                className={classes.newNoteSubmitBtn}
                                onClick={this.newNote}>Submit Note</Button>
                        </div>:
        
                        null
                    }
                    <List>
                        {
                            notes.map((_note, _index)=>{
                                console.log("index: "+_index);
                                return(
                                    <div key={_index}>
                                        <SidebarItemComponent
                                            _note={_note}
                                            _index={_index}
                                            selectedNoteIndex={selectedNoteIndex}
                                            selectNote={this.selectNote}
                                            deleteNote={this.deleteNote}
                                        ></SidebarItemComponent>
                                    </div>
                                )
                            })
                        }
                    </List>
             </div> 
            );
        }else{
            return(<div></div>);
        }

    }
    newNoteBtnClick = ()=>{
        this.setState({title:null, addingNote: !this.state.addingNote});
        console.log("new button clicked");
    }
    updateTitle=(txt)=>{
        console.log("here it is: "+txt);
        this.setState({title:txt});
    }
    newNote=()=>{
        this.props.newNote(this.state.title);
        this.setState({title:null, addingNote:false});
    }
    selectNote=(n,i)=>this.props.selectNote(n, i);
    deleteNote=(note)=>this.props.deleteNote(note);

}
//withSytles takes styles as argument and returns a function 
//which is invoked by SidebarComponent

export default withStyles(styles)(SidebarComponent);