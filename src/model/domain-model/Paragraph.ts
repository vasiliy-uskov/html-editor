import {ParagraphStyles} from "./Styles";
import {UUId} from "../../utils/UUId";

export class Paragraph {
	constructor(content: Array<UUId>, styles?: ParagraphStyles, id: UUId = new UUId()) {
		this.content = content;
		this.styles = styles;
		this.id = id;
	}

	public readonly content: Array<UUId>;
	public readonly styles?: ParagraphStyles;
	public readonly id: UUId;
}

export interface ReadonlyParagraph {
	readonly content: ReadonlyArray<UUId>;
	readonly styles?: ParagraphStyles;
	readonly id: UUId;
}