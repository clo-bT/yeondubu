# import sys
# input = sys.stdin.readline

# def quick_sort(arr):
#     if len(arr) <= 1:
#         return arr
#     pivot = arr[len(arr) // 2]
#     lesser_arr, equal_arr, greater_arr = [], [], []
#     for num in arr:
#         if num < pivot:
#             lesser_arr.append(num)
#         elif num > pivot:
#             greater_arr.append(num)
#         else:
#             equal_arr.append(num)
#     return quick_sort(lesser_arr) + equal_arr + quick_sort(greater_arr)

# while True:
#     try:
#         x = int(input()) * 10000000
#         N = int(input())
#         check = [int(input()) for _ in range(N)]
#         check = quick_sort(check)
#         # 10 cm = 100,000,000 nm
#         left, right, f = 0, N-1, True
#         while left < right:
#             mid = (left + right) //2
#             if check[left] + check[right] == x:
#                 print(f'yes {check[left]} {check[right]}')
#                 f = False
#                 break
#             elif check[left] + check[right] < x:
#                 left = mid + 1
#             else:
#                 right = mid - 1
#         if f: print('danger')
#     except:
#         sys.exit(0)
        
        
import sys
input=sys.stdin.readline

while True:
    try:
        x = int(input())
        N = int(input())
        check = sorted([int(input()) for _ in range(N)])

        left = 0 ; right = N-1 ; answer = -1 ; answer_list = []

        while left < right:
            if check[left] + check[right] == x * 10000000:

                if answer < abs(check[right]-check[left]):
                    answer_list = [check[left], check[right]]
                    answer = abs(check[right]-check[left])
                left += 1

            elif check[left] + check[right] > x * 10000000:
                right -= 1
            else:
                left += 1

        if len(answer_list):
            print("yes %d %d"%(answer_list[0] , answer_list[1]))
        else:
            print('danger')
    except:
        break