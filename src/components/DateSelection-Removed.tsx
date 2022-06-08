import { useDate } from '../hooks/UseDate';
import { DateListBox } from './DateListBox';

export function DateSelection() {
  const { date, UpdateDate } = useDate();
  //const [daysInMonth, setDaysInMonth] = useState(
  //  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  //);

  //const currentYear = new Date().getFullYear();

  function handleDaySet(day: number) {
    var newDate = new Date(date.getFullYear(), date.getMonth(), day);
    UpdateDate(newDate);
  }

  function handleMonthSet(month: number) {
    var newDaysInMonth = new Date(date.getFullYear(), month + 1, 0).getDate();
    UpdateDate(
      new Date(
        date.getFullYear(),
        month,
        date.getDate() > newDaysInMonth ? newDaysInMonth : date.getDate()
      )
    );
    setDaysInMonth(newDaysInMonth);
  }

  function handleYearSet(year: number) {
    UpdateDate(new Date(year, date.getMonth(), date.getDate()));
  }
  return (
    <DateListBox
      date={date}
      handleDaySet={handleDaySet}
      handleMonthSet={handleMonthSet}
      handleYearSet={handleYearSet}
    />
  );
}
