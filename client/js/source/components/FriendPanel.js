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
            minFriendId: 0,
            maxFriendId: 4,
        };
        UserStore.addListener('change', () => {
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
                activeFriend: UserStore.getActiveFriend(),
                minFriendId: 0,
                maxFriendId: 4,
            });
        });
    }

    _moveLeftListFriends(){
        let minFriendId = this.state.minFriendId;
        let maxFriendId = this.state.maxFriendId;
        //console.log('minFriendId: ', minFriendId);
        //console.log('maxFriendId: ', maxFriendId);
        if (minFriendId - 1 < 0) return;
        this.setState({
            minFriendId: --minFriendId,
            maxFriendId: --maxFriendId,
        });
    }

    _moveRightListFriends(){
        let minFriendId = this.state.minFriendId;
        let maxFriendId = this.state.maxFriendId;
        let countFriends = this.state.friends.length;
        //console.log('minFriendId: ', minFriendId);
        //console.log('maxFriendId: ', maxFriendId);
        if (maxFriendId + 1 >= countFriends) return;
        this.setState({
            minFriendId: ++minFriendId,
            maxFriendId: ++maxFriendId,
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
                            placeholder="Введите имя друга"
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
                        <div><Button className="friend-panel-arrow left" onClick={this._moveLeftListFriends.bind(this)}> <span>&#8249;</span></Button></div>
                    </div>                    
                    <div className='col-xs-10'>
                        <div className="avatar-list">
                            {
                                this.state.friends.length > 0 
                                ? this.state.friends.map((friend, idx) => {
                                    let pos = this.state.currentUser.friends.map((friend) => {return friend.id}).indexOf(friend._id);
                                    let numNewMessages = this.state.currentUser.friends[pos].numNewMessages;
                                    if (idx >= this.state.minFriendId && idx <= this.state.maxFriendId){
                                        return <Avatar
                                            key={idx}
                                            active={ (this.state.activeFriend !== null && this.state.activeFriend._id === friend._id) }
                                            size='small' 
                                            form='round'
                                            online={friend.online}
                                            src={ friend.mainImg ? friend.mainImg : './images/no-avatar.jpg' }
                                            title={friend.firstname + ' ' + friend.lastname} 
                                            alt={friend.login} 
                                            id={friend._id}
                                            numNewMessages={numNewMessages}
                                            onClick={() => {
                                                UserActions.setActiveFriend(friend);
                                                //UserStore.setActiveFriend(friend);
                                            }}
                                        />
                                    }
                                }, this)
                                : <div className="friend-panel-info"> Друзья с заданными параметрами отсутствуют.</div>
                            }
                        </div>
                    </div>
                    <div className="col-xs-1">
                        <div><Button className="friend-panel-arrow right" onClick={this._moveRightListFriends.bind(this)}><span>&#8250;</span></Button></div>
                    </div>
                    <div style={{clear: 'both'}}></div>
                </div>
            </div>
        );
    }
}

export default FriendPanel