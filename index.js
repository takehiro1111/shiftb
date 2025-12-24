/*
  以下の問題をJavaScriptので解いてください。

  必ず、
  1. 関数を定義
  2. 引数となる定数を定義
  3. 関数の引数に2で定義した定数を渡して、関数を呼び出す。その結果をconsole.logする
  の順番で記述してください。
*/

/*
  例題
*/
// 問題: 以下のようなオブジェクトを受け取り、nameとageを返す関数を作成してください
// 例): 引数: { name: '太郎', age: 20 }, 返り値: '太郎は20歳です'

// 回答例:
// 1. 関数を定義
const formatPersonIntroduction = (person) => {
  return person.name + "は" + person.age + "歳です";
};

// 2. 引数となる定数を定義
const person = { name: "太郎", age: 20 };

// 3. 関数の引数に2で定義した定数を渡して、関数を呼び出す。その結果をconsole.logする
console.log(formatPersonIntroduction(person));

/*
  問題
*/

// 問題1: 引数として受け取った数値を2倍にして返す関数を作成して実行してください。
// 例) 引数: 2, 返り値: 4
const double = (num) => num * 2;

const num1 = 2;

console.log(double(num1));

// 問題2: 最大値を返す関数を作成して実行してください。
// 例) 引数: [1, 3, 2, 5, 4], 返り値: 5
// ※ 引数の数は何個でも受け取れる様にしてください
// ※ Math.maxは使用しないでください
const maxElement = (array) => {
  let maxNum = 0;
  for (const num of array) {
    if (num > maxNum) maxNum = num;
  }

  return maxNum;
};

const array2 = [1, 3, 2, 5, 4];

console.log(maxElement(array2));

// 問題3: 配列を引数として受け取り、偶数のみを返す関数を作成して実行してください。
// 例) 引数: [1, 2, 3, 4, 5, 6], 返り値: [2, 4, 6]
const even = (array) => array.filter((element) => element % 2 === 0);

const array3 = [1, 2, 3, 4, 5, 6];

console.log(even(array3));

// 問題4: 配列内の重複を除去する関数を作成して実行してください。
// 例) 引数: [1, 2, 3, 2, 4, 5, 6, 5, 6], 返り値: [1, 2, 3, 4, 5, 6]

const duplicateRemoval = (array) => {
  const newArray = array.filter(
    (element, index) => array.indexOf(element) == index
  );
  return newArray;
};

const array4 = [1, 2, 3, 2, 4, 5, 6, 5, 6];

console.log(duplicateRemoval(array4));

// 問題5: テンプレートリテラルを使用して、引数で受け取った名前を元に「こんにちは、○○さん」と出力する関数を作成して実行してください。
// 例) 引数: '太郎', 出力: こんにちは、太郎さん
const greeting = (name) => `こんにちは、${name}さん`;

const name5 = "太郎";

console.log(greeting(name5));

// 問題6: 配列を引数として受け取り、各要素を2倍にした新しい配列を返す関数を作成して実行してください。
// 例) 引数: [1, 2, 3], 返り値: [2, 4, 6]
const doubleArray = (array) => array.map((element) => element * 2);

const array6 = [1, 2, 3];

console.log(doubleArray(array6));

// 問題7: 文字列の配列を受け取り、index番号を付けたオブジェクトを返す関数を作成して実行してください。
// 例) 引数: ['a', 'b', 'c'], 返り値: [{ index: 0, value: 'a' }, { index: 1, value: 'b' }, { index: 2, value: 'c' }]
const genNewObj = (array) => {
  return array.map((value, index) => {
    index, value;
  });
};

const array7 = ["a", "b", "c"];

console.log(genNewObj(array7));

// 問題8: 名前と年齢オブジェクトの配列を受け取り、ageが第二引数で受け取った数字と一致するオブジェクトを返す関数を作成して実行してください。
// 例) 第一引数: [{ name: '太郎', age: 20 }, { name: '次郎', age: 30 }, { name: '三郎', age: 40 }]
//     第二引数: 30
//     返り値: { name: '次郎', age: 30 }
const ageJudge = (persons, age) => persons.find((person) => person.age === age);

const persons8 = [
  { name: "太郎", age: 20 },
  { name: "次郎", age: 30 },
  { name: "三郎", age: 40 },
];
const age8 = 30;

console.log(ageJudge(persons8, age8));

// 問題9: 数字の配列を引数として受け取り、偶数のみをフィルタリングし、その後各要素を2倍にした新しい配列を返す関数を作成して実行してください。
// 例) 引数: [1, 2, 3, 4, 5, 6], 返り値: [4, 8, 12]
const evenFilter = (array) => {
  return array
    .filter((element) => element % 2 === 0)
    .map((element) => element * 2);
};

const array9 = [1, 2, 3, 4, 5, 6];

console.log(evenFilter(array9));

// 問題10: 数字の配列を引数として受け取り、各要素に10を足し、その後偶数のみをフィルタリングし、最後に要素を昇順にソートした新しい配列を返す関数を作成して実行してください。
// 例) 引数: [1, 2, 3, 4, 5, 6], 返り値: [12, 14, 16]
const sortNumber = (array) =>
  array
    .map((num) => num + 10)
    .filter((element) => element % 2 === 0)
    .sort((a, b) => a - b);

const array10 = [1, 2, 3, 4, 5, 6];

console.log(sortNumber(array10));
