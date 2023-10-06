from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os
from PIL import Image
from io import BytesIO
import json
from loan.Loan_page import calculate, credit_scores
import utilities as ut
from loan.checking_json import check_jsonfile

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": ["https://j9a307.p.ssafy.io*", "http://localhost*"]}})

@app.route('/api/v1/marriage-stuffs', methods=['GET'])
def health_check():
    return ut.rspns(data = {'success' : 'server alive'}, status_code=200)

@app.route('/api/v1/marriage-stuffs/category', methods = ['GET'])
def single_category():
    try:
        category = request.args.get('category')
        subcategory = request.args.get('subcategory')
        with open('./data/category.json', 'r', encoding='utf-8') as file:
            categories = json.load(file)
        name = categories[category][subcategory]
        return jsonify({'category':name}), 200
    except Exception as err:
        return jsonify({'error' : str(err)}), 400
    
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

@app.route('/api/v1/marriage-stuffs/liked_items', methods=['GET'])
def liked_items():
    try:
        idxs = request.args.get('likes')
        idxs = [int(index) for index in idxs.split(',')]
        category = request.args.get('category')
        subcategory = request.args.get('subcategory')
        liked_items = ut.liked_products(idxs, category, subcategory)
        return jsonify(liked_items), 200
    except Exception as e:
        return jsonify({'error':str(e)}), 400


@app.route('/api/v1/marriage-stuffs/catalogue', methods=['GET'])
def item_catalogue():
    try:
        category, subcategory, hprice, lprice, brand, page = ut.get_params(request)
        filtered_data = ut.range_filter(category, subcategory, hprice, lprice, brand, page)
        if not filtered_data:
            return jsonify({'result' : 'end of list'}), 204
        return jsonify(filtered_data), 200
    except Exception as err:
        return jsonify({'error' : str(err)}), 400


@app.route('/api/v1/marriage-stuffs/img_search', methods=['POST'])
def cos_sim_search():
    try:
        category = request.form.get('category')
        subcategory = request.form.get('subcategory')
        hprice = int(request.form.get('hprice'))
        lprice = int(request.form.get('lprice'))
        brand = request.form.get('brand')
        brand = brand.split(',')
        brand = brand if brand != [] else None
        img = request.files.get('image')
        img = img.read()
        img = Image.open(BytesIO(img))
        img = ut.image_processor(img)
        sim = ut.sim_search(img, category, subcategory, hprice, lprice, brand)
        return jsonify(sim), 200
    except Exception as e:
        return jsonify({'error':str(e)}), 400

@app.route('/api/v1/loan/upload', methods=['POST'])
def loan_upload():
    if request.method == 'POST':
        try:
            check = check_jsonfile() # 매월 데이터 자동 갱신
            if check:
                print('새로운 jsonfile 생성')
            else:
                print('jsonfile 이미 있음')
            json_data = request.get_json()
            try:
                salary = int(''.join(json_data['salary']['salary'].split(',')))
                creditScore = int(json_data['creditScore']['creditScore'])
                surCharge = int(json_data['surCharge']) 
                loanPeriod = int(json_data['loanPeriod']['loanPeriod'])
                totalAssets = int(''.join(json_data['totalAssets']['totalAssets'].split(',')))
            except:
                print('첫 excep에서 걸림')
                raise KeyError
            rate = calculate(salary) # 속한 수입 구간의 평균 자산 대비 부채 비율
            results = credit_scores(salary, creditScore, surCharge, loanPeriod, rate, totalAssets)
            print(results)
            return jsonify({'result': results})
        except Exception as err:
            print('두 번째 except에서 걸림')
            return jsonify({'result':str(err)}), 300
    else:
        print('마지막에서 걸림')
        return jsonify({'result':False}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')
