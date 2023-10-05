def update_loan():
    import json
    from pprint import pprint
    import requests
    from bs4 import BeautifulSoup
    import pandas as pd
    from urllib.request import urlopen
    from urllib.parse import urlencode, quote_plus, unquote
    from datetime import datetime
    
    import warnings
    warnings.filterwarnings('ignore')

    check = datetime.now()
    Now_day = str(check.year) + '-' + str(check.month)

    # 개인신용대출
    def get_loan_data(KEY, Fingroup, page):
        url = "http://finlife.fss.or.kr/finlifeapi/creditLoanProductsSearch.xml?auth={}&topFinGrpNo={}&pageNo={}".format(KEY, Fingroup, page)

        response = requests.get(url)
        if response.status_code == 200:
            # 요청 성공
            res = response.content.decode('euc-kr')
            soup = BeautifulSoup(res, 'html.parser')
            name = soup.findAll('product')
            return name
        else:
            # 요청 실패
            print("요청 실패. HTTP 상태 코드:", response.status_code)
            return []
        
    fin_grp_list = [
        '020000', # 은행
        '030300',
        '060000'
    ]
    KEY = "64e8530374d6656f19ebdbe7f7a6cc50"
    page = 1

    want_list = [
        'dcls_month', # 상품 공시일
        'kor_co_nm', # 금융회사 명
        'fin_prdt_cd', # 금융상품 코드
        'fin_prdt_nm', # 금융상품 명
        'join_way', # 가입 방법
        'crdt_prdt_type_nm', # 대출 종류 명
        'crdt_lend_rate_type_nm', # 금리 명
        'crdt_grad_1', # 900점 초과 ( 최저 금리 )
        'crdt_grad_4', # 801 ~ 900
        'crdt_grad_5', # 701 ~ 800
        'crdt_grad_6', # 601 ~ 700
        'crdt_grad_10', # 501 ~ 600
        'crdt_grad_11', # 401 ~ 500
        'crdt_grad_12', # 301 ~ 400
        'crdt_grad_13', # 0 ~ 300
        'crdt_grad_avg' # 평균 금리 
    ]

    save_list = []
    products = []
    for group in fin_grp_list:
        for page in range(1, 5):
            products += get_loan_data(KEY, group, page)
        for p in range(len(products)):
            p_list = []
            flag = 0
            for i in want_list:
                try:
                    infor = products[p].find(i).text
                    if infor == "":
                        infor = "None"
                except:
                    flag = 0
                p_list.append(infor)
            if not flag:
                save_list.append(p_list)

    col_list = [
        'dcls_month',
        'fin_company',
        'loan_code',
        'loans_name',
        'join_way',
        'loan_type',
        'rate_name',
        'rate_bottom',
        'rate_second',
        'rate_third',
        'rate_fourth',
        'rate_fifth',
        'rate_sixth',
        'rate_seventh',
        'rate_eighth',
        'rate_avg'
    ]
    df = pd.DataFrame(save_list, columns=col_list)
    check_list = [
        'rate_bottom',
        'rate_second',
        'rate_third',
        'rate_fourth',
        'rate_fifth',
        'rate_sixth',
        'rate_seventh',
        'rate_eighth',
        'rate_avg'
    ]
    for i in df:
        for idx in range(len(df)):
            try:
                if i in check_list and df.iloc[idx][i] != 'None' and not df.iloc[idx][i].isalpha():
                    df.iloc[idx][i] = float(df.iloc[idx][i])
            except:
                continue
    js_file = df.to_json(orient = 'index', force_ascii=False)
    js_obj = json.loads(js_file)
    with open('./loan/json/' + Now_day + '+final_loandata.json', 'w', encoding='utf-8') as f:
        json.dump(js_obj, f, indent="\t", ensure_ascii=False)

    with open('./loan/json/' + Now_day + '+final_loandata.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    new_dic = {}
    cnt = 0
    checklist = []
    for i in data:
        try:
            if 5 <= data[i]['rate_bottom'] < 12.5 and data[i] not in checklist:
                new_dic[str(cnt)] = data[i]
                cnt += 1
                checklist.append(data[i])
        except:
            continue
    new_dic

    with open('./loan/json/' + Now_day + '+final_loandata.json', 'w', encoding='utf-8') as f:
        json.dump(new_dic, f, indent="\t", ensure_ascii=False)