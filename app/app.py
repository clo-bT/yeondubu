from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os
import sys
from utilities import check_keys, none_brand_included, image_processor, sim_search

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": ["https://j9a307.p.ssafy.io:3000/*", "http://localhost:3000/*"]}})

@app.route('/api')
def home():
    return "okay"

@app.route('/api/imgupload', methods=['POST'])
# @cross_origin(origin='*localhost',headers=['Content- Type','Authorization','video/x-matroska;codecs=avc1', 'audio/ogg codecs=opus', 'audio/wav'])
def image_upload():
    try:
        if not request.headers.get('Content-Type'):
            raise
        data = request.form
        if check_keys(data, ['category', 'subcategory', 'brand', 'lprice', 'hprice']):
            from PIL import Image
            from io import BytesIO
            if data['brand'] == '':
                data['brand'] = none_brand_included(data)
            img = request.files.get('image')
            img = img.read()
            img = Image.open(BytesIO(img))
            img = image_processor(img)
            sim = sim_search(img, data)
            return jsonify({'success' : True, 'result': sim})
    except:
        return jsonify({'success': False})
    
@app.route('/api/loanupload', methods=['POST'])
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
        return jsonify({'result': True})
    else:
        return jsonify({'success': False})

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')
