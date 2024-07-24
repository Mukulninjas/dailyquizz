-- Subjects table for subjectId reference
CREATE TABLE Subjects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Chapters table
CREATE TABLE Chapters (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  subjectId INTEGER NOT NULL,
  FOREIGN KEY (subjectId) REFERENCES Subjects (id)
);

-- Exams table
CREATE TABLE Exams (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  parent INTEGER,
  child BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (parent) REFERENCES Exams (id)
);

-- Questions table
CREATE TABLE Questions (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  options TEXT[] NOT NULL,
  correctAnswers TEXT[] NOT NULL,
  solution TEXT NOT NULL,
  chapterId INTEGER NOT NULL,
  isPreviousYear BOOLEAN DEFAULT FALSE,
  previousYear DATE DEFAULT NULL,
  level VARCHAR(50) NOT NULL CHECK (level IN ('Basic', 'Intermediate', 'Advance')),
  FOREIGN KEY (chapterId) REFERENCES Chapters (id)
);
