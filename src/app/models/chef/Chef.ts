export class Chef {
    constructor(_id: string, name: string, about: string) {
        this._id = _id
        this.name = name
        this.about = about
    }
    about: string
    name: string
    private _id: string
}

// _id: string;
//     name: string;
//     restaurants?: RestaurantModel[];
//     imgUrl?: string;
//     about: string;