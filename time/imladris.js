function imladris_date(id)
{

//Era
// this will prolly be VII

//Large year (yén)



//year (loa)

//month
months = new Array('Yestarë', 'Tuilë', 'Lairë', 'Yávië', 'Enderi', 'Quellë', 'Hrívë', 'Coirë', 'Mettarë')


//day of month
dom = 66//day of month


//day of week (Enquië)
days = new Array('Valanya', 'Elenya', 'Anarya', 'Isilya', 'Aldúya', 'Menelya')
day = dom % 6;

//hour


//minute





  result = ''+days[day]
  document.getElementById(id).innerHTML = result;
  return true
}
