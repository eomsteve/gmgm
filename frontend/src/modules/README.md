# Modules (redux tool kit)

폴더구조
```
📦modules
 ┣ 📜Auth.ts
 ┣ 📜CheckListProductList.ts
 ┣ 📜FavoriteProductList.ts
 ┣ 📜README.md
 ┗ 📜store.ts
 📜Index.ts
```

## 리덕스 툴킷
리덕스 리듀서를 관리하기 위한 폴더
### Auth.ts

헤더에 들어갈 인증 토큰을 받아 저장하고, 페이지 랜더링시에 불러와 인증을하는 파일
회원 로그인, 회원 로그아웃을 관리한다. 

```
logInApiRedux : 로그인 받아 엑세스 토큰 저장

logOutApiRedux : 로그아웃 

userAuthSlice : 로그인 상태를 전역으로 관리하고, 토큰관리
```

### CheckListProductList.ts

체크리스트를 전역으로 관리하기 위한 리듀서, 체크리스트에 들어가는 품목들을 전역으로 관리하여 다른 페이지에서 추가한 체크리스트 항목을 해당 페이지에서 관리한다.

```
getCheckLists : 체크리스트 페이지 입장시 해당 체크리스트 리스트 가져오기
  .fulfilled : 체크리스트 조회시 랜더링 되야 하는 리스트들을 호출하는 엑스트라 리듀서 

updateCheckListStatus : 체크리스트의 체크 상태 유무를 한번에 백으로 보내기 위한 리듀서, 체크리스트 컴포넌트가 소멸시 저장되어있던 체크리스트들을 한번에 보내 하나의 쿼리로 관리한다.

checkListProductsSlice : 체크리스트 슬라이스 리듀서 

  addBasicProducts : 체크리스트 품목 선택 페이지에서 선택된 품목을 추가하기 위한 리듀서

  updateBasicProductsStatus : 체크리스트 상태 변화시 호출

  addCustomProducts : 체크리스트에 사용자 정의 리스트 생성시 호출

  removeCustomProducts : 체크리스트 품목 선택 페이지에서 선택된 품목을 삭제하기 위한 리듀서

  updateCustomProductStatus : 사용자 정의 체크리스트의 상태 변화를 감지하여 호출하는 리듀서

  setInitialState : 체크리스트 조회시 랜더링 되야 하는 리스트들을 호출하는 리듀서

  setInitialStateWhenUnMounted : 체크리스트 컴포넌트 소멸시 체크리스트 리듀서의 State를 초기화 하기 위한 리듀서
```

### index.tsx

redux-persist 모듈을 사용하여 로컬 스토리지에 저장하고, 루트 리듀서와  Store를 설정하는 tsx 보통은 module안의 store.ts에서 관리하나, 프로젝트의 규모에 따라 인덱스에서 작업하였다.