function DailySum(date, amount) {

    this.date = date;
    this.dailySum = ko.observable(amount);

    this.openDailyList = function() {
        dailyList.open(this.date);
    };

}