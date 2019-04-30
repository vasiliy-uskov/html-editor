class BaseTextStyles {
	public readonly fontFamily: string = '';
	public readonly fontSize: number = 0;
	public readonly fontStyle: string = '';
	public color: string = '';
	public readonly underlined: boolean = true;
}

export class TextStyles extends BaseTextStyles {}

export class ParagraphStyles extends BaseTextStyles {
	public readonly lineHeight: number = 0;
}