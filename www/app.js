function DailySum(date, amount) {
    this.date = date;
    this.dailySum = ko.observable(amount);
}

function DailyExpenses(month, dailyExpenses) {
    var self = this;

    this.dailyExpensesList = ko.observableArray(dailyExpenses);

    this.monthlySum = ko.computed(function() {
        var i = 0,
            sum = 0;

        for (var i = 0; i < self.dailyExpensesList().length; ++i) {
            sum += self.dailyExpensesList()[i].dailySum();
        }

        return sum;
    });

    this.month = month;
}

function MonthlyExpenses() {

    this.monthlyExpensesList = ko.observableArray([
        new DailyExpenses("Oct 2014", [
            new DailySum('10 Oct, 2014', 420.00),
            new DailySum('8 Oct, 2014', 390.00),
            new DailySum('7 Oct, 2014', 420.00)
        ]),
        new DailyExpenses("Sep 2014", [
            new DailySum('11 Sep, 2014', 320.00),
            new DailySum('9 Sep, 2014', 290.00),
            new DailySum('8 Sep, 2014', 320.00)
        ])
    ]);

}

ko.applyBindings(new MonthlyExpenses());