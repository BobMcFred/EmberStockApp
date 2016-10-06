stockApp.StockStateSummaryController = Ember.ObjectController.extend({

    theList: function (){   //property to store company lists
        return this.get('model').toArray();
    }.property('model'),

    actions: {
        maSort: function() {    //most active
            var list = this.get('model').toArray().sort(function(a,b){return parseFloat(b.get('volume')) - parseFloat(a.get('volume'))});
            this.set('theList', list);
        },
        gSort: function () {    //gainers list
            var list = this.get('model').toArray();
            var newList = [];
            for (var i = 0; i < list.length; i++) {
                if (list[i].get('changeDir') == "images/up.png") {
                    newList.push(list[i]);
                }
            }
            this.set('theList', newList);
        },
        lSort: function () {    //losers list
            var list = this.get('model').toArray();
            var newList = [];
            for (var i = 0; i < list.length; i++) {
                if (list[i].get('changeDir') == "images/down.png") {
                    newList.push(list[i]);
                }
            }
            this.set('theList', newList);
        }
    }
});



stockApp.StockStateSummaryMarketByOrderController = Ember.ObjectController.extend({
    theBuyOrders: function (){  //Market by order
        return this.get('model').get('buyOrders').toArray().sort(function(a,b){return parseFloat(b.get('price')) - parseFloat(a.get('price'))}).slice(0,10);
    }.property('model.buyOrders'),

    theSellOrders: function (){ //Market by order
        return this.get('model').get('sellOrders').toArray().sort(function(a,b){return parseFloat(a.get('price')) - parseFloat(b.get('price'))}).slice(0,10);
    }.property('model.sellOrders'),

    theBuyOrdersP: function (){ //Market by price - creates array to merge orders of the same price
        var orders = this.get('model').get('buyOrders').toArray().sort(function(a,b){return parseFloat(b.get('price')) - parseFloat(a.get('price'))})
        var sortedOrders = [];
        var k = 0;
        if(orders.length != 0) {
            sortedOrders.push({
                'num': 1,
                'price': orders[0].get('price'),
                'quantity': orders[0].get('quantity')
            });
            for (var i = 1; i < orders.length; i++) {
                if (parseFloat(orders[i].get('price')) == parseFloat(sortedOrders[k].price)) {
                    sortedOrders[k].num = parseFloat(sortedOrders[k].num) + 1;
                    sortedOrders[k].quantity = parseFloat(sortedOrders[k].quantity) + parseFloat(orders[i].get('quantity'));
                }
                else {
                    k++;
                    sortedOrders.push({
                        'num': 1,
                        'price': orders[i].get('price'),
                        'quantity': orders[i].get('quantity')
                    });
                }
            }
        }
        return sortedOrders.slice(0,10);
    }.property('model.buyOrders'),

    theSellOrdersP: function (){    //Market by price - creates array to merge orders of the same price
        var orders = this.get('model').get('sellOrders').toArray().sort(function(a,b){return parseFloat(a.get('price')) - parseFloat(b.get('price'))})
        var sortedOrders = [];
        var k = 0;
        if(orders.length != 0) {
            sortedOrders.push({
                'num': 1,
                'price': orders[0].get('price'),
                'quantity': orders[0].get('quantity')
            });
            for (var i = 1; i < orders.length; i++) {
                if (parseFloat(orders[i].get('price')) == parseFloat(sortedOrders[k].price)) {
                    sortedOrders[k].num = parseFloat(sortedOrders[k].num) + 1;
                    sortedOrders[k].quantity = parseFloat(sortedOrders[k].quantity) + parseFloat(orders[i].get('quantity'));
                }
                else {
                    k++;
                    sortedOrders.push({
                        'num': 1,
                        'price': orders[i].get('price'),
                        'quantity': orders[i].get('quantity')
                    });
                }
            }
        }
        return sortedOrders.slice(0,10);
    }.property('model.sellOrders')
});