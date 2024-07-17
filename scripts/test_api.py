# scripts/test_api.py
import requests

BASE_URL = 'http://localhost:5000'

def test_get_appointments():
    response = requests.get(f'{BASE_URL}/appointments')
    assert response.status_code == 200

def test_post_appointment():
    new_appointment = {
        'patient_id': 1,
        'date': '2024-07-16',
        'time': '10:00:00'
    }
    response = requests.post(f'{BASE_URL}/appointments', json=new_appointment)
    assert response.status_code == 201

if __name__ == '__main__':
    test_get_appointments()
    test_post_appointment()
    print("All tests passed.")
