window.addEventListener("DOMContentLoaded",()=>{
    const tiles=Array.from(document.querySelectorAll('.tile'))
    const display=document.querySelector('.display-player')
    const announcer=document.querySelector('.announcer')
    const resetButton=document.querySelector('.RESET')
    const winstates=[[0, 1, 2], [3, 4, 5], [6, 7, 8],[0, 3, 6], [1, 4, 7], [2, 5, 8],[0, 4, 8], [2, 4, 6]]
    
    let board=['','','','','','','','','']
    let currentplayer='X'
    let active=true

    const X_WON='PLAYERX_WON'
    const O_WON='PLAYERO_WON'
    const TIE='TIE'

    const handleResult=()=>{
        let roundwon=false
        for(let i=0;i<winstates.length;i++){
            const wincond=winstates[i]
            const a=board[wincond[0]]
            const b=board[wincond[1]]
            const c=board[wincond[2]]
            if(a===''||b===''||c===''){
                continue;
            }
            if(a===b && b===c){
                roundwon=true
                break;
            }
        }
        if(roundwon){
            active=false
            if(currentplayer==='X'){
                announce(X_WON)
            }
            else{
                announce(O_WON)
            }
            return
        }
        if(!board.includes('')){
            announce(TIE)
        }
    }


    const announce=(type)=>{
        switch(type){
            case X_WON:
                announcer.innerHTML='PLAYER <span class="playerX" style="margin:0 8px"> X </span> WINS'
                break
            case O_WON:
                announcer.innerHTML='PLAYER <span class="playerO" style="margin:0 8px">O</span> WINS'
                break
            case TIE:
                announcer.innerText='TIE !!! Compete Harder...!'
                break
        }
        announcer.classList.remove('hide')
    }

    const isValidAction=(tile)=>{
        if((tile.innerText==='X'||tile.innerText==='O')){
            console.log(tile);
            return false
        }
        return true
    }

    const updateBoard=(index)=>{
        board[index]=currentplayer
    }

    const changeplayer=()=>{
        display.classList.remove(`player${currentplayer}`)
        currentplayer=currentplayer==='X'?'O':'X'
        display.innerText=currentplayer;
        display.classList.add(`player${currentplayer}`)
    }

    const UserAction=(tile,index)=>{
        if(isValidAction(tile)&&active){
            tile.innerText=currentplayer
            tile.classList.add(`player${currentplayer}`)
            updateBoard(index)
            handleResult()
            changeplayer()
        }
    }

    tiles.forEach((tile,index)=>{
        tile.addEventListener('click',()=>UserAction(tile,index))
    })

    const resetBoard=()=>{
        board=['','','','','','','','','']
        active=true
        announcer.classList.add('hide')
        if(currentplayer==='O'){
            changeplayer()
        }
        tiles.forEach(tile=>{
            tile.innerText=''
            tile.classList.remove('playerX')
            tile.classList.remove('playerO')
        })
    }
    
    resetButton.addEventListener('click',resetBoard)
});