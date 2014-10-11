function DailySum(date, amount) {
    this.date = date;
    this.dailySum = ko.observable(amount);
}

function DailyExpenses() {
    var self = this;

    this.dailyExpensesList = ko.observableArray([
        new DailySum('10 Oct, 2014', 420.00),
        new DailySum('8 Oct, 2014', 390.00),
        new DailySum('7 Oct, 2014', 420.00)
    ]);

    this.monthlySum = ko.computed(function() {
        var i = 0,
            sum = 0;

        for (var i = 0; i < self.dailyExpensesList().length; ++i) {
            sum += self.dailyExpensesList()[i].dailySum();
        }

        return sum;
    });

    this.month = "Oct 2014";
}

ko.applyBindings(new DailyExpenses());