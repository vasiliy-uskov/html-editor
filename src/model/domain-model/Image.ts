import {UUId} from "../../utils/UUId";
import {Size} from "../../utils/Size";

export class Image {
	constructor(url: string, size: Size, id: UUId = new UUId()) {
		this.url = url;
		this.size = size;
		this.id = id
	}

	public readonly url: string;
	public readonly size: Size;
	public readonly id: UUId;
}