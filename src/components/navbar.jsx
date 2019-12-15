import React, { Component } from 'react';

// class Navbar extends Component{
//     // Stateless functional Component
//     render() {
//         return (
//             <nav className="navbar navbar-light bg-light">
//                 <a className="navbar-brand" href="#">MobilXperten
//                 <span className="badge badge-pill badge-secondary m-2">{this.props.totalCounters}</span>
//                 </a>
//             </nav>
//         );
//     }
// }

// const Navbar = props => {
// NOTE: Can not use lifecycle hooks. a Stateless function component can old render.
const Navbar = ({totalCounters}) => {
    return (
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand" href="#">MobilXperten
                <span className="badge badge-pill badge-secondary m-2">{totalCounters}</span>
                </a>
            </nav>
        );
}


export default Navbar;