# Custom datetime picker
Custom date time picker for ionic

Custom datetime picker is used to make date picking easier - you can choose date from a calendar, change months and years without unnecessary scrolling. 
If time is included, ion-datetime component is activatead. 

## Installation
- Install moment: `npm install moment --save`
- Copy components folder to src/app/
- Import components module to every module that will be using this component

## Usage 
- `<app-custom-datetime-picker [inputDateTime]="dateTime1" [id]="'date-picker'" (dateEvent)="date1Changed($event)"></app-custom-datetime-picker>`

### Inputs 
- `inputDateTime` is datetime we are passing to component. ***Should be formatted as 'YYYY-MM-DDTHH:mm:ss.000Z'.*** This format can be achieved with: `moment().format('YYYY-MM-DDTHH:mm:ss.000Z')`
- `id` input is a string used to identify input of the component
- `amPm` input is a boolean that determines if time picker should be in 12 or 24 hour format
- `min` string formatted as 'YYYY-MM-DD' to determine min date in calendar to be selectable
- `max` string formatted as 'YYYY-MM-DD' to determine max date in calendar to be selectable
- `disabledWeekdays` - array of weekdays that should not we selectable
- `startYear` - number that represents min year to be selectable
- `endYear` - number that represents max year to be selectable
- `dateFormat` - if not passed, default values will apply

### Output 
- `dateEvent` output is used to return selected value of the component.


## DEMO
- https://stackblitz.com/edit/custom-datetime-picker
