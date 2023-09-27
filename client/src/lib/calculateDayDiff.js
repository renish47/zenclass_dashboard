export default function calculateDayDiff(dueDate) {
    var date1 = new Date(dueDate);
    var date2 = new Date();

    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    return Math.ceil(-(Difference_In_Time / (1000 * 3600 * 24) - 1))
}