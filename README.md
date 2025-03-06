# 📌 To-Do & Calendar App

## 1. 프로젝트 소개
이 프로젝트는 React와 Spring Boot를 사용하여 만든 **할 일(To-Do) & 일정(Calendar) 관리 웹 애플리케이션**입니다.  
기본적인 CRUD 기능을 포함하며, 추가로 ✅ "LLM 기반 할 일 추천 기능" ✅ "지도검색 기능" ✅ "환율 조회 기능"을 구현했습니다.
### 1️⃣ LLM 기반 할 일(To-Do) 추천 기능
- 사용자가 여행지나 일정관련 요구사항을 입력하면, 대규모 언어 모델(LLM)을 활용하여 관련된 할 일을 자동으로 추천합니다.
- LLM이 추천해준 답변을 체크박스 목록으로 출력하여 채팅창에서 바로 할 일(Task)을 추가 할 수 있습니다.
- 예 : "일본여행시 준비할것을 알려줘" -> "일본 여행을 준비할 때 필요한 준비사항들을 아래와 같이 정리해 보았습니다: - 비행기 티켓 예약하기 - 숙소를 예약하거나, 비지니스 호텔, 캐미핑카 등의 숙박 옵션을 결정하기 . . .  "  
### 2️⃣ 지도 검색 기능
- 여행 계획을 세울 때 특정 장소를 쉽게 검색할 수 있도록 지도 검색 기능(NominatimAPI 기반) 을 추가하였습니다.
- 사용자는 여행 일정에서 특정 장소를 선택하면, 해당 위치의 지도 정보를 바로 확인할 수 있습니다.
- 해당 데이터는 여행일정과 함께 등록됩니다.
### 3️⃣ 환율 조회 기능
- 해외 여행 준비에 필수적인 환율 정보를 실시간으로 확인할 수 있습니다.
- 특정 통화를 선택하면, 현재 환율을 자동으로 불러와 환전할 금액을 계산할 수 있습니다

## 2. 소스 빌드 및 실행 방법
### 🚀 1. 사전 준비
프로젝트를 실행하기 전에 아래 프로그램이 설치되어 있어야 합니다.
- **Java 17**  
- **Gradle**
- **MySQL 8**
- **Node.js (React 실행용)**


### 🚀 2. 데이터베이스 설정
#### ✅ MySQL에서 데이터베이스 생성
1. MySQL에 접속한 후 아래 명령어 실행
    ```sh
    CREATE DATABASE travelapp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
2. DB 사용자 계정 생성 및 권한 부여
    ```sh
    CREATE USER 'traveluser'@'localhost' IDENTIFIED BY 'qhdkscjfwj1!';
    GRANT ALL PRIVILEGES ON travelapp.* TO 'traveluser'@'localhost';
    FLUSH PRIVILEGES;
3. Spring Boot의 application-local.db.properties에 DB 정보 추가
    ```sh
    spring.datasource.url=jdbc:mysql://localhost:3306/travelapp?serverTimezone=UTC
    spring.datasource.username=traveluser
    spring.datasource.password=qhdkscjfwj1!
    spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

    spring.sql.init.mode=always
- spring.sql.init.mode=always 설정으로 서버 실행 시 자동으로 schema.sql을 실행하여 테이블을 생성합니다.

### 🚀 3.기초 데이터 삽입
#### ✅  기초 데이터 생성
    ```sh
    -- 여행 데이터 삽입
    INSERT INTO trip (tripName, destination, startDate, endDate, notes) VALUES 
    ('유럽 여행', '프랑스, 독일, 스위스', '2025-07-01', '2025-07-15', '여름 유럽 여행'),
    ('일본 여행', '도쿄, 오사카, 교토', '2025-09-10', '2025-09-20', '일본의 주요 도시 방문');

    -- 할 일 데이터 삽입
    INSERT INTO task (title, description, dueDate, status, priority) VALUES
    ('여권 갱신하기', '출국 전에 여권 유효기간을 확인하고 갱신하기', '2025-06-01 12:00:00', 'pending', 'high'),
    ('항공권 예약 확인', '출국 전에 항공권 일정을 다시 확인하기', '2025-06-05 18:00:00', 'in-progress', 'medium');

    -- 일정 데이터 삽입
    INSERT INTO itinerary (tripId, dayNumber, title, description, timeSlot, location, latitude, longitude) VALUES
    (1, 1, '에펠탑 방문', '파리의 대표 명소 에펠탑 방문', '10:30:00', '에펠탑, 파리, 프랑스', 48.8584, 2.2945),
    (2, 2, '도쿄 디즈니랜드', '놀이기구 타고 즐기기', '09:00:00', '도쿄 디즈니랜드, 일본', 35.6329, 139.8804);
- 서버를 실행하면 data.sql이 자동 실행되어 기본 데이터가 삽입됩니다.


### 🗄️ 4. 백엔드 실행 방법
 1. 프로젝트 클론 (GitHub에서 다운로드)
    ```sh
    git clone https://github.com/YOUR_USERNAME/travel-app.git
    cd travel-app/backend
2. Gradle을 이용해 빌드
    ```sh
    ./gradlew clean build
3. Spring Boot 실행
    ```sh
    java -jar target/travel-app-0.0.1-SNAPSHOT.jar

### 🖥️ 5. 프론트엔드 실행 방법
1. 프론트엔드 폴더로 이동  
   ```sh
   cd ../frontend
2. 필요한 패키지 설치
   ```sh
    npm install
3. 개발 서버 실행
    ```sh
    npm start
4. 브라우저에서 실행 확인 => 
    http://localhost:3000


## 3. 주요 라이브러리

### 🖥️ 프론트엔드 (React)
- **React 19** → UI 개발을 위한 프레임워크  
- **Ant Design** → 직관적인 UI 디자인을 위해 사용  
- **Axios** → API 요청을 쉽게 관리하기 위해 사용  
- **@ant-design/icons** → 다양한 아이콘을 적용하기 위해 사용  

### 🗄️ 백엔드 (Spring Boot)
- **Spring Boot 3.4.3** → REST API 개발  
- **MyBatis 3.0.4** → MySQL과 매핑하여 SQL 쿼리를 쉽게 관리하기 위해 사용  
- **Lombok** → 코드 간소화를 위해 사용 (@Getter, @Setter 등)  
- **Spring Boot DevTools** → 개발 환경에서 코드 변경을 빠르게 반영하기 위해 사용  
- **H2 Database** → 개발 환경에서 임시 데이터베이스로 사용  
- **MySQL Connector** → MySQL DB 연결을 위해 사용  
- **JUnit** → 테스트 코드 작성 및 실행  

## 4. API 명세

이 프로젝트의 API 명세는 Swagger를 사용하여 작성되었습니다.  
아래 링크에서 API 요청과 응답 예제를 확인할 수 있습니다.

📌 **Swagger UI :** [http://localhost:8081/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)  
📌 **OpenAPI JSON 문서 :** [http://localhost:8081/v3/api-docs](http://localhost:8080/v3/api-docs)

### ✅ 주요 API 목록

### 1. Trip API
| HTTP Method | Endpoint | 설명 |
|------------|---------|-----|
| GET | `/api/trip` | 모든 여행(Trip) 조회 |
| GET | `/api/trip/{id}` | 특정 여행(Trip) 조회 |
| POST | `/api/trip` | 여행(Trip) 생성 |
| PUT | `/api/trip` | 여행(Trip) 수정 |
| DELETE | `/api/trip/{id}` | 여행(Trip) 삭제 |
---------

### 2. Itinerary API
| HTTP Method | Endpoint | 설명 |
|------------|---------|-----|
| GET | `/api/itinerary/trip/{tripId}` | 특정 여행(Trip)에 속한 일정(Itinerary) 조회 |
| GET | `/api/itinerary/{id}` | 특정 일정(Itinerary) 조회 |
| POST | `/api/itinerary` | 일정(Itinerary) 생성 |
| PUT | `/api/itinerary` | 일정(Itinerary) 수정 |
| DELETE | `/api/itinerary/{id}` | 일정(Itinerary) 삭제 |
---

### 3. Task API
| HTTP Method | Endpoint | 설명 |
|------------|---------|-----|
| GET | `/api/task` | 모든 할 일(Task) 조회 |
| GET | `/api/task/{id}` | 특정 할 일(Task) 조회 |
| POST | `/api/task` | 할 일(Task) 생성 |
| PUT | `/api/task` | 할 일(Task) 수정 |
| DELETE | `/api/task/{id}` | 할 일(Task) 삭제 |

📌 **Swagger를 이용하면 API를 직접 실행해볼 수 있습니다.**



## 5. 테스트 케이스
테스트는 JUnit을 사용한 단위 테스트(Unit Test)와 HttpClient를 이용한 통합 테스트(Integration Test) 로 진행되었습니다.
각 테스트의 목적과 실행 방법을 아래에 정리하였습니다.

### ✅ 1. JUnit 단위 테스트
#### 📌 테스트 개요
- 주요 서비스 로직에 대한 단위 테스트를 수행
- Mockito를 활용하여 의존성을 분리하고 단위 테스트 진행
#### 📂 테스트 파일 위치
- src/test/java/com/kaity/travel/backend/domain/todo/service/TaskServiceImplTest.java
- src/test/java/com/kaity/travel/backend/domain/todo/service/TripServiceImplTest.java
- src/test/java/com/kaity/travel/backend/domain/todo/service/ItineraryServiceImplTest.java
#### 🛠 테스트 실행 방법
    ./gradlew test

### ✅ 2. API 앤드포인트 단위 테스트
#### 📌 테스트 개요
- VS Code의 REST Client 확장자를 활용하여 API 요청 및 응답을 확인할 수 있습니다.
- api.http 파일은 VS Code의 REST Client 확장자를 사용해야 실행됩니다.
(확장자가 설치되어 있지 않다면, REST Client 플러그인을 설치하세요.)
- 모든 API 요청을 api.http 파일에 기록해 두었으며, Postman에서도 동일한 요청을 보낼 수 있습니다.
#### 📂 테스트 파일 위치
- travel-app/backend/api.http
#### 🛠 테스트 실행 방법
1. VS Code에서 api.http 파일을 엽니다.
2. 각 API 요청 위에 있는 "Send Request" 버튼을 클릭합니다.
3. 응답 결과가 VS Code 내에서 바로 확인됩니다.
