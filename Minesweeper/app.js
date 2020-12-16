
const freeSpots = document.querySelector('h2')
let performanceTest = 0
const sizeButton = Array.from(document.querySelectorAll('.resize'))
const main = document.querySelector('main')
const title = document.querySelector('span h1')

const cellTest = Array.from(document.querySelectorAll('.cell'))
const menu = document.querySelector('span')
let grid = Array.from(document.querySelectorAll('.cell'))
const reset = document.querySelector('.reset')
const clock = document.querySelector('h4')
const timenow = clock.innerHTML.split(':')
const score = document.querySelector('.score')
const time = {
  minute: Number(timenow[0]),
  second: Number(timenow[1])
}
let lastscore = localStorage.getItem("lastscore")
if (Boolean(lastscore)) {
  score.innerHTML = lastscore
} else {
  score.innerHTML = 'Time: 00:00'
}





let victoryCounter = 0


const gridt = document.querySelector('.grid')
// Specifying the width of the grid.
let widthG = 10

// Keep track of my cells
let cells = []
let pol = [[]]
function populateAr(gridSize) {
  if (pol.length < gridSize) {
    const toAddToMain = gridSize - pol.length
    const toAddToSub = gridSize - pol[0].length - 1
    pol = popIndex(pol, 0)
    let ar = [0]
    let item = 0
    for (let i = toAddToSub; i > 0; i--) {
      ar.push(item)
    }
    for (let i = toAddToMain; i >= 0; i--) {
      pol.push(ar)
    }
    console.log(toAddToMain)
    console.log(pol)
  }
}



let timer = 0


sizeButton.forEach(element => {
  element.addEventListener('click', () => {
    if (clock.innerHTML !== 'Time: 00:00') {
      clock.innerHTML = 'Time: 00:00'

    }
    if (timer === 0) {
      timer = setInterval(() => {
        console.log(time)
        time.second += 1
        if (time.second > 59) {
          time.minute += 1
          time.second = 0
        }

        if ((time.second < 10) && (time.minute < 10)) {
          clock.innerHTML = 'Time: ' + '0' + time.minute.toString() + ':' + '0' + time.second.toString()
        }
        if ((time.minute < 10) && (time.second > 9)) {
          clock.innerHTML = 'Time: ' + '0' + time.minute.toString() + ':' + time.second.toString()
        }
        if ((time.minute > 9) && (time.second < 10)) {
          clock.innerHTML = 'Time: ' + time.minute.toString() + ':' + '0' + time.second.toString()
        }
        if ((time.minute > 9) && (time.second > 9)) {
          clock.innerHTML = 'Time: ' + time.minute.toString() + ':' + time.second.toString()
        }

      }, 1000);
    }
    console.log(element.innerHTML)
    if (element.innerHTML === 'BIG') {
      start(20)
      main.style.display = 'flex'
      cellTest.forEach(indivCell => {
        indivCell.style.width = '5%'
        indivCell.style.height = '5%'
        main.style.display = 'flex'


        console.log('check')
      })

    }
    if (element.innerHTML === 'medium') {
      start(10)
      main.style.display = 'flex'
      cellTest.forEach(indivCell => {
        indivCell.style.width = '10%'
        indivCell.style.height = '10%'
        main.style.display = 'flex'
        console.log('check')



      })

    }

    if (element.innerHTML === 'small') {
      start(5)
      main.style.display = 'flex'
      cellTest.forEach(indivCell => {
        indivCell.style.width = '20%'
        indivCell.style.height = '20%'




        console.log('check')
      })

    }
  })
})
let totalFree = 0
function start(width) {
  menu.style.display = 'none'
  main.style.display = 'flex'
  totalFree = 0
  widthG = width



  populateAr(width)
  for (let i = 0; i < width ** 2; i++) {

    // Create an element
    const div = document.createElement('h1')
    div.classList.add('cell')
    div.classList.add('hidden')
    gridt.appendChild(div)
    // Push the div to my array of cells
    cells.push(div)
  }


  const test = pol.map(item => {
    item = item.map(() => {
      randomInRange(0, 3)
      const isMine = randomInRange(1, 5)
      if (isMine === 1) {
        totalFree += 1
      }
      return isMine

    })
    return item
  })

  grid = Array.from(document.querySelectorAll('.cell'))

  if (width === 5) {
    grid.forEach(indivCell => {
      indivCell.style.width = '20%'
      indivCell.style.height = '20%'

    })

  }
  if (width === 20) {
    grid.forEach(indivCell => {
      indivCell.style.width = '5%'
      indivCell.style.height = '5%'

    })

  }

  console.log(pol)
  freeSpots.innerHTML = 'Number of Mines:' + totalFree
  pol = test
  grid.forEach(cell => {

    // cell.innerHTML = '?'
    cell.classList.add('unselectable')

    cell.addEventListener('mouseover', () => {

      cell.classList.add('shine')
    })
    cell.addEventListener('mouseout', () => {
      cell.classList.remove('shine')

    })

    cell.addEventListener('click', (e) => {


      if (e.shiftKey) {

        if (cell.classList.contains('flag') === false) {
          cell.classList.add('flag')
        } else {
          cell.classList.remove('flag')
        }

      } else {

        if (cell.classList.contains('discovered') === false) {
          cell.innerHTML = findAround(grid.indexOf(cell))
          cell.classList.replace('hidden', 'discovered')
          if (cell.innerHTML === 'false') {
            console.log('rip')
            cell.innerHTML = 'X'
            cell.classList.add('mine')
            gridt.textContent = ''
            title.innerHTML = "You Lost!"
            restart()
          } else {
            victoryCounter += 1
            checkWin()
          }

          if (cell.innerHTML === '0') {
            console.log('Empty cell!')
            cell.classList.add('empty')
            cell.classList.replace('hidden', 'discovered')
            console.log(discoverEmpty())
            const near = discoverElem(grid.indexOf(cell))
            console.log("NEAR", near)
            console.log(cell)
          }
        }
        checkWin()
      }
    })

  }

  )

  document.addEventListener('keypress', (event) => {

    const key = event.key
    if (key === 'w') {
      console.log(performanceTest)

      // grid.forEach(cell => {

      //   if (cell.innerHTML === '0') {
      //     const near = discoverElem(grid.indexOf(cell))

      //     grid.forEach(element => {
      //       if (near.includes(grid.indexOf(element)) === true) {
      //         element.innerHTML = findAround(grid.indexOf(element))
      //         console.log('IT WORKS!!')
      //       }
      //     })
      //   }
      // });
    }
    if (key === 'e') {
      console.log('hi')
    }
  }
  )

  function findAround(target) {
    let counter = -1
    let mineCount = 0
    let safe = true
    for (let c = 0; c < pol.length; c++) {

      for (let i = 0; i < pol[c].length; i++) {
        counter += 1
        performanceTest += 1
        if (counter === target) {
          if (pol[c][i] === 1) {
            console.log('Thats a mine!')
            safe = false
          }
          //Checks cell above target
          if (pol[c - 1] && pol[c - 1][i]) {
            // console.log('Above: ', pol[c - 1][i])
            if (pol[c - 1][i] === 1) {
              mineCount += 1
            }
          }
          //Checks cell above to the right
          if (pol[c - 1] && pol[c - 1][i + 1]) {
            // console.log('Above-Right: ', pol[c - 1][i + 1])
            if (pol[c - 1][i + 1] === 1) {
              mineCount += 1
            }
          }
          //Checks to the right of target
          if (Boolean(pol[c][i + 1]) === true) {
            if (pol[c][i + 1] === 1) {
              mineCount += 1
            }
          }
          //Checks under to the right
          if (pol[c + 1] && pol[c + 1][i + 1]) {
            // console.log('Below-Right: ', pol[c + 1][i + 1])
            if (pol[c + 1][i + 1] === 1) {
              mineCount += 1
            }
          }
          //Checks cell under target
          if (pol[c + 1] && pol[c + 1][i]) {
            // console.log('Below: ', pol[c + 1][i])
            if (pol[c + 1][i] === 1) {
              mineCount += 1
            }
          }
          //Checks under to the left
          if (pol[c + 1] && pol[c + 1][i - 1]) {
            // console.log('Below-Left: ', pol[c + 1][i - 1])
            if (pol[c + 1][i - 1] === 1) {
              mineCount += 1
            }
          }
          //Checks to the left of target
          if (Boolean(pol[c][i - 1]) === true) {
            // console.log('Left: ', pol[c][i - 1])
            if (pol[c][i - 1] === 1) {
              mineCount += 1
            }
          }
          //Checks above to the left
          if (pol[c - 1] && pol[c - 1][i - 1]) {
            // console.log('Above-Left: ', pol[c - 1][i - 1])
            if (pol[c - 1][i - 1] === 1) {
              mineCount += 1
            }
          }
        }
      }
    }
    if (safe === false) {
      return safe
    } else {
      return mineCount
    }

  }

  function randomInRange(min, max) {
    //Returns a random number in range
    return Math.round(Math.random() * (max - min) + min)
  }

  function discoverEmpty() {


    grid.forEach(element => {
      const around = findAround(grid.indexOf(element))
      if (around === 0) {


        element.innerHTML = around
        element.classList.add('empty')
        element.classList.replace('hidden', 'discovered')
        victoryCounter += 1
        checkWin()
        console.log("VICTORY COUNTER", victoryCounter)

      }

    })

    grid.forEach(cell => {

      if (cell.innerHTML === '0') {

        const near = discoverElem(grid.indexOf(cell))

        grid.forEach(element => {

          if (near.includes(grid.indexOf(element)) === true) {
            element.innerHTML = findAround(grid.indexOf(element))
            element.classList.replace('hidden', 'discovered')
            console.log('IT WORKS!!')
          }
        })
      } else {
        if (cell.classList.contains('discovered')) {
          // victoryCounter += 1
          // checkWin()
          console.log("VICTORY COUNTER 2", victoryCounter)
        }
      }

    });
  }

  function discoverElem(target) {
    // console.log("TARGET VALUE", target)
    let counter = -1
    let near = []
    for (let c = 0; c < pol.length; c++) {
      for (let i = 0; i < pol[c].length; i++) {
        counter += 1
        if (counter === target) {

          // console.log('COUNTER REACHED', counter)

          if (pol[c - 1] && pol[c - 1][i - 1]) {
            const upleft = findAround(counter)
            // console.log('UPLEFT VALUE= ', upleft)
            if (upleft !== false) {
              near.push(Number((counter - (width + 1))))
            }


          }
          //Checks cell above target
          if (pol[c - 1] && pol[c - 1][i]) {
            const up = findAround(counter)
            // console.log('UP VALUE= ', up)
            if (up !== false) {
              near.push(Number((counter - (width))))
            }


          }

          // //Checks cell above to the right
          if (pol[c - 1] && pol[c - 1][i + 1]) {
            const upright = findAround(counter)
            // console.log('UPRIGHT VALUE= ', upright)
            if (upright !== false) {
              near.push(Number((counter - (width - 1))))
            }

          }
          if (pol[c] && pol[c][i + 1]) {
            const right = findAround(counter)
            // console.log('RIGHT VALUE= ', right)
            if (right !== false) {
              near.push(Number((counter + 1)))
            }

          }

          if (pol[c + 1] && pol[c + 1][i + 1]) {
            const downright = findAround(counter)
            // console.log('DOWNRIGHT VALUE= ', downright)
            if (downright !== false) {
              near.push(Number((counter + (width + 1))))
            }


          }
          //Checks cell above target
          if (pol[c + 1] && pol[c + 1][i]) {
            const down = findAround(counter)
            // console.log('DOWN VALUE= ', down)
            if (down !== false) {
              near.push(Number((counter + (width))))
            }


          }

          // //Checks cell above to the right
          if (pol[c + 1] && pol[c + 1][i - 1]) {
            const downleft = findAround(counter)
            // console.log('DOWNLEFT VALUE= ', downleft)
            if (downleft !== false) {
              near.push(Number((counter + (width - 1))))
            }

          }
          if (pol[c] && pol[c][i - 1]) {
            const left = findAround(counter)
            // console.log('LEFT VALUE= ', left)
            if (left !== false) {
              near.push(Number((counter - 1)))
            }

          }


        }
      }
    }
    return near
  }


  reset.addEventListener('click', () => {
    // grid.forEach((c) =>{


    // })
    gridt.textContent = ''
    restart()
    // pol = [[]]
    // cells = []
    // main.style.display = 'none'
    // menu.style.display = 'flex'

  })
}
function popIndex(array, index) {
  //Removes the item at index in given array
  const pre = array.slice(0, index + 1)
  const post = array.slice(index + 1)
  return pre.slice(0, -1).concat(post)
}



function restart() {
  time.minute = 0
  time.second = 0
  clearInterval(timer)
  timer = 0
  pol = [[]]
  cells = []
  main.style.display = 'none'
  menu.style.display = 'flex'
}
// const pol = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]]

// let pol = [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]]





// const grid = document.querySelector('grid')

// const width = 5
// let bomb = 4
// const cells = []

// for (let i = 0; i < width ** 2; i++){
//   const div = document.createElement('div')
//   div.classList.add('cell')
//   grid.appendChild(div)
// }

function checkWin() {
  // console.log(totalFree)
  let targetgoal = ((widthG ** 2) - totalFree)
  let counter1 = 0
  grid.forEach(cell => {
    // console.log('activate')
    if (cell.classList.contains('discovered')) {
      counter1 += 1

    }
  })
  // console.log(counter1)
  // console.log("TARGET", targetgoal)
  if ((counter1) === ((widthG ** 2) - totalFree)) {
    gridt.textContent = ''
    localStorage.setItem("lastscore", clock.innerHTML)
    score.innerHTML = clock.innerHTML
    title.innerHTML = "You Won!"
    restart()
  }

}
