import {EditorContentModel} from "../src/model/EditorContentModel";

describe('EditorContentModel', () => {
	it('at start have a empty document', () => {
		const model = new EditorContentModel();
		expect(model.document().content).toEqual([]);
	});
});