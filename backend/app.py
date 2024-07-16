# backend/app.py
from flask import Flask, request, jsonify
import psycopg2

app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(
        host="database",
        database="scheduling_db",
        user="user",
        password="password"
    )
    return conn

@app.route('/appointments', methods=['GET', 'POST'])
def manage_appointments():
    conn = get_db_connection()
    cur = conn.cursor()

    if request.method == 'GET':
        cur.execute('SELECT * FROM appointments;')
        appointments = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify(appointments)

    if request.method == 'POST':
        new_appointment = request.json
        cur.execute('INSERT INTO appointments (patient_id, date, time) VALUES (%s, %s, %s)',
                    (new_appointment['patient_id'], new_appointment['date'], new_appointment['time']))
        conn.commit()
        cur.close()
        conn.close()
        return jsonify(new_appointment), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
