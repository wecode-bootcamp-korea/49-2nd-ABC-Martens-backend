# how to use

1. 최초 클론시 </br>
   `git checkout dev` </br>
   1-1. 리모트에 기능 브랜치가 없다면 </br>
   `git checkout -b feature/기능브랜치` </br>
   1-2. 리모트에 기능 브랜치가 있다면</br>
   `git checkout feature/기능브랜치` </br>


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

3. dev 브랜치에 변경사항이 있을 때마다 자신의 `feature/~` 브렌치에서 `git pull origin dev`로 브랜치의 버전을 업데이트 

4. 커밋 컨벤션은 
