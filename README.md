# 원티드 프리온보딩 - 그립컴퍼니 기업 과제

## 개요
- 영화 검색 및 즐겨찾기 등록이 가능한 영화 앱 프론트엔드 개발
- 결과물: https://kec-grip-movie-app.netlify.app/

<img width="300px" alt="스크린샷 2022-05-15 오후 3 49 19" src="https://user-images.githubusercontent.com/77032760/168460948-56216094-8e5a-41b8-b868-9aa4e57214ec.png">


## 주요 기능
- api를 활용한 영화 검색
- 스크롤로 다음 검색 결과 호출
- 즐겨찾기 추가 및 삭제
- localStorage에 즐겨찾기 데이터 저장

## 기술 스택
- Frontend: React, TypeScript
- State Management: Recoil
- Style: Sass

## 디렉토리 구조
```txt
src
├── assets                   # image files
    ├── images
    └── svgs
├── components               # common components
    ├── button
    ├── modal
    ├── header
    ├── GNB
    └── pageLayout
├── pages                    # project pages
    ├── movies                  # 영화 검색 페이지
    ├── favorites               # 영화 즐겨찾기 페이지
    └── notFound                # 404 에러 페이지
├── hooks                    # custom hooks
    ├── state                   # recoil 관련 hooks
    └── worker                  # axios 관련 hooks
├── states                   # recoil로 관리하는 states
├── services                 # api 호출 함수
├── styles                   # Sass global styles
├── types                    # type declarations
└── utils                    # helper functions

```

