declare abstract class DateHelper {
    static dateToSwrveISOString(date: Date): string;
    static dateToSwrveYYYYMMDDFormat(date: Date): string;
    static dateToUTCDate(date: Date): Date;
}
export default DateHelper;
