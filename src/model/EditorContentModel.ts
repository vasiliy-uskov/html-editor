import {List, ListDecoration, ReadonlyList} from "./domain-model/List";
import {Paragraph, ReadonlyParagraph} from "./domain-model/Paragraph";
import {Document, ReadonlyDocument} from "./domain-model/Document";
import {Header} from "./domain-model/Header";
import {Image} from "./domain-model/Image";
import {Text} from "./domain-model/Text";
import {belongCollection, UUId} from "../utils/UUId";
import {filterArray} from "../utils/utils";
import {ParagraphStyles, TextStyles} from "./domain-model/Styles";
import {Size} from "../utils/Size";

export class EditorContentModel {
	document(): ReadonlyDocument {
		return this._document;
	}

	addToDocument(...ids: Array<UUId>) {
		if (belongCollection(ids, this._document.id)) {
			throw new Error(`Can not add collection to itself`);
		}
		this._checkForParent(ids);
		this._document.content.push(...ids);
	}

	removeFromDocument(...ids: Array<UUId>) {
		if (belongCollection(ids, this._document.id)) {
			throw new Error(`Can not remove collection from itself`);
		}
		ids.forEach(idToDelete => {
			filterArray(this._document.content, id => idToDelete.equal(id))
		})
	}

	getImage(id: UUId): (Image|undefined) {
		return this._getElementById(this._images, id);
	}

	removeImages(ids: Array<UUId>) {
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

	removeHeaders(ids: Array<UUId>) {
		this._removeFromParent(...ids);
		filterArray(this._headers, (header) => belongCollection(ids, header.id))
	}

	createHeader(text: string, level: number, styles?: TextStyles): UUId {
		const headerObj = new Header(text, level, styles);
		this._headers.push(headerObj);
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
		this._addToCollection(this._lists, listId, elementsIds, (list, ids) => {
			list.items.push(...ids);
		})
	}

	removeFromList(listId: UUId, ...elementsIds: Array<UUId>) {
		this._removeFromCollection(this._lists, listId, elementsIds, (list, ids) => {
			filterArray(list.items, id => belongCollection(ids, id));
		})
	}

	private _checkForParent(ids: Array<UUId>) {
		if (ids.some(id => !!this._getParentId(id))) {
			throw new Error(`Some of elements ${ids.join(', ')} already have an parent`)
		}
	}

	private _getParentId(id: UUId): (UUId|null) {
		for (const list of this._lists) {
			if (belongCollection(list.items, id)) {
				return list.id
			}
		}
		for (const paragraph of this._paragraphs) {
			if (belongCollection(paragraph.content, id)) {
				return paragraph.id
			}
		}
		if (belongCollection(this._document.content, id)) {
			return this._document.id;
		}
		return null
	}

	private _addToCollection<T>(
		collections: Array<T & {id: UUId}>,
		collectionId: UUId,
		elementsIds: Array<UUId>,
		addToCollection: (collection: T & {id: UUId}, elementsIds: Array<UUId>) => void
	) {
		if (belongCollection(elementsIds, collectionId)) {
			throw new Error(`Can not add collection to itself`);
		}
		this._checkForParent(elementsIds);
		const collection = this._getElementById(collections, collectionId);
		if (collection) {
			addToCollection(collection, elementsIds);
		}
	}

	private _removeFromCollection<T>(
		collections: Array<T & {id: UUId}>,
		collectionId: UUId,
		elementsIds: Array<UUId>,
		removeFromCollection: (collection: T & {id: UUId}, elementsIds: Array<UUId>) => void
	) {
		if (belongCollection(elementsIds, collectionId)) {
			throw new Error(`Can not remove collection from itself`);
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