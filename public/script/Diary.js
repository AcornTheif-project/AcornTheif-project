// JavaScript for Diary.html can be added here if needed
function startWord() {
    const word = document.getElementById('word').innerText;
    const myWord = document.getElementById('myword').value;

    if (myWord.startsWith(word[word.length - 1])) {
        document.getElementById('result').innerText = '정답!';
    } else {
        document.getElementById('result').innerText = '오답!';
    }
}
