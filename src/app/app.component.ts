import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'ContAsecas';
  monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'];
  currentDate = new Date();
  currentDay = this.currentDate.getDate();
  monthNumber = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();
  month = this.monthNames[this.monthNumber];
  year = this.currentYear.toString();

  lastMonth(){
    if(this.monthNumber !== 0){
      this.monthNumber--;
      this.month = this.monthNames[this.monthNumber];
    }else{
      this.monthNumber = 11;
      this.month = this.monthNames[this.monthNumber];
      this.currentYear--;
      this.year = this.currentYear.toString();
    }
  }

  nextMonth(){
    if(this.monthNumber !== 11){
      this.monthNumber++;
      this.month = this.monthNames[this.monthNumber];
    }else{
      this.monthNumber = 0;
      this.month = this.monthNames[this.monthNumber];
      this.currentYear++;
      this.year = this.currentYear.toString();
    }
  }

  startDay(){
    let start = new Date(this.currentYear, this.monthNumber, 1);
    return ((start.getDay()-1) === -1) ? 6 : start.getDay()-1;
  }

  getTotalDays(month){
    if(month === -1) month = 11;

    if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
        return  31;

    } else if (month == 3 || month == 5 || month == 8 || month == 10) {
        return 30;

    } else {

        return this.isLeap() ? 29:28;
    }
  }

  isLeap(){
    return ((this.currentYear % 100 !==0) && (this.currentYear % 4 === 0) || (this.currentYear % 400 === 0));
  }

  select_day(event){
    let clicked_day = document.getElementsByClassName('calendar__clickedday');
    clicked_day[0].classList.remove("calendar__clickedday");
    event.originalTarget.classList.add("calendar__clickedday");
  }

  writeMonth(){
    let dates = '';
    for(let i = this.startDay(); i>0;i--){
        dates += ` <div class="calendar__date calendar__day calendar__last_days day" (click)="select_day()">
            ${this.getTotalDays(this.monthNumber-1)-(i-1)}
        </div>`;
    }
    for(let i=1; i<=this.getTotalDays(this.monthNumber); i++){
        if(i===this.currentDay) {
            dates += ` <div class="calendar__date calendar__day calendar__clickedday day">${i}</div>`;
        }else{
            dates += ` <div class="calendar__date calendar__day day" (click)="select_day()">${i}</div>`;
        }
    }
    return dates;
  }
  
  select_cost_income(event){
    
  }

  add_today_cost_income(){
    return "<li></li>"
  }

}
