function zeropad(num, posign='')
{
// pads a number with 1 leading zero.
// Accounts for negative numbers which NO ONE ELSE DOES
// Adds a positive sign parameter

    if(num < -10)
    {
          num = num;
    }

    if(num > -10 && num < 0)
    {
          num = "–0"+(num *-1);
    }

    if(num < 10 && num >= 0)
    {
          num = posign+"0"+num;
    }

    if(num >= 10)
    {
          num = posign+num;
    }
return num;
}

function ISO8601_week_no(dt)
  {
     var tdt = new Date(dt.valueOf());
     var dayn = (dt.getDay() + 6) % 7;
     tdt.setDate(tdt.getDate() - dayn + 3);
     var firstThursday = tdt.valueOf();
     tdt.setMonth(0, 1);
     if (tdt.getDay() !== 4)
       {
      tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
        }
     return 1 + Math.ceil((firstThursday - tdt) / 604800000);
        }



function date_time(id)
{
        date = new Date();
        year = date.getFullYear();
        month = date.getMonth();
        months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
        d = date.getDate();
        day = date.getDay();
        days = new Array('Sunday,', 'Monday,', 'Tuesday,', 'Wednesday,', 'Thursday,', 'Friday,', 'Saturday,');

        //ordinal day
        now = new Date();
        start = new Date(now.getFullYear(), 0, 0);
        diff = now - start;
        oneDay = 1000 * 60 * 60 * 24;
        ordday = Math.floor(diff / oneDay);

        //hour
        h = date.getHours();
        if(h<10)
        {
                h = "0"+h;
        }
        //minute
        m = date.getMinutes();
        if(m<10)
        {
                m = "0"+m;
        }
        //second
        s = date.getSeconds();
        if(s<10)
        {
                s = "0"+s;
        }
        //week number
        w = ISO8601_week_no(date);
        if(w<10)
        {
                w = "0"+w;
        }

        //timezone offset
        tz = new Date().getTimezoneOffset();
        //tz = 450;
        tzh = Math.floor(tz / 60) * -1;
        tzm = tz % 60;

        tzh = zeropad(tzh,'+');


        tzm = Math.abs(tzm);



        if(tzm<10)
        {
              tzm = "0"+tzm;
        }




        tz = 'UTC'+tzh+':'+tzm


        //timezone IANA
        tzIANA = Intl.DateTimeFormat().resolvedOptions().timeZone;

        result = ''+days[day]+' '+months[month]+' '+d+' '+year+' '+h+':'+m+':'+s+'<br>'+tz+', '+tzIANA+'<br>W'+w+', '+ordday;
        document.getElementById(id).innerHTML = result;
        setTimeout('date_time("'+id+'");','1000');
        return true;
}
