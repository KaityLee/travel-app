# 📌 To-Do & Calendar App

이 프로젝트는 **할 일(To-Do)과 일정(Calendar)을 관리할 수 있는 웹 애플리케이션**입니다.  
React(프론트엔드)와 Spring Boot(백엔드)를 사용하여 개발되었으며, **MySQL을 연동한 CRUD 기능**을 제공합니다.

✅ **주요 기능**  
✔ 할 일(To-Do) 관리  
✔ 일정(Calendar) 관리  
✔ ○○○ (추가 기능 1)  
✔ ○○○ (추가 기능 2)  

## 2. 실행 방법

### 💻 프론트엔드 실행 (React)
1. 프론트엔드 폴더로 이동  
   ```sh
   cd frontend

2. 필요한 패키지 설치
   ```sh
    npm install

3. 개발 서버 실행
    ```sh
    npm start

4. 브라우저에서 실행 확인
    http://localhost:3000

#### **백엔드 실행 방법**
```md
### 🛠️ 백엔드 실행 (Spring Boot)
1. 백엔드 폴더로 이동  
   ```sh
   cd backend
   
2. MySQL 실행 후 데이터베이스 생성
    ```sh
    mysql -u root -p
    CREATE DATABASE todo_calendar;

3. Spring Boot 실행
    ```sh
    ./mvnw spring-boot:run   # (Windows는 mvnw.cmd 실행)

4. API 서버 확인
    http://localhost:8081



## 4. 사용한 주요 라이브러리

### 📌 프론트엔드 (React)
- **React 19** → UI 개발을 위한 프레임워크  
- **Ant Design** → 직관적인 UI 디자인을 위해 사용  
- **Axios** → API 요청을 쉽게 관리하기 위해 사용  
- **@ant-design/icons** → 아이콘 추가를 쉽게 하기 위해 사용  

### 📌 백엔드 (Spring Boot)
- **Spring Boot 3.4.3** → REST API 개발  
- **MyBatis 3.0.4** → MySQL과 매핑하여 SQL 쿼리를 쉽게 관리하기 위해 사용  
- **Lombok** → 코드 간소화를 위해 사용 (@Getter, @Setter 등)  
- **Spring Boot DevTools** → 개발 환경에서 코드 변경을 빠르게 반영하기 위해 사용  
- **H2 Database** → 개발 환경에서 임시 데이터베이스로 사용  
- **MySQL Connector** → MySQL DB 연결을 위해 사용  
- **JUnit** → 테스트 코드 작성 및 실행  

📌 **개발 환경**  
- **Java 17**  
- **Node.js (React 실행용)**