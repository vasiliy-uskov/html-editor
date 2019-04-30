import {TextStyles} from "./Styles";
import {UUId} from "../../utils/UUId";

export class Header {
	constructor(text: string, level: number, styles?: TextStyles, id: UUId = new UUId()) {
		this.text = text;
		this.level = level;
		this.styles = styles;
		this.id = id
	}

	public readonly text: string;
	public readonly level: number;
	public readonly styles?: TextStyles;
	public readonly id: UUId;
}