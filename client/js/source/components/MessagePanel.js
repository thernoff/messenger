import React, {Component, PropTypes} from 'react';

class MessagePanel extends Component{
    render(){
        return (
            <div className="MessagePanel">
                <div className="chat">
                </div>
                <div className="footerMessagePanel">
                    <div style={{float: 'left'}}><textarea /></div>
                    <div style={{float: 'right'}}><button>Отправить</button></div>
                    <div style={{clear: 'both'}}></div>
                </div>                
            </div>
        );
    }
}

export default MessagePanel