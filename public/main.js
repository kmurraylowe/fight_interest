const deleteBtn = document.querySelectorAll('.fa-trash')
const upArrow = document.querySelectorAll('.fa-arrow-up')
const downArrow = document.querySelectorAll('.fa-arrow-down')



Array.from(deleteBtn).forEach((ele)=>{
    ele.addEventListener('click', deleteFight)
})

Array.from(upArrow).forEach((ele)=>{
    ele.addEventListener('click', addOneFor)
})

Array.from(downArrow).forEach((ele)=>{
    ele.addEventListener('click', addOneAgainst)
})

async function deleteFight(){
    const fightId = this.parentNode.dataset.id
    
    try{
        const res = await fetch('fights/deleteFight', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'fightId': fightId
               
            })
        })
        const data = await res.json()
        console.log(fightId)
        console.log(data)
        location.reload()
    }catch(err){console.error(err)}
}

async function addOneFor(){
    const fightId = this.parentNode.dataset.id
    const forFight = Number(this.parentNode.childNodes[7].innerText)
    try{
        const res = await fetch('fights/addOneFor', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'fightId': fightId,
                'forFight': forFight
            })
        })
        const data = await res.json()
        console.log(fightId)
        console.log(data)
        location.reload()
    }catch(err){console.error(err)}
}

async function addOneAgainst(){
    const fightId = this.parentNode.dataset.id
    const againstFight = Number(this.parentNode.childNodes[11].innerText)
    try{
        const res = await fetch('fights/addOneAgainst', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'fightId': fightId,
                'againstFight': againstFight
            })
        })
        const data = await res.json()
        console.log(fightId)
        console.log(data)
        location.reload()
    }catch(err){console.error(err)}
}