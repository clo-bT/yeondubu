def credit_scores(score, money):
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
    if score <= 300:
        score = 8
    else:
        score = 10 - (score - 1)//100
    en_score = change_to_en[score]
    minheap, result = [], []
    for idx in data:
        rate = data[idx][f'rate_{en_score}']
        if type(rate) == float:
            heapq.heappush(minheap, (rate, idx))
    while minheap:
        x = heapq.heappop(minheap)
        da = data[x[1]]
        interest = money * da[f'rate_{en_score}']
        da['interest'] = interest
        result.append(da)
    return result[:10]
print(credit_scores(803, 50000000))