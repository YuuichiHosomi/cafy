import { Query, fx } from '../query';

export default class BooleanQuery extends Query<boolean> {

	constructor(value: any, nullable: boolean = false) {
		super(value, nullable);
		if (!this.isEmpty && typeof value != 'boolean') {
			this.error = new Error('must-be-a-boolean');
		}
	}
}
