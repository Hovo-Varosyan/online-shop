import { makeAutoObservable } from "mobx";

class Store {
    data = [];

    constructor() {
        makeAutoObservable(this);
    }


    updateData(newData) {
        this.data = newData;
    }
}


class UserStore {
    data = {
        card: [],
    };

    constructor() {
        makeAutoObservable(this);
    }

    updateData(newData) {
        this.data = newData;
    }

    cardAdd(newData) {
        this.data.card.push(newData);
    }

    cardDelete(newData) {
        this.data.card = this.data.card.filter((item) => item._id !== newData);
    }
    cardCount(newData, count) {
        this.data.card.forEach(element => {
            if (element._id === newData._id) {
                element.count = newData.count
            }
        });
    }
}

const storeData = new Store();
const userStore = new UserStore();

export { storeData, userStore };
