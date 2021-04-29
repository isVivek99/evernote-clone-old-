import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helpers';

class SidebarItemComponent extends React.Component {

    
    render(){

        const { _index, _note, classes, selectedNoteIndex } = this.props;

        return(
            <div key={_index}>
                <ListItem
                className={classes.ListItem}
                selected={selectedNoteIndex === _index}
                alignItems="flex-start">
                    <div 
                    
                    className={classes.textSection}
                    onClick={()=>{this.selectNote(_note, _index)}}>
                    <ListItemText 
                        primary={_note.title}
                        secondary={ removeHTMLTags(_note.body.substring(0,30)+"..." )} 
                    ></ListItemText>
                    <DeleteIcon onClick={()=>this.deleteNote(_note)}
                    className={classes.deleteIcon}></DeleteIcon>
                    </div>

                </ListItem>
            </div>
        );
    }

    selectNote=(n,i)=> this.props.selectNote(n,i);
    deleteNote=(note)=>{
        if(window.confirm(`Are you sure u want to delete:${note.title}`)){
            this.props.deleteNote(note);
        }
    }
    

}
//withSytles takes styles as argument and returns a function 
//which is invoked by EditorComponent

export default withStyles(styles)(SidebarItemComponent);