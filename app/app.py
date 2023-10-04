from flask import Flask, request, jsonify
# from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin
import utilities as ut
from PIL import Image
from io import BytesIO
import json

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": ["https://j9a307.p.ssafy.io:3000/*", "http://localhost:3000/*", "http://localhost*"]}})

@app.route('/api/v1/marriage-stuffs', methods=['GET'])
def health_check():
    return ut.rspns(data = {'success' : 'server alive'}, status_code=200)

@app.route('/api/v1/marriage-stuffs/categories', methods = ['GET'])
def category_list():
    try:
        with open('./data/categories.json', 'r', encoding='utf-8') as file:
            categories = json.load(file)
        return jsonify(categories), 200
    except Exception as err:
        return jsonify({'error' : str(err)}), 400
        

@app.route('/api/v1/marriage-stuffs/category_detail', methods=['GET'])
def category_detail():
    try:
        category = request.args.get('category')
        subcategory = request.args.get('subcategory')
        category_data = ut.product_category(category = category, subcategory = subcategory)
        return jsonify(category_data), 200
    except Exception as err:
        return jsonify({'error' : str(err)}), 400

@app.route('/api/v1/marriage-stuffs/liked_items', methods=['POST'])
def liked_items():
    try:
        idxs = request.form.data
        category = request.args.get('category')
        subcategory = request.args.get('subcategory')
        liked_items = ut.product_liked_items(idxs, category, subcategory)
        return jsonify(liked_items), 200
    except Exception as e:
        return jsonify({'error':str(e)}), 400


@app.route('/api/v1/marriage-stuffs/catalogue', methods=['GET'])
def item_catalogue():
    try:
        category, subcategory, hprice, lprice, brand, page = ut.get_params(request)
        filtered_data = ut.range_filter(category, subcategory, hprice, lprice, brand, page)
        return jsonify(filtered_data), 200
    except Exception as err:
        return jsonify({'error' : str(err)}), 400


@app.route('/api/v1/marriage-stuffs/img_search', methods=['POST'])
def cos_sim_search():
    try:
        category, subcategory, hprice, lprice, brand, page = ut.get_params(request)
        img = request.files.get('image')
        img = img.read()
        img = Image.open(BytesIO(img))
        img = ut.image_processor(img)
        sim = ut.sim_search(img, category, subcategory, hprice, lprice, brand)
        return jsonify(sim), 200
    except Exception as e:
        return jsonify({'error':str(e)}), 400

@app.route('/api/v1/loanupload', methods=['POST'])
def loan_upload():
    # credit score / necessary money / user token data
    # request.files.get('credit_score')
    # request.files.get('necessary_money')
    # request.files.get('user_token')
    if 'credit_score' in request.files and 'necessary_money' in request.files and 'user_token' in request.files:
        credit_score = request.files.get('credit_score').read()
        credit_score = credit_score.decode('utf-8')
        necessary_money = request.files.get('necessary_money').read()
        necessary_money = necessary_money.decode('utf-8')
        user_token = request.files.get('user_token').read()
        user_token = user_token.decode('utf-8')
        # loan_analysis
        '''
        loan_analysis function's return results
        '''
        return ut.rspns(data = {'result':True}, status_code=200)
    else:
        return ut.rspns(data = {'result':False}, status_code=400)

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')
