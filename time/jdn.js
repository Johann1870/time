function julian_day_number(id)
{
  /*
  Date.prototype.getJulian = function() {
    return (this / 86400000) - (this.getTimezoneOffset() / 1440) + 2440587.5;
  }
*/
  Date.prototype.getJulianUTC = function() {
    return (this / 86400000) + 2440587.5;
  }

  var today = new Date(); //set any date
  var julian = today.getJulianUTC().toLocaleString('en-GB', {minimumFractionDigits:3, maximumFractionDigits:9}); //get Julian counterpart


  result = 'JDN UTC__: '+ julian
  document.getElementById(id).innerHTML = result;
  setTimeout('julian_day_number("'+id+'");','1000');
  return true
}
