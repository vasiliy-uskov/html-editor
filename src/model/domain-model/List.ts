import {TextStyles} from "./Styles";
import {UUId} from "../../utils/UUId";

export enum ListDecoration {
	numeric = 'numeric',
	circles = 'circles',
}

export class List {
	constructor(items: Array<UUId>, listDecoration: ListDecoration, styles?: TextStyles, id: UUId = new UUId()) {
		this.items = items;
		this.listDecoration = listDecoration;
		this.styles = styles;
		this.id = id;
	}

	public readonly items: Array<UUId>;
	public readonly listDecoration: ListDecoration;
	public readonly styles?: TextStyles;
	public readonly id: UUId;
}

export class ReadonlyList {
	public readonly items: ReadonlyArray<UUId> = [];
	public readonly listDecoration: ListDecoration = ListDecoration.circles;
	public readonly styles?: TextStyles = new TextStyles();
	public readonly id: UUId = new UUId();
}