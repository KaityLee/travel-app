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
