let dateFormat = "yy-mm-dd";
let d = new Date();
let currMonth = d.getMonth();
let currYear = d.getFullYear();
let fromDate = new Date(currYear, currMonth, 1);
let toDate = new Date(currYear, currMonth, 30);

// Date From - start from today
let from = $("#startDate").datepicker({
  dateFormat: dateFormat,
  numberOfMonths: 2,
  defaultDate: fromDate
}).on('change', function(e) {
  let thisMinDate = getDate( this ),
      oneMonthAhead = new Date( getDate( this ) );

  if ( oneMonthAhead ) {
    oneMonthAhead.setMonth( oneMonthAhead.getMonth() + 1 );
  }

  to.datepicker( "option", "minDate", thisMinDate );
  to.datepicker( "option", "maxDate", new Date( oneMonthAhead ) );
});

$("#startDate").datepicker("setDate", fromDate)

// Date To - 1 month ahead of 'from' date. 
let to = $("#endDate").datepicker({
  dateFormat: dateFormat,
  minDate: 0,
  maxDate: '+1m',
  numberOfMonths: 2,
}).on( "change", function() {
  from.datepicker( "option", "maxDate", getDate( this ) );
});

$("#endDate").datepicker("setDate", toDate)


function getDate( element ) {
  let date;
  try {
    date = $.datepicker.parseDate( dateFormat, element.value );
  } catch( error ) {
    date = null;
  }
  return date;
}