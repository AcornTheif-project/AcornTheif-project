function searchPeople() {
    const query = document.getElementById('searchInput').value;
    const resultsContainer = document.getElementById('searchResults');

    // 검색 결과 초기화
    resultsContainer.innerHTML = '';

    // 예시 데이터 (검색 결과)
    const results = [
        { name: '윤영준', info: '친구 1', url: 'https://example.com/profile/윤영준' },
        { name: '홍길동', info: '친구 2', url: 'https://example.com/profile/홍길동' },
        { name: '이순신', info: '친구 3', url: 'https://example.com/profile/이순신' }
    ];

    // 검색 결과 필터링 (예시)
    const filteredResults = results.filter(result => result.name.includes(query));

    if (filteredResults.length > 0) {
        const ul = document.createElement('ul');
        filteredResults.forEach(result => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = result.url;
            a.textContent = `${result.name} - ${result.info}`;
            a.target = '_blank'; // 새로운 탭에서 열리도록 설정
            li.appendChild(a);
            ul.appendChild(li);
        });
        resultsContainer.appendChild(ul);
    } else {
        resultsContainer.textContent = '검색 결과가 없습니다.';
    }
}
