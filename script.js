//technical challenge number 1, searching by team name returns very limited information(but is the best search to use due to the variations of names that it returns)
// to return more advanced stats the team id needs to be mapped to the teamname to return the data. I got around this by returning the team ID from the original search,
//sticking the ID in a variable and then inserting the variable into the URL where the ID goes. I know if can be done with a function, will fix if I have time.
//technical challenge number 2, the API's are like a spiderweb of data, navigating through it all with clean concise code was tough, 
//then I started figuring out $ref's a little more so I was able to re-write code to make it a little more cleaner
//technical challenge number 3, getting the map on the screen, with the satdium names in to correct location, I would like the click to be associated
//with the team info, trying to figure that part out. Tried MapBox, and Google Maps and couldn't get a map to show, dug around and found leaflet, really great documentation
//and I had a map on the screen pretty quickly

const button = document.querySelector("#searchButton")
const allbutton = document.querySelector("#allButton")
const teamNamess = document.querySelector("#teamNames")
const teamLogoDisplay = document.querySelector("#teamLogos")
const teamName = document.querySelector("#teamName")
const teamRecord = document.querySelector("#teamRecord")
const venueAllImages = document.querySelector("#venueImages")
const venueInfo = document.querySelector("#venueData")
const teamStats = document.querySelector("#teamStats")
const playerStats = document.querySelector("#playerStats")
const recordsWinLoss = document.querySelector("#recordsWinLoss")
const playerStatsTitle = document.querySelector("#playerStatsTitle")
const teamStatsTitle = document.querySelector("#teamStatsTitle")
const teamLocationMap = document.querySelector('#teamMap')

let map = L.map('map').setView([37.8, -96], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
}).addTo(map);

//add information to stadiums https://geojango.com/pages/list-of-nfl-teams

let stadiums = [
  {name: "State Farm Stadium", team: `<a href="https://www.azcardinals.com/">Arizona Cardinals</a>`, city: `Glendale, Arizona`, capacity: `Capacity: 63,400`, location: {lat: 33.5276, lng: -112.2626}},
  {name: "Mercedes-Benz Stadium", team: `<a href="https://www.atlantafalcons.com/">Atlanta Falcons</a>`, city: `Atlanta, Georgia`, capacity: `Capacity: 71,000`, location: {lat: 33.7550, lng: -84.4008}},
  {name: "M&T Bank Stadium", team: `<a href="https://www.baltimoreravens.com/">Baltimore Ravens</a>`, city: `Baltimore, Maryland`, capacity: `Capacity: 71,008`, location: {lat: 39.2779, lng: -76.6228}},
  {name: "New Era Field", team: `<a href="https://www.buffalobills.com/">Buffalo Bills</a>`, city: `Orchard Park, New York`, capacity: `Capacity: 71,608`, location: {lat: 42.7740, lng: -78.7870}},
  {name: "Bank of America Stadium", team: `<a href="https://www.panthers.com/">Carolina Panthers</a>`, city: `Charlotte, North Carolina`, capacity: `Capacity: 75,523`, location: {lat: 35.2258, lng: -80.8528}},
  {name: "Soldier Field", team: `<a href="https://www.chicagobears.com/">Chicago Bears</a>`, city: `Chicago, Illinois`, capacity: `Capacity: 61,500`, location: {lat: 41.8623, lng: -87.6167}},
  {name: "Paul Brown Stadium", team: `<a href="https://www.bengals.com/">Cincinnati Bengals</a>`, city: `Cincinnati, Ohio`, capacity: `Capacity: 65,515`, location: {lat: 39.0955, lng: -84.5161}},
  {name: "FirstEnergy Stadium", team: `<a href="https://www.clevelandbrowns.com/">Cleveland Browns</a>`, city: `Cleveland, Ohio`, capacity: `Capacity: 67,895`, location: {lat: 41.5061, lng: -81.6997}},
  {name: "AT&T Stadium", team: `<a href="https://www.dallascowboys.com/">Dallas Cowboys</a>`, city: `Arlington, Texas`, capacity: `Capacity: 80,000`, location: {lat: 32.7473, lng: -97.0945}},
  {name: "Empower Field at Mile High", team: `<a href="https://www.denverbroncos.com/">Denver Broncos</a>`, city: `Denver, Colorado`, capacity: `Capacity: 76,125`, location: {lat: 39.7439, lng: -105.0201}},
  {name: "Ford Field", team: `<a href="https://www.detroitlions.com/">Detroit Lions</a>`, city: `Detroit, Michigan`, capacity: `Capacity: 65,000`, location: {lat: 42.3400, lng: -83.0456}},
  {name: "Lambeau Field", team: `<a href="https://www.packers.com/">Green Bay Packers</a>`, city: `Green Bay, Wisconsin`, capacity: `Capacity: 81,441`, location: {lat: 44.5013, lng: -88.062}},
  {name: "NRG Stadium", team: `<a href="https://www.houstontexans.com/">Houston Texans</a>`, city: `Houston, Texas`, capacity: `Capacity: 72,220`, location: {lat: 29.6847, lng: -95.4107}},
  {name: "Lucas Oil Stadium", team: `<a href="https://www.colts.com/">Indianapolis Colts</a>`, city: `Indianapolis, Indiana`, capacity: `Capacity: 67,000`, location: {lat: 39.7601, lng: -86.1639}},
  {name: "TIAA Bank Field", team: `<a href="https://www.jaguars.com/">Jacksonville Jaguars</a>`, city: `Jacksonville, Florida`, capacity: `Capacity: 69,132`, location: {lat: 30.3239, lng: -81.6373}},
  {name: "Arrowhead Stadium", team: `<a href="https://www.chiefs.com/">Kansas City Chiefs</a>`, city: `Kansas City, Missouri`, capacity: `Capacity: 76,416`, location: {lat: 39.0489, lng: -94.4839}},
  {name: "Allegiant Stadium", team: `<a href="https://www.raiders.com/">Las Vegas Raiders</a>`, city: `Paradise, Nevada`, capacity: `Capacity: 65,000`, location: {lat: 36.0908, lng: -115.1831}},
  {name: "SoFi Stadium", team: `<a href="https://www.chargers.com/">Los Angeles Chargers</a>`, city: `Inglewood, California`, capacity: `Capacity: 70,240`, location: {lat: 33.9534, lng: -118.2331}},
  {name: "SoFi Stadium", team: `<a href="https://www.therams.com/">Los Angeles Rams</a>`, city: `Inglewood, California`, capacity: `Capacity: 70,240`, location: {lat: 33.9534, lng: -118.2331}},
  {name: "Hard Rock Stadium", team: `<a href="https://www.miamidolphins.com/">Miami Dolphins</a>`, city: `Miami Gardens, Florida`, capacity: `Capacity: 65,326`, location: {lat: 25.9580, lng: -80.2388}},
  {name: "U.S. Bank Stadium", team: `<a href="https://www.vikings.com/">Minnesota Vikings</a>`, city: `Minneapolis, Minnesota`, capacity: `Capacity: 66,655`, location: {lat: 44.9740, lng: -93.2596}},
  {name: "Gillette Stadium", team: `<a href="https://www.patriots.com/">New England Patriots</a>`, city: `Foxborough, Massachusetts`, capacity: `Capacity: 66,829`, location: {lat: 42.0909, lng: -71.2643}},
  {name: "Mercedes-Benz Superdome", team: `<a href="https://www.neworleanssaints.com/">New Orleans Saints</a>`, city: `New Orleans, Louisiana`, capacity: `Capacity: 73,208`, location: {lat: 29.9511, lng: -90.0822}},
  {name: "MetLife Stadium", team: `<a href="https://www.giants.com/">New York Giants</a>`, city: `East Rutherford, New Jersey`, capacity: `Capacity: 82,500`, location: {lat: 40.8136, lng: -74.0743}},
  {name: "MetLife Stadium", team: `<a href="https://www.newyorkjets.com/">New York Jets</a>`, city: `East Rutherford, New Jersey`, capacity: `Capacity: 82,500`, location: {lat: 40.8136, lng: -74.0743}},
  {name: "Lincoln Financial Field", team: `<a href="https://www.philadelphiaeagles.com/">Philadelphia Eagles</a>`, city: `Philadelphia, Pennsylvania`, capacity: `Capacity: 69,596`, location: {lat: 39.9008, lng: -75.1675}},
  {name: "Heinz Field", team: `<a href="https://www.steelers.com/">Pittsburgh Steelers</a>`, city: `Pittsburgh, Pennsylvania`, capacity: `Capacity: 68,400`, location: {lat: 40.4468, lng: -80.0158}},
  {name: "Levi's Stadium", team: `<a href="https://www.49ers.com/">San Francisco 49ers</a>`, city: `Santa Clara, California`, capacity: `Capacity: 68,500`, location: {lat: 37.4030, lng: -121.9702}},
  {name: "Lumen Field", team: `<a href="https://www.seahawks.com/">Seattle Seahawks</a>`, city: `Seattle, Washington`, capacity: `Capacity: 69,000`, location: {lat: 47.5952, lng: -122.3316}},
  {name: "Raymond James Stadium", team: `<a href="https://www.buccaneers.com/">Tampa Bay Buccaneers</a>`, city: `Tampa, Florida`, capacity: `Capacity: 65,890`, location: {lat: 27.9759, lng: -82.5033}},
  {name: "Nissan Stadium", team: `<a href="https://www.tennesseetitans.com/">Tennessee Titans</a>`, city: `Nashville, Tennessee`, capacity: `Capacity: 69,143`, location: {lat: 36.1664, lng: -86.7713}},
  {name: "FedExField", team: `<a href="https://www.commanders.com/">Washington Commanders</a>`, city: `Landover, Maryland`, capacity: `Capacity: 82,000`, location: {lat: 38.9077, lng: -76.8644}}
  ]

let markers = [];

for (let i = 0; i < stadiums.length; i++) {
  let marker = L.marker([stadiums[i].location.lat, stadiums[i].location.lng]).addTo(map);
  marker.bindPopup(`${stadiums[i].name} - ${stadiums[i].team}<br>${stadiums[i].city} - ${stadiums[i].capacity}`);
  markers.push(marker);
}

// allbutton.addEventListener('click', async (event) => { 
//     event.preventDefault()
//     let allTeams  = await axios.get(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams`)

//     let teams = allTeams.data.sports[0].leagues[0].teams
//     teamNames.innerHTML = ''
//     teamLogoDisplay.innerHTML = ''
//     teamName.innerHTML = ''
//     venueInfo.innerHTML = ''
//     venueAllImages.innerHTML = ''
//     recordsWinLoss.innerHTML = ''
//     playerStatsTitle.innerHTML = ''
//     playerStats.innerHTML = ''
//     teamStatsTitle.innerHTML = ''
//     teamStats.innerHTML = ''

// for (let i = 0; i < teams.length; i++) {
//   let teamName = teams[i].team.displayName;
//   let teamNameElement = document.createElement("p");
//   teamNameElement.innerHTML = teamName;
//   teamNames.appendChild(teamNameElement)
//   teamNameElement.addEventListener('click', () => {
//     // Find the stadium location for the clicked team
//     let stadium = stadiums.find((stadium) => stadium.team === teams[i].team.displayName);
//     if (stadium) {
//       let map2 = L.map('teamMap').setView([stadiums[i].location.lat, stadiums[i].location.lng], 400);
//       for (let i = 0; i < stadiums.length; i++) {
//         let marker = L.marker([stadiums[i].location.lat, stadiums[i].location.lng]).addTo(map2);
//         marker.bindPopup(`${stadiums[i].name} - ${stadiums[i].team}`);
//         markers.push(marker);
//       }
//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
//             '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
//             'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//         maxZoom: 17,
//       }).addTo(map2);
//    }
//   })
// }


    
//     // for (let i = 0; i < teams.length; i++) {
//     //     let teamName = teams[i].team.displayName;
//     //     let teamNameElement = document.createElement("p");
//     //     teamNameElement.innerHTML = teamName;
//     //     teamNames.appendChild(teamNameElement); //make the fonts look nicer
//     //   }

//     //last seasons schedule with scores
//     //is it possible to do this with a click event on the text that rolls down with map of stadium?
//     console.log(teams)
//     console.log(teamNames)

// })

button.addEventListener('click', async (event) => {
    event.preventDefault()
    const teamSearch = document.querySelector("#teamInput").value
    let teamResponse  = await axios.get(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${teamSearch}`)
    // let teams = teamResponse.data.sports[0].leagues[0].teams
    let teamInfo = teamResponse.data.team
    let teamLogo = teamInfo.logos[0].href
    let teamLink = teamInfo.links[0].href

    let teamId = teamInfo.id
    let allTeamInfo = await axios.get(`http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/teams/${teamId}`)
    let venueCapacity = allTeamInfo.data.venue.capacity
    let venueName = allTeamInfo.data.venue.fullName
    let venueImages = allTeamInfo.data.venue.images

    const responseStatistic = await axios.get(allTeamInfo.data.statistics.$ref)
    const statisticValue = responseStatistic.data.splits
    const compPercent = statisticValue.categories[1].stats[1].displayValue
    const passYards = statisticValue.categories[1].stats[19].displayValue
    const passTDs = statisticValue.categories[1].stats[18].displayValue
    const rushAttempts = statisticValue.categories[2].stats[6].displayValue
    const rushYards = statisticValue.categories[2].stats[12].displayValue
    const rushTDs = statisticValue.categories[2].stats[11].displayValue
    const receptions = statisticValue.categories[3].stats[16].displayValue
    const recYards = statisticValue.categories[3].stats[12].displayValue
    const recTDs = statisticValue.categories[3].stats[11].displayValue
    const tackles = statisticValue.categories[4].stats[22].displayValue
    const sacks = statisticValue.categories[4].stats[14].displayValue
    const defensiveTDs = statisticValue.categories[4].stats[6].displayValue
    const ints = statisticValue.categories[5].stats[0].displayValue
    const fieldGoalsMade = statisticValue.categories[6].stats[21].displayValue
    const fieldGoalLong = statisticValue.categories[6].stats[37].displayValue
    const kickingPoints = statisticValue.categories[6].stats[40].displayValue
    const puntAVG = statisticValue.categories[8].stats[4].displayValue
    const puntLong = statisticValue.categories[8].stats[3].displayValue
    const puntBlock = statisticValue.categories[8].stats[8].displayValue
    const kickReturnYards = statisticValue.categories[7].stats[10].displayValue
    const puntReturnYards = statisticValue.categories[7].stats[27].displayValue
    const yardsPerReturn = statisticValue.categories[7].stats[33].displayValue
    const twoPointConv = statisticValue.categories[9].stats[11].displayValue
    const totalTDs = statisticValue.categories[9].stats[10].displayValue
    const totalPoints = statisticValue.categories[9].stats[8].displayValue
    const avgPointsGame = statisticValue.categories[9].stats[9].displayValue
  
    const responseRecord = await axios.get(allTeamInfo.data.record.$ref)
    const recordValue = responseRecord.data
    const recordOverall = recordValue.items[0].displayValue
    const recordHome = recordValue.items[1].displayValue
    const recordAway = recordValue.items[2].displayValue
    const recordConf = recordValue.items[3].displayValue

    const responseLeader = await axios.get(allTeamInfo.data.leaders.$ref)
    const leaderValue = responseLeader.data
    const passingLeader = leaderValue.categories[0].displayName
    const passingStats = leaderValue.categories[0].leaders[0].displayValue
    const rushingLeader = leaderValue.categories[1].displayName
    const rushingStats = leaderValue.categories[1].leaders[0].displayValue
    const receiving1Leader = leaderValue.categories[2].displayName
    const receiving1Stats = leaderValue.categories[2].leaders[0].displayValue
    const receiving2Leader = leaderValue.categories[2].displayName
    const receiving2Stats = leaderValue.categories[2].leaders[1].displayValue
    const tacklesLeader = leaderValue.categories[6].displayName
    const tacklesStats = leaderValue.categories[6].leaders[0].displayValue
    const sackLeader = leaderValue.categories[7].displayName
    const sackStats = leaderValue.categories[7].leaders[0].displayValue
    const int1Leader = leaderValue.categories[8].displayName
    const int1Stats = leaderValue.categories[8].leaders[0].displayValue
    const int2Leader = leaderValue.categories[8].displayName
    const int2Stats = leaderValue.categories[8].leaders[1].displayValue
 
    const responsePassingAthlete = await axios.get(leaderValue.categories[0].leaders[0].athlete.$ref)
    const athletePassing = responsePassingAthlete.data.fullName
    const responseRushingAthlete = await axios.get(leaderValue.categories[1].leaders[0].athlete.$ref)
    const athleteRushing = responseRushingAthlete.data.fullName
    const responseReceiving1Athlete = await axios.get(leaderValue.categories[2].leaders[0].athlete.$ref)
    const athleteReceiving1 = responseReceiving1Athlete.data.fullName
    const responseReceiving2Athlete = await axios.get(leaderValue.categories[2].leaders[1].athlete.$ref)
    const athleteReceiving2 = responseReceiving2Athlete.data.fullName
    const responseTacklesAthlete = await axios.get(leaderValue.categories[6].leaders[0].athlete.$ref)
    const athleteTackles = responseTacklesAthlete.data.fullName
    const responseSacksAthlete = await axios.get(leaderValue.categories[7].leaders[0].athlete.$ref)
    const athleteSacks = responseSacksAthlete.data.fullName
    const responseInt1Athlete = await axios.get(leaderValue.categories[8].leaders[0].athlete.$ref)
    const athleteInt1 = responseInt1Athlete.data.fullName
    const responseInt2Athlete = await axios.get(leaderValue.categories[8].leaders[1].athlete.$ref)
    const athleteInt2 = responseInt2Athlete.data.fullName

    // teamNames.innerHTML = ''
    // teamLogoDisplay.innerHTML = ''
    // teamName.innerHTML = ''
    // teamLogoDisplay.innerHTML = ''
    // venueInfo.innerHTML = ''
    // venueAllImages.innerHTML = ''
    // recordsWinLoss.innerHTML = ''
    // playerStatsTitle.innerHTML = ''
    // playerStats.innerHTML = ''
    // teamStatsTitle.innerHTML = ''
    // teamStats.innerHTML = ''

    teamName.innerHTML = `${teamInfo.displayName}`

    teamLogoDisplay.innerHTML = `<a href=${teamLink}><img src=${teamLogo}>` 
    venueInfo.innerHTML = `The ${allTeamInfo.data.name} play football at ${venueName}, which has a capacity of ${venueCapacity} people.`

    recordsWinLoss.innerHTML = `The ${allTeamInfo.data.name} had an overall win-loss record of ${recordOverall}, with a record of ${recordHome} at home <br>
    and a record of ${recordAway} on the road. They had a division record of ${recordConf}.` 
    
    playerStatsTitle.innerHTML = 'Leading Player Stats'
    playerStats.innerHTML = `The ${passingLeader} is ${athletePassing}. His passing stats are ${passingStats}<br>
    The ${rushingLeader} is ${athleteRushing}. His rushing stats are ${rushingStats}<br>
    A ${receiving1Leader} is ${athleteReceiving1}. His receiving stats are ${receiving1Stats}<br>
    A ${receiving2Leader} is ${athleteReceiving2}. His receiving stats are ${receiving2Stats}<br>
    The ${tacklesLeader} Leader is ${athleteTackles}. He has ${tacklesStats} tackles<br>
    The ${sackLeader} Leader is ${athleteSacks}. He had ${sackStats} sacks<br>
    An ${int1Leader} Leader is ${athleteInt1}. He snagged ${int1Stats} interceptions<br>
    An ${int2Leader} Leader is ${athleteInt2}. He snagged ${int2Stats} interceptions<br>`
    
    teamStatsTitle.innerHTML = `Team Stats`
    teamStats.innerHTML = `Passing stats: ${compPercent}% completions, ${passYards} passing yards, and ${passTDs} passing touchdowns<br>
    Rushing stats: ${rushAttempts} rushing attempts, ${rushYards} rushing yards, and ${rushTDs} rushing touchdowns<br>
    Receiving stats: ${receptions} receptions, ${recYards} receiving yards, and ${recTDs} receiving touchdowns<br>
    Defensive stats: ${tackles} tackles, ${sacks} sacks, ${defensiveTDs} touchdowns for the defense, and ${ints} interceptions<br>
    Kicking stats: ${fieldGoalsMade} field goals made, ${fieldGoalLong} yards was the longest field goal, and kickers scored ${kickingPoints} points<br>
    Punting stats: ${puntAVG} yards was the net average punt, ${puntLong} yards was the longest punt, and had ${puntBlock} punts blocked<br>
    Return stats: ${kickReturnYards} total kickoff return yards, ${puntReturnYards} total punt return yards, and ${yardsPerReturn} average yards per return<br>
    Scoring stats: ${twoPointConv} two point conversions, ${totalTDs} total touchdowns, ${totalPoints} total points, and ${avgPointsGame} average points per game<br>`

    for (let i = 0; i < venueImages.length; i++) {
        let venueImage = venueImages[i].href;
        let venueImageElement = document.createElement("img");
        venueImageElement.src = venueImage;
        document.querySelector("#venueImages").appendChild(venueImageElement);
      }

    let stadium = stadiums.find((stadium) => stadium.name === venueName);
    if (stadium) {
      let map2 = L.map('teamMap').setView([stadium.location.lat, stadium.location.lng], 500);
      for (let i = 0; i < stadiums.length; i++) {
        let marker = L.marker([stadiums[i].location.lat, stadiums[i].location.lng]).addTo(map2);
        marker.bindPopup(`${stadiums[i].name} - ${stadiums[i].team}`);
        markers.push(marker);
      }
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 17,
      }).addTo(map2);
    }
        

      console.log(teamStats)
})