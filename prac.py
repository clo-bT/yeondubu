def credit_scores(salary, score, money, period, ratio): 
    # parameter - score, money, period == (신용점수, 대출금액, 상환기간)
    import json
    import heapq
    with open('./personal_credit_loans.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    change_to_en = {
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
        
    en_score = change_to_en[score]
    
    minheap, result = [], [] # heapq : 상위 10개를 뽑기 위한 방식
    for idx in data:
        rate = data[idx][f'rate_{en_score}'] # 등급에 맞는 금리 추출
        if type(rate) == float: # 금리가 없는 경우를 배제
            heapq.heappush(minheap, (rate, idx))
    while minheap:
        x = heapq.heappop(minheap)
        da = data[x[1]]
        interest = money * da[f'rate_{en_score}']
        da['interest'] = interest
        all_money = money + interest # 총 상환 금액
        month_money = all_money / period # 매달 상환할 금액
        my_ratio = 100 * month_money / salary # 나의 자산대비 매달 상환금액 비율
        if ratio > my_ratio: 
            da['comment'] = f'평균보다 {ratio - my_ratio}% 낮음'
        else:
            da['comment'] = f'평균보다 {my_ratio - ratio}% 높음'
        if money > 100000000: # 대출금이 1억이 넘어가는 경우 DSR에 걸림
            if salary * 0.4 > month_money: # 1억이 넘어가면서 40%가 넘지 않는 경우만 필터링
                result.append(da)
        else:
            result.append(da)
    return result[:10]