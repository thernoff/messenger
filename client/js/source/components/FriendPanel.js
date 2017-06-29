import React, {Component, PropTypes} from 'react';
import Avatar from './Avatar';
import Button from './Button';
import UserStore from '../flux/UserStore';

class FriendPanel extends Component{
    constructor(props) {
        super(props);
        this.state = {
            //possibleFriends: [{a: 'a'}, {b: 'b'}, {c: 'c'}],
            possibleFriends: UserStore.getPossibleFriends(),
            currentUser: UserStore.getCurrentUser(),
            friends: UserStore.getFriends(),
        };
        UserStore.addListener('change', () => {
            //console.log(UserStore.getPossibleFriends());
            this.setState({
                possibleFriends: UserStore.getPossibleFriends(),
                //possibleFriends: [{a: 'a'}, {b: 'b'}],
                currentUser: UserStore.getCurrentUser(),
                friends: UserStore.getFriends(),
            });
        });
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
                        {
                            //console.log('this.state.possibleFriends: ', this.state.possibleFriends)
                        }
                        {
                            //console.log('this.state.possibleFriends.length: ', this.state.possibleFriends.length)
                        }
                        <h3>{
                            this.state.friends.map((friend) => {
                                //console.log('friend');
                                return <Avatar size='small' form='round' src={friend.mainImg} title={friend.firstname + ' ' + friend.lastname} alt={friend.login} />
                            }, this)
                            //(this.state.possibleFriends.length > 0) 
                                //? this.state.possibleFriends.length
                                //: this.state.possibleFriends.length
                        }</h3>
                        
                    </div>
                    
                    <div style={{clear: 'both'}}></div>
                </div>
            </div>
        );
    }
}

export default FriendPanel