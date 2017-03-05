/**
 * cafy
 */

import ArrayQuery from './types/array';
import BooleanQuery from './types/boolean';
import IdQuery from './types/id';
import NumberQuery from './types/number';
import ObjectQuery from './types/object';
import StringQuery from './types/string';

export type It = {
	must: {
		be: {
			a: {
				string: () => StringQuery;
				number: () => NumberQuery;
				boolean: () => BooleanQuery;
				nullable: {
					string: () => StringQuery;
					number: () => NumberQuery;
					boolean: () => BooleanQuery;
					id: () => IdQuery;
					array: () => ArrayQuery;
					object: () => ObjectQuery;
				};
			};
			an: {
				id: () => IdQuery;
				array: () => ArrayQuery;
				object: () => ObjectQuery;
			};
		};
	};
	expect: {
		string: () => StringQuery;
		number: () => NumberQuery;
		boolean: () => BooleanQuery;
		id: () => IdQuery;
		array: () => ArrayQuery;
		object: () => ObjectQuery;
		nullable: {
			string: () => StringQuery;
			number: () => NumberQuery;
			boolean: () => BooleanQuery;
			id: () => IdQuery;
			array: () => ArrayQuery;
			object: () => ObjectQuery;
		};
	};
};

const it = (value: any) => ({
	must: {
		be: {
			a: {
				string: () => new StringQuery(value),
				number: () => new NumberQuery(value),
				boolean: () => new BooleanQuery(value),
				nullable: {
					string: () => new StringQuery(value, true),
					number: () => new NumberQuery(value, true),
					boolean: () => new BooleanQuery(value, true),
					id: () => new IdQuery(value, true),
					array: () => new ArrayQuery(value, true),
					object: () => new ObjectQuery(value, true)
				}
			},
			an: {
				id: () => new IdQuery(value),
				array: () => new ArrayQuery(value),
				object: () => new ObjectQuery(value)
			}
		}
	},
	expect: {
		string: () => new StringQuery(value),
		number: () => new NumberQuery(value),
		boolean: () => new BooleanQuery(value),
		id: () => new IdQuery(value),
		array: () => new ArrayQuery(value),
		object: () => new ObjectQuery(value),
		nullable: {
			string: () => new StringQuery(value, true),
			number: () => new NumberQuery(value, true),
			boolean: () => new BooleanQuery(value, true),
			id: () => new IdQuery(value, true),
			array: () => new ArrayQuery(value, true),
			object: () => new ObjectQuery(value, true)
		}
	}
});

type Type =
	'id' | 'id!' | 'id?' | 'id!?' |
	'string' | 'string!' | 'string?' | 'string!?' |
	'number' | 'number!' | 'number?' | 'number!?' |
	'boolean' | 'boolean!' | 'boolean?' | 'boolean!?' |
	'array' | 'array!' | 'array?' | 'array!?' |
	'set' | 'set!' | 'set?' | 'set!?' |
	'object' | 'object!' | 'object?' | 'object!?';

function x(value: any): It;
function x(value: any, type: 'id' | 'id!' | 'id?' | 'id!?'): IdQuery;
function x(value: any, type: 'string' | 'string!' | 'string?' | 'string!?'): StringQuery;
function x(value: any, type: 'number' | 'number!' | 'number?' | 'number!?'): NumberQuery;
function x(value: any, type: 'boolean' | 'boolean!' | 'boolean?' | 'boolean!?'): BooleanQuery;
function x(value: any, type: 'array' | 'array!' | 'array?' | 'array!?'): ArrayQuery;
function x(value: any, type: 'set' | 'set!' | 'set?' | 'set!?'): ArrayQuery;
function x(value: any, type: 'object' | 'object!' | 'object?' | 'object!?'): ObjectQuery;
function x(value: any, type?: Type): any {
	if (typeof type === 'undefined') return it(value);

	const [, name, suffixes] = type.match(/([a-z]+)(.+)?/);
	const isRequired = suffixes == '!' || suffixes == '!?';
	const isNullable = suffixes == '?' || suffixes == '!?';

	let q: any = it(value).expect;

	if (isNullable) q = q.nullable;

	switch (name) {
		case 'id': q = q.id(); break;
		case 'string': q = q.string(); break;
		case 'number': q = q.number(); break;
		case 'boolean': q = q.boolean(); break;
		case 'array': q = q.array(); break;
		case 'set': q = q.array().unique(); break;
		case 'object': q = q.object(); break;
	}

	if (isRequired) q = q.required();

	return q;
}

export default x;
