function DailySum(date, amount) {
    var self = this;

    this.date = date;
    this.dailySum = ko.observable(amount);

    this.formattedDailySum = ko.computed(function() {
        return "RSD " + self.dailySum().toFixed(2);
    });
}