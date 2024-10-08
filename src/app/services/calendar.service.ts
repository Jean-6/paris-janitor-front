import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {



  constructor(private http: HttpClient) { }

  getWeekNumber(date:Date):number{

    const currentDate=new Date(date.getTime()); //Copie de la date actuelle

    //Réglez la date sur le jeudi de la semaine en cours (garantit un calcul correct de la semaine)
    currentDate.setUTCDate(currentDate.getUTCDate() + 4 - (currentDate.getUTCDay() || 7));

    // Get the first day of the year
    const firstDayOfYear = new Date(Date.UTC(currentDate.getUTCFullYear(), 0, 1));

    // Calculate the number of days between the first day of the year and the current date
    const numberOfDays = Math.floor((currentDate.getTime() - firstDayOfYear.getTime()) / (24 * 60 * 60 * 1000));

    // Calculate the week number
    return Math.ceil((numberOfDays + 1) / 7);
  }

  getWeekDatesPrev(year: number, weekNumber: number): Date[] {
    const weekDates: Date[] = [];

    // Obtenir le premier jour de l'année
    const firstDayOfYear = new Date(year, 0, 1);

    // Trouver le jour de la semaine du 1er janvier (0 = dimanche, 1 = lundi, ...)
    const firstDayOfWeek = firstDayOfYear.getDay();

    // Calculer le décalage en jours pour atteindre la première semaine (en supposant que la semaine commence le lundi)
    const daysOffset = firstDayOfWeek <= 4 ? -firstDayOfWeek + 1 : 7 - firstDayOfWeek + 1;

    // Calculer la date du premier jour de la semaine donnée
    const firstDayOfWeekNumber = new Date(year, 0, 1 + daysOffset + (weekNumber - 1) * 7);

    // Boucler sur 7 jours pour obtenir chaque jour de la semaine donnée
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(firstDayOfWeekNumber);
      currentDate.setDate(firstDayOfWeekNumber.getDate() + i);
      weekDates.push(currentDate);
    }

    return weekDates;
  }

  getDatesFromWeek(year:number, weekNumber:number):Date{

    const date=new Date(year,0,1); //1er janvier de l'annee
    const firstDayOfWeek=date.getDay();

    //Trouver le premier lundi de l'annee (ou la premiere semaine)
    const firstMonday=new Date(date);
    firstMonday.setDate(
      date.getDate()+(firstDayOfWeek <= 4 ? 1 - firstDayOfWeek : 8 - firstDayOfWeek)
    );

    // Calculer la date du premier jour de la semaine desirée
    const weekDate = new Date(firstMonday);
    weekDate.setDate(firstMonday.getDate() + (weekNumber-1) * 7);
    return weekDate;
  }

  getWeekDates(year:number,weekNumber:number):Date[]{

    const options: Intl.DateTimeFormatOptions = {
      year:'numeric',
      month:'long',
      day:'numeric'
    }
    let startOfWeek= this.getDatesFromWeek(year,weekNumber);
    const formattedDate:string = startOfWeek.toLocaleDateString(undefined,options)


    let daysOfWeek : Date[]=[];
    for(let i=0; i<7; i++){
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate()+i);
      daysOfWeek.push(day);
    }
    return daysOfWeek;
  }
}
