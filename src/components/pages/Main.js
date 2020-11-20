import  React from "react";
import {Link} from "react-router-dom";


export const Main = () => {
    return(
        <div className="header">
              <ul>
                  <li><Link to='/'>Home</Link></li>
                  <li><Link to='/roster'>Roster</Link></li>
                  <li><Link to='/api'>Apis</Link></li>
              </ul>
        </div>
    )
}
