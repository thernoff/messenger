import React, {Component, PropTypes} from 'react';
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
                        if (objMessage.ownerId === currentUser._id){
                            name = this.state.currentUser.firstname + ' ' + this.state.currentUser.lastname;
                                return <div>
                                        <div style={{float: 'left'}}><p>{name}: {objMessage.text}</p></div>
                                        <div style={{clear: 'both'}}></div>
                                    </div>
                        }else{
                            name = this.state.activeFriend.firstname + ' ' + this.state.activeFriend.lastname;
                            return <div>
                                    <div style={{float: 'right'}}><p>{objMessage.text}: {name}</p></div>
                                    <div style={{clear: 'both'}}></div>
                                </div>
                        }
                    })
                }
                </div>
                <div className="footerMessagePanel">
                    <div style={{float: 'left'}}>
                        <Form
                            ref="sendMessageForm"                    
                            fields={[
                                {label: 'Введите текст сообщения', type: 'text', id: 'message'},
                            ]}
                        />
                    </div>
                    <div style={{float: 'right'}}>
                        <Button onClick={this._sendMessage.bind(this)}>Отправить</Button>
                    </div>
                    <div style={{clear: 'both'}}></div>
                </div>                
            </div>
        );
    }
}

export default MessagePanel