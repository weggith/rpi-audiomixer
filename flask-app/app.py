from flask import Flask, jsonify, request
import R64.GPIO as GPIO

app = Flask(__name__)

@app.route('/')
def hello_world():
    return jsonify(message="Hello, World!")

# In-memory data store
items = [{"id": 1, "name": "This is item 1"}, {"id": 2, "name": "This is item 2"}]

# GET request: Retrieve all items
@app.route('/api/items', methods=['GET'])
def get_items():
    return jsonify(items)

# GET request: Retrieve a specific item by ID
@app.route('/api/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    item = next((item for item in items if item["id"] == item_id), None)
    if item is None:
        return jsonify({"error": "Item not found"}), 404
    return jsonify(item)

# POST request: Create a new item
@app.route('/api/items', methods=['POST'])
def create_item():
    new_item = {"id": len(items) + 1, "name": request.json.get('name')}
    items.append(new_item)
    return jsonify(new_item), 201

# PUT request: Update an existing item
@app.route('/api/items/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    item = next((item for item in items if item["id"] == item_id), None)
    if item is None:
        return jsonify({"error": "Item not found"}), 404
    item['name'] = request.json.get('name', item['name'])
    return jsonify(item)

# DELETE request: Delete an item
@app.route('/api/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    global items
    items = [item for item in items if item["id"] != item_id]
    return '', 204

if __name__ == "__main__":
    app.run(debug=True)