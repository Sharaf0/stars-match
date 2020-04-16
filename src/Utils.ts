function getRandomPoint(height: number, width: number): Point {
  return {
    x: Math.random() * width,
    y: Math.random() * height
  };
}

// export function removeRandomElements(array, n) {
//   while (n--) {
//     array.splice(Math.floor(Math.random() * array.length), 1);
//   }
//   return array;
// }

export class Point {
  x: number;
  y: number;
  constructor() {
    this.x = 0;
    this.y = 0;    
  }
}
export class Square {
  left: number;
  top: number;
  size: number;
  constructor(left: number, top: number, size: number) {
    this.left = left;
    this.top = top;
    this.size = size;
  }
}

function doesSquaresIntersects(s1: Square, s2: Square): boolean {
    return !(s2.left > s1.left + s1.size ||
    s2.left + s2.size < s1.left ||
    s2.top > s1.top + s1.size ||
    s2.top + s2.size < s1.top);
}

export function getRandomSquares(numberOfRequiredSquares: number, squareSize: number, boardHeight: number, boardWidth: number): Square[] {
  let squares: Square[] = [];
  let counter = 0;
  while (squares.length < numberOfRequiredSquares) {
    const point = getRandomPoint(boardHeight - squareSize, boardWidth - squareSize);
    const newSquare = new Square(point.x, point.y, squareSize);
    if (!squares.some(s => doesSquaresIntersects(s, newSquare))) {
      squares.push(newSquare);
      counter = 0;
    }
    counter++;
    if (counter === 1e6)
      throw new Error("Infinite loop detected!");
  }
  return squares;
}