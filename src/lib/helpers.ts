/**
 * Returns new date which has the days added.
 *
 * Example:
 * ```javascript
 *   addDays('2023-02-01', -3);
 *   // Returns '2023-01-29'
 * ```
 */
export const addDays = (date: Date | string, days: number) => {
	const _date = new Date(typeof date === 'string' ? date : date.valueOf());
	_date.setDate(_date.getDate() + days);
	return _date;
};

const addHours = (date: Date, hours: number) => {
	const _date = new Date(date.valueOf());
	_date.setHours(_date.getHours() + hours);
	return _date;
};

export const dateToString = (date: Date) => {
	const [d, m] = [date.getDate(), date.getMonth()];
	return `${d}/${m}`;
};

/**
 * Add UTC offset to date and return the iso string representation.
 * @param date
 * @param offset offset hour relative to GMT (optional)
 * @returns ISO string of offseted date.
 */
const dateToTzISOString = (date: Date, offset: number | null = null) => {
	if (offset === null) {
		offset = -date.getTimezoneOffset() / 60; // in -minutes
	}
	const _date = addHours(date, offset);
	return _date.toISOString();
};

/**Return date portion of ISO 8601 date representation.
 *
 * If the date is actual Date object, it will be converted to ISO 8601 date with offset.
 * If this behaviour is not prefered, you can supply the argument using raw ISO 8601 date string.
 *
 * @param date date or iso date string
 * @returns
 */
export const dateToISODateString = (date: Date | string) => {
	let _ISOString;
	if (date instanceof Date) {
		_ISOString = dateToTzISOString(date);
	} else {
		const match = date.match(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+/);
		if (!match) throw new Error('Invalid argument. Must be an ISO string datetime.');
		_ISOString = date;
	}
	return _ISOString.split('T')[0];
};

export const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const getDateParam = (url: URL) => {
	let _date = url.searchParams.get('date');
	if (_date) return _date;

	const today = dateToISODateString(new Date());

	// Modify date param to today (invisibly)
	url.searchParams.set('date', today);

	return today;
};
