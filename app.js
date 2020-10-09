
const freeSpots = document.querySelector('h2')


///
/// NICK'S GRID CODE START
///
const gridt = document.querySelector('.grid')
// Specifying the width of the grid.
const width = 5

// Keep track of my cells
const cells = []


for (let i = 0; i < width ** 2; i++) {
  // Create an element
  const div = document.createElement('h1')
  div.classList.add('cell')
  gridt.appendChild(div)
  // Push the div to my array of cells
  cells.push(div)
}

///
/// NICK'S GRID CODE END
///

const grid = Array.from(document.querySelectorAll('.cell'))
// const pol = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]]
let totalFree = 0
// let pol = [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]]


let pol = [[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]]
const test = pol.map(item => {
  item = item.map(() => {
    randomInRange(0, 3)
    const isMine = randomInRange(1, 3)
    if (isMine === 1) {
      totalFree += 1
    }
    return isMine

  })
  return item
})

freeSpots.innerHTML = totalFree
pol = test
console.log(pol)

grid.forEach(cell => {
  cell.innerHTML = ' X'

  cell.addEventListener('click', () => {

    cell.innerHTML = findAround(grid.indexOf(cell))
    if (cell.innerHTML === 'false') {
      console.log('rip')
      cell.innerHTML = 'Mine!'
      cell.classList.add('mine')
    }
    if (cell.innerHTML === '0') {
      console.log('Empty cell!')
      cell.classList.add('empty')
      console.log(discoverEmpty(grid.indexOf(cell)))
      console.log(cell)
    }
  })
})

function findAround(target) {
  // console.log(pol.length)
  console.log(target)
  let counter = -1
  let mineCount = 0
  let safe = true
  for (let c = 0; c < pol.length; c++) {

    for (let i = 0; i < pol[c].length; i++) {
      counter += 1
      if (counter === target) {
        if (pol[c][i] === 1) {
          console.log('Thats a mine!')
          safe = false
        }

        //Checks cell above target
        if (pol[c - 1] && pol[c - 1][i]) {
          console.log('Above: ', pol[c - 1][i])
          if (pol[c - 1][i] === 1) {
            mineCount += 1
          }

        }

        //Checks cell above to the right
        if (pol[c - 1] && pol[c - 1][i + 1]) {
          console.log('Above-Right: ', pol[c - 1][i + 1])
          if (pol[c - 1][i + 1] === 1) {
            mineCount += 1
          }

        }
        //Checks to the right of target
        if (Boolean(pol[c][i + 1]) === true) {
          console.log('Right: ', pol[c][i + 1])
          if (pol[c][i + 1] === 1) {
            mineCount += 1
          }
        }
        //Checks under to the right
        if (pol[c + 1] && pol[c + 1][i + 1]) {
          console.log('Below-Right: ', pol[c + 1][i + 1])
          if (pol[c + 1][i + 1] === 1) {
            mineCount += 1
          }

        }
        //Checks cell under target

        if (pol[c + 1] && pol[c + 1][i]) {
          console.log('Below: ', pol[c + 1][i])
          if (pol[c + 1][i] === 1) {
            mineCount += 1
          }
        }


        //Checks under to the left
        if (pol[c + 1] && pol[c + 1][i - 1]) {
          console.log('Below-Left: ', pol[c + 1][i - 1])
          if (pol[c + 1][i - 1] === 1) {
            mineCount += 1
          }

        }

        //Checks to the left of target
        if (Boolean(pol[c][i - 1]) === true) {
          console.log('Left: ', pol[c][i - 1])
          if (pol[c][i - 1] === 1) {
            mineCount += 1
          }
        }
        //Checks above to the left
        if (pol[c - 1] && pol[c - 1][i - 1]) {
          console.log('Above-Left: ', pol[c - 1][i - 1])
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

function discoverEmpty(target) {
  console.log('Target:', target)
  let counter = -1
  for (let c = 0; c < pol.length; c++) {
    for (let r = 0; r < pol[c].length; r++) {
      counter += 1
      console.log(counter)
      if (counter === target) {
        //Checks cell above target
        if (pol[c - 1] && pol[c - 1][r]) {
          // console.log('test: ', pol[c - 1][r])
          // console.log('check', pol[c][r])
          if (pol[c][r] === true) {

          }

        }
        // pol[c][r].style.color = 'yellow'
        return counter
        // pol[col][row]
        // arrayItem = 
      }
    }
  }
}
// const grid = document.querySelector('grid')

// const width = 5
// let bomb = 4
// const cells = []

// for (let i = 0; i < width ** 2; i++){
//   const div = document.createElement('div')
//   div.classList.add('cell')
//   grid.appendChild(div)
// }