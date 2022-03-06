import React from 'react';
import classes from './Navbar.module.css'


function Navbar(props) {

    const user = props.user;

    return (
        <nav id={classes.navbar}>
            <div className={`${classes.navcontainer} container`}>
                <div className={classes.navbrand}>
                    Edvora
                </div>
                <div className={classes.nav_user}>
                    <img src={user.url} alt="dontKnow" className={classes.user_img} />
                    <p className={classes.nav_username}>{user.name}</p>
                </div>
            </div>
        </nav>
    )
}

export default Navbar