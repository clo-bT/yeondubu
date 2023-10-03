from flask import Flask, request, jsonify
# from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin
import utilities as ut
from PIL import Image
from io import BytesIO

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": ["https://j9a307.p.ssafy.io:3000/*", "http://localhost:3000/*", "http://localhost*"]}})

@app.route('/api', methods=['GET'])
def health_check():
    return ut.rspns(data = {'success' : 'server alive'}, status_code=200)


@app.route('/api/v1/categories', methods=['GET'])
def category_list():
    if request.method == 'GET':
        try:
            category = request.args.get('category')
            subcategory = request.args.get('subcategory')
            category_data = ut.product_category(category = category, subcategory = subcategory)
            print(category_data)
            return jsonify(category_data), 200
        except Exception as err:
            return jsonify({'error' : str(err)}), 400


@app.route('/api/v1/paging', methods=['GET'])
def page_items():
    if request.method == 'GET':
        try:
            data = {key : value for key, value in request.form.items()}
            if ut.check_keys(data, ['category', 'subcategory', 'hprice', 'lprice', 'category', 'brand', 'count', 'pages']):
                raise KeyError
            if data['brand'] == '':
                data['brand'] = ut.brand_none_included(data)
            filtered_data = ut.range_filter(data)
            return jsonify(filtered_data), 200
        except Exception as err:
            return jsonify({'error' : str(err)}), 400


@app.route('/api/v1/shopping_filter', methods=['POST'])
def image_based_recommendations():
    try:
        data = {key : value for key, value in request.form.items()}
        if not ut.check_keys(data, ['category', 'subcategory', 'hprice', 'lprice', 'category', 'brand', 'count']):
            if data['brand'] == '':
                data['brand'] = ut.brand_none_included(data)
            img = request.files.get('image')
            img = img.read()
            img = Image.open(BytesIO(img))
            img = ut.image_processor(img)
            sim = ut.sim_search(img, data)
            return jsonify(sim), 200
        else:
            raise KeyError
    except KeyError as ke:
        return jsonify({'error':str(ke)}), 400

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
