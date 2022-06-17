# Movie App

## 개요

영화 검색 및 즐겨찾기 등록이 가능한 영화 앱 프론트엔드 개발

### [배포 페이지 보기](https://kecmovies.netlify.app/)

<img width="300px" alt="스크린샷" src="https://user-images.githubusercontent.com/77032760/174318402-da187f07-6d80-4a23-9698-ea8bb2a4a36d.png">

<br />

## 로컬 실행 방법

```
$ https://github.com/kec0130/grip-movie-app.git
$ cd grip-movie-app
$ yarn
$ yarn start
```

<br />

## 기술 스택

- Framework & Language: React, TypeScript
- Data Fetching: React Query
- State Management: Recoil
- Styling: SCSS Modules

<br />

## 주요 기능 및 구현 방법

### OMDb API를 활용한 영화 검색

- React Query를 사용하여 영화 데이터를 fetch했습니다.
- API 호출 횟수를 최적화하기 위해 `refetchOnMount`, `refetchOnWindowFocus` 옵션을 false로 설정하고, 검색어가 있을 때만 enabled되도록 했습니다. 그리고 검색박스에 공백만 입력한 경우와 현재 검색어를 재검색하는 경우 역시 fetch하지 않도록 처리했습니다.

### 무한 스크롤

- `react-intersection-observer` 라이브러리를 사용하여 infinite scroll을 구현했습니다. 페이지 하단으로 스크롤하면 다음 페이지의 데이터를 받아옵니다.
- API 응답으로 오는 전체 데이터 개수로 마지막 페이지를 구하고, 현재 페이지가 마지막 페이지인 경우 다음 페이지로 넘어가지 않도록 처리했습니다.

### 즐겨찾기 추가 및 삭제

- 영화를 클릭하면 모달이 뜨고 선택한 영화를 즐겨찾기에 추가하거나 삭제할 수 있습니다.
- `localStorage`에 즐겨찾기한 영화 목록을 저장하여 새로고침해도 데이터가 사라지지 않도록 했습니다.
