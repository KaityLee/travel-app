
CREATE TABLE trip (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tripName VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    notes TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE task (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    dueDate DATETIME,
    status VARCHAR(20) DEFAULT '대기 중',
    priority VARCHAR(10) DEFAULT '보통',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE itinerary (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tripId BIGINT NOT NULL,
    dayNumber INT NOT NULL,  -- Example: 1st day, 2nd day
    title VARCHAR(255) NOT NULL,
    description TEXT,
    timeSlot TIME NULL,
    location VARCHAR(255),
    address VARCHAR(255),
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tripId) REFERENCES trip(id) ON DELETE CASCADE
);
