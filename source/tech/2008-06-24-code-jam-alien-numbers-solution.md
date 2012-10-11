--- 
title: Google Code Jam之Alien Numbers之我的解答  
tags: 自学记录
---

由于时间的限制，程序有些地方的容错性不够，以//!! 标出。

运行成功，经Google Code Jam鉴定为正确。

题目为：
 
Alien Numbers
---------------

### Problem

The decimal numeral system is composed of ten digits, which we represent as "0123456789" (the digits in a system are written from lowest to highest). Imagine you have discovered an alien numeral system composed of some number of digits, which may or may not be the same as those used in decimal. For example, if the alien numeral system were represented as "oF8", then the numbers one through ten would be (F, 8, Fo, FF, F8, 8o, 8F, 88, Foo, FoF). We would like to be able to work with numbers in arbitrary alien systems. More generally, we want to be able to convert an arbitrary number that's written in one alien system into a second alien system.

### Input

The first line of input gives the number of cases, N . N test cases follow. Each case is a line formatted as

```
alien_number source_language target_language
```

Each language will be represented by a list of its digits, ordered from lowest to highest value. No digit will be repeated in any representation, all digits in the alien number will be present in the source language, and the first digit of the alien number will not be the lowest valued digit of the source language (in other words, the alien numbers have no leading zeroes). Each digit will either be a number 0-9, an uppercase or lowercase letter, or one of the following symbols 

```
!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
```

### Output

For each test case, output one line containing "Case #x : " followed by the alien number translated from the source language to the target language.

### Limits

1 ≤ N ≤ 100.

### Small dataset

1 ≤ num digits in alien_number ≤ 4, 2 ≤ num digits in source_language ≤ 10, 2 ≤ num digits in target_language ≤ 10.

### Large dataset

1 ≤ alien_number (in decimal) ≤ 1000000000, 2 ≤ num digits in source_language ≤ 94, 2 ≤ num digits in target_language ≤ 94.

### Sample

Input                     |       Output
--------------------------|--------------------
`4`                       |
`9 0123456789 oF8`        |     Case #1: Foo                        
`Foo oF8 0123456789`      |     Case #2: 9                        
`13 0123456789abcdef 01`  |     Case #3: 10011
`CODE O!CDE? A?JM!.`      |     Case #4: JAM!

我的解答的源代码
-----------------

```cpp
#include <iostream>
#include <fstream>
#include <iterator>
 
using namespace std;
 
//A helper function to improve performance of power, basically copied from <stl_numeric.h> of SGI STL
inline long power(long x, long n)
{
    if(n == 0) return 1;
    else
    {
        while((n & 1) == 0)
        {
            n >>= 1;
            x *= x;
        }
 
        long y = x;
        n >>=1;
        while(n != 0)
        {
            x *= x;
            if((n & 1) != 0)
                y *= x;
            n >>=1;
        }
        return y;
    }
}
 
int main(int argc, char* argv[])
{
    //Only for memerizing usage for myself
    if(argc != 3)
    {
        cout << "Usage: nstrans INPUT_FILE OUTPUT_FILE" << endl;
        return 0;
    }
 
    ifstream fin(argv[1]); //!!
    ofstream fout(argv[2]); //!!
 
    //How many cases in total?
    int case_max;
    fin >> case_max;
    fin.ignore(); // ''
 
    string source_number;
    string source_language;
    string target_language;
    string target_number;
 
    int source_digits; //How many digits in source_number?
    int source_base; //How many digits in source_language?
    int target_base; //How many digits in target_language?
 
    long num; //alien number in demical, since it's less than 1000000000, it's in long's range----assert(sizeof(long) >= 4)
 
    char tmp; //for storing a temp char
 
    for(int cur_case = 1; cur_case <= case_max; cur_case++)
    {
        //some cleanup
        num = 0;
        source_number = source_language = target_language = target_number = "";
 
        //tear the case apart
        while((tmp = fin.get()) != ' ') source_number += tmp; //!!
        while((tmp = fin.get()) != ' ') source_language += tmp; //!!
        while((tmp = fin.get()) != '\n') target_language += tmp; //!!
 
        //
        source_digits = source_number.length();
        source_base = source_language.length();
        target_base = target_language.length();
 
        int e; //exponent
 
        //source number to decimal value
        for(e = 0; e < source_digits; e++)
        {
            num += source_language.find((source_number[source_digits-1 - e])) * power(source_base, e);
        }
 
        #ifdef MY_DEBUG
            cout << source_number << ' ' << num <<' ';
        #endif
 
        //decimal value to target number(reversal order)
        e = 1;
        while(num > 0)
        {
            target_number += target_language[num % target_base];
            num /= target_base;
        }
 
        fout << "Case #" << cur_case << ": ";
 
        //reverse the target number and output
        ostream_iterator<char> foutit(fout);
        copy(target_number.rbegin(), target_number.rend(), foutit);
 
        fout << endl;
 
        #ifdef MY_DEBUG
        ostream_iterator<char> outit(cout);
        copy(target_number.rbegin(), target_number.rend(), outit);
        cout << endl;
        #endif
    }
 
    return 0;
}
```
