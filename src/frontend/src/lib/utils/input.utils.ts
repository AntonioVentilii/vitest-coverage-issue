import type {OptionString} from '$lib/types/string';
import type {Option} from '$lib/types/utils';
import {isEmptyString} from '@dfinity/utils';

export const isNullishOrEmpty = (value: OptionString): value is Option<''> => isEmptyString(value);
