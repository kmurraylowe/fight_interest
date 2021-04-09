const deleteBtn = document.querySelectorAll('.fa-trash')
const upArrow = document.querySelectorAll('.fa-arrow-up')
const downArrow = document.querySelectorAll('.fa-arrow-down')



Array.from(deleteBtn).forEach((ele)=>{
    ele.addEventListener('click', deleteFight)
})

Array.from(upArrow).forEach((ele)=>{
    ele.addEventListener('click', forFight)
})

Array.from(downArrow).forEach((ele)=>{
    ele.addEventListener('click', againstFight)
})

async function deleteFight(){
    const fightId = this.parentNode.dataset.id
    try{
        const res = await fetch('deleteFight', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'fightId': fightId
               
            })
        })
        const data = await res.json()
        console.log(data)
        location.reload()
    }catch(err){console.error(err)}
}

async function forFight(){
    const fight1ToUp = this.parentNode.childNodes[1].innerText
    const fight2ToUp = this.parentNode.childNodes[5].innerText
    const forFight = Number(this.parentNode.childNodes[7].innerText)
    try{
        const res = await fetch('addOneFor', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'upFight1': fight1ToUp,
                'upFight2': fight2ToUp,
                'forFight': forFight
            })
        })
        const data = await res.json()
        console.log(data)
        location.reload()
    }catch(err){console.error(err)}
}

async function againstFight(){
    const fight1ToUp = this.parentNode.childNodes[1].innerText
    const fight2ToUp = this.parentNode.childNodes[5].innerText
    const againstFight = Number(this.parentNode.childNodes[11].innerText)
    try{
        const res = await fetch('addOneAgainst', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'upFight1': fight1ToUp,
                'upFight2': fight2ToUp,
                'againstFight': againstFight
            })
        })
        const data = await res.json()
        console.log(data)
        location.reload()
    }catch(err){console.error(err)}
}