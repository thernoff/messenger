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
                            src={ this.state.mainImg }
                            onClick={this.props.onUploadPhoto}
                        />
                    </div>
                    <div className="col-xs-7"><h2>{this.state.currentUser.firstname} {this.state.currentUser.lastname} [{this.state.currentUser.login}]</h2></div>
                    <div className="col-xs-2">
                        <div className="row">
                            <Button className="info-panel" title="Редактировать" onClick={this.props.onEdit}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
                        </div>
                        <div className="row">
                            <Button className="info-panel" title="Поиск новых друзей" onClick={this.props.onAdd}><i className="fa fa-search-plus" aria-hidden="true"></i></Button>
                        </div>
                        <div className="row">
                            <Button className="info-panel" title="Заявки в друзья" onClick={this.props.onNew}><i className="fa fa-user" aria-hidden="true"></i></Button>
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