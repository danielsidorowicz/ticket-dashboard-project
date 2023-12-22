import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
// import JiraApi from 'jira-client';
import fs from 'fs';
import fetch from 'node-fetch';
import moment from 'moment';
// import { start } from 'repl';

const app = express()
const PORT = 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(__dirname));


fs.readFile('config.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let json = JSON.parse(data)
    let project1 = json.project1
    let project2 = json.project2
    let project3 = json.project3
    let authorizationPass = json.authorizationPass
    let maxSearches = json.maxSearches

    let doSearches = []
    let fetchedData = []
    let doSearches2 = []
    let fetchedData2 = []
    let doSearches3 = []
    let fetchedData3 = []
    let context = {}
    let oldContext = {
        "object": [
            {
                "key": "Placeholder",
                "type": "Placeholder",
                "tI": "Placeholder",
                "status": "Placeholder",
                "resolution": "Placeholder",
                "created": "2025-10-18T16:49:55.000+0200",
                "updated": -1,
                "assignee": "Placeholder"
            }
        ]
    }
    let currentIssueData = {}
    let arrayTosend = []
    let canSend1 = false
    let canSend2 = false
    let canSend3 = false

    function fetchPartedIssues(i, doSearches, startAt) {
        fetch(`https://jiraprod.DOMAINNAME.com/rest/api/2/search?jql=project=${project1}&maxResults=${doSearches[i]}&startAt=${startAt}`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${Buffer.from(authorizationPass).toString('base64')}`,
                'Accept': 'application/json'
            }
        })
            .then(response => {
                console.log(
                    `Response ${project1} nr ${i}: ${response.status} ${response.statusText}`
                );
                return response.text();
            })
            .then(text => {
                let objectReady = JSON.parse(text)
                fetchedData.push(objectReady)
            })
            .catch(err => console.error(err))
    }

    function fetchPartedIssues2(i, doSearches, startAt) {
        fetch(`https://jiraprod.DOMAINNAME.com/rest/api/2/search?jql=project=${project2}&maxResults=${doSearches[i]}&startAt=${startAt}`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${Buffer.from(authorizationPass).toString('base64')}`,
                'Accept': 'application/json'
            }
        })
            .then(response => {
                console.log(
                    `Response ${project2} nr ${i}: ${response.status} ${response.statusText}`
                );
                return response.text();
            })
            .then(text => {
                let objectReady = JSON.parse(text)
                fetchedData2.push(objectReady)
            })
            .catch(err => console.error(err))
    }

    function fetchPartedIssues3(i, doSearches, startAt) {
        fetch(`https://jiraprod.DOMAINNAME.com/rest/api/2/search?jql=project=${project3}&maxResults=${doSearches[i]}&startAt=${startAt}`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${Buffer.from(authorizationPass).toString('base64')}`,
                'Accept': 'application/json'
            }
        })
            .then(response => {
                console.log(
                    `Response ${project3} nr ${i}: ${response.status} ${response.statusText}`
                );
                return response.text();
            })
            .then(text => {
                let objectReady = JSON.parse(text)
                fetchedData3.push(objectReady)
            })
            .catch(err => console.error(err))
    }

    function askForData() {
        let files = fs.readdirSync(__dirname + '/static/gfx/sliderImg');
        let fileObject = {
            directories: files
        }
        let fileSend = JSON.stringify(fileObject, null, 2);
        fs.writeFile('static/json/sliderFiles.json', fileSend, 'utf8', function () {
            console.log('done Files')
        })

        context = {}
        let totalAmount = 0
        let startAt = 0
        doSearches = []
        fetchedData = []

        let totalAmount2 = 0
        let startAt2 = 0
        doSearches2 = []
        fetchedData2 = []

        let totalAmount3 = 0
        let startAt3 = 0
        doSearches3 = []
        fetchedData3 = []


        canSend1 = false
        canSend2 = false
        canSend3 = false

        fetch(`https://jiraprod.DOMAINNAME.com/rest/api/2/search?jql=project=${project1}&maxResults=0`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${Buffer.from(authorizationPass).toString('base64')}`,
                'Accept': 'application/json'
            }
        })
            .then(response => {
                console.log(
                    `Response ${project1} TOTAL: ${response.status} ${response.statusText}`
                );
                return response.text();
            })
            .then(text => {
                let getTotalRaw = JSON.parse(text)
                totalAmount = getTotalRaw.total
                while (totalAmount != 0) {
                    if (totalAmount >= maxSearches) {
                        doSearches.push(maxSearches)
                        totalAmount -= maxSearches
                    } else {
                        doSearches.push(totalAmount)
                        totalAmount -= totalAmount
                    }
                }

                console.log(project1 + doSearches);

                for (let i = 0; i < doSearches.length; i++) {
                    fetchPartedIssues(i, doSearches, startAt)
                    startAt += doSearches[i]

                }

                let checkIfDvcFin = setInterval(() => {
                    if (fetchedData.length == doSearches.length) {
                        canSend1 = true
                        console.log(`${project1} DONE`);
                        clearInterval(checkIfDvcFin)
                    }
                }, 1000)


            })
            .catch(err => console.error(err))

        fetch(`https://jiraprod.DOMAINNAME.com/rest/api/2/search?jql=project=${project2}&maxResults=0`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${Buffer.from(authorizationPass).toString('base64')}`,
                'Accept': 'application/json'
            }
        })
            .then(response => {
                console.log(
                    `Response ${project2} TOTAL: ${response.status} ${response.statusText}`
                );
                return response.text();
            })
            .then(text => {
                let getTotalRaw = JSON.parse(text)
                totalAmount2 = getTotalRaw.total
                while (totalAmount2 != 0) {
                    if (totalAmount2 >= maxSearches) {
                        doSearches2.push(maxSearches)
                        totalAmount2 -= maxSearches
                    } else {
                        doSearches2.push(totalAmount2)
                        totalAmount2 -= totalAmount2
                    }
                }

                console.log(project2 + doSearches2);

                for (let i = 0; i < doSearches2.length; i++) {
                    fetchPartedIssues2(i, doSearches2, startAt2)
                    startAt2 += doSearches2[i]
                }

                let checkIfDuiFin = setInterval(() => {
                    if (fetchedData2.length == doSearches2.length) {
                        canSend2 = true
                        console.log(`${project2} DONE`);
                        clearInterval(checkIfDuiFin)
                    }
                }, 1000)


            })
            .catch(err => console.error(err))

        fetch(`https://jiraprod.DOMAINNAME.com/rest/api/2/search?jql=project=${project3}&maxResults=0`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${Buffer.from(authorizationPass).toString('base64')}`,
                'Accept': 'application/json'
            }
        })
            .then(response => {
                console.log(
                    `Response ${project3} TOTAL: ${response.status} ${response.statusText}`
                );
                return response.text();
            })
            .then(text => {
                let getTotalRaw = JSON.parse(text)
                totalAmount3 = getTotalRaw.total
                while (totalAmount3 != 0) {
                    if (totalAmount3 >= maxSearches) {
                        doSearches3.push(maxSearches)
                        totalAmount3 -= maxSearches
                    } else {
                        doSearches3.push(totalAmount3)
                        totalAmount3 -= totalAmount3
                    }
                }

                console.log(project3 + doSearches3);

                for (let i = 0; i < doSearches3.length; i++) {
                    fetchPartedIssues3(i, doSearches3, startAt3)
                    startAt3 += doSearches3[i]

                }

                let checkIfDleFin = setInterval(() => {
                    if (fetchedData3.length == doSearches3.length) {
                        canSend3 = true
                        console.log(`${project3} DONE`);
                        clearInterval(checkIfDleFin)
                    }
                }, 1000)


            })
            .catch(err => console.error(err))


        let checkIfDataSent = setInterval(() => {
            arrayTosend = []
            let actuallyTime = moment()
            let fetchedDataAll = fetchedData.concat(fetchedData2)
            fetchedDataAll = fetchedDataAll.concat(fetchedData3)
            if (canSend1 && canSend2 && canSend3) {
                for (let i = 0; i < fetchedDataAll.length; i++) {
                    for (let j = 0; j < fetchedDataAll[i].issues.length; j++) {
                        if (fetchedDataAll[i].issues[j].fields.status.name != 'Done' || actuallyTime.diff(fetchedDataAll[i].issues[j].fields.updated, 'seconds') < 86400) {
                            currentIssueData = {
                                key: fetchedDataAll[i].issues[j].key,
                                type: fetchedDataAll[i].issues[j].fields.issuetype.name,
                                tI: fetchedDataAll[i].issues[j].fields.issuetype.iconUrl,
                                status: fetchedDataAll[i].issues[j].fields.status.name,
                                resolution: fetchedDataAll[i].issues[j].fields.resolution != null ? 'Resolved' : 'Unresolved',
                                created: fetchedDataAll[i].issues[j].fields.created,
                                updated: actuallyTime.diff(fetchedDataAll[i].issues[j].fields.updated, 'seconds'),
                                assignee: fetchedDataAll[i].issues[j].fields.assignee != null ? fetchedDataAll[i].issues[j].fields.assignee.displayName : 'Unassigned',
                            }
                            arrayTosend.push(currentIssueData)
                        }



                    }
                }
                context = {
                    object: arrayTosend
                }
                context.object.sort(function (a, b) {
                    return a.updated - b.updated;
                });


                let toFile = JSON.stringify(context, null, 2);
                fs.writeFile('static/json/context.json', toFile, 'utf8', function () {
                    console.log('done')
                })
                oldContext = context
                clearInterval(checkIfDataSent)
            }
        }, 1000)
    }

    askForData()
    let keepAsking = setInterval(() => askForData(), 30000);
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/static/slider.html')
})

app.listen(PORT, function () {
    console.log("SERWER URUCHOMIONY NA PORCIE " + PORT);
})


