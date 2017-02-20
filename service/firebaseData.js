app.factory('firebaseRead', function($firebase) {

    var service = {};
    service.getDatabase = function(callback) {
        var ref = firebase.database().ref();
        ref.on("value", function(obj) {
            callback(obj.val());
        });
    }
    return service;

});
