from flask import Flask, render_template, request, jsonify
from tinydb import TinyDB, Query

app = Flask(__name__)
db = TinyDB('orders.json')

@app.route('/')
def index():
    """Renderiza a página principal"""
    return render_template('index.html')

@app.route('/api/orders', methods=['POST'])
def add_order():
    """Salva um pedido simples na TinyDB"""
    data = request.get_json()
    db.insert(data)
    return {'status': 'ok'}, 201

@app.route('/api/orders', methods=['GET'])
def get_orders():
    """Retorna todos os pedidos salvos"""
    return jsonify(db.all())

if __name__ == '__main__':
    app.run(debug=True)
