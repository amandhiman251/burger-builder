import React from 'react';
import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

const navigationItem = (props) =>{

    return(
        <li className={classes.NavigationItem}>
           <NavLink 
           activeClassName={classes.active} 
           exact={props.exact}
           to={props.link||''}>
               {props.children}
           </NavLink>
       </li>
   );}

    
export default withRouter(navigationItem);


