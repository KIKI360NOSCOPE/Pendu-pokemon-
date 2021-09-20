const myWords = [
    'Baccalaureat',
    'Abracadabra',
    'Francophile',
    'Pandemonium',
    'Chlorophylle',
    'Metallurgie',
    'Metamorphose',
    'Montgolfiere',
    'Kaleidoscope',
    'Conquistador',
    'Conspirateur',
    'Rhododendron',
    'Qualification',
    'Protozoaire',
    'Quadrilatere',
    'Zygomatique',
    'Sorcellerie',
    'Belligerant'
]

/***********************************************************************************/

const letters = document.querySelectorAll('button[data-btn="ltr"]')
var HP
var wordGuessedArray = []
var hiddenWordArray = []
var hiddenWord
var wordGuessed

const pokeHP = document.querySelectorAll('img[data-pokeHP="HP"]')
console.log(pokeHP)



/************* AUDIO *************/
var battle = new Audio('./random/TrainerBattle.mp3')
battle.loop = true

var ballHit1 = new Audio('./random/SoundEffects/SFX_CYMBAL_1.wav')
var ballHit3 = new Audio('./random/SoundEffects/SFX_CYMBAL_3.wav')

var cry = new Audio('./random/SoundEffects/SFX_CRY_04.wav')


/************* generation du mot *************/

function start() {
    battle.play()
    
    wordGuessedArray = []
    hiddenWordArray = []
    HP = 8
    letters.forEach(btn=>{
        btn.disabled = false
    })

    console.log('départ : ' + HP)
    randomNumber = Math.floor(Math.random() * myWords.length)   

    wordGuessed = myWords[randomNumber].toUpperCase() 
    console.log(wordGuessed + ' ' + wordGuessed.length)    // on stock dans wordGuessed le mot dans le tableau qui a en index randomNumber et on le "Majuscule"
    wordGuessedArray = Array.from(wordGuessed)    // on créer une list des lettres qui compose le mot

    for (i = 0; i < wordGuessedArray.length; i++){    // on créer une liste de la longueur du mot, composé d'*
        hiddenWordArray.push('?')        
    }

    hiddenWord = hiddenWordArray.join('')     // on créer un string des * qui compose la list


    /* on append le mot dans l'html' */
    wordReveal.innerHTML = hiddenWord
}

play.addEventListener('click', () => start())




/************* dmg hp *************/

function damageHP(hp) {
    if (hp >= 1) {
        console.log('before '+hp)
        hp--
        console.log('after '+hp)            
    }
    return hp
}





/************* Verif lettre *************/

letters.forEach( btn => {
    btn.addEventListener('click', function (){      // a chaque fois que l'on click sur une lettre >>>
        btn.disabled = true
        console.log(HP)
        console.log(wordGuessedArray)
        console.log(this.dataset.letter)

        throwAnimate.classList.add('throwAnim')
        delayThrow = 1600
        setTimeout(function() {
            throwAnimate.classList.remove('throwAnim')
        }, delayThrow)


        /***********************ANIMATION***********************/
        delayAsh2 = 300
        setTimeout(function() {
            ash.src = "./random/ash2.png"
        }, delayAsh2)
        
        delayAsh3 = 600
        setTimeout(function() {
            ash.src = "./random/ash3.png"
        }, delayAsh3)

        delayAsh4 = 700
        setTimeout(function() {
            ash.src = "./random/ash4.png"
        }, delayAsh4)

        delayAsh5 = 800
        setTimeout(function() {
            ash.src = "./random/ash5.png"
        }, delayAsh5)

        delayAsh1 = 1200
        setTimeout(function() {
            ash.src = "./random/ash1.png"
        }, delayAsh1)
        /**********************************************/

        var count = 0
        for(i=0; i < wordGuessedArray.length; i++){      // >>> on boucle dans le mot version list et on check si la lettre y est
            console.log('boucle n° '+ (parseFloat(i)+parseFloat(1)))
            if(this.dataset.letter == wordGuessedArray[i]){     // si oui, on remplace l'* qui est au même endroit que la lettre PAR LA LETTRE
                hiddenWordArray[i] = wordGuessedArray[i]

                /***********************ANIMATION***********************/
                pokeDmgDelay = 1600

                pokeDmgDelay1 = 1680
                pokeDmgDelay2 = 1760

                pokeDmgDelay3 = 1840

                pokeDmgDelay4 = 1920
                pokeDmgDelay5 = 2000

                pokeDmgDelay6 = 2080
                pokeDmgDelay7 = 2160

                setTimeout(function() {
                    pokemon.src = "./random/machopeur3.png"
                }, pokeDmgDelay)

                setTimeout(function() {
                    pokemon.classList.add("pokeOpacity")
                }, pokeDmgDelay1)
                setTimeout(function() {
                    pokemon.classList.remove("pokeOpacity")
                }, pokeDmgDelay2)

                setTimeout(function() {
                    pokemon.src = "./random/machopeur1.png"
                }, pokeDmgDelay3)

                setTimeout(function() {
                    pokemon.classList.add("pokeOpacity")
                }, pokeDmgDelay4)
                setTimeout(function() {
                    pokemon.classList.remove("pokeOpacity")
                }, pokeDmgDelay5)

                setTimeout(function() {
                    pokemon.classList.add("pokeOpacity")
                }, pokeDmgDelay6)
                setTimeout(function() {
                    pokemon.classList.remove("pokeOpacity")
                }, pokeDmgDelay7)

                /*AUDIO*/
                setTimeout(function() {
                    ballHit3.play()
                }, pokeDmgDelay)
                /**********************************************/

            } else{
                count++
            }
        }
        if(count == wordGuessedArray.length){

            /***********************ANIMATION***********************/
            pokeDmgDelay = 1600
            pojeCryDelay = 1680
            pokeDmgDelay1 = 1900

            setTimeout(function() {
                pokemon.src = "./random/machopeur2.png"
            }, pokeDmgDelay)
            setTimeout(function() {
                pokemon.src = "./random/machopeur1.png"
            }, pokeDmgDelay1)

            /*AUDIO*/
            setTimeout(function() {
                ballHit1.play()
            }, pokeDmgDelay)
            setTimeout(function() {
                cry.play()
            }, pojeCryDelay)
            /**********************************************/


            HP = damageHP(HP)

            console.log(HP)
            if(HP == 0){
                alert('Vous avez '+HP+' hp vous avez donc perdu !')
                start()
                console.log(HP)
            }
        }

        
        hiddenWord = hiddenWordArray.join('')       // on re transforme le mot caché version liste en string
        pokeDmgDelay = 1600
        setTimeout(function() {
            wordReveal.innerHTML = hiddenWord       // et on l'append dans l'html
        }, pokeDmgDelay)

        if(hiddenWord == wordGuessed){
            alert('Vous avez trouvez le mot !')
            start()
        }


        // for(i=0; i < wordGuessedArray.length; i++){
        //     if(this.dataset.letter != wordGuessedArray[i]){
        //         console.log('non')
        //     } else{
        //         console.log('oui')
        //     }
        // }

        console.log('__________________________________')
    })
})
