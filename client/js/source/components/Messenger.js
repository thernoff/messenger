import Button from './Button';
import Form from './Form';
import Dialog from './Dialog';
//import Panels from './Panels';
import InfoPanel from './InfoPanel';
import FriendPanel from './FriendPanel';
import MessagePanel from './MessagePanel';
import React, {Component, PropTypes} from 'react';
import UserStore from '../flux/UserStore';
import UserActions from '../flux/UserActions';

class Messenger extends Component{

    constructor(){
        super();
        this.state = {
            currentUser: UserStore.getCurrentUser(),
            possibleFriends: UserStore.getPossibleFriends(),
            typeForm: null,
            errorLogin: false,
            errorPassword: false,
            errorEmail: false,
        };
        UserStore.addListener('change', () => {            
            this.setState({
                possibleFriends: UserStore.getPossibleFriends(),
                currentUser: UserStore.getCurrentUser(),
            });
        });
    }

    _actionClick(typeForm) {
        //console.log(typeForm);
        this.setState({typeForm: typeForm});
    }  
    
    _renderPanels(){
        if (!this.state.currentUser){
            return null;
        }
        return (
            <div className="Panels">
                <InfoPanel />
                <FriendPanel />
                <MessagePanel />
            </div>
        );
    }

    _renderAuthForm(){
        return(
            <Dialog
                modal={true}
                header="Авторизуйтесь"
                onAction={this._authUser.bind(this)}
            >
                <Form
                    ref="authForm"
                    fields={[
                        {label: 'Логин', id: 'login', error: this.state.errorLogin},
                        {label: 'Пароль', id: 'password', error: this.state.errorPassword},
                    ]}
                />
                <Button onClick={this._actionClick.bind(this, 'registerForm')}>Регистрация</Button>
            </Dialog>
        );
    }

    _authUser(){
        this.setState({
            errorLogin: false,
            errorPassword: false,
        });
        let data = this.refs.authForm.getData();
        let emptyField = false;
        for (let key in data){
            if (!data[key]){
                let error = 'error' + key.charAt(0).toUpperCase() + key.slice(1);
                switch(error){
                    case 'errorLogin': this.setState({errorLogin: true});
                    case 'errorPassword': this.setState({errorPassword: true});                
                }
                emptyField = true;
            }
        }
        if (!emptyField){
            UserActions.getUser(data);
        }
    }  

    _renderRegisterForm(){
        return(
            <Dialog
                modal={true}
                header="Регистрация"
                onAction={this._registerUser.bind(this)}
            >
                <Form
                    ref="registerForm"
                    fields={[
                        {label: 'Логин', id: 'login', error: this.state.errorLogin},
                        {label: 'Пароль', id: 'password', error: this.state.errorPassword},
                        {label: 'Email', id: 'email', error: this.state.errorEmail},
                    ]} 
                />
                <Button onClick={this._actionClick.bind(this, 'authForm')}>Авторизация</Button>
            </Dialog>
        );
    }

    _registerUser(){

        this.setState({
            errorLogin: false,
            errorPassword: false,
            errorEmail: false,
        });

        let data = this.refs.registerForm.getData();
        let emptyField = false;
        for (let key in data){
            if (!data[key]){
                let error = 'error' + key.charAt(0).toUpperCase() + key.slice(1);
                switch(error){
                    case 'errorLogin': this.setState({errorLogin: true});
                    case 'errorPassword': this.setState({errorPassword: true});
                    case 'errorEmail': this.setState({errorEmail: true});
                }
                emptyField = true;
            }
        }
        if (!emptyField){
            UserActions.createUser(data);
        }
        
        //console.log(data);
    }
    
    _renderEditProfileForm(){
        let currentUser = this.state.currentUser;
        return(
            <Dialog
                modal={true}
                header="Редактирование профиля"
                onAction={this._updateUser.bind(this)}
                hasCancel={true}
            >
                <Form
                    ref="editProfileForm"
                    fields={[
                        {label: 'Логин', id: 'login', error: this.state.errorLogin},
                        {label: 'Пароль', id: 'password', error: this.state.errorPassword},
                        {label: 'Имя', id: 'firstname',},
                        {label: 'Фамилия', id: 'lastname',},
                        {label: 'Email', id: 'email', error: this.state.errorEmail},
                    ]}
                    initialData={{login: currentUser.login, password: currentUser.password, firstname: currentUser.firstname,  lastname: currentUser.lastname, email: currentUser.email}}
                />
            </Dialog>
        );
    }

    _updateUser(action){
        this.setState({typeForm: null});
        this.setState({
            errorLogin: false,
            errorPassword: false,
            errorEmail: false,
        });
        if (action === 'dismiss') {
            return;
        }
        let data = this.refs.editProfileForm.getData();
        
        let emptyField = false;
        for (let key in data){
            if (!data[key]){
                let error = 'error' + key.charAt(0).toUpperCase() + key.slice(1);
                switch(error){
                    case 'errorLogin': this.setState({errorLogin: true}); emptyField = true;
                    case 'errorPassword': this.setState({errorPassword: true}); emptyField = true;
                    case 'errorEmail': this.setState({errorEmail: true}); emptyField = true;
                }
                
            }
        }
        if (!emptyField){            
            data._id = this.state.currentUser._id;
            UserActions.updateUser(data);
            //setTimeout(UserActions.getUserById.bind(this, this.state.currentUser._id), 1000);
            
        }
    }

    _renderListPossibleFriend(){
        
        let arrPossibleFriends = this.state.possibleFriends;
        //console.log(arrPossibleFriends);
        return(
            <Dialog
                modal={true}
                header="Возможные друзья"
                onAction={this._cancel.bind(this)}
                hasCancel={false}
            >
                {
                    arrPossibleFriends.map((friend, idx) => 
                            {
                                //console.log(friend);
                                return (<p>{friend.firstname} {friend.lastname} <Button onClick={this._sendRequestAddToFriends.bind(this, friend)}>+</Button></p>);
                            }
                        )
                }
            </Dialog>
        );
    }

    _cancel(){
        this.setState({typeForm: null});
    }

    _sendRequestAddToFriends(possibleFriend){
        console.log('-----_sendRequestAddToFriends: possibleFriend-----');
        console.log(possibleFriend);
        let currentUser = this.state.currentUser;
        console.log('-----_sendRequestAddToFriends: currentUser-----');
        console.log(currentUser);
        if (!possibleFriend.possibleFriends){
            possibleFriend.possibleFriends = [];
        }
        possibleFriend.possibleFriends.push({id: currentUser._id});
        UserActions.updateUser(possibleFriend);
    }

    _renderSearchFriendForm(){
        let currentUser = this.state.currentUser;
        return(
            <Dialog
                modal={true}
                header="Поиск друзей"
                onAction={this._searchFriend.bind(this)}
                hasCancel={true}
            >
                <Form
                    ref="addFriendForm"
                    fields={[
                        {label: 'Имя друга', id: 'search'},
                    ]}
                />
            </Dialog>
        );
    }

    _searchFriend(action){
        this.setState({typeForm: null});
        if (action === 'dismiss') {
            return;
        }

        let data = this.refs.addFriendForm.getData();
        if (data){
            UserActions.searchFriend(data);
            this.setState({typeForm: 'listFriends'});
        }
    }

    render(){
        //console.log(this.state.currentUser);
        return (
            <div className="Messenger">

                <div className="Panels">
                    <InfoPanel onEdit={this._actionClick.bind(this, 'editForm')} onAdd={this._actionClick.bind(this, 'searchFriendForm')}/>
                    <FriendPanel />
                    <MessagePanel />
                </div>

                {this._renderBeginForm()}
                {this._renderForm()}
            </div>
        );
    }

    _renderBeginForm(){
        if (this.state.currentUser._id){
            return null;
        }
        switch (this.state.typeForm){            
            case 'editForm':
                return this._renderEditProfileForm();
            case 'registerForm':
                return this._renderRegisterForm();
            case 'authForm':
                return this._renderAuthForm();
            default:
                return this._renderAuthForm();
        }
    }

    _renderForm(){
        switch (this.state.typeForm){
            case 'listFriends':
                return this._renderListPossibleFriend();
            case 'searchFriendForm':
                return this._renderSearchFriendForm();
            case 'editForm':
                return this._renderEditProfileForm();
            default:
                return null;
        }
    }
}

export default Messenger