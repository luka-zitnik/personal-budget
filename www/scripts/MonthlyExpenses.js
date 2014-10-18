function MonthlyExpenses(monthlyExpenses) {
    this.monthlyExpensesList = ko.observableArray(monthlyExpenses);

    this.addExpense = function () {
        var form = document.getElementById("add-expense-view").querySelector("form"),
            formElements = form.elements,
            label = formElements.label.value,
            date = formElements.date.value,
            month = date.substring(0, 7),
            amount = parseFloat(formElements.amount.value);

        if (form.checkValidity() === false) {
            return;
        }

        this.closeAddExpenseView();
        this.updateMonthlyExpensesList(month, date, amount);
        this.persistIntoDB(date, label, amount);
    };

    this.updateMonthlyExpensesList = function (month, date, amount) {
        var dailyExpenses = this.findDailyExpenses(month);

        if ((dailyExpenses instanceof DailyExpenses) === false) {
            dailyExpenses = new DailyExpenses(month, []);
            this.monthlyExpensesList.push(dailyExpenses);
        }

        dailyExpenses.updateDailyExpensesList(date, amount);
    };

    this.findDailyExpenses = function (month) {
        var list = this.monthlyExpensesList(),
            i = 0;

        for (; i < list.length; ++i) {
            if (list[i].month === month) {
                return list[i];
            }
        }

        return null;
    };

    this.persistIntoDB = function (date, label, amount) {

    };

    this.openAddExpenseView = function () {
        document.getElementById("add-expense-view").setAttribute("aria-hidden", "false");
    };

    this.closeAddExpenseView = function () {
        document.getElementById("add-expense-view").setAttribute("aria-hidden", "true");
    };
}