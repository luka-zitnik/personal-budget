function DailySum(date, value) {

    this.date = date;
    this.dailySum = ko.observable(value);

    this.openDailyList = function() {
        dailyList.open(this.date);
    };

}