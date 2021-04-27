import React from 'react';

import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles'
import styles from './styles';

class EditorComponent extends React.Component {

    constructor(){
        super();
    }

    render(){
        return(<div>Hello from the editor</div> );
    }
    

}
//withStyles takes styles as argument and returns a function 
//which is invoked by EditorComponent

export default withStyles(styles)(EditorComponent);