stockApp.BuyOrder = DS.Model.extend({   //Buy Order data
    price: DS.attr(),
    quantity: DS.attr(),
    company: DS.belongsTo('company')
});