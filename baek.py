import sys
sys.setrecursionlimit(10**6)
input = sys.stdin.readline

N = int(input().rstrip())

nums = list(set([int(input().rstrip()) for _ in range(N)]))

def quick_sort(lst):
    if len(lst) <= 1:
        return lst
    left, right = [], []
    pivot = lst[len(lst) // 2]
    for i in lst:
        if i < pivot:
            left.append(i)
        elif i > pivot:
            right.append(i)
    return quick_sort(left) + [pivot] + quick_sort(right)

nums = quick_sort(nums)
print(nums)

plus_nums = []
for i in range(N):
    for j in range(i, N):
        plus_nums.append(nums[i] + nums[j])
plus_nums = quick_sort(plus_nums)
print(plus_nums)

answer = 0
for i in range(N):
    for j in range(i, N):
        minus = nums[j] - nums[i]
        start, end = 0, len(plus_nums) - 1
        while start <= end:
            mid = (start + end)//2
            mid_num = plus_nums[mid]
            if mid_num > minus:
                end = mid - 1
            elif mid_num < minus:
                start = mid + 1
            else:
                if answer < nums[j]:
                    answer = nums[j]
                break
print(answer)