import React, {Component} from 'react';
import Aux from '../AUX/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


class Layout extends Component {
    state ={
        showSideDrawer: false
    }
    // sideDrawerHandler = () =>{
    //     this.setState({showSideDrawer: false })
    // }
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => { return {showSideDrawer: !prevState.showSideDrawer};})
    }

    render(){
        return (
            <Aux>
                <Toolbar drawerToggler={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                open={this.state.showSideDrawer} 
                click = {this.sideDrawerToggleHandler} />
                <main className = {classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;