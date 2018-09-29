 const newGame = document.querySelector('.btn-new')
 const kocokDadu = document.querySelector('.btn-putar')
 const stopDadu = document.querySelector('.btn-stop')
 const winner = document.querySelector('.winner')
 const juara = document.getElementById('.juara')

 let scoreSatu = document.getElementById('scoreSatu'),
     scoreDua = document.getElementById('scoreDua'),
     totalRonde = document.getElementById('totalRonde'),
     imgDice = document.querySelector('.dice'),
     scorePemain1 = 0,
     scorePemain2 = 0,
     countRonde1 = 0,
     countRonde2 = 0,
     hasil = ''
 newGame.addEventListener('click', function reset() {
     let userSatu = prompt("Silahkan isi nama Anda Pemain 1:", ""),
         userDua = prompt("Silahkan isi nama Anda Pemain 2:", ""),
         namaSatu = document.getElementById('namaSatu'),
         namaDua = document.getElementById('namaDua')

     if (!userSatu || !userDua) {
         alert('Maaf, Permainan tidak dapat dilanjutkan')
     } else {
         alert('Selamat bertanding ' + userSatu + ' VS ' + userDua)
         namaSatu.innerHTML = userSatu
         namaDua.innerHTML = userDua
         scoreSatu.innerHTML = 0
         scoreDua.innerHTML = 0
         totalRonde.innerHTML = 0
         scorePemain1 = 0
         scorePemain2 = 0
         countRonde1 = 0
         countRonde2 = 0
         kocokDadu.style.visibility = "visible"
         winner.style.visibility = "hidden"
     }
 })

 function kocok() {
     const imgDice = document.querySelector('.dice'),
         gambar = ['dice-1', 'dice-2', 'dice-3', 'dice-4', 'dice-5', 'dice-6']
     let i = 1
     const start = new Date().getTime()
     setInterval(function () {
         if (new Date().getTime() - start > 1000) {
             clearInterval
             return
         }
         imgDice.setAttribute('src', 'img/' + gambar[i++] + '.png')
         if (i === gambar.length) i = 0
     })
 }

 let activePlayer = 0

 function nextPlayer() {
     if (activePlayer === 0) {
         activePlayer = 1
     } else {
         activePlayer = 0
     }
     setTimeout(function () {
         document.querySelector('.player-1-panel').classList.toggle('active')
         document.querySelector('.player-2-panel').classList.toggle('active')
         kocokDadu.style.visibility = "visible"
         stopDadu.style.visibility = "hidden"
     }, 1500)
 }


 function addScore() {
     let poin = Math.floor(Math.random() * 6) + 1
     if (activePlayer === 0) {
         countRonde1 += 1
         setTimeout(function () {
             imgDice.setAttribute('src', 'img/' + 'dice-' + poin + '.png')
             scorePemain1 += poin
             scorePemain2 += 0
             scoreSatu.innerHTML = scorePemain1
             totalRonde.innerHTML = countRonde1
         }, 1000)
     } else {
         countRonde2 += 1
         setTimeout(function () {
             //  const imgDice = document.querySelector('.dice')
             imgDice.setAttribute('src', 'img/' + 'dice-' + poin + '.png')
             scorePemain1 += 0
             scorePemain2 += poin
             scoreDua.innerHTML = scorePemain2
             totalRonde.innerHTML = countRonde2
         }, 1000)
     }
 }

 let poin = Math.floor(Math.random() * 6) + 1
 kocokDadu.addEventListener('click', function () {
     kocokDadu.style.visibility = "hidden"
     stopDadu.style.visibility = "visible"
     stopDadu.style.backgroundColor = "white"
     stopDadu.style.color = "red"
     kocok()

 })


 stopDadu.addEventListener('click', function () {

     addScore()


     if (countRonde1 === 10 && countRonde2 === 10) {
         setTimeout(function () {
             kocokDadu.style.visibility = "hidden"
             stopDadu.style.visibility = "hidden"
             if (scorePemain1 > scorePemain2) {
                 hasil = namaSatu.innerHTML
             } else if (scorePemain1 < scorePemain2) {
                 hasil = namaDua.innerHTML
             }

             winner.innerHTML = "The Winner is: " + hasil
             winner.style.visibility = "visible"
         }, 2000)
     } else {
         nextPlayer()
     }
 })