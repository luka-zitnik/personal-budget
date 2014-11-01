var Expense = function(date, amount, label) {

    this.date = ko.observable(date);
    this.amount = ko.observable(amount);
    this.label = ko.observable(label);

};