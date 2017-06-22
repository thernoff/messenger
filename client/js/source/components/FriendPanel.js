import React, {Component, PropTypes} from 'react';
import Avatar from './Avatar';
import Button from './Button';

class FriendPanel extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    _renderFilterPanel(){
        return (
            <div className="FilterPanel">
                <div style={{float: 'left'}}>
                    <Button>Все</Button>
                    <Button>Онлайн</Button>
                </div>
                <div style={{float: 'right'}}>
                    <input />
                </div>
                
                <div style={{clear: 'both'}}></div>
            </div>
        );
    }

    render(){
        return(
            <div className="FriendPanel">
                {this._renderFilterPanel()}
                <div>
                    <div style={{float: 'left', width: '30px', fontSize: '40px', textAlign: 'center'}}><span>&#8249;</span></div>
                    <div style={{float: 'right', width: '30px', fontSize: '40px', textAlign: 'center'}}><span>&#8250;</span></div>
                    <div className='friend'>
                        <Avatar size='small' form='round' src='./avatars/aHr3Bhk5.jpg' />
                        <Avatar size='small' form='round' src='./avatars/aHr3Bhk5.jpg' />
                        <Avatar size='small' form='round' src='./avatars/aHr3Bhk5.jpg' />
                        <Avatar size='small' form='round' src='./avatars/aHr3Bhk5.jpg' />
                    </div>
                    
                    <div style={{clear: 'both'}}></div>
                </div>
            </div>
        );
    }
}

export default FriendPanel