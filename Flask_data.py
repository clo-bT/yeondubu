from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os
import json
from prac import credit_scores

app = Flask(__name__)
# CORS(app)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route('/api')
def home():
    return "okay"

@app.route('/api/imgupload', methods=['POST'])
# @cross_origin(origin='*localhost',headers=['Content- Type','Authorization','video/x-matroska;codecs=avc1', 'audio/ogg codecs=opus', 'audio/wav'])
def image_upload():
    # image data / brand data / cost data / user token data
    # request.files.get('img')
    # request.files.get('brand')
    # request.files.get('cost')
    # request.files.get('user_token')
    if 'img' in request.files and 'brand' in request.files and 'cost' in request.files and 'user_token' in request.files:
        img_file = request.files.get('img')
        img_data = img_file.read()
        img_file.seek(0)
        brand = request.files.get('brand').read()
        brand = brand.decode('utf-8')
        cost = request.files.get('cost').read()
        cost = cost.decode('utf-8')
        user_token = request.files.get('user_token').read()
        user_token = user_token.decode('utf-8')
        # img_analysis
        img_path = f'./dataset/img_data_{user_token}_1.jpg'
        with open(img_path, 'wb') as f:
            f.write(img_data)
        '''
        사진 처리하는 함수에 
        image / brand / cost data 넣기
        처리결과물 받은 변수 : result
        '''
        if os.path.exists(img_path):
            os.remove(img_path)
    
        return jsonify({'result': result})
    else:
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
        results = credit_scores(credit_score, necessary_money)
        return jsonify({'result': results})
    else:
        return jsonify({'success': False})

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')
