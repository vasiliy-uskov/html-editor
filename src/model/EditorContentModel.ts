import {List, ListDecoration, ReadonlyList} from "./domain-model/List";
import {Paragraph, ReadonlyParagraph} from "./domain-model/Paragraph";
import {Document, ReadonlyDocument} from "./domain-model/Document";
import {Header} from "./domain-model/Header";
import {Image} from "./domain-model/Image";
import {Text} from "./domain-model/Text";
import {belongCollection, UUId} from "../utils/UUId";
import {filterArray, removeFromArray} from "../utils/utils";
import {ParagraphStyles, TextStyles} from "./domain-model/Styles";
import {Size} from "../utils/Size";

export class EditorContentModel {
	document(): ReadonlyDocument {
		return this._document;
	}

	addToDocument(...ids: Array<UUId>) {
		this._removeFromParent(...ids);
		this._document.content.push(...ids);
	}

	removeFromDocument(...ids: Array<UUId>) {
		ids.forEach(id => {
			removeFromArray(this._document.content, id);
		})
	}

	getImage(id: UUId): (Image|undefined) {
		return this._getElementById(this._images, id);
	}

	removeImage(ids: Array<UUId>) {
		this._removeFromParent(...ids);
		filterArray(this._images, (image) => belongCollection(ids, image.id))
	}

	createImage(url: string, size: Size): UUId {
		const imageObj = new Image(url, size);
		this._images.push(imageObj);
		return imageObj.id
	}

	getHeader(id: UUId): (Header|undefined) {
		return this._getElementById(this._headers, id);
	}

	removeHeader(ids: Array<UUId>) {
		this._removeFromParent(...ids);
		filterArray(this._headers, (header) => belongCollection(ids, header.id))
	}

	createHeader(text: string, level: number, styles?: TextStyles): UUId {
		const headerObj = new Header(text, level, styles);
		this._texts.push(headerObj);
		return headerObj.id
	}

	getText(id: UUId): (Text|undefined) {
		return this._getElementById(this._texts, id);
	}

	removeTexts(ids: Array<UUId>) {
		this._removeFromParent(...ids);
		filterArray(this._texts, (text) => belongCollection(ids, text.id))
	}

	createText(text: string, styles?: TextStyles): UUId {
		const textObj = new Text(text, styles);
		this._texts.push(textObj);
		return textObj.id
	}

	getParagraph(id: UUId): (ReadonlyParagraph|undefined) {
		return this._getElementById(this._paragraphs, id);
	}


	createParagraph(styles?: ParagraphStyles): UUId {
		const newParagraph = new Paragraph([], styles);
		this._paragraphs.push(newParagraph);
		return newParagraph.id
	}

	removeParagraphs(ids: Array<UUId>) {
		this._removeFromParent(...ids);
		filterArray(this._paragraphs, (paragraph) => belongCollection(ids, paragraph.id))
	}

	addToParagraph(paragraphId: UUId, ...elementsIds: Array<UUId>) {
		this._addToCollection(this._paragraphs, paragraphId, elementsIds, (paragraph, ids) => {
			paragraph.content.push(...ids);
		})
	}

	removeFromParagraph(paragraphId: UUId, ...elementsIds: Array<UUId>) {
		this._removeFromCollection(this._paragraphs, paragraphId, elementsIds, (paragraph, ids) => {
			filterArray(paragraph.content, id => belongCollection(ids, id));
		})
	}

	getList(id: UUId): (ReadonlyList|undefined) {
		return this._getElementById(this._lists, id);
	}

	removeLists(ids: Array<UUId>) {
		this._removeFromParent(...ids);
		filterArray(this._lists, (list) => belongCollection(ids, list.id))
	}

	createList(listDecoration: ListDecoration, styles?: TextStyles): UUId {
		const list = new List([], listDecoration, styles);
		this._lists.push(list);
		return list.id
	}

	addToList(listId: UUId, ...elementsIds: Array<UUId>) {
		this._addToCollection(this._paragraphs, listId, elementsIds, (list, ids) => {
			list.content.push(...ids);
		})
	}

	removeFromList(listId: UUId, ...elementsIds: Array<UUId>) {
		this._removeFromCollection(this._paragraphs, listId, elementsIds, (list, ids) => {
			filterArray(list.content, id => belongCollection(ids, id));
		})
	}

	private _addToCollection<T>(
		collections: Array<T & {id: UUId}>,
		collectionId: UUId,
		elementsIds: Array<UUId>,
		addToCollection: (collection: T & {id: UUId}, elementsIds: Array<UUId>) => void
	) {
		if (elementsIds.includes(collectionId)) {
			return
		}
		const paragraph = this._getElementById(collections, collectionId);
		if (paragraph) {
			this._removeFromParent(...elementsIds);
			addToCollection(paragraph, elementsIds);
		}
	}

	private _removeFromCollection<T>(
		collections: Array<T & {id: UUId}>,
		collectionId: UUId,
		elementsIds: Array<UUId>,
		removeFromCollection: (collection: T & {id: UUId}, elementsIds: Array<UUId>) => void
	) {
		if (elementsIds.includes(collectionId)) {
			return
		}
		const paragraph = this._getElementById(collections, collectionId);
		if (paragraph) {
			removeFromCollection(paragraph, elementsIds);
		}
	}

	private _getElementById<T>(arr: Array<T & {id: UUId}>, searchingId: UUId): (T & {id: UUId}|undefined) {
		return arr.find(({id}) => id.equal(searchingId));
	}

	private _removeFromParent(...ids: Array<UUId>) {
		for (const list of this._lists) {
			filterArray(list.items, id => belongCollection(ids, id));
		}
		for (const paragraph of this._paragraphs) {
			filterArray(paragraph.content, id => belongCollection(ids, id));
		}
		filterArray(this._document.content, id => belongCollection(ids, id));
	}

	private readonly _document = new Document([]);
	private readonly _headers: Array<Header> = [];
	private readonly _images: Array<Image> = [];
	private readonly _lists: Array<List> = [];
	private readonly _paragraphs: Array<Paragraph> = [];
	private readonly _texts: Array<Text> = [];
}