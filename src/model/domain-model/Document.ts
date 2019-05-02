import {UUId} from "../../utils/UUId";

export class Document {
	constructor(content: Array<UUId>) {
		this.content = content;
	}

	public readonly id: UUId = new UUId();
	public readonly content: Array<UUId>;
}

export interface ReadonlyDocument {
	readonly id: UUId;
	readonly content: ReadonlyArray<UUId>;
}