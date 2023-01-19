# Planity Assesment
This program provides a daily calendar and avoiding visual overlaps with the 2 following constraints:
1.  Every overlapping event should have the same width as every event it overlaps
2.  Every event should use the maximum width available while satisfying constraint 1

features:
- Fetch events from an API endpoint (or if you don't have from *public* project folder)
- Validation of fetched datas
- Render the events avoiding visual overlaps and respecting the above constraints
- Generate random events background color

## Installation

 **0. Requirements**
	First of all, you must have *NodeJS*  and *yarn* installed on your machine.

**1. Environment variables**
	This program need some environment variables that must be specified in *.env* file, that's in the root of the progam
	Here are the required environment variables:
| name | type | description |
|--|--|--|
| `REACT_APP_CALENDAR_EVENT_ENDPOINT` | string | the URL to fetch calendar events with *GET* method. If you don't have one you can use `http://localhost:3000/input.json` that fetch events from `/public/input.json` |
| `REACT_APP_CALENDAR_DAY_START` | number | Calendar day start time in minutes (*ex: 9:00 am equal to 540*) |
| `REACT_APP_CALENDAR_DAY_END` | number | Calendar day end time in minutes (*ex: 9:00 pm equal to 1260*) |

**2. Install packages**
In your terminal, run the following:
	
	yarn install


## Modifying input events
The input must be an array of the following structure:
	
	{
	  id: 1,
	  start: '15:00', // The event starts at 03:00 pm
	  duration: 90 // The duration is expressed in minutes
	}

Be careful, of this:
- *id* must be unique by array.
- *start* must be between `REACT_APP_CALENDAR_DAY_START` and `REACT_APP_CALENDAR_DAY_END`
- event cannot end after `REACT_APP_CALENDAR_DAY_END`

If you have chosen to use events from `/public/input.json` you can modify or add events from this file.

Otherwise if you have chosen to use events from your API endpoint, so you can modify or add events from it

## Run development server
**Once** you have installed the application, you can run the development server with the following command:

	yarn start

***Enjoy !***