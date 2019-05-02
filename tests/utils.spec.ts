import {filterArray} from "../src/utils/utils";

describe('filterArray', () => {
	it('remove elements', () => {
		let arr = [1, 1, 2, 2, 3, 3, 5, 6, 7];
		filterArray(arr, (it) => (it == 1 || it == 2 || it == 5));
		expect(arr).toEqual([3, 3, 6, 7]);

		arr = [1, 1, 1];
		filterArray(arr, (it) => it == 1);
		expect(arr).toEqual([]);

		arr = [1];
		filterArray(arr, (it) => it == 1);
		expect(arr).toEqual([]);

		arr = [1, 2];
		filterArray(arr, (it) => it == 2);
		expect(arr).toEqual([1]);

		arr = [1, 2, 2];
		filterArray(arr, (it) => it == 2);
		expect(arr).toEqual([1]);
	});
});