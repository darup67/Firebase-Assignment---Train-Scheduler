$(document).ready(function() {

    controller.captureFormFields();
    model.initialDatabasePull();
    setInterval(function() {
        model.initialDatabasePull()
    }, 60000);
    view.updateCurrentTime();
    setInterval(function() {
        view.updateCurrentTime()
    }, 1000);

});

var view = {


    updateTrainScheduleTable: () => {

        controller.convertFrequency();

        $('#train-schedule-body').append(
            '<tr>' +
            '<th scope="row">'+ trainNumber+'</th>'+
            '<td>'+trainLine+'</td>'+
            '<td>'+trainDestination+'</td>'+
            '<td>'+nextTrain+'</td>'+
            '<td>'+minutesAway+'</td>'+
            '<td>'+trainFrequency+'</td>'+
            '<td>'+trainPlatform+'</td>'+
            '</tr>'
        );
    },
    updateCurrentTime: () => {
        $('.currentTime').text(moment().format('h:mm:ss A'))
    }
};