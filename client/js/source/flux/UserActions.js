import api from '../api/api';
import UserStore from './UserStore';

const UserActions = {

    loadUsers() {
        let data = api.listUsers();
    },

    createUser(user) {
        api.createUser(user)
        .then((res) =>
            {
                UserStore.setUser(res.data);
            }
        )
        .catch(err =>
            console.error(err)
        );
    },

    updateUser(user) {
        api.updateUser(user)
        .then((res) =>
            {
                console.log('-----UserActions.updateUser-----');
                console.log('-----пришел результат с сервера-----');
                console.log(res.data);
                let currentUser = UserStore.getCurrentUser();
                if (currentUser._id === user._id){                    
                    this._setPossibleFriends(res.data.possibleFriends);
                    UserStore.setUser(res.data);
                }else{
                    socket.emit('update', {currentUserId: currentUser._id, possibleFriendId: user._id});
                    //this._setPossibleFriends(res.data.possibleFriends);
                    //UserStore.setUser(res.data);
                }
            }
        )
        .catch(err =>
            console.error(err)
        );
    },
//Метод посылает запрос на добавление в друзья друг другу для currentUser и possibleFriend
//В res приходит объект currentUser (текущий пользователь)
    addToFriends(currentUser, possibleFriend) {
        api.addToFriends(currentUser, possibleFriend)
        .then((res) =>
            {
                let currentUser = UserStore.getCurrentUser();
                if (currentUser._id === res.data._id){
                    console.log('-----UserActions.addToFriends-----');
                    console.log(res.data);
                    this._setFriends(res.data.friends);
                    this._setPossibleFriends(res.data.possibleFriends);
                    UserStore.setUser(res.data);
                    socket.emit('update', {currentUserId: currentUser._id, possibleFriendId: possibleFriend._id});
                }
            }
        )
        .catch(err =>
            console.error(err)
        );
    },

//Метод посылает запрос от currentUser на добавление в возможные друзья possibleFriend
    addToPossibleFriends(currentUser, possibleFriend) {
        api.addToPossibleFriends(currentUser, possibleFriend)
        .then((res) =>
            {
                let currentUser = UserStore.getCurrentUser();
                if (currentUser._id === res.data._id){
                    console.log('-----UserActions.addToPossibleFriends-----');
                    console.log(res.data);
                    this._setFriends(res.data.friends);
                    this._setPossibleFriends(res.data.possibleFriends);
                    UserStore.setUser(res.data);
                    socket.emit('update', {currentUserId: currentUser._id, possibleFriendId: possibleFriend._id});
                }
            }
        )
        .catch(err =>
            console.error(err)
        );
    },

//Получаем объект User из базы даных по логину и паролю, после чего сохраняем его в Хранилище
    getUser(data) {
        let login = data.login;
        let password = data.password;
        api.getUser(login, password)
        .then((res) =>
            {
                if (res.data){
                    console.log('-----UserActions.getUser-----');
                    console.log('-----Объект User пришел результат с сервера-----');
                    console.log(res.data);
                    UserStore.setUser(res.data);
                    console.log('-----заполняем друзей-----');
                    console.log(res.data.friends);
                    this._setFriends(res.data.friends);
                    console.log('-----заполняем возможных друзей-----');
                    console.log(res.data.possibleFriends);
                    this._setPossibleFriends(res.data.possibleFriends);
                    socket.emit('auth', res.data._id);
                }
            }
        )
        .catch(err =>
            console.error(err)
        );
    },
//Получаем объект User из базы даных по id, после чего сохраняем его в Хранилище
    getUserById(id) {
        api.getUserById(id)
        .then((res) =>
            {
                console.log('-----UserActions.getUserById-----');
                console.log('-----Объект User пришел результат с сервера-----');
                console.log(res.data);
                UserStore.setUser(res.data);
                console.log('-----заполняем друзей-----');
                console.log(res.data.friends);
                this._setFriends(res.data.friends);
                console.log('-----заполняем возможных друзей-----');
                console.log(res.data.possibleFriends);
                this._setPossibleFriends(res.data.possibleFriends);                
            }
        )
        .catch(err =>
            console.error(err)
        );
    },

    //Заполняем массив UserStore.possibleFriends объектами Возможных друзей
    _setPossibleFriends(arrObjIdsPossibleFriends){
        api.getPossibleFriends(arrObjIdsPossibleFriends)
        .then((res) =>
            {
                UserStore.setPossibleFriends(res.data);
            }
        )
        .catch(err =>
            console.error(err)
        );
    },

    //Заполняем массив UserStore.friends объектами Друзей
    _setFriends(arrObjIdsFriends){
        api.getFriends(arrObjIdsFriends)
        .then((res) =>
            {
                UserStore.setFriends(res.data);
            }
        )
        .catch(err =>
            console.error(err)
        );
    },

    setOnlineFriend(friendOnlineId){
        let friends = UserStore.getFriends();
        let newFriend = friends.map((friend) => {
            if (friend._id === friendOnlineId){
                friend.online = true;
            }
            return friend;
        });
        UserStore.setFriends(newFriend);
    },

    setOfflineFriend(friendOfflineId){
        let friends = UserStore.getFriends();
        let newFriend = friends.map((friend) => {
            if (friend._id === friendOfflineId){
                friend.online = false;
            }
            return friend;
        });
        UserStore.setFriends(newFriend);
    },

    _preSearchData: null,

    startFilterSearch(){
        this._preSearchFriends = UserStore.getFriends();
    },

    filterSearch(e){
        const target = e.target;
        const needle = target.value.toLowerCase();

        if (!needle){
            let friends = UserStore.getFriends();
            UserStore.setFriends(friends);
            //UserStore.setFilterFriends([]);
            //UserStore.setFriends(this._preSearchFriends);
            return;
        }

        if (!this._preSearchFriends){
            return;
        }

        const searchdata = this._preSearchFriends.filter(friend => {
            let fullname = friend.firstname + ' ' + friend.lastname;
            //console.log('fullname: ', fullname);
            if (fullname.toLowerCase().indexOf(needle) > -1){
                return true;
            }
            return false;
        });
        //console.log('searchdata: ', searchdata);
        UserStore.setFilterFriends(searchdata);
    },

    showOnlineFriends(){
        this._preSearchFriends = UserStore.getFriends();
        if (!this._preSearchFriends){
            return;
        }
        const searchdata = this._preSearchFriends.filter(friend => {
            if (friend.online){
                return true;
            }
            return false;
        });
        UserStore.setFilterFriends(searchdata);
    },

    showAllFriends(){
        let friends = UserStore.getFriends();
        UserStore.setFriends(friends);
    },

    searchFriend(data){
        let search = data.search;
        api.searchUser(search)
        .then( res => {
            console.log('UserActions.searchFriend: ',res.data);
            UserStore.setSearchFriends(res.data);
        } )
        .catch(err => console.error(err));
    },    

    deleteUser(userId) {
        api.deleteUser(noteId)
        .then(() =>
            this.loadUsers()
        )
        .catch(err =>
            console.error(err)
        );
    },

    getDialog(currentUserId){
        api.getUserById(currentUserId)
        .then((res) =>
            {
                console.log('-----UserActions.getDialog-----');
                console.log('-----Объект User пришел результат с сервера-----');
                console.log(res.data);
                UserStore.setUser(res.data);
            }
        )
        .catch(err =>
            console.error(err)
        );
    },

    sendMessage(currentUser, activeFriend, objMessage){
        api.sendMessage(currentUser, activeFriend, objMessage)
        .then( res => {
            console.log('-----UserActions.sendMessage-----');
            console.log('-----Объект User с новым диалогом пришел с сервера-----');
            console.log(res.data);
            UserStore.setUser(res.data);
            socket.emit('newMessage', {currentUserId: currentUser._id, activeFriendId: activeFriend._id});
        } )
        .catch(err => console.error(err));
    },

    setActiveFriend(activeFriend){
        let currentUser = UserStore.getCurrentUser();
        //console.log('currentUser: ',currentUser);
        //console.log('activeFriend: ',activeFriend);
        api.resetNumNewMessage(currentUser, activeFriend)
        .then( res => {
            UserStore.setUser(res.data);
        } )
        UserStore.setActiveFriend(activeFriend);
    },

    uploadPhoto(data){
        api.uploadPhoto(data)
        .then( res => {
            UserStore.setUser(res.data);
        } )
        .catch(err => console.error(err));
    },
};

export default UserActions;
