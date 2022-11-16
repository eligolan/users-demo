import { makeObservable, observable, action } from "mobx";

class UsersStoreImplementation {
    data = [];
    currentUser = {};

    constructor() {
        makeObservable(this, {
            data: observable,
            currentUser: observable,
            setData: action,
            setCurrentUser: action,
        });
    }

    setData(data) {
        this.data = data;
    }

    setCurrentUser(currentUser) {
        this.currentUser = currentUser;
    }
}

export const UsersStore = new UsersStoreImplementation();