import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import styles from './styles';

class SidebarItemComponent extends React.Component {

    constructor(){
        super();
    }

    render(){
        return(<div>Hello from the sidebarItems</div> );
    }
    

}
//withSytles takes styles as argument and returns a function 
//which is invoked by EditorComponent

export default withStyles(styles)(SidebarItemComponent);