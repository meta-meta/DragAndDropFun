$(function() {
  $('.sortable').sortable({revert: 'invalid'});
  $('.sortable').disableSelection();
  $('#area1').sortable('option', 'connectWith', '#area2');

  $('#area2').on('sortreceive', function( event, ui ) {
    if($('#area1').children().length == 0) {
      $('button').removeAttr('disabled');
    }
  });

  var items = $('#area1').children();
  function reset() {
    $('#area1').append(items);
    $('button').attr('disabled', 'disabled');
  }

  $('button').click(function() {
    var correctOrder = _.range(0, $('#area2').children().length);
    var currOrder = _.map($('#area2').children(), function(item){
      return { order: $(item).data('sort-order'), label: $(item).text() };
    });

    var outOfOrderItems = _.chain(_.zip(correctOrder, currOrder))
      .map(function(a) {
        if(a[0] != a[1].order) {
          return a[1].label;
        }
      })
      .compact()
      .value();

    var success = _.isEmpty(outOfOrderItems);
    var alertMsg = success ?
      'Well Done!' :
      'These items are in the wrong place: ' + _.str.join(', ', outOfOrderItems);

    alert(alertMsg);

    if(success){
      reset();
    }

  })
});

