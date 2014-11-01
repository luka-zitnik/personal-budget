var Expense = function(date, amount, label, key) {

    this.date = ko.observable(date);
    this.amount = ko.observable(amount);
    this.label = ko.observable(label);
    this.key = key;
    this.markedForDeletion = ko.observable(false);

};