-- CREATE TABLE users (
--     id BIGINT AUTO_INCREMENT PRIMARY KEY,
--     username VARCHAR(50) UNIQUE NOT NULL,
--     email VARCHAR(100) UNIQUE NOT NULL,
--     password_hash VARCHAR(255) NOT NULL,
--     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

CREATE TABLE trip (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    -- user_id BIGINT NOT NULL,
    tripName VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    notes TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE task (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    -- user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    dueDate DATETIME,
    status ENUM('pending', 'completed', 'in-progress') DEFAULT 'pending',
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    travelRelated BOOLEAN DEFAULT FALSE,
    tripId BIGINT NULL,  -- Optional link to a trip
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (tripId) REFERENCES trip(id) ON DELETE SET NULL
);

CREATE TABLE calendar_event (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    -- user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    startTime DATETIME NOT NULL,
    endTime DATETIME NOT NULL,
    location VARCHAR(255),
    travelRelated BOOLEAN DEFAULT FALSE,
    tripId BIGINT NULL,  -- Optional link to a trip
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (tripId) REFERENCES trip(id) ON DELETE SET NULL
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

CREATE TABLE location (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tripId BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    notes TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tripId) REFERENCES trip(id) ON DELETE CASCADE
);
