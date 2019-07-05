export class DateFormat {
    static formatDateTime(dateTime: any) {
        if (dateTime) {
            let date = dateTime.split('T');
            if (date) {
                let parts = date[0].split("-");
                return new Date(parts[0], parts[1] - 1, parts[2]);
            }
        }
        return '';
    }
}
