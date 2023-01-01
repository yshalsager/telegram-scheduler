import { getUnixTime, addMinutes, format, isAfter, toDate, addDays, set } from 'date-fns';

export const getScheduleTimeStamps = (
	total,
	scheduleStartDate,
	scheduleStartTime,
	scheduleInterval,
	scheduleStopTime,
	scheduleNewDayStartTime
) => {
	const timeStamps = [];
	// 1st: Set date to new Date(`${scheduleStartDate} ${scheduleStartTime}`);
	// next: Add scheduleInterval if date < scheduleStopTime
	// else Set date to old date + 1 day, and time to scheduleNewDayStartTime
	let date;
	for (let index = 1; index < total + 1; index++) {
		if (!date) date = new Date(`${scheduleStartDate} ${scheduleStartTime}`);
		else {
			const newDate = addMinutes(date, scheduleInterval);
			if (
				newDate.getHours() === 0 || // 12 AM case
				isAfter(
					newDate,
					set(date, {
						hours: scheduleStopTime.split(':')[0],
						minutes: scheduleStopTime.split(':')[1]
					})
				)
			) {
				date = set(toDate(addDays(date, 1)), {
					hours: scheduleNewDayStartTime.split(':')[0],
					minutes: scheduleNewDayStartTime.split(':')[1]
				});
			} else date = newDate;
		}
		timeStamps.push({
			date: date,
			formattedDate: format(date, 'yyyy-MM-dd HH:mm'),
			unixTimestamp: getUnixTime(date)
		});
	}
	return timeStamps;
};
