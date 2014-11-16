function DailyExpenditures(month, dailyExpenditures) {
    var self = this;

    this.dailyExpendituresList = ko.observableArray(dailyExpenditures);

    this.monthlySum = ko.computed(function () {
        var i = 0,
            sum = 0;

        for (; i < self.dailyExpendituresList().length; ++i) {
            sum += self.dailyExpendituresList()[i].dailySum();
        }

        return sum;
    });

    this.month = month;

    this.updateDailyExpendituresList = function (date, value) {
        var dailySum = this.findDailySum(date);

        if ((dailySum instanceof DailySum) === false) {
            dailySum = new DailySum(date, value);
            this.dailyExpendituresList.push(dailySum);
            this.dailyExpendituresList.sort(function(x, y) {
                return x.date <= y.date;
            });
        }
        else {
            dailySum.dailySum(dailySum.dailySum() + value);
        }
    };

    this.findDailySum = function (date) {
        var list = this.dailyExpendituresList(),
            i = 0;

        for (; i < list.length; ++i) {
            if (list[i].date === date) {
                return list[i];
            }
        }

        return null;
    };
}