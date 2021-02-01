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

### Output 
- `dateEvent` output is used to return selected value of the component. 


## DEMO
- https://stackblitz.com/edit/custom-datetime-picker
