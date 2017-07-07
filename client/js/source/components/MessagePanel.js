import React, {Component, PropTypes} from 'react';
import Avatar from './Avatar';
import Form from './Form';
import Button from './Button';
import UserStore from '../flux/UserStore';
import UserActions from '../flux/UserActions';

class MessagePanel extends Component{

    constructor(props) {
        super(props);
        this.state = {
            currentUser: UserStore.getCurrentUser(),
            activeFriend: UserStore.getActiveFriend(),
            dialog: UserStore.getDialog(),
        };
        UserStore.addListener('change', () => {
            this.setState({
                currentUser: UserStore.getCurrentUser(),
                dialog: UserStore.getDialog(),
            });
        });

        UserStore.addListener('changeActiveFriend', () => {
            this.setState({
                activeFriend: UserStore.getActiveFriend(),
                dialog: UserStore.getDialog(),
            });
        });
    }

    _sendMessage(){
        let objMessage = this.refs.sendMessageForm.getData();
        let currentUser = this.state.currentUser;
        let activeFriend = this.state.activeFriend;
        //console.log('objMessage: ', objMessage);
        //console.log('currentUser: ', currentUser);
        //console.log('activeFriend: ', activeFriend);
        if (activeFriend){
            UserActions.sendMessage(currentUser, activeFriend, objMessage);
        }
    }

    render(){
        return (
            <div className="MessagePanel">
                <div className="chat">
                {
                    this.state.dialog.map((objMessage) => {
                        let name;
                        let message;
                        let currentUser = this.state.currentUser;
                        let activeFriend = this.state.activeFriend;
                        if (objMessage.ownerId === currentUser._id){
                            name = currentUser.firstname + ' ' + currentUser.lastname;
                                return <div className="row">
                                            <div className="col-xs-2">
                                                <span className="name-current-user">{name}</span>
                                            </div>
                                            <div className="col-xs-8">
                                                <span className="message-current-user">{objMessage.text}</span>
                                            </div>
                                            <div className="col-xs-2">
                                            </div>
                                        </div>
                        }else{
                            name = activeFriend.firstname + ' ' + activeFriend.lastname;
                            return <div className="row">
                                            <div className="col-xs-2">
                                            </div>
                                            <div className="col-xs-8">
                                               <span className="message-active-friend">{objMessage.text}</span>
                                            </div>
                                            <div className="col-xs-2">
                                                 <span className="name-active-friend">{name}</span>
                                            </div>
                                        </div>
                        }
                    })
                }
                </div>
                <div className="footerMessagePanel">
                    <div className="row">
                        <div className="col-xs-11">
                            <Form
                                ref="sendMessageForm"                    
                                fields={[
                                    {label: 'Введите текст сообщения', type: 'text', id: 'message'},
                                ]}
                            />
                        </div>
                        <div className="col-xs-1">
                            <Button className="message-panel-send" onClick={this._sendMessage.bind(this)}><span><i className="fa fa-caret-square-o-right" aria-hidden="true"></i></span></Button>
                        </div>
                    </div>
                </div>                
            </div>
        );
    }
}

export default MessagePanel