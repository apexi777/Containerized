import os
from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

# Конфигурация базы данных MySQL
app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST', 'localhost')
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER', 'root')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD', 'password')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB', 'users')

mysql = MySQL(app)

@app.route('/add_user', methods=['POST'])
@cross_origin()
def add_user():
    data = request.get_json()
    username = data['username']
    telephone = data['telephone']
    comment = data['comment']
    
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO users (username, telephone, comment) VALUES (%s, %s, %s)", (username, telephone, comment))
    mysql.connection.commit()
    cur.close()

    return jsonify({'message': 'User added successfully'}), 200

@app.route('/get_users', methods=['GET'])
@cross_origin()
def get_users():
    cur = mysql.connection.cursor()
    cur.execute("SELECT id, username, telephone, comment FROM users")
    data = cur.fetchall()
    cur.close()
    
    users = []
    for row in data:
        user = {
            'id': row[0],
            'username': row[1],
            'telephone': row[2],
            'comment': row[3]
        }
        users.append(user)
    
    return jsonify(users), 200

@app.route('/update_user/<int:id>', methods=['PUT'])
@cross_origin()
def update_user(id):
    data = request.get_json()
    username = data['username']
    telephone = data['telephone']
    comment = data['comment']
    
    cur = mysql.connection.cursor()
    cur.execute("UPDATE users SET username=%s, telephone=%s, comment=%s WHERE id=%s", (username, telephone, comment, id))
    mysql.connection.commit()
    cur.close()

    return jsonify({'message': 'User updated successfully'}), 200

@app.route('/delete_user/<int:id>', methods=['DELETE'])
@cross_origin()
def delete_user(id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM users WHERE id=%s", (id,))
    mysql.connection.commit()
    cur.close()

    return jsonify({'message': 'User deleted successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')


@app.route('/search', methods=['GET'])
@cross_origin()
def search():
    query = request.args.get('query')
    print(f"Received query: {query}")  # Выводим запрос в консоль
    if not query:
        return jsonify({'error': 'Query parameter is required'}), 400
    
    try:
        cur = mysql.connection.cursor()
        search_query = f"%{query}%"
        cur.execute("SELECT id, username, telephone, comment FROM users WHERE username LIKE %s OR telephone LIKE %s OR comment LIKE %s", 
                    (search_query, search_query, search_query))
        data = cur.fetchall()
        cur.close()

        results = []
        for row in data:
            result = {
                'id': row[0],
                'username': row[1],
                'telephone': row[2],
                'comment': row[3]
            }
            results.append(result)
        
        print(f"Search results: {results}")  # Выводим результаты поиска
        return jsonify(results), 200
    except Exception as e:
        print(f"Error occurred: {str(e)}")  # Выводим ошибки
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    with app.test_request_context():
        for rule in app.url_map.iter_rules():
            print(f"{rule} -> {rule.endpoint}")
    app.run(debug=True, host='0.0.0.0')

