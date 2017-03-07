import Query from '../query';

export default class BooleanQuery extends Query<boolean> {
	constructor(optional: boolean, nullable: boolean, lazy: boolean, value?: any) {
		super(optional, nullable, lazy, value);
	}
}
