import {EditorContentModel} from "../src/model/EditorContentModel";
import {ParagraphStyles, TextStyles} from "../src/model/domain-model/Styles";
import {UUId} from "../src/utils/UUId";
import {ListDecoration} from "../src/model/domain-model/List";

const url = '/some/url';
const size = {
	width: 100,
	height: 100,
};
const textStyles = new TextStyles();
const paragraphStyles = new ParagraphStyles();
const text = 'Some text';
const listDecoration = ListDecoration.circles;

it('at start have a empty document', () => {
	const model = new EditorContentModel();
	expect(model.document().content).toEqual([]);
});
describe('can edit image', () => {
	const model = new EditorContentModel();
	let id: UUId;
	it('create', () => {
		id = model.createImage(url, size);
		expect(model.getImage(id)).toEqual({url, size, id});
	});
	it('delete', () => {
		model.removeImages([id]);
		expect(model.getImage(id)).not.toBeDefined();
	});
});
describe('can edit text', () => {
	const model = new EditorContentModel();
	let id: UUId;
	it('create', () => {
		id = model.createText(text, textStyles);
		expect(model.getText(id)).toEqual({text, id, styles: textStyles});
	});
	it('delete', () => {
		model.removeTexts([id]);
		expect(model.getText(id)).not.toBeDefined();
	});
});
describe('can edit header', () => {
	const model = new EditorContentModel();
	let id: UUId;
	it('create', () => {
		const level = 0;
		id = model.createHeader(text, level, textStyles);
		expect(model.getHeader(id)).toEqual({text, id, level, styles: textStyles});
	});
	it('delete', () => {
		model.removeHeaders([id]);
		expect(model.getHeader(id)).not.toBeDefined();
	});
});
describe('can edit paragraph', () => {
	const model = new EditorContentModel();
	let id: UUId;
	let childId: UUId;
	it('create', () => {
		id = model.createParagraph(paragraphStyles);
		expect(model.getParagraph(id)).toEqual({id, content: [], styles: paragraphStyles});
	});
	it('can not add to paragraph instance to itself', () => {
		expect(() => model.addToParagraph(id, id)).toThrow();
	});
	it('add to paragraph instance of other item', () => {
		childId = model.createText(text, textStyles);
		model.addToParagraph(id, childId);
		expect(model.getParagraph(id)).toEqual({id, content: [childId], styles: paragraphStyles});
	});
	it('can not add to paragraph instance that belong to other collection', () => {
		const childId = model.createText(text, textStyles);
		const otherParagraphId = model.createParagraph(paragraphStyles);
		model.addToParagraph(otherParagraphId, childId);
		expect(model.getParagraph(otherParagraphId)).toEqual({id: otherParagraphId, content: [childId], styles: paragraphStyles});
		expect(() => model.addToParagraph(id, childId)).toThrow();
	});
	it('remove from paragraph instance of other item', () => {
		model.removeFromParagraph(id, childId);
		expect(model.getParagraph(id)).toEqual({id, content: [], styles: paragraphStyles});
	});
	it('delete', () => {
		model.removeParagraphs([id]);
		expect(model.getParagraph(id)).not.toBeDefined();
	});
});
describe('can edit list', () => {
	const model = new EditorContentModel();
	let id: UUId;
	let childId: UUId;
	it('create', () => {
		id = model.createList(listDecoration, textStyles);
		expect(model.getList(id)).toEqual({id, listDecoration, items: [], styles: textStyles});
	});
	it('can not add to list instance to itself', () => {
		expect(() => model.addToList(id, id)).toThrow();
	});
	it('add to list instance of other item', () => {
		childId = model.createText(text, textStyles);
		model.addToList(id, childId);
		expect(model.getList(id)).toEqual({id, listDecoration, items: [childId], styles: textStyles});
	});
	it('can not add to list instance that belong to other collection', () => {
		const childId = model.createText(text, textStyles);
		const otherListId = model.createList(listDecoration, textStyles);
		model.addToList(otherListId, childId);
		expect(model.getList(otherListId)).toEqual({id: otherListId, listDecoration, items: [childId], styles: textStyles});
		expect(() => model.addToList(id, childId)).toThrow();
	});
	it('remove from list instance of other item', () => {
		model.removeFromList(id, childId);
		expect(model.getList(id)).toEqual({id, listDecoration, items: [], styles: textStyles});
	});
	it('delete', () => {
		model.removeLists([id]);
		expect(model.getList(id)).not.toBeDefined();
	});
});
describe('can edit content of document', () => {
	const model = new EditorContentModel();
	let childId: UUId;
	it('can not add paragraph instance to itself', () => {
		expect(() => model.addToDocument(model.document().id)).toThrow();
	});
	it('add to list instance of other item', () => {
		childId = model.createText(text, textStyles);
		model.addToDocument(childId);
		expect(model.document().content).toEqual([childId]);
	});
	it('can not add to document item that belong to other collection', () => {
		const childId = model.createText(text, textStyles);
		const otherListId = model.createList(listDecoration, textStyles);
		model.addToList(otherListId, childId);
		expect(model.getList(otherListId)).toEqual({id: otherListId, listDecoration, items: [childId], styles: textStyles});
		expect(() => model.addToDocument(childId)).toThrow();
	});
	it('remove from list instance of other item', () => {
		model.removeFromDocument(childId);
		expect(model.document().content).toEqual([]);
	});
});