CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    patient_id INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL
);
