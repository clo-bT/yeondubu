from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os
import json
from prac import credit_scores
import pandas as pd

app = Flask(__name__)
# CORS(app)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route('/api')
def home():
    return "okay"


def calculate(mon): # 자산 대비 부채 비율
    year = mon * 12
    lia_df = pd.read_csv("preprocess_liabilities.csv", header=None) # 부채
    ass_df = pd.read_csv("preprocess_assets.csv", header=None) # 자산
    if year < 10000000:
        return 100 * lia_df.iloc[0][1] / ass_df.iloc[0][1]
    elif year < 30000000:
        return 100 * lia_df.iloc[1][1] / ass_df.iloc[1][1]
    elif year < 50000000:
        return 100 * lia_df.iloc[2][1] / ass_df.iloc[2][1]
    elif year < 70000000:
        return 100 * lia_df.iloc[3][1] / ass_df.iloc[3][1]
    elif year < 100000000:
        return 100 * lia_df.iloc[4][1] / ass_df.iloc[4][1]
    else:
        return 100 * lia_df.iloc[5][1] / ass_df.iloc[5][1]
    
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
    # credit score / loans money / user token data
    # request.files.get('salary') # 고정 수입
    # request.files.get('credit_score') # 신용점수
    # request.files.get('loans_money') # 대출 금액
    # request.files.get('loans_period') # 상환 기간
    # request.files.get('user_token') # 유저 토큰
    if 'salary' in request.files and 'credit_score' in request.files and 'loans_period' in request.files and 'loans_money' in request.files and 'user_token' in request.files:
        salary = request.files.get('salary').read()
        salary = salary.decode('utf-8')
        credit_score = request.files.get('credit_score').read()
        credit_score = credit_score.decode('utf-8')
        loans_money = request.files.get('loans_money').read()
        loans_money = loans_money.decode('utf-8')
        loans_period = request.files.get('loans_period').read()
        loans_period = loans_period.decode('utf-8')
        user_token = request.files.get('user_token').read()
        user_token = user_token.decode('utf-8')
        rate = calculate(salary) # 속한 수입 구간의 평균 자산 대비 부채 비율
        # loan_analysis
        results = credit_scores(salary, credit_score, loans_money, loans_period, rate)
        return jsonify({'result': results})
    else:
        return jsonify({'success': False})

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')