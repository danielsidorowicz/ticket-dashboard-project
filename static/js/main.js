let x_axis = 0
let y_axis = 0
let setScroll = 0
let deletedNum = 0
let deletedKeys = JSON.parse(localStorage.getItem('Deleted Tickets')) || []
document.getElementById('slider-button').addEventListener('click', restoreKeys)

let oldContext = {
    "object": [
        {
            "key": "Placeholder",
            "type": "Epic",
            "tI": "https://jiraprod.DOMAINNAME.com/secure/viewavatar?size=xsmall&avatarId=14149&avatarType=issuetype",
            "status": "Open",
            "resolution": "Unresolved",
            "created": "2022-11-29T12:53:06.000+0100",
            "updated": -1,
            "assignee": "Unassigned"
        }
    ]
}
let changeTitle = false
let updatedKeys = []

getScroll = () => {
    let position = document.getElementsByTagName('body')
    position.innerHTML = ""
    if (window.pageYOffset != undefined) {
        setScroll = pageYOffset
    } else {
        let doc = document,
            ele = doc.documentElement,
            b = doc.body;
        x_axis = ele.scrollLeft || b.scrollLeft || 0;
        y_axis = ele.scrollTop || b.scrollTop || 0;
        setScroll = y_axis
    }
}

function deleteKey() {
    console.log(this);
    if (!deletedKeys.includes(this.value)) {
        deletedKeys.push(this.value)
    }
    localStorage.setItem('Deleted Tickets', JSON.stringify(deletedKeys))
    deletedNum++
    reloadTable()
}

function restoreKeys() {
    deletedNum = 0
    deletedKeys = []
    localStorage.clear();
    reloadTable()
}

document.querySelector('.company-logo').addEventListener("click", () => {
    location.reload()
})

for (let i = 0; i < Object.keys(oldContext.object[0]).length; i++) {
    if (Object.keys(oldContext.object[0])[i] === 'tI' || Object.keys(oldContext.object[0])[i] === 'created' || Object.keys(oldContext.object[0])[i] === 'updated') {

    } else {
        const selectElement = document.querySelector('.filter-select')
        let optionElement = document.createElement('option')
        optionElement.append(Object.keys(oldContext.object[0])[i])
        optionElement.value = Object.keys(oldContext.object[0])[i]
        selectElement.append(optionElement)
    }
}




document.querySelector('.filter-submit').addEventListener("click", () => {
    const selectValue = document.querySelector('.filter-select').value
    const searchBarValue = document.querySelector('.js-input').value.trim()
    console.log(selectValue);
    console.log(searchBarValue);
    const tableElement = document.querySelector('.table-in')
    let trHead = document.createElement('tr')
    const tableFilter = document.createElement('table')
    for (let i = 0; i < Object.keys(oldContext.object[0]).length; i++) {
        if (selectValue === 'all') {

            tableElement.style.removeProperty('display')
            try { document.querySelector('.table-filter').remove() }
            catch { }

        } else {
            if (document.querySelector('.table-filter')) {

            } else {
                tableElement.style.display = "none"
                const tableDivElement = document.querySelector('.tableDiv')
                let thHead
                Object.keys(oldContext.object[0]).forEach((element) => {
                    thHead = document.createElement('th')
                    if (element === 'tI') {
                        thHead.append('Icon')
                    } else {
                        thHead.append(element)

                    }
                    trHead.append(thHead)
                })
                thHead = document.createElement('th')
                thHead.append('Delete')
                trHead.append(thHead)
                tableFilter.append(trHead)
                tableDivElement.append(tableFilter)
                tableFilter.classList.add('table-filter')
                for (let j = 0; Object.keys(oldContext.object[0]).length; j++) {
                    function filterContentAdd() {
                        let trBody = document.createElement('tr')
                        let tdButton = document.createElement('button')
                        tdButton.classList.add('key-button')
                        tdButton.type = 'button'
                        tdButton.addEventListener("click", () => {
                            location.href = `https://jiraprod.DOMAINNAME.com/projects/issuename/issues/${searchBarValue}?filter=allopenissues`
                        })

                        Object.values(oldContext.object[j]).forEach((element) => {
                            let tdBody = document.createElement('td')
                            if (element === oldContext.object[j].key) {
                                tdButton.append(element)
                                tdBody.append(tdButton)
                            } else if (element === oldContext.object[j].tI) {
                                let img = document.createElement('img')
                                img.src = element
                                img.height = 25
                                img.width = 25
                                tdBody.style.padding = '0px'
                                tdBody.append(img)
                            } else if (element === oldContext.object[j].status) {
                                if (oldContext.object[j].status === 'In Progress') {
                                    let paragraph = document.createElement('p')
                                    let div = document.createElement('div')
                                    tdBody.classList.add('td-flex')
                                    paragraph.append(oldContext.object[i][Object.keys(oldContext.object[i])[j]])
                                    div.append(paragraph)
                                    tdBody.append(div)
                                } else if (oldContext.object[j].status === 'Done') {
                                    let icon = document.createElement('img')
                                    let paragraph = document.createElement('p')
                                    let div = document.createElement('div')
                                    icon.src = '/static/gfx/img/checked.png'
                                    icon.classList.add('icon')
                                    tdBody.classList.add('td-flex')
                                    paragraph.append(icon)
                                    div.append(paragraph)
                                    tdBody.append(div)
                                }
                                else if (oldContext.object[j].status === 'Rejected') {
                                    let icon = document.createElement('img')
                                    let paragraph = document.createElement('p')
                                    let div = document.createElement('div')
                                    icon.src = '/static/gfx/img/decline.png'
                                    icon.height = '30'
                                    icon.width = '30'
                                    icon.style.marginLeft = '2px'
                                    tdBody.classList.add('td-flex')
                                    paragraph.append(icon)
                                    div.append(paragraph)
                                    tdBody.append(div)
                                }
                                else {
                                    tdBody.append(element)
                                }

                            } else if (element === oldContext.object[j].created) {
                                let d = new Date(element)
                                let year = d.getFullYear()
                                let month = d.getMonth() + 1
                                let day = d.getDate()
                                let withSlashes = [day, month, year].join('.')
                                tdBody.append(withSlashes)
                            } else if (element === oldContext.object[j].updated) {
                                let seconds = element
                                let minutes = Math.round(element / 60)
                                let hours = Math.round(element / (60 * 60))
                                let days = Math.round(element / (60 * 60 * 24))
                                let week = Math.round(element / (60 * 60 * 24 * 7))
                                let month = Math.round(element / (60 * 60 * 24 * 31))
                                let year = Math.round(element / (60 * 60 * 24 * 31 * 12))
                                if (seconds < 60) {
                                    let paragraph = document.createElement('p')
                                    paragraph.append(`${seconds.toFixed(0)} seconds ago`)
                                    tdBody.append(paragraph)
                                } else if (minutes < 60) {
                                    let paragraph = document.createElement('p')
                                    paragraph.append(`${minutes.toFixed(0)} minutes ago`)
                                    tdBody.append(paragraph)


                                } else if (hours == 1) {
                                    let paragraph = document.createElement('p')
                                    paragraph.append(`${hours.toFixed(0)} hour ago`)
                                    tdBody.append(paragraph)
                                } else if (hours > 1 && hours < 24) {
                                    let paragraph = document.createElement('p')
                                    paragraph.append(`${hours.toFixed(0)} hours ago`)
                                    tdBody.append(paragraph)

                                } else if (days == 1) {
                                    let paragraph = document.createElement('p')
                                    paragraph.append(`${days.toFixed(0)} day ago`)
                                    tdBody.append(paragraph)
                                } else if (days > 1 && days < 7) {
                                    let paragraph = document.createElement('p')
                                    paragraph.append(`${days.toFixed(0)} days ago`)
                                    tdBody.append(paragraph)
                                } else if (week == 1) {
                                    let paragraph = document.createElement('p')
                                    paragraph.append(`${week.toFixed(0)} week ago`)
                                    tdBody.append(paragraph)
                                } else if (week >= 1 && week <= 4) {
                                    let paragraph = document.createElement('p')
                                    paragraph.append(`${week.toFixed(0)} weeks ago`)
                                    tdBody.append(paragraph)
                                } else if (month == 1) {
                                    let paragraph = document.createElement('p')
                                    paragraph.append(`${month.toFixed(0)} month ago`)
                                    tdBody.append(paragraph)
                                } else if (month > 1 && month < 12) {
                                    let paragraph = document.createElement('p')
                                    paragraph.append(`${month.toFixed(0)} months ago`)
                                    tdBody.append(paragraph)
                                } else if (year >= 1 && year < 2) {
                                    let paragraph = document.createElement('p')
                                    paragraph.append(`${year.toFixed(0)} year ago`)
                                    tdBody.append(paragraph)
                                } else if (year >= 2) {
                                    let paragraph = document.createElement('p')
                                    paragraph.append(`${year.toFixed(0)} years ago`)
                                    tdBody.append(paragraph)

                                }

                            }
                            else {
                                tdBody.append(element)
                            }

                            trBody.append(tdBody)
                        })
                        let tdBody = document.createElement('td')
                        let deleteButton = document.createElement('button')
                        deleteButton.classList.add('delete-button')
                        deleteButton.innerText = 'DEL'
                        deleteButton.setAttribute('name', 'key');
                        deleteButton.setAttribute('value', oldContext.object[j].key);
                        deleteButton.addEventListener('click', deleteKey)
                        tdBody.append(deleteButton)
                        trBody.append(tdBody)
                        tableFilter.append(trBody)
                    }
                    if (selectValue === 'key' && searchBarValue === oldContext.object[j].key) {
                        filterContentAdd()
                    }
                    else if (selectValue === 'type' && searchBarValue === oldContext.object[j].type) {
                        filterContentAdd()
                    }
                    else if (selectValue === 'status' && searchBarValue === oldContext.object[j].status) {
                        filterContentAdd()
                    }
                    else if (selectValue === 'resolution' && searchBarValue === oldContext.object[j].resolution) {
                        filterContentAdd()
                    }
                    else if (selectValue === 'assignee' && searchBarValue === oldContext.object[j].assignee) {
                        filterContentAdd()
                    }


                }
            }


        }


    }
}

)

function reloadTable() {
    getScroll()

    fetch('/static/json/context.json')
        .then((response) => response.json())
        .then((json) => {


            let context = json
            let newTime = 0
            let oldTime = 0

            for (let i = 0; i < deletedKeys.length; i++) {
                context.object.find((value) => {
                    if (value.key === deletedKeys[i]) {
                        newTime = value.updated
                    }
                })
                oldContext.object.find((value) => {
                    if (value.key === deletedKeys[i]) {
                        oldTime = value.updated
                    }
                })

                if (newTime < oldTime) {
                    deletedKeys.splice(i, 1)
                }
            }


            if (context != oldContext) {
                document.querySelector('.table-in').innerHTML = ''
                let trHead = document.createElement('tr')
                const tableElement = document.querySelector('.table-in')




                for (let i = 0; i < Object.keys(context.object[0]).length; i++) {
                    let thHead = document.createElement('th')
                    if (Object.keys(context.object[0])[i] === 'tI') {
                        thHead.style.padding = '0px'
                        thHead.append("Icon")
                    } else {
                        thHead.append(Object.keys(context.object[0])[i])
                    }
                    trHead.append(thHead)
                }
                let thHead = document.createElement('th')
                thHead.append('Delete')
                trHead.append(thHead)
                tableElement.append(trHead)

                for (let i = 0; i < context.object.length; i++) {
                    console.log(deletedKeys);
                    if (!deletedKeys.includes(context.object[i].key)) {
                        let trBody = document.createElement('tr')
                        trBody.id = context.object[i][Object.keys(context.object[i])[0]]
                        console.log(context.object[i][Object.keys(context.object[i])[0]]);
                        oldContext.object.find((value) => {
                            if (value.key == context.object[i][Object.keys(context.object[i])[0]]) {
                                if (value.updated > context.object[i][Object.keys(context.object[i])[8]] || updatedKeys.includes(context.object[i][Object.keys(context.object[i])[0]])) {
                                    trBody.classList.add('highlight-new')
                                    if (!updatedKeys.includes(context.object[i][Object.keys(context.object[i])[0]])) {
                                        updatedKeys.push(context.object[i][Object.keys(context.object[i])[0]])
                                    }
                                }
                            }
                        })

                        for (let j = 0; j < Object.keys(context.object[i]).length; j++) {
                            let tdBody = document.createElement('td')
                            let tdButton = document.createElement('button')
                            if (Object.keys(context.object[i])[j] === 'tI') {
                                let img = document.createElement('img')
                                img.src = context.object[i][Object.keys(context.object[i])[j]]
                                img.height = 25
                                img.width = 25
                                tdBody.style.padding = '0px'
                                tdBody.style.width = 'fit-content'
                                tdBody.append(img)
                            } else if (Object.keys(context.object[i])[j] === 'updated') {
                                let seconds = context.object[i].updated
                                let minutes = Math.round(context.object[i].updated / 60)
                                let hours = Math.round(context.object[i].updated / (60 * 60))
                                let days = Math.round(context.object[i].updated / (60 * 60 * 24))
                                let week = Math.round(context.object[i].updated / (60 * 60 * 24 * 7))
                                let month = Math.round(context.object[i].updated / (60 * 60 * 24 * 31))
                                let year = Math.round(context.object[i].updated / (60 * 60 * 24 * 31 * 12))
                                if (seconds < 60) {
                                    let paragraph = document.createElement('p')
                                    paragraph.append(`${seconds.toFixed(0)} seconds ago`)
                                    tdBody.append(paragraph)
                                } else if (minutes < 60) {
                                    let paragraph = document.createElement('p')
                                    paragraph.append(`${minutes.toFixed(0)} minutes ago`)
                                    tdBody.append(paragraph)


                                } else if (hours == 1) {
                                    let paragraph = document.createElement('p')
                                    paragraph.append(`${hours.toFixed(0)} hour ago`)
                                    tdBody.append(paragraph)
                                } else if (hours > 1 && hours < 24) {
                                    let paragraph = document.createElement('p')
                                    paragraph.append(`${hours.toFixed(0)} hours ago`)
                                    tdBody.append(paragraph)

                                } else if (days == 1) {
                                    let paragraph = document.createElement('p')
                                    paragraph.append(`${days.toFixed(0)} day ago`)
                                    tdBody.append(paragraph)
                                } else if (days > 1 && days < 7) {
                                    let paragraph = document.createElement('p')
                                    paragraph.append(`${days.toFixed(0)} days ago`)
                                    tdBody.append(paragraph)
                                } else if (week == 1) {
                                    let paragraph = document.createElement('p')
                                    paragraph.append(`${week.toFixed(0)} week ago`)
                                    tdBody.append(paragraph)
                                } else if (week >= 1 && week <= 4) {
                                    let paragraph = document.createElement('p')
                                    paragraph.append(`${week.toFixed(0)} weeks ago`)
                                    tdBody.append(paragraph)
                                } else if (month == 1) {
                                    let paragraph = document.createElement('p')
                                    paragraph.append(`${month.toFixed(0)} month ago`)
                                    tdBody.append(paragraph)
                                } else if (month > 1 && month < 12) {
                                    let paragraph = document.createElement('p')
                                    paragraph.append(`${month.toFixed(0)} months ago`)
                                    tdBody.append(paragraph)
                                } else if (year >= 1 && year < 2) {
                                    let paragraph = document.createElement('p')
                                    paragraph.append(`${year.toFixed(0)} year ago`)
                                    tdBody.append(paragraph)
                                } else if (year >= 2) {
                                    let paragraph = document.createElement('p')
                                    paragraph.append(`${year.toFixed(0)} years ago`)
                                    tdBody.append(paragraph)
                                }
                                else {
                                    tdBody.append(context.object[i][Object.keys(context.object[i])[j]])
                                }
                            }
                            else if (Object.keys(context.object[i])[j] === 'created') { 
                                let d = new Date(context.object[i][Object.keys(context.object[i])[j]])
                                let year = d.getFullYear()
                                let month = d.getMonth() + 1
                                let day = d.getDate()
                                let withSlashes = [day, month, year].join('.')
                                tdBody.append(withSlashes)
                            } else if (Object.keys(context.object[i])[j] === 'status') {
                                if (context.object[i].status === 'In Progress') {
                                    let paragraph = document.createElement('p')
                                    let div = document.createElement('div')
                                    tdBody.classList.add('td-flex')
                                    paragraph.append(context.object[i][Object.keys(context.object[i])[j]])
                                    div.append(paragraph)
                                    tdBody.append(div)
                                } else if (context.object[i].status === 'Done') {
                                    let icon = document.createElement('img')
                                    let paragraph = document.createElement('p')
                                    let div = document.createElement('div')
                                    icon.src = '/static/gfx/img/checked.png'
                                    icon.classList.add('icon')
                                    tdBody.classList.add('td-flex')
                                    paragraph.append(icon)
                                    div.append(paragraph)
                                    tdBody.append(div)
                                }
                                else if (context.object[i].status === 'Rejected') {
                                    let icon = document.createElement('img')
                                    let paragraph = document.createElement('p')
                                    let div = document.createElement('div')
                                    icon.src = '/static/gfx/img/decline.png'
                                    icon.height = '30'
                                    icon.width = '30'
                                    icon.style.marginLeft = '2px'
                                    tdBody.classList.add('td-flex')
                                    paragraph.append(icon)
                                    div.append(paragraph)
                                    tdBody.append(div)
                                }
                                else if (context.object[i].status === 'Open') {
                                    let paragraph = document.createElement('p')
                                    let div = document.createElement('div')
                                    tdBody.classList.add('td-flex')
                                    paragraph.append(context.object[i][Object.keys(context.object[i])[j]])
                                    div.append(paragraph)
                                    tdBody.append(div)
                                }
                                else if (context.object[i].status === 'Submitted') {
                                    let paragraph = document.createElement('p')
                                    let div = document.createElement('div')
                                    tdBody.classList.add('td-flex')
                                    paragraph.append(context.object[i][Object.keys(context.object[i])[j]])
                                    div.append(paragraph)
                                    tdBody.append(div)
                                } else {
                                    tdBody.append(context.object[i][Object.keys(context.object[i])[j]])
                                }


                            }
                            else if (Object.keys(context.object[i])[j] === 'key') {

                                tdButton.classList.add('key-button')
                                tdButton.type = 'button'
                                tdButton.addEventListener("click", () => {
                                    location.href = `https://jiraprod.DOMAINNAME.com/projects/issuename/issues/${context.object[i][Object.keys(context.object[i])[j]]}?filter=allopenissues`
                                })
                                tdButton.append(context.object[i][Object.keys(context.object[i])[j]])
                                tdBody.append(tdButton)
                            } else {
                                tdBody.append(context.object[i][Object.keys(context.object[i])[j]])
                            }
                            trBody.append(tdBody)
                        }
                        let tdBody = document.createElement('td')
                        let deleteButton = document.createElement('button')
                        deleteButton.classList.add('delete-button')
                        deleteButton.innerText = 'DEL'
                        deleteButton.setAttribute('name', 'key');
                        deleteButton.setAttribute('value', context.object[i][Object.keys(context.object[i])[0]]);
                        deleteButton.addEventListener('click', deleteKey)
                        tdBody.append(deleteButton)
                        trBody.append(tdBody)
                        tableElement.append(trBody)
                    }




                    window.scrollTo(0, setScroll)
                }
            }
            console.log(oldContext.object[0].updated);
            console.log(context.object[0].updated);
            if (oldContext.object[0].updated > context.object[0].updated) {

                setInterval(() => {
                    if (document.title === 'Ticket Dashboard') {
                        document.title = 'New Content!'
                    } else {
                        document.title = 'Ticket Dashboard'
                    }
                }, 15000)
            }
            const ticketCount = document.querySelector('.ticket-count')
            ticketCount.innerHTML = 'Tickets: '
            ticketCount.append(context.object.length - deletedKeys.length)
            oldContext = context


        }).catch(err => reloadTable())


}

reloadTable()
setInterval(() => reloadTable(), 10000)
