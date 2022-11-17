/**
 * Returns new date which has the days added.
 * 
 */
export const addDays = (date: Date, days: number) => {
  const _date = new Date(date.valueOf());
	_date.setDate(_date.getDate() + days);
	return _date;
};

export const dateToString = (date:Date) => {
	const [d, m] = [date.getDate(), date.getMonth()];
	return `${d}/${m}`;
} 