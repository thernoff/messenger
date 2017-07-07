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
            mainImg: UserStore.getMainImg(),
        };
        UserStore.addListener('change', () => {
            //let currentUser = UserStore.getCurrentUser();
            //console.log(currentUser);
            this.setState({
                currentUser: UserStore.getCurrentUser(),
                possibleFriends: UserStore.getPossibleFriends(),
                mainImg: UserStore.getMainImg(),
            });
        });
    }

    render(){
        return(
            <div className='InfoPanel'>
                <div className="row">
                    <div className="col-xs-3">
                        <Avatar
                            size='medium'
                            form='round'
                            src={this.state.mainImg ? './avatars/' + this.state.mainImg : this.state.mainImg}
                            onClick={this.props.onUploadPhoto}
                        />
                    </div>
                    <div className="col-xs-7"><h2>{this.state.currentUser.firstname} {this.state.currentUser.lastname} [{this.state.currentUser.login}]</h2></div>
                    <div className="col-xs-2">
                        <div className="row">
                            <Button className="info-panel" onClick={this.props.onEdit}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
                        </div>
                        <div className="row">
                            <Button className="info-panel" onClick={this.props.onAdd}><i className="fa fa-search-plus" aria-hidden="true"></i></Button>
                        </div>
                        <div className="row">
                            <Button className="info-panel" onClick={this.props.onNew}><i className="fa fa-user" aria-hidden="true"></i></Button>
                            {
                                (this.state.possibleFriends && this.state.possibleFriends.length > 0)?<span className="num-possible-friends">+{this.state.possibleFriends.length}</span>:<span></span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InfoPanel