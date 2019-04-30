import {TextStyles} from "./Styles";
import {UUId} from "../../utils/UUId";

export class Text {
	constructor(text: string, styles?: TextStyles, id: UUId = new UUId()) {
		this.text = text;
		this.styles = styles;
		this.id = id
	}

	public readonly text: string;
	public readonly styles?: TextStyles;
	public readonly id: UUId;
}