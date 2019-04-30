export function randomInt(min: number, max: number): number {
	return Math.floor(min + (max - min) * Math.random())
}

export function removeFromArray<T>(arr: Array<T>, ...its: Array<T>) {
	for (const it of its) {
		const index = arr.indexOf(it);
		if (index >= 0) {
			arr.splice(index, 1);
		}
	}
}

export function filterArray<T>(arr: Array<T>, predicate: (it: T) => boolean) {
	let deleteElementsCount = 0;
	let deleteStartPosition = -1;
	for (let i = 0; i < arr.length;) {
		if (arr[i] != arr[deleteStartPosition] && deleteElementsCount) {
			arr.splice(deleteStartPosition, deleteElementsCount);
			i -= deleteElementsCount;
			deleteElementsCount = 0;
		}
		if (predicate(arr[i])) {
			if (!deleteElementsCount) {
				deleteStartPosition = i;
			}
			deleteElementsCount++;
		}
		i++;
	}
}