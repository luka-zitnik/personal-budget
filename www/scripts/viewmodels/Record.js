var Record = function(date, value, label, key) {

    this.date = ko.observable(date);
    this.value = ko.observable(value);
    this.label = ko.observable(label);
    this.key = key;
    this.markedForDeletion = ko.observable(false);

};
