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
                friends: UserStore.getFilterFriends(),
                //filterFriends: UserStore.getFilterFriends(),
                activeFriend: UserStore.getActiveFriend(),
            });
        });
    }

    _renderFilterPanel(){
        return (
            <div className="FilterPanel">
                <div className="row">
                    <div className="col-xs-7">
                        <Button className="friend-panel" onClick={UserActions.showAllFriends.bind(UserActions)}>Все</Button>
                        <Button className="friend-panel" onClick={UserActions.showOnlineFriends.bind(UserActions)}>Онлайн</Button>
                    </div>
                    <div className="col-xs-5">
                        <div className="WhinepadToolbarSearch">
                            <input 
                            onChange={UserActions.filterSearch.bind(UserActions)}
                            onFocus={UserActions.startFilterSearch.bind(UserActions)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render(){
        return(
            <div className="FriendPanel">
                {this._renderFilterPanel()}
                <div className="row">
                    <div className="col-xs-1">
                        <div><Button className="friend-panel-arrow left"> <span>&#8249;</span></Button></div>
                    </div>                    
                    
                    <div className='col-xs-10'>
                        <div className="avatar-list">
                            {
                                this.state.friends.length > 0 ? this.state.friends.map((friend) => {
                                    //console.log('this.state.activeFriend:', this.state.activeFriend);
                                    //console.log('friend:', friend);
                                    //console.log((this.state.activeFriend !== null && this.state.activeFriend._id === friend._id));
                                    let pos = this.state.currentUser.friends.map((friend) => {return friend.id}).indexOf(friend._id);
                                    //console.log('this.state.currentUser.friends[pos]:', this.state.currentUser.friends);
                                    //console.log('pos:', pos);
                                    let numNewMessages = this.state.currentUser.friends[pos].numNewMessages;
                                    return <Avatar
                                            active={ (this.state.activeFriend !== null && this.state.activeFriend._id === friend._id) }
                                            size='small' 
                                            form='round'
                                            online={friend.online}
                                            src={friend.mainImg ? 'avatars/' + friend._id + '/' + friend.mainImg : 'avatars/no-avatar.jpg'} 
                                            title={friend.firstname + ' ' + friend.lastname} 
                                            alt={friend.login} 
                                            id={friend._id}
                                            numNewMessages={numNewMessages}
                                            onClick={() => {
                                                UserActions.setActiveFriend(friend);
                                                //UserStore.setActiveFriend(friend);
                                            }}
                                        />
                                }, this)
                                : <div className="friend-panel-info"> Друзья с заданными параметрами отсутствуют.</div>
                                //(this.state.possibleFriends.length > 0) 
                                    //? this.state.possibleFriends.length
                                    //: this.state.possibleFriends.length
                            }
                        </div>
                    </div>
                    <div className="col-xs-1">
                        <div><Button className="friend-panel-arrow right"><span>&#8250;</span></Button></div>
                    </div>
                    <div style={{clear: 'both'}}></div>
                </div>
            </div>
        );
    }
}

export default FriendPanel