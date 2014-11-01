var Expense = function(date, amount, label) {

    this.date = ko.observable(date);
    this.amount = ko.observable(amount);
    this.label = ko.observable(label);
    this.markedForDeletion = ko.observable(false);

    this.deleteExpense = function() {
        console.log(this.label());
    };

};