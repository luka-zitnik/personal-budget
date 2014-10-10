function OneDayExpenses(date, amount) {
    this.date = date;
    this.amount = ko.observable(amount);
}

function DailyExpenses() {
    var self = this;
    
    this.expenses = ko.observableArray([
        new OneDayExpenses('10 Oct, 2014', 420.00),
        new OneDayExpenses('8 Oct, 2014', 390.00),
        new OneDayExpenses('7 Oct, 2014', 420.00)
    ]);

    this.sum = ko.computed(function() {
        var i = 0,
            sum = 0;

        for (var i = 0; i < self.expenses().length; ++i) {
            sum += self.expenses()[i].amount();
        }

        return sum;
    });

    this.month = "Oct 2014";
}

ko.applyBindings(new DailyExpenses());