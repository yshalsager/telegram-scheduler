import {getUnixTime, addMinutes, format, isAfter, toDate, addDays, set} from 'date-fns'

/**
 *
 * @param {number} total - The number of timestamps that should be generated
 * @param {string} scheduleStartDate - The date of the first timestamp in the format 'yyyy-MM-dd'
 * @param {string} scheduleStartTime - The time of the first timestamp in the format 'HH:mm'
 * @param {number} scheduleInterval - The interval in minutes between each timestamp
 * @param {string} scheduleStopTime - The time of the day when the schedule should stop generating timestamps in the format 'HH:mm'
 * @param {string} scheduleNewDayStartTime - The time of the day when the schedule should start generating timestamps on a new day in the format 'HH:mm'
 *
 * @returns {Array} - An array of timestamps, where each timestamp is an object containing 'date' (a Date object), 'formattedDate' (a string in the format 'yyyy-MM-dd HH:mm') and 'unixTimestamp' (the timestamp in UNIX format)
 */
export const getScheduleTimeStamps = (
    total,
    scheduleStartDate,
    scheduleStartTime,
    scheduleInterval,
    scheduleStopTime,
    scheduleNewDayStartTime,
) => {
    const timeStamps = []
    // 1st: Set date to new Date(`${scheduleStartDate} ${scheduleStartTime}`);
    // next: Add scheduleInterval if date < scheduleStopTime
    // else Set date to old date + 1 day, and time to scheduleNewDayStartTime
    let date = new Date(`${scheduleStartDate} ${scheduleStartTime}`)
    const [stopHour, stopMinute] = scheduleStopTime.split(':').map(x => parseInt(x))
    const [newDayHour, newDayMinute] = scheduleNewDayStartTime.split(':').map(x => parseInt(x))
    for (let index = 1; index < total + 1; index++) {
        const newDate = addMinutes(date, scheduleInterval)
        if (
            newDate.getHours() === 0 || // 12 AM Case
            isAfter(newDate, set(date, {hours: stopHour, minutes: stopMinute}))
        ) {
            date = set(toDate(addDays(date, 1)), {hours: newDayHour, minutes: newDayMinute})
        } else {
            date = newDate
        }
        timeStamps.push({
            date,
            formattedDate: format(date, 'yyyy-MM-dd HH:mm'),
            unixTimestamp: getUnixTime(date),
        })
    }
    return timeStamps
}
