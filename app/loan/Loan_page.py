def calculate(mon): # 자산 대비 부채 비율
    import pandas as pd
    year = mon * 12
    lia_df = pd.read_csv("./loan/csv/preprocess_liabilities.csv", header=None) # 부채
    ass_df = pd.read_csv("./loan/csv/preprocess_assets.csv", header=None) # 자산
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


def credit_scores(salary, score, loan_money, period, ratio, totalAssets):
    # parameter - salary, score, loan_money, period, ratio == (월급, 신용점수, 대출금액, 상환기간, 속한 구간의 자산 대비 부채 비율)
    import os
    import json
    import heapq
    
    jsonfilelist = os.listdir('./loan/json')
    data = {}
    cnt = 0
    
    for jsonfile in jsonfilelist:
        print(jsonfile)
        with open('./loan/json/' + jsonfile, 'r', encoding='utf-8') as f:
            data_dict = json.load(f)
        for i in data_dict:
            data[str(cnt)] = data_dict[i]
            cnt += 1
    
    num_to_en = {
        1 : 'bottom',
        2 : 'second',
        3 : 'third',
        4 : 'fourth',
        5 : 'fifth',
        6 : 'sixth',
        7 : 'seventh',
        8 : 'eighth',
    }

    if score <= 300: # 신용점수 => 신용등급 환산
        score = 8
    else:
        score = 10 - (score - 1)//100

    en_score = num_to_en[score]

    minheap, result = [], [] # heapq : 상위 10개를 뽑기 위한 방식
    for idx in data:
        rate = data[idx][f'rate_{en_score}'] # 등급에 맞는 금리 추출
        if type(rate) == float: # 금리가 없는 경우를 배제
            heapq.heappush(minheap, (rate, idx))

    while minheap and len(result) < 10:
        x = heapq.heappop(minheap)
        da = data[x[1]]
        # 이율
        da['rate'] = x[0]

        # 이자
        interest = loan_money * da[f'rate_{en_score}'] # 총 이자
        da['interest'] = round(interest, 2)
        
        # 상환금
        total_repay = loan_money + interest # 총 상환 금액
        da['total_repay'] = total_repay 
        month_repay = total_repay / (period * 12) # 매달 상환할 금액
        da['month_repay'] = round(month_repay, 0)
        
        # 자산 대비 부채 비율
        my_total_ratio = total_repay / totalAssets
        da['my_total_ratio'] = round(my_total_ratio, 2)
        
        # 자산 대비 상환 금액
        # my_repay_ratio = 100 * month_repay / salary # 나의 자산대비 매달 상환금액 비율
        if ratio > my_total_ratio: 
            da['comment'] = f'{round(ratio - my_total_ratio, 2)}%만큼 낮아요'
        else:
            da['comment'] = f'{round(my_total_ratio - ratio, 2)}%만큼 높아요'
        
        # DSR
        if loan_money > 100000000: # 대출금이 1억이 넘어가는 경우 DSR에 걸림
            # 대출 한도 (limit amount)
            # = DSR * salary * period * 12 / (1 + interest)
            pre_amount = loan_money * salary * period * 12 / (1 + interest) # DSR 곱하기 전
            limit_amount_40 = round(pre_amount * 0.4, 0)
            limit_amount_70 = round(pre_amount * 0.7, 0)
            limit_amount_90 = round(pre_amount * 0.9, 0)
            limit_amount = [limit_amount_40, limit_amount_70, limit_amount_90]
            da['limit_amount'] = limit_amount
            result.append(da)
            # if salary * 0.4 > month_repay: # 1억이 넘어가면서 40%가 넘지 않는 경우만 필터링
        else:
            result.append(da)

    return result
