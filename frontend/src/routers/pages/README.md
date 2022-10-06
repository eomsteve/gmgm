# pages

필요한 페이지를 저장해 놓은 폴더
## 폴더 구조
```
📦pages
 ┣ 📂CheckList
 ┃ ┣ 📜CheckList.tsx
 ┃ ┣ 📜CheckLists.tsx
 ┃ ┗ 📜CheckListSelection.tsx
 ┣ 📂Detail
 ┃ ┗ 📜Detail.tsx
 ┣ 📂Favorite
 ┃ ┣ 📜Favorite.tsx
 ┃ ┣ 📜FavoriteIndex.tsx
 ┃ ┗ 📜FavoriteListSelection.tsx
 ┣ 📂user
 ┃ ┣ 📜LogIn.tsx
 ┃ ┗ 📜SignUpPage.tsx
 ┣ 📜Main.tsx
 ┣ 📜README.md
 ┗ 📜Spinner.tsx
 ```


### Checklist

* Checklist.tsx : 체크리스트 조회, 수정, 삭제 기능이 있는 페이지
  * 랜더링 되는 컴포넌트 : [BusinessSelector](../../components/checkList/CheckListMainBusinessSelector.tsx)
* Checklists.tsx : 장보기 내역 페이지 로딩
* CheckListSelection.tsx : 체크리스트중 가격 비교가 가능한 체크리스트를 생성하기 위한 선택창을 카테고리부터 하나씩 랜더링한다.

### Detail
* Detail.tsx : 상품이나 품목의 1년 동안의 가격 추세를 찾아보고 계산하여 비교할 수 있는 페이지 
  * 랜더링 되는 컴포넌트 : [DetailSelectBox](../../components/Detail/DetailSelect.tsx)

### Favorite
* Favorite.tsx : 즐겨찾기 페이지의 router를 위한 index페이지
* FavoriteIndex.tsx : 즐겨찾기 페이지를 랜더링하기 위해 데이터를 받아오고 각각의 컴포넌트에 맞는 데이터를 내려주는 페이지
  * 랜더링 되는 컴포넌트 
    * [FavoriteIndexCart](../../components/charts/FavoriteIndexChart.tsx) : 국가 소비자 지수와 사용자가 넣은 차트 데이터를 랜더링하는 컴포넌트
    * [SelectBox](../../components/favorite/FavoriteSelectBox.tsx.tsx) : 온라인과 오프라인을 선택하며 선택한 인자에 따라 다른 가격 데이터를 랜더링한다. 사용자가 구독하고 있는 상품 품목과 추가를 위한 선택 페이지 네비게이션이 있다.
    * [PriceChart](../../components/favorite/PriceChart.tsx): 총합 가격 차트 데이터

### user

* LogIn.tsx : 로그인 컴포넌트를 랜더링, 페이지 라우팅을 위한 페이지
* SignUpPage.tsx : 회원가입 컴포넌트를 랜더링, 페이지 라우팅을 위한 페이지


### Main
메인 페이지를 랜더링하는 페이지

### Spinner 

로딩창 페이지