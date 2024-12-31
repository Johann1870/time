function eldarian_day_number(id)
{

  Date.prototype.getJulianUTC = function() {
    return (this / 86400000) + 2440587.5;
  }



  var today = new Date(); //set any date



  var julian = today.getJulianUTC().toLocaleString('en-GB', {minimumFractionDigits:3, maximumFractionDigits:5});



  var eldarian = today.getJulianUTC() + 2316981.5;
  var localOffset = today.getTimezoneOffset();
  var eldarianLocal = eldarian - localOffset/1440;
  var eldarianLocal6pm = eldarianLocal + 0.25;


  result = 'EDN UTC__: '+eldarian.toLocaleString('en-GB', {minimumFractionDigits:3, maximumFractionDigits:9})+'<br>'+'EDN local: '+eldarianLocal.toLocaleString('en-GB', {minimumFractionDigits:3, maximumFractionDigits:9})+'<br>'+'EDN loc_6: '+eldarianLocal6pm.toLocaleString('en-GB', {minimumFractionDigits:3, maximumFractionDigits:9});


  document.getElementById(id).innerHTML = result;
  setTimeout('eldarian_day_number("'+id+'");','100');
  return true
}
