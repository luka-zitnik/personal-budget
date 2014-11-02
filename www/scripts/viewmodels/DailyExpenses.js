function DailyExpenses(month, dailyExpenses) {
    var self = this;

    this.dailyExpensesList = ko.observableArray(dailyExpenses);

    this.monthlySum = ko.computed(function () {
        var i = 0,
            sum = 0;

        for (var i = 0; i < self.dailyExpensesList().length; ++i) {
            sum += self.dailyExpensesList()[i].dailySum();
        }

        return sum;
    });

    this.month = month;

    this.updateDailyExpensesList = function (date, amount) {
        var dailySum = this.findDailySum(date);

        if ((dailySum instanceof DailySum) === false) {
            dailySum = new DailySum(date, amount);
            this.dailyExpensesList.push(dailySum);
            this.dailyExpensesList.sort(function(x, y) {
                return x.date <= y.date;
            });
        }
        else {
            dailySum.dailySum(dailySum.dailySum() + amount);
        }
    };

    this.findDailySum = function (date) {
        var list = this.dailyExpensesList(),
            i = 0;

        for (; i < list.length; ++i) {
            if (list[i].date === date) {
                return list[i];
            }
        }

        return null;
    };
}