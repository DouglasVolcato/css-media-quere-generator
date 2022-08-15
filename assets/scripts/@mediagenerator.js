const inputCss = `
    header, footer{
    height: 7vw;
    border: solid 0.5vw rgb(73, 93, 204);
    }
    .repositoryList section{
      margin: 1vw;
      border: solid 0.14vw;
    }
`;
console.log(cssResponsivity(inputCss));

//mainly function
function cssResponsivity(css) {
  //convert text(string) to arr
  const arr = textToArr(css);

  //give vw location in arr
  const locations = findVw(arr);

  //extract numbers and clean text
  //obj.numbers
  //obj.textArr
  const obj = extractNumbers(arr, locations, inputCss);

  //configurations for @media
  //Width always in decrescent order
  const mediaQuereConfig = {
    width: [1000, 900, 800, 700, 600, 500],
    multiplier: [3],
  };

  //return @media(arr format)
  const arrMediaQuere = mediaGenerator(
    css,
    obj.numbers,
    obj.textArr,
    mediaQuereConfig
  );

  //convert @media to string
  return arrToText(arrMediaQuere);
}

//convert text(string) to arr
function textToArr(text) {
  const arr = [];
  for (i = 0; i < text.length; i++) {
    arr.push(text[i]);
  }
  return arr;
}

//give vw location in arr
function findVw(arr) {
  const locations = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "v" && arr[i + 1] === "w") {
      locations.push(i);
    }
  }
  return locations;
}

//extract numbers and clean text
function extractNumbers(arr, locations) {
  const characters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
  const arrNumbers = [];
  const locationNumbers = [];
  const newTextArr = arr;

  for (let i = arr.length - 1; i >= 0; i--) {
    for (let n = 0; n < locations.length; n++) {
      if (i === locations[n]) {
        let num = "";

        if (characters.includes(arr[i - 7])) {
          num = num + arr[i - 7];
          locationNumbers.push(i - 7);
        }
        if (characters.includes(arr[i - 6])) {
          num = num + arr[i - 6];
          locationNumbers.push(i - 6);
        }
        if (characters.includes(arr[i - 5])) {
          num = num + arr[i - 5];
          locationNumbers.push(i - 5);
        }
        if (characters.includes(arr[i - 4])) {
          num = num + arr[i - 4];
          locationNumbers.push(i - 4);
        }
        if (characters.includes(arr[i - 3])) {
          num = num + arr[i - 3];
          locationNumbers.push(i - 3);
        }
        if (characters.includes(arr[i - 2])) {
          num = num + arr[i - 2];
          locationNumbers.push(i - 2);
        }
        if (characters.includes(arr[i - 1])) {
          num = num + arr[i - 1];
          locationNumbers.push(i - 1);
        }
        arrNumbers.push(Number(num));
      }
    }
  }

  for (let i = newTextArr.length - 1; i >= 0; i--) {
    for (let n = 0; n < locations.length; n++) {
      if (i === locations[n]) {
        if (characters.includes(newTextArr[i - 1])) {
          newTextArr.splice(i - 1, 1);
        }
        if (characters.includes(newTextArr[i - 2])) {
          newTextArr.splice(i - 2, 1);
        }
        if (characters.includes(newTextArr[i - 3])) {
          newTextArr.splice(i - 3, 1);
        }
        if (characters.includes(newTextArr[i - 4])) {
          newTextArr.splice(i - 4, 1);
        }
        if (characters.includes(newTextArr[i - 5])) {
          newTextArr.splice(i - 5, 1);
        }
        if (characters.includes(newTextArr[i - 6])) {
          newTextArr.splice(i - 6, 1);
        }
        if (characters.includes(newTextArr[i - 7])) {
          newTextArr.splice(i - 7, 1);
        }
      }
    }
  }

  const obj = {
    numbers: arrNumbers,
    textArr: newTextArr,
  };

  return obj;
}

//return @media(arr format)
function mediaGenerator(css, numbersArr, textArr, mediaQuere) {
  const text = textArr;
  const locations = [];
  const completeTextArr = [];

  for (let i = text.length - 1; i >= 0; i--) {
    if (text[i] == "v" && text[i + 1] == "w") {
      locations.push(i);
    }
  }

  for (let i = 0; i < mediaQuere.width.length; i++) {
    const modifiedNumbers = numbersArr.map(
      (num) => num + Number(mediaQuere.multiplier) * i
    );
    let count = 0;
    const cache = text;

    for (let n of locations) {
      cache.splice(n, 1, modifiedNumbers[count] + "v");
      count++;
    }
    completeTextArr.push([
      `@media(max-width: ${mediaQuere.width[i]}px){`,
      ...cache,
      "\n}",
    ]);
  }

  return completeTextArr;
}

//convert arr to text(string)
function arrToText(arr) {
  let string = "";
  for (let n of arr) {
    for (let i of n) {
      string = string + i;
    }
  }
  return string;
}
