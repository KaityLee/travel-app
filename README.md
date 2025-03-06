# 📌 To-Do & Calendar App

## 1. 프로젝트 소개
이 프로젝트는 React와 Spring Boot를 사용하여 만든 **할 일(To-Do) & 일정(Calendar) 관리 웹 애플리케이션**입니다.  
기본적인 CRUD 기능을 포함하며, 추가로 ✅ "○○○ 기능" ✅ "○○○ 기능"을 구현했습니다.

## 2. 실행 방법

#### **프론트엔드 실행 방법**
### 🖥️ 프론트엔드 실행 (React)
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
### 🗄️ 백엔드 실행 (Spring Boot)
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


## 3. 주요 기능
✔ 할 일(To-Do) 관리  
✔ 일정(Calendar) 관리  
✔ ○○○ (추가 기능 1)  
✔ ○○○ (추가 기능 2)  


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

### 📌 **개발 환경**  
- **Java 17**  
- **Node.js (React 실행용)**

## 5. API 명세 (Swagger 제공)

이 프로젝트의 API 명세는 Swagger를 사용하여 작성되었습니다.  
아래 링크에서 API 요청과 응답 예제를 확인할 수 있습니다.

📌 **Swagger UI :** [http://localhost:8081/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)  
📌 **OpenAPI JSON 문서 :** [http://localhost:8081/v3/api-docs](http://localhost:8080/v3/api-docs)

---
### ✅ 주요 API 목록

### 📌 Trip API
| HTTP Method | Endpoint | 설명 |
|------------|---------|-----|
| GET | `/api/trip` | 모든 여행(Trip) 조회 |
| GET | `/api/trip/{id}` | 특정 여행(Trip) 조회 |
| POST | `/api/trip` | 여행(Trip) 생성 |
| PUT | `/api/trip` | 여행(Trip) 수정 |
| DELETE | `/api/trip/{id}` | 여행(Trip) 삭제 |
---------

### 📌 Itinerary API
| HTTP Method | Endpoint | 설명 |
|------------|---------|-----|
| GET | `/api/itinerary/trip/{tripId}` | 특정 여행(Trip)에 속한 일정(Itinerary) 조회 |
| GET | `/api/itinerary/{id}` | 특정 일정(Itinerary) 조회 |
| POST | `/api/itinerary` | 일정(Itinerary) 생성 |
| PUT | `/api/itinerary` | 일정(Itinerary) 수정 |
| DELETE | `/api/itinerary/{id}` | 일정(Itinerary) 삭제 |
---

### 📌 Task API
| HTTP Method | Endpoint | 설명 |
|------------|---------|-----|
| GET | `/api/task` | 모든 할 일(Task) 조회 |
| GET | `/api/task/{id}` | 특정 할 일(Task) 조회 |
| POST | `/api/task` | 할 일(Task) 생성 |
| PUT | `/api/task` | 할 일(Task) 수정 |
| DELETE | `/api/task/{id}` | 할 일(Task) 삭제 |



📌 **Swagger를 이용하면 API를 직접 실행해볼 수 있습니다.**

## 6. 추가 구현 기능 (필수)
✅ ○○○ 기능 추가
