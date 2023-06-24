"""
Given below is a Bash / Python script that performs following computation on an integer input (n):
If n is less than 10: Calculate its Square
Example: 4 => 16
If n is between 10 and 20: Calculate the factorial of (n-10)
Example: 15 => 120
If n is greater than 20: Calculate the sum of all integers between 1 and (n-20)
Example: 25 => 15

The task is to identify the bugs in the script, fix them and share the new script. Only one of the two scripts required Bash or Python. Hint: You can correct the script by only changing less than 5 characters.

"""









def compute(n):
    if n < 10:
        out = n ** 2
    elif n < 20:
        out = 1
        for i in range(1, n-9):  #  n-10 to n-9
            out *= i
    else:
        lim = n - 20
        out = lim * lim
        out = out + lim  #  out - lim to out + lim
        out = out // 2  #  division operator / to integer division operator //
    print(out)


n = int(input("Enter an integer: "))
compute(n)
