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

export class ReadonlyParagraph {
	public readonly content: ReadonlyArray<UUId> = [];
	public readonly styles?: ParagraphStyles = new ParagraphStyles();
	public readonly id: UUId = new UUId();
}