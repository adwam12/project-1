const grid = document.querySelector('.grid')
// Specifying the width of the grid.
const width = 20
// If I start root off as undefined, this could
// introduce bugs
let root = randomInRange(4,width)
// Keep track of my cells
const cells = [[]]


for (let i = 0; i < width ** 2; i++) {
  // Create an element
  const div = document.createElement('div')
  div.classList.add('cell')
  grid.appendChild(div)
  // div.innerHTML = i // ! This line will number your grid cells
  // Push the div to my array of cells
  cells.push(div)
}
let filledCells = []

const arrayMaster = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]]

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


// gridTest.forEach(cell => {
//   if (cell.classList.contains('root') === true) {
//     // console.log(findAround(gridTest.indexOf(cell)))
//     // cube(findAround(gridTest.indexOf(cell)))

//     color(findAround(gridTest.indexOf(cell), 'L'), 0, 0, 0)
//     // rotate(findAround(gridTest.indexOf(cell)),0,0,0)
//   }

// });

// function findAround(target, shape) {
//   let around = [target]
//   for (let r = 0; r < arrayMaster.length; r++) {
//     for (let c = 0; c < arrayMaster[r].length; c++) {
//       if (arrayMaster[r][c] === target) {
//         if (shape === 'cube') {
//           around.push(arrayMaster[r][c + 1])
//           around.push(arrayMaster[r + 1][c])
//           around.push(arrayMaster[r + 1][c + 1])
//         }
//         if (shape === 'L') {
//           around.push(arrayMaster[r + 1][c])
//           around.push(arrayMaster[r + 2][c])
//           around.push(arrayMaster[r + 2][c + 1])
//         }
//       }
//     }
//   }
//   console.log(around)
//   return around
// }

// function clearBoard() {
//   gridTest.forEach(cell => {
//     if (cell.classList.contains('blue')) {
//       cell.classList.remove('blue')
//     }
//   })
// }

// function clearPiece(arr) {
//   gridTest.forEach(cell => {
//     if (arr.includes(gridTest.indexOf(cell))) {
//       cell.classList.remove('blue')
//     }
//   })
// }

// function color(arr) {
//   gridTest.forEach((cell) => {
//     if (arr.includes(gridTest.indexOf(cell))) {
//       cell.classList.add('blue')
//       cell.classList.add('L')
//     }


//   })
//   return arr
// }

// setInterval(() => {
//   gridTest.forEach((cell) => {
//     if (cell.classList.contains('moving') === true) {
//       cell.classList.remove('blue')
//     }
//   })
// }, 1000);

// function rotate(arr, dir, shape) {
//   const target = arr[0]
//   let newArray = []
//   arr.pop()
//   arr.pop()
//   arr.pop()
//   arr.pop()
//   for (let r = 0; r < arrayMaster.length; r++) {
//     for (let c = 0; c < arrayMaster[r].length; c++) {
//       if (arrayMaster[r][c] === target) {
//         arr.push(arrayMaster[r][c])
//         arr.push(arrayMaster[r][c + 1])
//         arr.push(arrayMaster[r][c + 2])
//         arr.push(arrayMaster[r - 1][c + 2])
//       }
//     }
//   }
//   console.log('SHould have 4: ', arr)
//   return arr
// }



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
    shapePos = 'Zdown'
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
        shapeSRightToUp.pos2 = root + (width*2),
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
  pos2: root + (width*2),
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

// gridTest.forEach(cell => {
//   console.log(gridTest.indexOf(cell))
//   const pos = gridTest.indexOf(cell)

// })

function activeShape(shape) {
  gridTest.forEach((cell) => {
    if ((gridTest.indexOf(cell) === (shape.root + width)) || (gridTest.indexOf(cell) === (shape.pos1 + width)) || (gridTest.indexOf(cell) === (shape.pos2 + width)) || (gridTest.indexOf(cell) === (shape.pos3 + width))) {
      if (cell.classList.contains('inactive')) {
        console.log('ACTIVE BELOW')
        gridTest.forEach((cell) => {
          if (Object.values(shape).includes(gridTest.indexOf(cell))) {
            cell.classList.add('inactive')
            shapePos = randomShape()
            root = 4
            updateShape(shape)
          }

        })
      }
    }
    if (Object.values(shape).includes(gridTest.indexOf(cell))) {
      cell.classList.add('active')
      console.log(shape.root)

      // console.log('Works!')
      if ((gridTest.indexOf(cell) >= ((width ** 2) - width)) || (filledCells.includes(gridTest.indexOf(cell)))) {
        console.log('Object: ', shape)
        console.log('Values in the Object: ', Object.values(shape))
        console.log('FilledCells: ', filledCells)

        if (!(filledCells.includes(gridTest.indexOf(cell)))) {
          // filledCells = Object.values(shape)

          filledCells = filledCells.concat(Object.values(shape))
          console.log(filledCells)
          gridTest.forEach((cell) => {
            if (Object.values(shape).includes(gridTest.indexOf(cell))) {
              cell.classList.add('inactive')
              root = 4
              updateShape(shape)
            }

          })
        }
        cell.classList.add('inactive')
        return filledCells
      }
    } else {
      cell.classList.remove('active')
    }

  })

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
  shapeSRightToUp = {
    root: root,
    pos1: root + width,
    pos2: root + (width*2),
    pos3: root - width 
  
  }
  shapeSDownToRight = {
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
updateShape(shapePos)
setInterval(() => {
  root += width
  updateShape(shapePos)

}, 250);

let counter = 0
gridTest.forEach(cell => {
  if (((gridTest.indexOf(cell) % width) === 0) || ((gridTest.indexOf(cell) + 1) % width) === 0) {
    cell.classList.add('border')
  }
})

function isFreeLeft(shape) {
  let state = true
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
        state = false
      }
    }
    if (Object.values(shape).includes(gridTest.indexOf(cell))) {

    }


  })
  return state
}

function isFreeRight(shape) {
  let state = true
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
        state = false
      }
    }
    if (Object.values(shape).includes(gridTest.indexOf(cell))) {

    }


  })
  return state
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
  let state = true
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
        state = false
      }
    }
    if (Object.values(shape).includes(gridTest.indexOf(cell))) {

    }


  })
  return state
}


