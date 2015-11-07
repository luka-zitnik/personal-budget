function DailyRecords(month, dailyRecords) {
    var self = this;

    this.dailyRecordsList = ko.observableArray(dailyRecords);

    this.monthlySum = ko.computed(function () {
        var i = 0,
            sum = 0;

        for (; i < self.dailyRecordsList().length; ++i) {
            sum += self.dailyRecordsList()[i].dailySum();
        }

        return sum;
    });

    this.month = month;

    this.updateDailyRecordsList = function (date, value) {
        var dailySum = this.findDailySum(date);

        if ((dailySum instanceof DailySum) === false) {
            dailySum = new DailySum(date, value);
            this.dailyRecordsList.push(dailySum);
            this.dailyRecordsList.sort(function(x, y) {
                return x.date <= y.date;
            });
        }
        else {
            dailySum.dailySum(dailySum.dailySum() + value);
        }
    };

    this.findDailySum = function (date) {
        var list = this.dailyRecordsList(),
            i = 0;

        for (; i < list.length; ++i) {
            if (list[i].date === date) {
                return list[i];
            }
        }

        return null;
    };
}
