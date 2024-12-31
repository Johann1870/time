function toFrenchRepublicanCalendar(frenchrep) {

  /*  EQUINOXE_A_PARIS  --  Determine Julian day and fraction of the
                            September equinox at the Paris meridian in
                            a given Gregorian year.  */


  Date.prototype.getJulianUTC = function() {
    return (this / 86400000) + 2440587.5;
  }
  var today = new Date();
  const jd = today.getJulianUTC();

  function equinoxe_a_paris(today.getFullYear()) {
    var equJED, equJD, equAPP, equParis, dtParis;

    //  September equinox in dynamical time
    equJED = equinox(year, 2);

    //  Correct for delta T to obtain Universal time
    equJD = equJED - (deltat(year) / (24 * 60 * 60));

    //  Apply the equation of time to yield the apparent time at Greenwich
    equAPP = equJD + equationOfTime(equJED);

    /*  Finally, we must correct for the constant difference between
        the Greenwich meridian and that of Paris, 2�20'15" to the
        East.  */

    dtParis = (2 + (20 / 60.0) + (15 / (60 * 60.0))) / 360;
    equParis = equAPP + dtParis;

    return equParis;
  }

  /*  PARIS_EQUINOXE_JD  --  Calculate Julian day during which the
                             September equinox, reckoned from the Paris
                             meridian, occurred for a given Gregorian
                             year.  */

  function paris_equinoxe_jd(today.getFullYear()) {
    var ep, epg;

    ep = equinoxe_a_paris(year);
    epg = Math.floor(ep - 0.5) + 0.5;

    return epg;
  }

  /*  ANNEE_DE_LA_REVOLUTION  --  Determine the year in the French
                                  revolutionary calendar in which a
                                  given Julian day falls.  Returns an
                                  array of two elements:

                                      [0]  Ann�e de la R�volution
                                      [1]  Julian day number containing
                                           equinox for this year.
  */

  var FRENCH_REVOLUTIONARY_EPOCH = 2375839.5;

  function annee_da_la_revolution(jd) {
    var guess = jd_to_gregorian(jd)[0] - 2,
      lasteq, nexteq, adr;

    lasteq = paris_equinoxe_jd(guess);
    while (lasteq > jd) {
      guess--;
      lasteq = paris_equinoxe_jd(guess);
    }
    nexteq = lasteq - 1;
    while (!((lasteq <= jd) && (jd < nexteq))) {
      lasteq = nexteq;
      guess++;
      nexteq = paris_equinoxe_jd(guess);
    }
    adr = Math.round((lasteq - FRENCH_REVOLUTIONARY_EPOCH) / TropicalYear) + 1;

    return new Array(adr, lasteq);
  }

  /*  JD_TO_FRENCH_REVOLUTIONARY  --  Calculate date in the French Revolutionary
                                      calendar from Julian day.  The five or six
                                      "sansculottides" are considered a thirteenth
                                      month in the results of this function.  */

  function jd_to_french_revolutionary(jd) {
    var an, mois, decade, jour,
      adr, equinoxe;

    jd = Math.floor(jd) + 0.5;
    adr = annee_da_la_revolution(jd);
    an = adr[0];
    equinoxe = adr[1];
    mois = Math.floor((jd - equinoxe) / 30) + 1;
    jour = (jd - equinoxe) % 30;
    decade = Math.floor(jour / 10) + 1;
    jour = (jour % 10) + 1;

    return new Array(an, mois, decade, jour);
  }
  return jd_to_french_revolutionary(jd);
}
