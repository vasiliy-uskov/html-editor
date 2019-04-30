export class Resource {
	constructor(res: Blob) {
		this._url = window.URL.createObjectURL(res);
	}

	dispose() {
		window.URL.revokeObjectURL(this.url);
		this._url = ''
	}

	get url(): string {
		return this._url;
	}


	private _url: string;
}