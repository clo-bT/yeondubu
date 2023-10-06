def check_jsonfile():
    import os
    from datetime import datetime
    from loan.monthly_update_loan import update_loan
    check = datetime.now()
    check = str(check.year) + '-' + str(check.month)
    path = './loan/json/'
    jsonfilelist = os.listdir(path)
    cnt = 0
    for jsonfile in jsonfilelist:
        yearmonth = jsonfile.split('+')[0]
        if check == yearmonth:
            cnt += 1
            break
    if not cnt:
        update_loan()
        return 1
    return 0