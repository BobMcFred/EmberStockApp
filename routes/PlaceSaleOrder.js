stockApp.PlaceSaleOrderRoute = Ember.Route.extend({  //Set model to appropriate company
    model: function(params) {
        return this.store.find('company', params.company_id);
    }
});