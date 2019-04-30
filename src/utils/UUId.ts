import {randomInt} from "./utils";

const ID_BYTES_COUNT = 16;

export class UUId {
	constructor() {
		let id = '';
		for (let i = 0; i < ID_BYTES_COUNT; ++i) {
			id += randomInt(0, 255).toString(16)
		}
		this._id = id
	}

	equal(id: UUId): boolean {
		return this._id == id._id;
	}

	private readonly _id: string
}

export function belongCollection(ids: Array<UUId>, id: UUId): boolean {
	return ids.some(idFromCollection => idFromCollection.equal(id))
}