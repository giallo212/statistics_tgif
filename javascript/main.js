/* Filters for tables Senate and House data*/

function fnFiltroDrop() {
    let states = []
    let select = document.getElementById("states")
    let members = data.results[0].members

    for(let i = 0; i < members.length; i++){
        if(!states.includes(members[i].state)){
            states.push(members[i].state)
        }
    }
    states.sort()
    select.innerHTML = `<option value="all">All </option>
    ${states.map(state => `<option value="${state}"> ${state}</option>`).join("")}
    `
}
fnFiltroDrop();

function fnFiltros() {
    let tbody = document.getElementById("congress-data");
    let members = data.results[0].members;
    let chkParty = Array.from(document.querySelectorAll("input[name=party]:checked")).map(input => input.value);
    let dropState = document.getElementById("states").value;
    let table = " ";

    for (let i = 0; i < members.length; i++) {
        if (chkParty.includes(members[i].party) && (dropState== members[i].state || dropState== "all")) {

            table += `<tr>
                    <td>
                    <a href= ${members[i].url}> 
                    ${members[i].last_name}
                    ${members[i].first_name}
                    ${members[i].middle_name || ""}</a> </td>
                    
                    <td> ${members[i].party} </td> 
                    <td> ${members[i].state} </td>
                    <td> ${members[i].seniority}</td>
                    <td> ${members[i].votes_with_party_pct || "0"}</td>
                    </tr>`
        }
    }
    tbody.innerHTML = table;
}

fnFiltros();

document.querySelectorAll("input[name=party]").forEach(input =>{
    input.onchange = fnFiltros;
})

document.getElementById("states").onchange= fnFiltros;
