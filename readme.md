# how to use

## 최초 클론시 </br>

```bash
git checkout dev
```

1.  리모트에 기능 브랜치가 없다면 </br>

```bash
git checkout -b feature/기능브랜치
```

2. 리모트에 기능 브랜치가 있다면</br>

```bash
git checkout feature/기능브랜치
```

   </br>

`npm i` 실행
`.env` 파일 생성

```yml
# .env
TYPEORM_CONNECTION =
TYPEORM_HOST =
TYPEORM_USERNAME =
TYPEORM_PASSWORD =
TYPEORM_DATABASE =
TYPEORM_PORT =
TYPEORM_LOGGING=TRUE
PORT = 8000
DATABASE_URL=
JWT_SECRET=
```

각각의 키에 해당 하는 값 입력 (단, JWT_SECRET 값은 팀원 모두 같은 값을 적어야 함)

## dev 브랜치 연결 후/DB 스키마에 변경사항이 생겼을 때

1. dbmate 설정 파일을 migration 하여 팀원 모두 동일한 Database 설정을 가지도록 합니다.
   `.env` 의 `DATABASE_URL=`설정

```yml
DATABASE_URL="mysql://root:{root 비밀번호 - 설정하지 않았따면 콜론 채로 생략}@127.0.0.1:3306/ABCMartens"
```

2. mysql cli 에서 `ABCMartens` 로컬 데이터베이스 생성

```bash
CREATE DATABASE ABCMartens DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_general_ci
```

`작업 폴더의 root 위치에서 아래 커맨드를 실행`

```bash
dbmate migrate
```

## dev 브랜치 연결 후 dev 브랜치에 변경사항이 생겼을 때

dev 브랜치에 변경사항이 있을 때마다 자신의 `feature/~` 브렌치에서

```bash
git pull origin dev
```

로 브랜치의 버전을 업데이트

## 개인의 feature 브랜치 머지

`feature/~` 브랜치는 해당하는 기능이 개발완료 된 후(MVP 개발) `dev` 브랜치에 머지하고 슬랙에 리뷰 확인 요청을 전파합니다.

## Conventions

본 `repository`는 커밋 컨벤션은 유다시티 커밋 컨벤션을 따릅니다.

- 내용 : https://haesoo9410.tistory.com/300
