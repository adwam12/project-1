const grid = document.querySelector('.grid')
const menu = document.querySelector('menu')
const score = document.querySelector('h1')
const main = document.querySelector('main')
const gamemodeButton = Array.from(document.querySelectorAll('.gamemode'))
// Specifying the width of the grid.
const width = 20
// If I start root off as undefined, this could
// introduce bugs
let root = width / 2
// Keep track of my cells
const cells = [[]]

let gamemode = 0

let currentScore = 0
score.innerHTML = 'Score: ' + currentScore

function start(){

  
}


for (let i = 0; i < width ** 2; i++) {

  const div = document.createElement('div')
  div.classList.add('cell')
  grid.appendChild(div)
  // div.innerHTML = i // ! This line will number your grid cells

  cells.push(div)
}
let filledCells = []

const gridTest = Array.from(document.querySelectorAll('.cell'))

cells[root].classList.remove('root')
// root -= 1
cells[root].classList.add('root')

function randomShape() {
  const choices = ['Ldown', 'Lup', 'Lleft', 'Lright', 'Tdown', 'Tright', 'Tup', 'Tleft', 'Zdown', 'Zright', 'Zdown', 'Zright', 'Cdown', 'Cright', 'Cdown', 'Cright', 'Sdown', 'Sright', 'Sdown', 'Sright']
  return choices[randomInRange(0, 19)]

  // const choices = ['Zdown', 'Zright']
  // return choices[randomInRange(0, 1)]
}

function randomInRange(min, max) {
  //Returns a random number in range
  return Math.round(Math.random() * (max - min) + min)
}

document.addEventListener('keydown', (event) => {
  const key = event.key
  if (key === 'd') {
    if (isFreeRight(shapePos) === true) {
      root += 1
      updateShape(shapePos)
    }
  }
  if (key === 'a') {

    // console.log(isFree(shapeLDownToRight))
    if (isFreeLeft(shapePos) === true) {
      root -= 1
      updateShape(shapePos)
    }
  }
  if (key === 's') {

    console.log(shapePos)
    root += width
    updateShape(shapePos)

    // gridTest.forEach(cell => {
    //   // const pos = gridTest.indexOf(cell)
    //   if (cell.classList.contains('root') === true) {
    //     // console.log(findAround(gridTest.indexOf(cell)))
    //     // cube(findAround(gridTest.indexOf(cell)))

    //     clearPiece(findAround(gridTest.indexOf(cell), 'L'))

    //     color(rotate(findAround(gridTest.indexOf(cell), 'L'), 0, 0, 0))
    //     // rotate(findAround(gridTest.indexOf(cell)),0,0,0)
    //   }
    // })
  }
  if (key === 'l') {
    console.log(filledCells)
    restart()

  }
  if (key === 'w') {
    if (canTurn(shapePos) === true) {
      if (shapePos === 'Ldown') {
        shapeLDownToRight.pos1 = root + 1
        shapeLDownToRight.pos2 = root + 2
        shapeLDownToRight.pos3 = root - width + 2
        console.log(shapeLDownToRight)
        shapePos = 'Lright'
        activeShape(shapeLDownToRight)
        return
      }

      if (shapePos === 'Lright') {
        shapeLRightToUp.pos1 = root - width
        shapeLRightToUp.pos2 = root - (width * 2)
        shapeLRightToUp.pos3 = root - ((width * 2) + 1)
        console.log(shapeLRightToUp)
        shapePos = 'Lup'
        activeShape(shapeLRightToUp)
        return
      }
      if (shapePos === 'Lup') {
        shapeLUpToLeft.pos1 = root - 1
        shapeLUpToLeft.pos2 = root - 2
        shapeLUpToLeft.pos3 = (root - 2) + width
        console.log(shapeLUpToLeft)
        shapePos = 'Lleft'
        activeShape(shapeLUpToLeft)
        return
      }
      if (shapePos === 'Lleft') {
        shapeLLeftToDown.pos1 = root + width
        shapeLLeftToDown.pos2 = root + (width * 2)
        shapeLLeftToDown.pos3 = root + (width * 2) + 1
        console.log(shapeLLeftToDown)
        shapePos = 'Ldown'
        activeShape(shapeLLeftToDown)

        return
      }
      if (shapePos === 'Tdown') {
        shapeTDownToRight.pos1 = root + 1,
          shapeTDownToRight.pos2 = root + width,
          shapeTDownToRight.pos3 = root - width
        console.log(shapeTDownToRight)
        shapePos = 'Tright'
        activeShape(shapeTDownToRight)

        return
      }

      if (shapePos === 'Tright') {
        shapeTRightToUp.pos1 = root + 1,
          shapeTRightToUp.pos2 = root - 1,
          shapeTRightToUp.pos3 = root - width
        console.log(shapeTRightToUp)
        shapePos = 'Tup'
        activeShape(shapeTRightToUp)

        return
      }
      if (shapePos === 'Tup') {
        shapeTUpToLeft.pos1 = root - 1,
          shapeTUpToLeft.pos2 = root + width,
          shapeTUpToLeft.pos3 = root - width
        console.log(shapeTUpToLeft)
        shapePos = 'Tleft'
        activeShape(shapeTUpToLeft)

        return
      }
      if (shapePos === 'Tleft') {
        shapeTLeftToDown.pos1 = root + 1,
          shapeTLeftToDown.pos2 = root - 1,
          shapeTLeftToDown.pos3 = root + width
        console.log(shapeTLeftToDown)
        shapePos = 'Tdown'
        activeShape(shapeTLeftToDown)
        return
      }
      if (shapePos === 'Zdown') {
        shapeZDownToRight.pos1 = root - width,
          shapeZDownToRight.pos2 = root + 1,
          shapeZDownToRight.pos3 = root + width + 1
        shapePos = 'Zright'
        activeShape(shapeZDownToRight)
        return
      }

      if (shapePos === 'Zright') {
        shapeZRightToUp.pos1 = root + width,
          shapeZRightToUp.pos2 = root + 1,
          shapeZRightToUp.pos3 = root + width - 1
        shapePos = 'Zdown'
        activeShape(shapeZRightToUp)
        return
      }
      if (shapePos === 'Cdown') {
        shapeCDownToRight.pos1 = root + width,
          shapeCDownToRight.pos2 = root + 1,
          shapeCDownToRight.pos3 = root + width + 1
        shapePos = 'Cright'
        activeShape(shapeCDownToRight)
        return
      }

      if (shapePos === 'Cright') {
        shapeCRightToUp.pos1 = root + width,
          shapeCRightToUp.pos2 = root + 1,
          shapeCRightToUp.pos3 = root + width + 1
        shapePos = 'Cdown'
        activeShape(shapeCRightToUp)
        return
      }
      if (shapePos === 'Sdown') {
        shapeSDownToRight.pos1 = root + 1,
          shapeSDownToRight.pos2 = root + 2,
          shapeSDownToRight.pos3 = root - 1
        shapePos = 'Sright'
        activeShape(shapeSDownToRight)
        return
      }

      if (shapePos === 'Sright') {
        shapeSRightToUp.pos1 = root + width,
          shapeSRightToUp.pos2 = root + (width * 2),
          shapeSRightToUp.pos3 = root - width
        shapePos = 'Sdown'
        activeShape(shapeSRightToUp)
        return
      }

    }
  }
}

)





let shapeLDownToRight = {
  root: root,
  pos1: root + width,
  pos2: root + (width * 2),
  pos3: root + (width * 2) + 1
}

let shapeLRightToUp = {
  root: root,
  pos1: root + 1,
  pos2: root + 2,
  pos3: root - width + 2

}

let shapeLUpToLeft = {
  root: root,
  pos1: root - width,
  pos2: root - (width * 2),
  pos3: root - (width * 2) - 1
}

let shapeLLeftToDown = {
  root: root,
  pos1: root - 1,
  pos2: root - 2,
  pos3: (root - 2) + width
}

//tShape

let shapeTDownToRight = {
  root: root,
  pos1: root - 1,
  pos2: root + width,
  pos3: root + 1
}

let shapeTRightToUp = {
  root: root,
  pos1: root + 1,
  pos2: root + width,
  pos3: root - width

}

let shapeTUpToLeft = {
  root: root,
  pos1: root + 1,
  pos2: root - 1,
  pos3: root - width
}

let shapeTLeftToDown = {
  root: root,
  pos1: root - 1,
  pos2: root + width,
  pos3: root - width
}

//ZShape
let shapeZDownToRight = {
  root: root,
  pos1: root + 1,
  pos2: root + width,
  pos3: root + width - 1
}

let shapeZRightToUp = {
  root: root,
  pos1: root - width,
  pos2: root + 1,
  pos3: root + width - 1

}


//CShape
let shapeCRightToUp = {
  root: root,
  pos1: root + width,
  pos2: root + 1,
  pos3: root + width + 1

}
let shapeCDownToRight = {
  root: root,
  pos1: root + width,
  pos2: root + 1,
  pos3: root + width + 1
}
//SShape
let shapeSRightToUp = {
  root: root,
  pos1: root + width,
  pos2: root + (width * 2),
  pos3: root - width

}
let shapeSDownToRight = {
  root: root,
  pos1: root + 1,
  pos2: root + 2,
  pos3: root - 1
}

//
// let shapeZUpToLeft = {
//   root: root,
//   pos1: root + 1,
//   pos2: root - 1,
//   pos3: root - width
// }

// let shapeZLeftToDown = {
//   root: root,
//   pos1: root - 1,
//   pos2: root + width,
//   pos3: root - width
// }
let shapePos = randomShape()
let shape2 = randomShape()



// gridTest.forEach(cell => {
//   console.log(gridTest.indexOf(cell))
//   const pos = gridTest.indexOf(cell)

// })
upNext(shape2)
function activeShape(shape) {
  let changeShape = false
  let loss = false

  gridTest.forEach((cell) => {
    // console.log('active shape')
    if ((gridTest.indexOf(cell) === (shape.root + width)) || (gridTest.indexOf(cell) === (shape.pos1 + width)) || (gridTest.indexOf(cell) === (shape.pos2 + width)) || (gridTest.indexOf(cell) === (shape.pos3 + width))) {
      if (cell.classList.contains('inactive')) {
        console.log('ACTIVE BELOW')
        gridTest.forEach((cell) => {
          if (Object.values(shape).includes(gridTest.indexOf(cell))) {

            cell.classList.add('inactive')
            loss = true

            console.log('SET INACTIVE')
            if (!(filledCells.includes(gridTest.indexOf(cell)))) {
              console.log('NOT USELESS')
              // filledCells = Object.values(shape)

              filledCells = filledCells.concat(Object.values(shape))
              console.log(filledCells)
              gridTest.forEach((cell) => {
                if (Object.values(shape).includes(gridTest.indexOf(cell))) {
                  cell.classList.add('inactive')
                  console.log('SET INACTIVE X2')
                  // root = width / 2
                  // isFull()
                  // shapePos = randomShape()
                  // debugger


                  changeShape = true

                  // console.log('BEFORE SWAP', shapePos, shape2)
                  // gridTest.forEach(cell =>{
                  //   if (cell.classList.contains('active')){
                  //     cell.classList.remove('active')
                  //     console.log('gone')
                  //   }
                  // })

                }

              })
            }

          }

        })

      }

    }
    if (Object.values(shape).includes(gridTest.indexOf(cell))) {
      cell.classList.add('active')

      // console.log(shape.root)

      // console.log('Works!')
      if ((gridTest.indexOf(cell) >= ((width ** 2) - width)) || (filledCells.includes(gridTest.indexOf(cell)))) {
        console.log('Object: ', shape)

        console.log('Values in the Object: ', Object.values(shape))
        console.log('FilledCells: ', filledCells)

        // if (!(filledCells.includes(gridTest.indexOf(cell)))) {
        //   debugger
        //   console.log('ADDING TO FILLED')
        //   // filledCells = Object.values(shape)

        //   filledCells = filledCells.concat(Object.values(shape))
        //   console.log(filledCells)
        //   gridTest.forEach((cell) => {
        //     if (Object.values(shape).includes(gridTest.indexOf(cell))) {
        //       cell.classList.add('inactive')
        //       root = width / 2
        //       isFull()
        //       shapePos = randomShape()
        //       updateShape(shape)
        //     }

        //   })
        // }
        cell.classList.add('inactive')
        return filledCells
      }
    } else {
      if (cell.classList.contains('active')) {
        cell.classList.remove('active')
      }
    }

  })
  if (changeShape === true) {
    newShape()
    isFull()
  }
  if (loss === true){
    checkLoss()
    loss = false
  }
}


function updateShape(shapePos) {
  shapeLDownToRight = {
    root: root,
    pos1: root + width,
    pos2: root + (width * 2),
    pos3: root + (width * 2) + 1
  }

  shapeLRightToUp = {
    root: root,
    pos1: root + 1,
    pos2: root + 2,
    pos3: root - width + 2

  }

  shapeLUpToLeft = {
    root: root,
    pos1: root - width,
    pos2: root - (width * 2),
    pos3: root - (width * 2) - 1
  }

  shapeLLeftToDown = {
    root: root,
    pos1: root - 1,
    pos2: root - 2,
    pos3: (root - 2) + width
  }


  shapeTDownToRight = {
    root: root,
    pos1: root - 1,
    pos2: root + width,
    pos3: root + 1
  }

  shapeTRightToUp = {
    root: root,
    pos1: root + 1,
    pos2: root + width,
    pos3: root - width

  }

  shapeTUpToLeft = {
    root: root,
    pos1: root + 1,
    pos2: root - 1,
    pos3: root - width
  }

  shapeTLeftToDown = {
    root: root,
    pos1: root - 1,
    pos2: root + width,
    pos3: root - width
  }

  shapeZDownToRight = {
    root: root,
    pos1: root + width,
    pos2: root + 1,
    pos3: root + width - 1
  }

  shapeZRightToUp = {
    root: root,
    pos1: root - width,
    pos2: root + 1,
    pos3: root + width + 1

  }
  shapeCRightToUp = {
    root: root,
    pos1: root + width,
    pos2: root + 1,
    pos3: root + width + 1

  }
  shapeCDownToRight = {
    root: root,
    pos1: root + width,
    pos2: root + 1,
    pos3: root + width + 1
  }
  shapeSDownToRight = {
    root: root,
    pos1: root + width,
    pos2: root + (width * 2),
    pos3: root - width
  }

  shapeSRightToUp = {
    root: root,
    pos1: root + 1,
    pos2: root + 2,
    pos3: root - 1

  }


  if (shapePos === 'Tdown') {
    activeShape(shapeTDownToRight)
  }
  if (shapePos === 'Tright') {
    activeShape(shapeTRightToUp)
  }
  if (shapePos === 'Tup') {
    activeShape(shapeTUpToLeft)
  }
  if (shapePos === 'Tleft') {
    activeShape(shapeTLeftToDown)
  }

  if (shapePos === 'Ldown') {
    activeShape(shapeLDownToRight)
  }
  if (shapePos === 'Lright') {
    activeShape(shapeLRightToUp)
  }
  if (shapePos === 'Lup') {
    activeShape(shapeLUpToLeft)
  }
  if (shapePos === 'Lleft') {
    activeShape(shapeLLeftToDown)
  }
  if (shapePos === 'Zdown') {
    activeShape(shapeZDownToRight)
  }
  if (shapePos === 'Zright') {
    activeShape(shapeZRightToUp)
  }
  if (shapePos === 'Cdown') {
    activeShape(shapeCDownToRight)
  }
  if (shapePos === 'Cright') {
    activeShape(shapeCRightToUp)
  }
  if (shapePos === 'Sdown') {
    activeShape(shapeSDownToRight)
  }
  if (shapePos === 'Sright') {
    activeShape(shapeSRightToUp)
  }
}





function isFreeLeft(shape) {
  let stateL = true
  if (shape === 'Ldown') {
    shape = shapeLDownToRight
  }
  if (shape === 'Lright') {
    shape = shapeLRightToUp
  }
  if (shape === 'Lup') {
    shape = shapeLUpToLeft
  }
  if (shape === 'Lleft') {
    shape = shapeLLeftToDown
  }

  if (shape === 'Tdown') {
    shape = shapeTDownToRight
  }
  if (shape === 'Tright') {
    shape = shapeTRightToUp
  }
  if (shape === 'Tup') {
    shape = shapeTUpToLeft
  }
  if (shape === 'Tleft') {
    shape = shapeTLeftToDown
  }
  if (shape === 'Zdown') {
    shape = shapeZDownToRight
  }
  if (shape === 'Zright') {
    shape = shapeZRightToUp
  }
  if (shape === 'Cdown') {
    shape = shapeCDownToRight
  }
  if (shape === 'Cright') {
    shape = shapeCRightToUp
  }
  if (shape === 'Sdown') {
    shape = shapeSDownToRight
  }
  if (shape === 'Sright') {
    shape = shapeSRightToUp
  }
  gridTest.forEach(cell => {
    if (((gridTest.indexOf(cell)) === (shape.root - 1)) || ((gridTest.indexOf(cell)) === (shape.pos1 - 1)) || ((gridTest.indexOf(cell)) === (shape.pos2 - 1)) || ((gridTest.indexOf(cell)) === (shape.pos3 - 1))) {
      if ((cell.classList.contains('border')) || (cell.classList.contains('inactive'))) {
        console.log('Busy!')
        console.log('Shape is:', shape)
        stateL = false
      }
    }


  })
  return stateL
}

function isFreeRight(shape) {
  let stateR = true
  if (shape === 'Ldown') {
    shape = shapeLDownToRight
  }
  if (shape === 'Lright') {
    shape = shapeLRightToUp
  }
  if (shape === 'Lup') {
    shape = shapeLUpToLeft
  }
  if (shape === 'Lleft') {
    shape = shapeLLeftToDown
  }

  if (shape === 'Tdown') {
    shape = shapeTDownToRight
  }
  if (shape === 'Tright') {
    shape = shapeTRightToUp
  }
  if (shape === 'Tup') {
    shape = shapeTUpToLeft
  }
  if (shape === 'Tleft') {
    shape = shapeTLeftToDown
  }
  if (shape === 'Zdown') {
    shape = shapeZDownToRight
  }
  if (shape === 'Zright') {
    shape = shapeZRightToUp
  }
  if (shape === 'Cdown') {
    shape = shapeCDownToRight
  }
  if (shape === 'Cright') {
    shape = shapeCRightToUp
  }
  if (shape === 'Sdown') {
    shape = shapeSDownToRight
  }
  if (shape === 'Sright') {
    shape = shapeSRightToUp
  }
  gridTest.forEach(cell => {
    if (((gridTest.indexOf(cell)) === (shape.root + 1)) || ((gridTest.indexOf(cell)) === (shape.pos1 + 1)) || ((gridTest.indexOf(cell)) === (shape.pos2 + 1)) || ((gridTest.indexOf(cell)) === (shape.pos3 + 1))) {
      if ((cell.classList.contains('border')) || (cell.classList.contains('inactive'))) {

        console.log('Busy!')
        stateR = false
      }
    }



  })
  return stateR
}

function canTurn(shape) {

  if (shape === 'Ldown') {
    shape = shapeLRightToUp
  }
  if (shape === 'Lright') {
    shape = shapeLUpToLeft
  }
  if (shape === 'Lup') {
    shape = shapeLLeftToDown
  }
  if (shape === 'Lleft') {
    shape = shapeLDownToRight
  }

  if (shape === 'Tdown') {
    shape = shapeTRightToUp
  }
  if (shape === 'Tright') {
    shape = shapeTUpToLeft
  }
  if (shape === 'Tup') {
    shape = shapeTLeftToDown
  }
  if (shape === 'Tleft') {
    shape = shapeTDownToRight
  }
  if (shape === 'Zdown') {
    shape = shapeZRightToUp
  }
  if (shape === 'Zright') {
    shape = shapeZDownToRight
  }
  if (shape === 'Cdown') {
    shape = shapeCRightToUp
  }
  if (shape === 'Cright') {
    shape = shapeCDownToRight
  }
  if (shape === 'Sdown') {
    shape = shapeSRightToUp
  }
  if (shape === 'Sright') {
    shape = shapeSDownToRight
  }
  return canRotate(shape)
}




function canRotate(shape) {
  let stateB = true
  if (shape === 'Ldown') {
    shape = shapeLDownToRight
  }
  if (shape === 'Lright') {
    shape = shapeLRightToUp
  }
  if (shape === 'Lup') {
    shape = shapeLUpToLeft
  }
  if (shape === 'Lleft') {
    shape = shapeLLeftToDown
  }

  if (shape === 'Tdown') {
    shape = shapeTDownToRight
  }
  if (shape === 'Tright') {
    shape = shapeTRightToUp
  }
  if (shape === 'Tup') {
    shape = shapeTUpToLeft
  }
  if (shape === 'Tleft') {
    shape = shapeTLeftToDown
  }
  if (shape === 'Zdown') {
    shape = shapeZDownToRight
  }
  if (shape === 'Zright') {
    shape = shapeZRightToUp
  }
  if (shape === 'Cdown') {
    shape = shapeCDownToRight
  }
  if (shape === 'Cright') {
    shape = shapeCRightToUp
  }
  if (shape === 'Sdown') {
    shape = shapeSDownToRight
  }
  if (shape === 'Sright') {
    shape = shapeSRightToUp
  }
  gridTest.forEach(cell => {
    if (((gridTest.indexOf(cell)) === (shape.root)) || ((gridTest.indexOf(cell)) === (shape.pos1)) || ((gridTest.indexOf(cell)) === (shape.pos2)) || ((gridTest.indexOf(cell)) === (shape.pos3))) {
      if ((cell.classList.contains('border')) || (cell.classList.contains('inactive'))) {
        console.log('Busy!')
        console.log('Shape is:', shape)
        stateB = false
      }
    }



  })
  return stateB
}


// function isFull(){
//   let adjacentFilled = []

// }
function isFull() {
  const targetRange = []
  for (let i = 1; i < width - 1; i++) {
    targetRange.push((width * i) + 1)
  }

  gridTest.forEach((cell) => {
    if (targetRange.includes(gridTest.indexOf(cell))) {
      // console.log('GOT ONE!')
      checkRow(gridTest.indexOf(cell))
    }

  })
}

function checkRow(target) {
  // for (let i = 0; i < (width ** 2); i++) {
  //   console.log(i)
  // }
  const adjacentFilled = []
  const targetMem = target
  let shift = false
  let testlist = []



  gridTest.forEach((cell) => {


    if (gridTest.indexOf(cell) === target) {
      if (cell.classList.contains('inactive')) {
        adjacentFilled.push(gridTest.indexOf(cell))

        target += 1

      }
    }
    if (adjacentFilled.length === width - 2) {
      // console.log('FULL ROW')
      // console.log('ADJ = ', adjacentFilled)
      // debugger
      console.log("LLLLLLLLLLLLLLLLLLL")
      gridTest.forEach(cell => {
        // console.log(gridTest.indexOf(cell))
        if (adjacentFilled.includes(gridTest.indexOf(cell))) {

          // console.log(cell)

          // console.log('INDEX OF FOUND', gridTest.indexOf(cell))
          // console.log('destroy', gridTest.indexOf(cell))

          filledCells = popIndex(filledCells, gridTest.indexOf(cell))
          if (cell.classList.contains('skip') === false) {
            cell.classList.add('destroy')
          }

          updateShape(shapePos)
          shift = true
          testlist.push(cell)



          // console.log(filledCells)
          // console.log(shapePos)

        }
      })


    }


  })

  if (shift === true) {
    setTimeout(() => {
      testlist.forEach(cell => {
        cell.classList.remove('inactive')
        cell.classList.remove('destroy')

      })

      shiftAllDown(targetMem)
    }, 500);



  }


}


function shiftAllDown(above) {
  currentScore += 100
  score.innerHTML = 'Score: ' + currentScore
  gridTest.slice().reverse().forEach(cell => {



    if (gridTest.indexOf(cell) < above) {
      if (cell.classList.contains('inactive')) {
        gridTest.forEach((cellUnder) => {
          if (gridTest.indexOf(cellUnder) === (gridTest.indexOf(cell) + width)) {
            // console.log('check')
            // console.log('Cell Master: ', cell, 'Cell Checked:', cellUnder)
            if ((cellUnder.classList.contains('inactive') === false)) {
              // console.log('SHift it down', cellUnder)
              cell.classList.remove('inactive')
              cellUnder.classList.add('inactive')

            }
          }

        })
      }
    }

  })
  init()
}

function popIndex(array, index) {
  //Removes the item at index in given array
  const pre = array.slice(0, index + 1)
  const post = array.slice(index + 1)
  return pre.slice(0, -1).concat(post)
}


// updateShape(shapePos)

updateShape(shapePos)

function init() {
  gridTest.forEach(cell => {
    if ((gridTest.indexOf(cell) < (width ** 2)) && (gridTest.indexOf(cell) > (width ** 2) - width)) {
      cell.classList.add('inactive')
    }
    if (gridTest.indexOf(cell) < width) {
      cell.classList.add('fakeInactive')
    }
    if (((gridTest.indexOf(cell) % width) === 0) || ((gridTest.indexOf(cell) + 1) % width) === 0 || ((gridTest.indexOf(cell) + 2) % width) === 0 || ((gridTest.indexOf(cell) - 1) % width) === 0 || ((gridTest.indexOf(cell) - 2) % width) === 0 || ((gridTest.indexOf(cell) + 3) % width) === 0 || ((gridTest.indexOf(cell) - 3) % width) === 0 || ((gridTest.indexOf(cell) + 4) % width) === 0) {
      cell.classList.add('inactive')
      cell.classList.add('skip')
    }
    if ((((gridTest.indexOf(cell) % width) === 0) || ((gridTest.indexOf(cell) + 1) % width) === 0)) {
      cell.classList.add('border')
    }

  })
}
init()
function checkLoss() {
  let lost = false
  gridTest.forEach((cell) => {
    if ((gridTest.indexOf(cell) < width * 2) && (cell.classList.contains('inactive')) && (cell.classList.contains('skip') === false) && (gridTest.indexOf(cell) > 0)) {
      lost = true

    }
  })
  if (lost === true){
    lost = false
    console.log('YOU LOSE! YA BIG LOSER!')
    main.style.display = 'none'
    menu.style.display = 'flex'
  }
}
function upNext(shape) {
  gridTest[77].classList.add('upNext')
  rootTest = 77
  gridTest.forEach((cell) => {
    if (cell.classList.contains('upNext')) {
      cell.classList.remove('upNext')
    }
  })


  if (shape === 'Tdown') {
    shapeTDownToRight = {


      root: rootTest,
      pos1: rootTest + 1,
      pos2: rootTest + width,
      pos3: rootTest - width
    }
    shape = shapeTDownToRight
  }
  if (shape === 'Tright') {
    shapeTRightToUp = {

      root: rootTest,
      pos1: rootTest + 1,
      pos2: rootTest + width,
      pos3: rootTest - width
    }
    shape = shapeTRightToUp
  }
  if (shape === 'Tup') {
    shapeTUpToLeft = {


      root: rootTest,
      pos1: rootTest + 1,
      pos2: rootTest + width,
      pos3: rootTest - width
    }
    shape = shapeTUpToLeft
  }
  if (shape === 'Tleft') {
    shapeTLeftToDown = {


      root: rootTest,
      pos1: rootTest + 1,
      pos2: rootTest + width,
      pos3: rootTest - width
    }
    shape = shapeTLeftToDown
  }

  if (shape === 'Ldown') {
    shapeLDownToRight = {

      root: rootTest,
      pos1: rootTest + width,
      pos2: rootTest + (width * 2),
      pos3: rootTest + (width * 2) + 1
    }
    shape = shapeLDownToRight
  }
  if (shape === 'Lright') {
    shapeLRightToUp = {

      root: rootTest,
      pos1: rootTest + width,
      pos2: rootTest + (width * 2),
      pos3: rootTest + (width * 2) + 1
    }
    shape = shapeLRightToUp
  }
  if (shape === 'Lup') {
    shapeLUpToLeft = {

      root: rootTest,
      pos1: rootTest + width,
      pos2: rootTest + (width * 2),
      pos3: rootTest + (width * 2) + 1
    }
    shape = shapeLUpToLeft
  }
  if (shape === 'Lleft') {
    shapeLLeftToDown = {

      root: rootTest,
      pos1: rootTest + width,
      pos2: rootTest + (width * 2),
      pos3: rootTest + (width * 2) + 1
    }
    shape = shapeLLeftToDown
  }
  if (shape === 'Zdown') {
    shapeZDownToRight = {
      root: rootTest,
      pos1: rootTest - width,
      pos2: rootTest + 1,

      pos3: rootTest + width + 1
    }
    shape = shapeZDownToRight
  }
  if (shape === 'Zright') {
    shapeZRightToUp = {
      root: rootTest,
      pos1: rootTest - width,
      pos2: rootTest + 1,

      pos3: rootTest + width + 1
    }
    shape = shapeZRightToUp
  }
  if (shape === 'Cdown') {
    shapeCDownToRight = {
      root: rootTest,
      pos1: rootTest + width,
      pos2: rootTest + 1,
      pos3: rootTest + width + 1

    }
    shape = shapeCDownToRight
  }
  if (shape === 'Cright') {
    shapeCRightToUp = {
      root: rootTest,
      pos1: rootTest + width,
      pos2: rootTest + 1,
      pos3: rootTest + width + 1

    }
    shape = shapeCRightToUp
  }
  if (shape === 'Sdown') {
    shapeSDownToRight = {
      root: rootTest,
      pos1: rootTest + width,

      pos2: rootTest + (width * 2),
      pos3: rootTest - width

    }
    shape = shapeSDownToRight
  }
  if (shape === 'Sright') {
    shapeSRightToUp = {

      root: rootTest,
      pos1: rootTest + width,

      pos2: rootTest + (width * 2),
      pos3: rootTest - width

    }
    shape = shapeSRightToUp
  }

  Object.values(shape).forEach((demoCell) => {
    gridTest[demoCell].classList.add('upNext')
  })
}
// upNext(randomShape())


// upNext(shape2)
function shapeOrder() {

  root = width / 2
  shape2 = randomShape()
  return shape2

}

// function flipShapes(){
//   shape2 = randomShape()
//   return shape2
// }

function newShape() {
  root = width / 2
  // console.log('BEFORE THE SWAP', shapePos, shape2)
  shapePos = shape2
  shape2 = randomShape()
  upNext(shape2)
  // console.log('AFTER THE SWAP', shapePos, shape2)
}

// setInterval(() => {
//   root += width
//   updateShape(shapePos)

// }, 250);


gamemodeButton.forEach(button => {
  button.addEventListener('click', () => {

    console.log(gamemodeButton.indexOf(button))
    gamemode = 0
    menu.style.display = 'none'
    main.style.display = 'flex'
    score.style.display = 'none'
    reset()
  })

})

function reset() {
  filledCells = []

  newShape()
  currentScore = 0
  gridTest.forEach(cell => {
    if ((cell.classList.contains('border') === false) && (cell.classList.contains('skip') === false) && (cell.classList.contains('fakeInactive') === false) && (gridTest.indexOf(cell) < ((width ** 2) - width) === true)) {
      cell.classList.remove('inactive')
    }
  })
}