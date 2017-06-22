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
                    UserStore.setUser(res.data);
                }
            }
        )
        .catch(err =>
            console.error(err)
        );
    },

    sendRequestAddToFriends(currentUserId, possibleFriendId){
        api.sendRequestAddToFriends(currentUserId, possibleFriendId)
        .then((res) =>
            {
                console.log('-----UserActions.sendRequestAddToFriends-----');
                console.log('-----пришел результат с сервера-----');
                console.log(res.data);
            }
        )
        .catch(err =>
            console.error(err)
        );
    },

//Получаем объект User из базы даных и сохраняем его в Хранилище
    getUser(data) {
        let login = data.login;
        let password = data.password;
        api.getUser(login, password)
        .then((res) =>
            {
                console.log('-----UserActions.getUser-----');
                console.log('-----пришел результат с сервера-----');
                console.log(res.data);
                UserStore.setUser(res.data);
            }
        )
        .catch(err =>
            console.error(err)
        );
    },

    searchFriend(data){
        let search = data.search;
        api.searchUser(search)
        .then( res => {
            //console.log(res.data);
            UserStore.setPossibleFriends(res.data);
        } )
        .catch(err => console.error(err));
    },

    getUserById(id) {
        api.getUserById(id)
        .then((res) =>
            {
                console.log('-----UserActions.getUser-----');
                console.log('-----пришел результат с сервера-----');
                console.log(res.data);
                UserStore.setUser(res.data);
            }
        )
        .catch(err =>
            console.error(err)
        );
    },

    deleteUser(userId) {
        api.deleteUser(noteId)
        .then(() =>
            this.loadUsers()
        )
        .catch(err =>
            console.error(err)
        );
    }
};

export default UserActions;
