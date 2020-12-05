import { fifaData } from './fifa.js';

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/

const final2014 = fifaData.filter(function (data) {
    return data.MatchID === 300186501;
});

//(a) Home Team name for 2014 world cup final

var homeFinal2014 = final2014[0]["Home Team Name"];
console.log(homeFinal2014);

//(b) Away Team name for 2014 world cup final

var awayFinal2014 = final2014[0]["Away Team Name"];
console.log(awayFinal2014);

//(c) Home Team goals for 2014 world cup final

var homeGoalsFinal2014 = final2014[0]["Home Team Goals"];
console.log(homeGoalsFinal2014);

//(d) Away Team goals for 2014 world cup final

var awayGoalsFinal2014 = final2014[0]["Away Team Goals"];
console.log(awayGoalsFinal2014);

//(e) Winner of 2014 world cup final */

if (awayGoalsFinal2014 > homeGoalsFinal2014) {
    console.log(awayFinal2014);
} else {
    console.log(homeFinal2014);
}


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/

function getFinals(data) {
    let finalGames = data.filter(game => game.Stage === "Final");
    return finalGames;
}

console.log(getFinals(fifaData));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(arr, callback) {
    const years = [];
    callback(arr).forEach(item => years.push(item.Year));
    return years;
}

console.log(getYears(fifaData, getFinals));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(arr, callback) {
    const winners = [];
    
    callback(arr).forEach(item => {
        var homeTeam = item["Home Team Goals"];
        var awayTeam = item["Away Team Goals"];
        
        if (awayTeam > homeTeam) {
            winners.push(item["Away Team Name"]);
        } else {
            winners.push(item["Home Team Name"]);
        }
    })
    
    return winners;
}

console.log(getWinners(fifaData, getFinals))

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getYears from task 3
3. Receive a callback function getWinners from task 4
4. Return an array of strings that say "In {year}, {country} won the world cup!" 

hint: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(arr1, cb1, cb2, cb3) {
    const strings = [];

    cb2(arr1, cb3).forEach((item, i) => {
        strings.push(`In ${cb1(arr1, cb3)[i]}, ${item} won the world cup!`);
    })

    return strings;
}

console.log(getWinnersByYear(fifaData, getYears, getWinners, getFinals));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

function getAverageGoals(callback) {
    let avg;
    const getSum = [];

    callback.forEach(item => {
        getSum.push(item["Home Team Goals"]);
        getSum.push(item["Away Team Goals"]);
    });

    const reduction = getSum.reduce((total, item) => {
        return (total + item);
    }, 0);

    avg = Math.round(reduction / getSum.length * 2 * 100) / 100;
    return `${avg}`; //not sure why this needed a string
}

console.log(getAverageGoals(getFinals(fifaData)));


/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, str) {
    const wins = [];
    
    data.forEach(item => {
        let homeTeamGls = item["Home Team Goals"];
        let awayTeamGls = item["Away Team Goals"];
        let homeTeam = item["Home Team Name"];
        let awayTeam = item["Away Team Name"];

        if (item["Home Team Initials"] === str && homeTeamGls > awayTeamGls) {
            wins.push(item);
        } else if (item["Away Team Initials"] === str && awayTeamGls > homeTeamGls) {
            wins.push(item);
        }
    })
    return wins.length;
}

console.log(getCountryWins(fifaData, "BRA"));

/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

// function getFinals(data) {
//     let finalGames = data.filter(game => game.Stage === "Final");
//     return finalGames;
// }

// console.log(getFinals(fifaData));

function getGoals(data, finalCB) {
    const goalsScored = [];

    

    return goalsScored;
    // return finalCB(data);
}

console.log(getGoals(fifaData, getFinals));

/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
export default{
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
