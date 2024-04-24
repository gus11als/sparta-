document.addEventListener("DOMContentLoaded", function () {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmU3MGI5MTM3MTAyZTNiMzQ1MzVmODY2YTUyNmFmNiIsInN1YiI6IjY2MjYxNjg0YjlhMGJkMDE3YWQ3MGNjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xDW6hnB6sUHXkWREgBqj_AEqaXzsgaqea4t8wqToZqE'
        }
    };

    
    
    let responseData; // TMDB API 응답 데이터를 저장할 전역 변수

    // 영화 정보를 가져와서 화면에 표시하는 함수
    function fetchAndDisplayMovies() {
        fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
            .then(response => response.json())
            .then(data => {
                responseData = data; // 전역 변수에 응답 데이터를 저장
                const movieCardsContainer = document.getElementById('movie-cards');
                movieCardsContainer.innerHTML = ''; // 기존 카드 삭제
                data.results.forEach(movie => {
                    const card = document.createElement('div');
                    card.classList.add('movie-card');

                    const title = document.createElement('h2');
                    title.textContent = movie.title;

                    const overview = document.createElement('p');
                    overview.textContent = movie.overview;

                    const poster = document.createElement('img');
                    poster.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
                    poster.alt = movie.title;

                    const voteAverage = document.createElement('p');
                    voteAverage.textContent = `평점: ${movie.vote_average}`;

                    card.appendChild(poster);
                    card.appendChild(title);
                    card.appendChild(overview);
                    card.appendChild(voteAverage);

                    // 클릭 이벤트 리스너 추가
                    card.addEventListener('click', () => {
                        alert(`해당 영화의 ID: ${movie.id}`);
                    });

                    movieCardsContainer.appendChild(card);
                });
            })
            .catch(err => console.error(err));
    }

    // 페이지 로드 시 영화 정보 가져와서 화면에 표시
    fetchAndDisplayMovies();

    // 검색 버튼과 입력 필드 요소를 가져옵니다.
    const searchInput = document.querySelector('.movietext');
    const searchBtn = document.getElementById('search_btn');

    // 영화 검색 함수를 정의합니다.
    function searchMovies() {
        // 입력된 검색어를 소문자로 변환합니다.
        const searchText = searchInput.value.toLowerCase();

        // 검색 결과를 담을 배열을 초기화합니다.
        const searchResults = responseData.results.filter(movie => {
            const title = movie.title.toLowerCase();

            // 제목에 검색어가 포함되어 있는 경우 해당 영화를 결과 배열에 포함합니다.
            return title.includes(searchText);
        });

        // 이전에 생성된 영화 카드를 모두 제거합니다.
        const movieCardsContainer = document.getElementById('movie-cards');
        movieCardsContainer.innerHTML = '';

        // 검색 결과를 반영하여 새로운 영화 카드를 생성합니다.
        searchResults.forEach(movie => {
            const card = document.createElement('div');
            card.classList.add('movie-card');

            const title = document.createElement('h2');
            title.textContent = movie.title;

            const overview = document.createElement('p');
            overview.textContent = movie.overview;

            const poster = document.createElement('img');
            poster.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
            poster.alt = movie.title;

            const voteAverage = document.createElement('p');
            voteAverage.textContent = `평점: ${movie.vote_average}`;

            card.appendChild(poster);
            card.appendChild(title);
            card.appendChild(overview);
            card.appendChild(voteAverage);

            // 클릭 이벤트 리스너 추가
            card.addEventListener('click', () => {
                alert(`해당 영화의 ID: ${movie.id}`);
            });

            movieCardsContainer.appendChild(card);
        });
    }

    // 검색 버튼에 클릭 이벤트를 추가합니다.
    searchBtn.addEventListener('click', searchMovies);
    
});
