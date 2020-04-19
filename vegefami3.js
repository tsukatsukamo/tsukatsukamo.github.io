'const strict'
const familyList = [
    'ヒガンバナ科',
    'サトイモ科',
    'ヒユ科',
    'アブラナ科',
    'マメ科',
    'ウリ科',
    'セリ科',
    'ヒルガオ科',
    'ナス科',
    'キク科',
    'ヤマノイモ科'
];

var speciesList = [
    ['ネギ', 'タマネギ', 'ニンニク', 'ニラ'],
    ['サトイモ', 'コンニャクイモ'],
    ['ホウレンソウ', 'テンサイ(サトウダイコン)'],
    ['キャベツ', 'ダイコン', 'カリフラワー', 'ワサビ', 'ミズナ'],
    ['ダイズ', 'ラッカセイ', 'アズキ'],
    ['カボチャ', 'キュウリ', 'ゴーヤ', 'ユウガオ(カンピョウの原料)'],
    ['パセリ', 'セロリ', 'ミツバ', 'ニンジン'],
    ['サツマイモ', 'クウシンサイ'],
    ['ナス', 'ジャガイモ', 'トマト', 'ピーマン'],
    ['レタス', 'ゴボウ', 'フキ', 'シュンギク'],
    ['ヤマイモ']
];


//リストの要素から1つだけランダムに選んでくる関数
var rand = function (list) {
    a = Math.floor(Math.random() * list.length);
    return list[a];
}


//問題作成
var makeQuizList = function (familyList, speciesList) {
    quizList = []

    //リストの結合、全種リスト作成
    var allList = [];
    for (var i = 0; i < familyList.length; i++) {
        for (var ii = 0; ii < speciesList[i].length; ii++) {
            allList.push([speciesList[i][ii], familyList[i]]);
        }
    }

    //繰り返し5題作成
    //元リストから1科2種選択
    //要素が3つ以上ある科の選択
    var collectFamily = []
    while (collectFamily.length < 2) {
        collectFamilyNo = Math.floor(Math.random() * speciesList.length);
        collectFamily = speciesList[collectFamilyNo];
    }
    //document.write(collectFamily)

    //1種目の選択
    var collectSpeciesList = [];


    //重複しない2種目を追加
    while (collectSpeciesList.length < 2) {
        collectSpecies = collectFamily[Math.floor(Math.random() * collectFamily.length)]
        if (!collectSpeciesList.includes(collectSpecies)) {
            collectSpeciesList.push(collectSpecies);
        }
    }

    //document.write(collectSpeciesList)
    //全種リストで正解の科以外に含まれる種が出るまでランダム抽出

    var wrongSpeciesNo = Math.floor(Math.random() * allList.length)
    var wrongSpecies = allList[wrongSpeciesNo][0]
    while (allList[wrongSpeciesNo][1] == familyList[collectFamilyNo]) {
        var wrongSpeciesNo = Math.floor(Math.random() * allList.length);
        var wrongSpecies = allList[wrongSpeciesNo][0];

    }

    //document.write(wrongSpecies)

    quiz = [collectSpeciesList[0], collectSpeciesList[1], wrongSpecies, familyList[collectFamilyNo], allList[wrongSpeciesNo][1]];


    //全種リスト、元リストから3種削除
    for (i = 0; i < speciesList.length; i++) {
        for (ii = 0; ii < 3; ii++) {
            speciesList[i] = speciesList[i].filter(n => n !== quiz[ii]);
        }
    }

    quizList.push(quiz);
    return quizList;
}




//問題表示画面
vegeQuiz = makeQuizList(familyList, speciesList)

const quizDivided = document.getElementById('quiz-area');
const aDivided = document.getElementById('a-area');
const bDivided = document.getElementById('b-area');
const answerDivided = document.getElementById('answer-area');
const nextDivided = document.getElementById('next-area');
//出題5回

var quiz = document.createElement('h3');
quiz.innerText = '問題：' + vegeQuiz[0][0] + 'と同じ科の野菜は？';
quizDivided.appendChild(quiz);

//どちらが正解か
aOrB = Math.floor(Math.random() * 9);
if (aOrB % 2 == 0) {
    var cA = vegeQuiz[0][1]
    var cB = vegeQuiz[0][2]
} else {
    var cA = vegeQuiz[0][2]
    var cB = vegeQuiz[0][1]
}

//選択肢の表示
var choiceA = document.createElement('input');
choiceA.type = 'button';
choiceA.value = 'A. ' + cA;
choiceA.id = 0
aDivided.appendChild(choiceA);

var choiceB = document.createElement('input');
choiceB.type = 'button'
choiceB.value = 'B. ' + cB;
choiceB.id = 1
bDivided.appendChild(choiceB);



//正誤判定と表示
var answer = function (id, aOrB) {

    if (answerDivided.firstChild) {
        return;
        }


    if ((aOrB + id) % 2 == 0) {
        var thisAnswer = '正解！';
    } else {
        var thisAnswer = '不正解……';
    }



    var a0 = document.createElement('p');
    var a1 = document.createElement('p');
    var a2 = document.createElement('p');
    var a3 = document.createElement('p');

    if (id == 0) {
        a0.innerText = 'あなたの答え：' + 'A. ' + cA;
    } else {
        a0.innerText = 'あなたの答え：' + 'B. ' + cB;
    }
    a1.innerText = thisAnswer;
    a2.innerText = quizList[0][0] + 'と' + quizList[0][1] + 'は' + quizList[0][3] + 'です。';
    a3.innerText = quizList[0][2] + 'は' + quizList[0][4] + 'です';


    
        answerDivided.appendChild(a1);
        answerDivided.appendChild(a0);
        answerDivided.appendChild(a2);
        answerDivided.appendChild(a3);

        //次に進むボタンの表示

        nextButton = document.createElement('input');
        nextButton.type = 'button';
        nextButton.value = '次の問題へ';
        nextButton.id = 2
        nextDivided.appendChild(nextButton);

        document.getElementById(2).onclick = function () {
            location.reload();
        }


        //連打しても大丈夫にする
    };


    document.getElementById(0).onclick = function () {
        answer(0, aOrB)
    };

    document.getElementById(1).onclick = function () {
        answer(1, aOrB)
    };

