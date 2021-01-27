/*Statistics tables for Attendance and Party Loyalty. 10% and At a glance*/

const statistics = {
    democrats: 0,
    republicans: 0,
    independents: 0,
    total: 0,
    votD: 0,
    votR: 0,
    votI: 0,
    totMembers: 0,
    totVotParty: 0,
    least_loyal: [],
    most_loyal: [],
    least_engaged: [],
    most_engaged: []
}

let members = data.results[0].members;

/* Table At a Glance*/
function calculate() {
    let sumD = 0
    let sumR = 0
    let sumI = 0

    for(let i = 0; i < members.length; i++) {
        switch(members[i].party) {
            case "D":
                statistics.democrats ++
                (members[i].votes_with_party_pct) ? sumD += members[i].votes_with_party_pct : sumD += 0;
                break
            case "R":
                statistics.republicans ++
                (members[i].votes_with_party_pct) ? sumR += members[i].votes_with_party_pct : sumR += 0;
                break
            case "I":
                statistics.independents ++
                sumI += members[i].votes_with_party_pct
        }
    }

    statistics.votD = statistics.democrats != 0 ? (sumD / statistics.democrats).toFixed(2) : "0";
    statistics.votR = statistics.republicans != 0 ? (sumR / statistics.republicans).toFixed(2) : "0";
    statistics.votI = statistics.independents != 0 ? (sumI / statistics.independents).toFixed(2) : "0"; 

    /* Total members */
    statistics.totMembers = members.length;

    /* /2 for no-existing fields */
    if (statistics.votI == 0) {
        statistics.totVotParty = ( (parseFloat(statistics.votD) + parseFloat(statistics.votR) ) / 2).toFixed(2);
    } else {
        statistics.totVotParty = ( (parseFloat(statistics.votD) + parseFloat(statistics.votR) + parseFloat(statistics.votI) ) /3).toFixed(2);
    }
}

/* calculate the 10% */
const tenPct = (array,key,isAscendent) => {
    let result
    let i
    let aux = isAscendent ? 
                [...array].sort((a,b) => a[key] - b[key]) 
            : 
                [...array].sort((a,b) => b[key] - a[key])
    let tenPct = parseInt(aux.length*0.1)

    result = aux.slice(0,tenPct)

    i = result.length

    while(aux[i][key] == result[result.length - 1][key] && i < aux.length){
        result.push(aux[i])
        i++
    }

    return result
}

/* llamada a la función para tabla 1 */
calculate()

/* 10% for each table, most/least engaged/loyal */
statistics.least_engaged = tenPct(members,"missed_votes_pct",false)
statistics.most_engaged = tenPct(members,"missed_votes_pct",true)
statistics.most_loyal = tenPct(members,"votes_with_party_pct",false)
statistics.least_loyal = tenPct(members,"votes_with_party_pct",true)

/* Table At a glance  */
document.getElementById("congress-data").innerHTML = `<tr>
    <td>Democrats</td>
    <td>${statistics.democrats}</td>
    <td>${statistics.votD} %</td>
</tr>
<tr>
    <td>Republicans</td>
    <td>${statistics.republicans}</td>
    <td>${statistics.votR} %</td>
</tr>
<tr>
    <td>Independents</td>
    <td>${statistics.independents}</td>
    <td>${statistics.votI} %</td>
</tr>
<tr>
    <td class="font-weight-bold">Total</td>
    <td>${statistics.totMembers}</td>
    <td>${statistics.totVotParty} %</td>
</tr>
`

/* 4 tables, most/least */
function createTables(id,array,key){
    if(document.getElementById(id)){
        document.getElementById(id).innerHTML = array.map(e => {
            return `<tr>
                        <td> <a href= ${e.url}>
                        ${e.last_name} 
                        ${e.first_name} 
                        ${e.middle_name || " " }</a> </td>
                        <td>${key == "missed_votes_pct" ? e.missed_votes : e.total_votes }</td>
                        <td>${e[key]} %</td>
                    </tr>`
        }).join('')
    }else{
        return 
    }
}
                            
//id, array, key
createTables('most_engaged', statistics.most_engaged, "missed_votes_pct")
createTables('least_engaged', statistics.least_engaged, "missed_votes_pct")
createTables('least_loyal', statistics.least_loyal, "votes_with_party_pct")
createTables('most_loyal', statistics.most_loyal, "votes_with_party_pct")