const grid = document.querySelector('.grid')
// Specifying the width of the grid.
const width = 10
// If I start root off as undefined, this could
// introduce bugs
let root = 34
// Keep track of my cells
const cells = []


for (let i = 0; i < width ** 2; i++) {
  // Create an element
  const div = document.createElement('div')
  div.classList.add('cell')
  grid.appendChild(div)
  div.innerHTML = i // ! This line will number your grid cells
  // Push the div to my array of cells
  cells.push(div)
}

const arrayMaster = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]]

const gridTest = Array.from(document.querySelectorAll('.cell'))
cells[root].classList.remove('root')
// root -= 1
cells[root].classList.add('root')

// gridTest.forEach(cell => {
//   if (cell.classList.contains('root') === true) {
//     // console.log(findAround(gridTest.indexOf(cell)))
//     // cube(findAround(gridTest.indexOf(cell)))

//     color(findAround(gridTest.indexOf(cell), 'L'), 0, 0, 0)
//     // rotate(findAround(gridTest.indexOf(cell)),0,0,0)
//   }

// });

function findAround(target, shape) {
  let around = [target]
  for (let r = 0; r < arrayMaster.length; r++) {
    for (let c = 0; c < arrayMaster[r].length; c++) {
      if (arrayMaster[r][c] === target) {
        if (shape === 'cube') {
          around.push(arrayMaster[r][c + 1])
          around.push(arrayMaster[r + 1][c])
          around.push(arrayMaster[r + 1][c + 1])
        }
        if (shape === 'L') {
          around.push(arrayMaster[r + 1][c])
          around.push(arrayMaster[r + 2][c])
          around.push(arrayMaster[r + 2][c + 1])
        }
      }
    }
  }
  console.log(around)
  return around
}

function clearBoard() {
  gridTest.forEach(cell => {
    if (cell.classList.contains('blue')) {
      cell.classList.remove('blue')
    }
  })
}

function clearPiece(arr) {
  gridTest.forEach(cell => {
    if (arr.includes(gridTest.indexOf(cell))) {
      cell.classList.remove('blue')
    }
  })
}

function color(arr) {
  gridTest.forEach((cell) => {
    if (arr.includes(gridTest.indexOf(cell))) {
      cell.classList.add('blue')
      cell.classList.add('L')
    }


  })
  return arr
}

setInterval(() => {
  gridTest.forEach((cell) => {
    if (cell.classList.contains('moving') === true) {
      cell.classList.remove('blue')
    }
  })
}, 1000);

function rotate(arr, dir, shape) {
  const target = arr[0]
  let newArray = []
  arr.pop()
  arr.pop()
  arr.pop()
  arr.pop()
  for (let r = 0; r < arrayMaster.length; r++) {
    for (let c = 0; c < arrayMaster[r].length; c++) {
      if (arrayMaster[r][c] === target) {
        arr.push(arrayMaster[r][c])
        arr.push(arrayMaster[r][c + 1])
        arr.push(arrayMaster[r][c + 2])
        arr.push(arrayMaster[r - 1][c + 2])
      }
    }
  }
  console.log('SHould have 4: ', arr)
  return arr
}


document.addEventListener('keydown', (event) => {
  const key = event.key
  if (key === 'a') {


    root += width
    updateShape()
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
  // if (key === 'a') {
  //   gridTest.forEach(cell => {
  //     // const pos = gridTest.indexOf(cell)
  //     if (cell.classList.contains('root') === true) {
  //       // console.log(findAround(gridTest.indexOf(cell)))
  //       // cube(findAround(gridTest.indexOf(cell)))
  //       clearPiece(findAround(gridTest.indexOf(cell), 'L'))
  //       color(findAround(gridTest.indexOf(cell), 'L'))

  //       // rotate(findAround(gridTest.indexOf(cell)),0,0,0)
  //     }
  //   })
  // }
  if (key === 'd') {

    if (shapePos === 'down') {
      shapeLDownToRight.pos1 = root + 1
      shapeLDownToRight.pos2 = root + 2
      shapeLDownToRight.pos3 = root - width + 2
      console.log(shapeLDownToRight)
      shapePos = 'right'
      activeShape(shapeLDownToRight)
      return
    }

    if (shapePos === 'right') {
      shapeLRightToUp.pos1 = root - width
      shapeLRightToUp.pos2 = root - (width * 2)
      shapeLRightToUp.pos3 = root - ((width * 2) + 1)
      console.log(shapeLRightToUp)
      shapePos = 'up'
      activeShape(shapeLRightToUp)
      return
    }
    if (shapePos === 'up') {
      shapeLUpToLeft.pos1 = root - 1
      shapeLUpToLeft.pos2 = root - 2
      shapeLUpToLeft.pos3 = (root - 2) + width
      console.log(shapeLUpToLeft)
      shapePos = 'left'
      activeShape(shapeLUpToLeft)
      return
    }
    if (shapePos === 'left') {
      shapeLLeftToDown.pos1 = root + width
      shapeLLeftToDown.pos2 = root + (width * 2)
      shapeLLeftToDown.pos3 = root + (width * 2) + 1
      console.log(shapeLLeftToDown)
      shapePos = 'down'
      activeShape(shapeLLeftToDown)

      return
    }
    if (shapePos === 'down') {

    }
    if (shapePos === 'right') {

    }
    if (shapePos === 'up') {

    }
    if (shapePos === 'left') {

    }
  }
  if (key === 's') {
    root += width
    if (shapePos === s)
    updateShape()
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

let shapePos = 'down'
gridTest.forEach(cell => {
  console.log(gridTest.indexOf(cell))
  const pos = gridTest.indexOf(cell)

})

function activeShape(shape) {
  gridTest.forEach((cell) => {
    if (Object.values(shape).includes(gridTest.indexOf(cell))) {
      cell.classList.add('blue')
      console.log('Works!')
    } else {
      cell.classList.remove('blue')
    }

  })
}


function updateShape(){
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
}
