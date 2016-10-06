stockApp.PlaceBidOrderController = Ember.ObjectController.extend({
    actions: {
        save: function() {
            var make = true;    //If transaction is complete or not
            var bPrice = parseFloat(this.get('price')); //Price and quantity
            var bQuantity = parseInt(this.get('quantity'));

            var sellOrders = this.get('model').get('sellOrders').content;   //get sell orders

            var theCompany = this.get('model'); //for updating summary

            for (var i = 0; i < sellOrders.length; i++) //check for all possible transactions
            {
                if (parseFloat(sellOrders[i].get('price')) <= bPrice && parseFloat(sellOrders[i].get('quantity')) == bQuantity) //orders have equal quantity
                {
                    make = false;   //transaction complete

                    //Update Summary/////////////////////////////////////////////////////////
                    theCompany.set('currentPrice', bPrice); //set current price

                    var changeVal = parseFloat(theCompany.get('openPrice')) - parseFloat(theCompany.get('currentPrice'));

                    theCompany.set('changeValue', Math.abs(changeVal)); //set change value

                    if(changeVal > 0){  //determine direction
                        theCompany.set('changeDir', 'images/down.png');
                    }
                    else if(changeVal < 0){
                        theCompany.set('changeDir', 'images/up.png');
                    }
                    else{
                        theCompany.set('changeDir', 'images/noChange.png');
                    }

                    var changePerc = Math.abs(changeVal/parseFloat(theCompany.get('openPrice'))).toFixed(4)*100;

                    theCompany.set('changePerc', changePerc);   //set percentage

                    var newVolume = parseInt(this.get('model.volume')) + bQuantity;
                    theCompany.set('volume', newVolume);    //set volume
                    /////////////////////////////////////////////////////////////////////////

                    sellOrders[i].destroyRecord();  //remove buy order
                    break;
                }
                else if (parseFloat(sellOrders[i].get('price')) <= bPrice && parseFloat(sellOrders[i].get('quantity')) < bQuantity) //buy order is larger
                {
                    make = true;    //check for more transactions
                    bQuantity -= parseInt(sellOrders[i].get('quantity'));

                    //Update Summary/////////////////////////////////////////////////////////
                    theCompany.set('currentPrice', bPrice);

                    var changeVal = parseFloat(theCompany.get('openPrice')) - parseFloat(theCompany.get('currentPrice'));

                    theCompany.set('changeValue', Math.abs(changeVal));

                    if(changeVal > 0){
                        theCompany.set('changeDir', 'images/down.png');
                    }
                    else if(changeVal < 0){
                        theCompany.set('changeDir', 'images/up.png');
                    }
                    else{
                        theCompany.set('changeDir', 'images/noChange.png');
                    }

                    var changePerc = Math.abs(changeVal/parseFloat(theCompany.get('openPrice'))).toFixed(4)*100;

                    theCompany.set('changePerc', changePerc);

                    var newVolume = parseInt(this.get('model.volume')) + bQuantity;
                    theCompany.set('volume', newVolume);
                    /////////////////////////////////////////////////////////////////////////

                    sellOrders[i].destroyRecord();
                    i = -1; //iterate current position again
                }
                else if (parseFloat(sellOrders[i].get('price')) <= bPrice && parseFloat(sellOrders[i].get('quantity')) > bQuantity) //sell order is larger
                {
                    make = false;
                    sellOrders[i].set('quantity', parseInt(sellOrders[i].get('quantity')) - bQuantity);

                    //Update Summary/////////////////////////////////////////////////////////
                    theCompany.set('currentPrice', bPrice);

                    var changeVal = parseFloat(theCompany.get('openPrice')) - parseFloat(theCompany.get('currentPrice'));

                    theCompany.set('changeValue', Math.abs(changeVal));

                    if(changeVal > 0){
                        theCompany.set('changeDir', 'images/down.png');
                    }
                    else if(changeVal < 0){
                        theCompany.set('changeDir', 'images/up.png');
                    }
                    else{
                        theCompany.set('changeDir', 'images/noChange.png');
                    }

                    var changePerc = Math.abs(changeVal/parseFloat(theCompany.get('openPrice'))).toFixed(4)*100;

                    theCompany.set('changePerc', changePerc);

                    var newVolume = parseInt(this.get('model.volume')) + bQuantity;
                    theCompany.set('volume', newVolume);
                    /////////////////////////////////////////////////////////////////////////

                    break;
                }
            }
            if(make) {
                var newBid = this.store.createRecord('buyOrder', {
                    price: bPrice,
                    quantity: bQuantity,
                    company: this.get('model')
                });
                newBid.save();  //store order
            }
            this.transitionToRoute('StockStateSummary');    //return to summary
        }
    }
});