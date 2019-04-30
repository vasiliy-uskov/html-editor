import {UUId} from "../../utils/UUId";

export class Document {
	constructor(content: Array<UUId>) {
		this.content = content;
	}

	public readonly content: Array<UUId>;
}

export class ReadonlyDocument {
	public readonly content: ReadonlyArray<UUId> = [];
}