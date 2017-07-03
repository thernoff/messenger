import React, {Component, PropTypes} from 'react';
import Avatar from './Avatar';
import Button from './Button';
import UserStore from '../flux/UserStore';
import UserActions from '../flux/UserActions';

class FriendPanel extends Component{
    constructor(props) {
        super(props);
        this.state = {
            possibleFriends: UserStore.getPossibleFriends(),
            currentUser: UserStore.getCurrentUser(),
            friends: UserStore.getFriends(),
            activeFriend: UserStore.getActiveFriend(),
            filterFriends: UserStore.getFilterFriends(),
        };
        UserStore.addListener('change', () => {
            //console.log(UserStore.getPossibleFriends());
            this.setState({
                possibleFriends: UserStore.getPossibleFriends(),
                currentUser: UserStore.getCurrentUser(),
                friends: UserStore.getFriends(),
            });
        });
        UserStore.addListener('changeActiveFriend', () => {
            this.setState({
                friends: UserStore.getFriends(),
                activeFriend: UserStore.getActiveFriend(),
            });
        });
        UserStore.addListener('filterFriends', () => {
            this.setState({
                filterFriends: UserStore.getFilterFriends(),
                activeFriend: UserStore.getActiveFriend(),
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
                    <div className="WhinepadToolbarSearch">
                        <input 
                        onChange={UserActions.filter.bind(UserActions)}
                        onFocus={UserActions.startFilter.bind(UserActions)}
                        />
                    </div>
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
                            //console.log('this.state.friends: ', this.state.friends)
                        }
                        {
                            //console.log('this.state.possibleFriends.length: ', this.state.possibleFriends.length)
                        }
                        <h3>
                        {
                            this.state.filterFriends.length > 0 ? this.state.filterFriends.map((friend) => {
                                return <Avatar
                                    active={ (this.state.activeFriend !== null && this.state.activeFriend._id === friend._id) }
                                    size='small' 
                                    form='round'
                                    online={friend.online}
                                    src={friend.mainImg} 
                                    title={friend.firstname + ' ' + friend.lastname} 
                                    alt={friend.login} 
                                    id={friend._id}
                                    onClick={() => {
                                        UserStore.setActiveFriend(friend);
                                    }}
                                    />
                            }, this) :
                            this.state.friends.map((friend) => {
                                //console.log('this.state.activeFriend:', this.state.activeFriend);
                                //console.log('friend:', friend);
                                //console.log((this.state.activeFriend !== null && this.state.activeFriend._id === friend._id));
                                return <Avatar
                                    active={ (this.state.activeFriend !== null && this.state.activeFriend._id === friend._id) }
                                    size='small' 
                                    form='round'
                                    online={friend.online}
                                    src={friend.mainImg} 
                                    title={friend.firstname + ' ' + friend.lastname} 
                                    alt={friend.login} 
                                    id={friend._id}
                                    onClick={() => {
                                        UserStore.setActiveFriend(friend);
                                    }}
                                    />
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