var db = require('../dbconfig').db;

var shoppingItems = ['äpple', 'päron'];

function getList(callback) {
    db.collection('shoppinglist').find({}).toArray( function (err, result){
        if(err) {
            console.log("Error while retrieving shopping list")
            callback(err, []);
        } else {
            console.log(result);
            var list = [];
            result.forEach(function (item) {
                list.push(item.item);
            });
            callback(null, list);
        }
    });
}

/**
 * Arguments:
 * itemName string
 * callback function(err)
 * 
 **/
function addItem(itemName, callback) {
    db.collection('shoppinglist').insert({item : itemName, user: 1}, function (err, result) {
        if(err) {
            console.log("Error at addItem");
            callback(err);
        } else {
            console.log("Inserted data in db");
            callback(null);
        }
    });
}
function removeItem(itemName, callback) {
    db.collection('shoppinglist').remove({item:itemName}, function(err, result) {
        callback(err);
    });
}



exports.addItem = addItem;
exports.removeItem = removeItem;
exports.getList = getList;
