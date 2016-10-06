stockApp.SellOrder = DS.Model.extend({  //Sell Order Data
    price: DS.attr(),
    quantity: DS.attr(),
    company: DS.belongsTo('company')
});