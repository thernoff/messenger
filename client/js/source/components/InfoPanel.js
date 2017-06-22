import React, {Component, PropTypes} from 'react';
import Button from './Button';
import Avatar from './Avatar';
import UserStore from '../flux/UserStore';

class InfoPanel extends Component{
    constructor(props) {
        super(props);
        let currentUser = UserStore.getCurrentUser();
        this.state = {
            currentUser: currentUser,
        };
        UserStore.addListener('change', () => {
            //let currentUser = UserStore.getCurrentUser();
            //console.log(currentUser);
            this.setState({
                currentUser: UserStore.getCurrentUser(),
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
                </div>
                <div style={{clear: 'both'}}></div>
            </div>
        );
    }
}

export default InfoPanel