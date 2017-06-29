import React, {Component, PropTypes} from 'react';
import Button from './Button';
import Avatar from './Avatar';
import UserStore from '../flux/UserStore';

class InfoPanel extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentUser: UserStore.getCurrentUser(),
            possibleFriends: UserStore.getPossibleFriends(),
        };
        UserStore.addListener('change', () => {
            //let currentUser = UserStore.getCurrentUser();
            //console.log(currentUser);
            this.setState({
                currentUser: UserStore.getCurrentUser(),
                possibleFriends: UserStore.getPossibleFriends(),
            });
        });
    }

    render(){
        return(
            <div className='InfoPanel'>
                <div style={{float: 'left'}}>
                    <Avatar size='medium' form='round' src='./avatars/aHr3Bhk5.jpg' />
                </div>
                <div style={{float: 'right'}}>
                    <h2>{this.state.currentUser.firstname} {this.state.currentUser.lastname} ({this.state.currentUser.login})</h2>
                    <Button onClick={this.props.onEdit}>Edit</Button>
                    <Button onClick={this.props.onAdd}>Add</Button>
                    <Button onClick={this.props.onNew}>New ({this.state.possibleFriends ? this.state.possibleFriends.length : this.state.possibleFriends.length})</Button>
                </div>
                <div style={{clear: 'both'}}></div>
            </div>
        );
    }
}

export default InfoPanel