export const getFilledArray = (length) => {
  return [...Array(length).keys()].map(n => n + 1);
}

function getRandomPoint(height, width) {
  return {
    x: Math.random() * width,
    y: Math.random() * height
  };
}

function rectanglesIntersect(r1, r2) {
  return !(r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top);
}

function squaresIntersects(s1, s2, size) {
  return rectanglesIntersect(
    {
      left: s1.left,
      right: s1.left + size,
      top: s1.top,
      bottom: s1.top + size
    }, {
    left: s2.left,
    right: s2.left + size,
    top: s2.top,
    bottom: s2.top + size
  })
}

export function removeRandomElements(array, n) {
  while (n--) {
    array.splice(Math.floor(Math.random() * array.length), 1);
  }
  return array;
}

export function getRandomSquares(length, size, height, width) {
  let squares = [];
  let counter = 0;
  while (squares.length < length) {
    //TODO: Merge those two statements.
    const point = getRandomPoint(height - size, width - size);
    const newSquare = { left: point.x, top: point.y };
    if (!squares.some(s => squaresIntersects(s, newSquare, size))) {
      squares.push(newSquare);
      counter = 0;
    }
    counter++;
    if (counter === 1e6)
      throw new Error("Infinite loop detected!");
  }
  return squares;
}