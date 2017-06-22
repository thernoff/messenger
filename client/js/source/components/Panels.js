import React, {Component, PropTypes} from 'react';
import InfoPanel from './InfoPanel';
import FriendPanel from './FriendPanel';
import MessagePanel from './MessagePanel';

class Panels extends Component{

    render(){
        return(
            <div className="Panels">
                <InfoPanel />
                <FriendPanel />
                <MessagePanel />
            </div>
        );
    }
}

export default Panels