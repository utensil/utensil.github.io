---
title: 我写的第一个类：BasedNum
tags: cpp
date: 2007-08-29 12:00:00 +0800
---

> 2012年9月按：作为早年一份写得整齐干净、注释详尽的代码，放在这里作为一份纪念，纪念最初用心的时候。

BasedNum.h
-----------

```cpp
#include <iostream>
#include <cmath>
#include <string>
#include <sstream>

/*****************************************************************************
写在前面的话 
很久以前就想有个能够使数字在各个进制之间转换的程序了，我的Casio计算器能够做
2进制、8进制、10进制和16进制之间的转换，但它只能做整数，而且数字大到一定程度，
就显示不了了，这让我感觉很不够，虽然我自己实际上没什么机会用到这种进制之间的
转换。
这次在看Larry R.Nyhoff著的《C++数据结构导引》的时候，看到附录中的数字系统，
于是决定写一个程序来把10进制数转换为任意进制的数。一开始只是写了两个函数，分
别处理整数部份和小数部份，并用一个基于cin/cout的交互界面来调用它们。后来想想，
觉得这完全可以抽象为一个类，于是就有了我写的第一个类：BasedNum。

这个类可以完成从任意进制到任意进制（2进制一直到36进制都可以处理，这仅仅是受到
了英文字母个数的限制，A或a表示10，以此类推，Z或z表示35）的储存、容错处理、转换
、显示控制、以及四则运算。

该类是在GNU Dev-C++下进行编写和调试的，由于VC++对友元支持不够良好，故在VC++下(6.0)
编译无法通过。该类已经过无数次调试，发现并解决大小Bug十余个，应该不会再有什么问题的了。 

这个类包含一个主驱动程序，用以测试。

这个类还有待扩充的内容包括：
[1] 完成同进制乘除法，甚至取模；
[2] 通过typedef或templete扩充int与double，使其精度得到扩充。这部份扩充的要求
是效率，事实上这足以酝酿一两个类；
[3] 扩充输出的形式，不要总是f173 @ 16，可以由用户自定义，这要用到语法分析。
[4] 扩充允许的进制范围，使得36进制以上的数，每位上的数可以由类似[45]这样的形
式提供。甚至可以采用用户自定义的字符集。这又可以酝酿一个类。 
[5]  对了，首先还要扩充自由进制和自由精度，让BasedNum对象能直接以自己的进制和
精度显示出来。

作者：皿 邮箱：RonIzWright@126.com 欢迎大家来信交流、指正。 
请勿在未征得同意的情况下将本源码用于商业用途，转载时请注明原作者及联系方式，
无必要请勿删改注释，谢谢！ 
******************************************************************************/ 
 

/*冗余声明保护：是ifndef而非ifdef。*/ 
#ifndef CLASS_BASED_NUM
#define CLASS_BASED_NUM

using namespace std;

/*****************************************************************************
下面这个namespace，用于存放控制BasedNum在ostream中的显示的一些常量。
这个是仿写标准库中C++io.h和ios_base.h中对于std::cout的显示控制的flags那一部份，
比如ios_base::fixed、ios_base::setw()那些。
它们在C++io.h和ios_base.h中是用结构来存放的，我则用namespace base_flags。
Bjarne Stroustrup说namespace是简化版本的struct，struct又是简化版本的class。
后面给这个名称空间起了个较短的别名：me_Ios
******************************************************************************/
namespace me_Iostream_Ctrl_Symbols_for_the_class_BasedNum
{
        namespace base_flags
        {
                const unsigned short showbase = 0x0001;
                const unsigned short noshowbase = ~showbase;
                const unsigned short showpos = 0x0002;
                const unsigned short noshowpos = ~showpos;
                const unsigned short uppercase = 0x0004;
                const unsigned short nouppercase = ~uppercase;
                const unsigned short base_changed = 0x0008;
                const unsigned short base_failed = ~base_changed;
                const unsigned short prec_changed = 0x0010;
                const unsigned short prec_remained = ~prec_changed;
        }
        
        /********************************************************************** 
        创建下面这个枚举的意义就在于，枚举像class、struct一样，是一个用户自定
        义类型，因而可以对其重载运算符，因为我的控制符实际上只是unsigned short
        int，如果不把它们转化为枚举，就会作为整数直接被 << 输出了。
        这个枚举的创建还包含另外一个知识。就是一个枚举中如果只有正数，则这个枚
        举内的数的取值范围就是能够容纳这些数中的最大那个的区间 [0:2^k-1]。也就
        是说，我在创建枚举时只写了bflags_end = 0xffff，就使得被转换为这个枚举
        的数必须小于0xffff
        **********************************************************************/        
        enum bflags {bflags_end = 0xffff};
 
        //是否显示进制
        const bflags showbase = bflags(base_flags::showbase);        
        const bflags noshowbase = bflags(base_flags::noshowbase);
        //是否显示正号
        const bflags showpos = bflags(base_flags::showpos);          
        const bflags noshowpos = bflags(base_flags::noshowpos);
        //是否以大写字母显示10以上进制的数。如：显示为5f7e还是5F7E 
        const bflags uppercase = bflags(base_flags::uppercase);
        const bflags nouppercase = bflags(base_flags::nouppercase);
        
 
        /*以下两个，用于函数me_Ios::setBase返回假换进制是否成功。*/ 
        const bflags base_changed = bflags(base_flags::base_changed);  
        const bflags base_failed = bflags(base_flags::base_failed);
        
        /*以下两个，用于函数me_Ios::setPrecision返回换精度是否成功。*/ 
        const bflags prec_changed = bflags(base_flags::prec_changed);  
        const bflags prec_remained = bflags(base_flags::prec_remained);
 
        /**********************************************************************
        特别声明：以下几个函数的使用方式如下（以setBase为例）
        BasedNum b1("37489",11);
        cout << me_Ios::setBase(5) << b1; 
        将以5进制输出11进制的b1; 
        但是如果输入
        cout << me_Ios::setBase(5) << me_Ios::setBase(12) << b1;
        却将仍以5进制输出b1；
        甚至，如果输入
        cout << me_Ios::setBase(10);
        cout  << b1 << me_Ios::setBase(14);
        居然将以14进制输出b1！！！
        当然，如果输入
        cout << me_Ios::setBase(5) << me_Ios::setPrecision(5) << b1;
        是没有问题的，因为两个是不同函数。
         
        所以，强烈建议在一个cout语句中，只使用一次同一函数。此bug正在寻求解决
        方案中...... 
        **********************************************************************/ 
        
        /********************************************************************** 
        改变BasedNum的显示的进制。即假换进制。 
        它将会是类BasedNum的友元函数。
        它用于这个函数由于我设计的初衷，可能有一点效率问题。参见函数
        BasedNum::setBase及ostream& operator << (ostream& out,BasedNum num)
        的声明中的说明。 
        **********************************************************************/        
        bflags setBase(int base_wanted);

        /********************************************************************** 
        改变BasedNum的显示的精度。 
        它将会是类BasedNum的友元函数。
        如果输入小于0的精度，则原有精度保持不变。 
        **********************************************************************/        
        bflags setPrecision(int prec_wanted); 
        
}
 
namespace me_Ios = me_Iostream_Ctrl_Symbols_for_the_class_BasedNum;  //起别名。

/* Bjarne Stroustrup说不要总是using namespace，否则会污染全局名称空间。*/
using me_Ios::bflags;

/*****************************************************************************
对枚举类bflag重载运算符<<，用于BasedNum对象的显示控制。
它是类BasedNum的友元，因为它需要访问几个用于控制BasedNum对象显示的静态私有成员。
因为它的参数里没有类BasedNum的对象。所以必须在当前作用域声明，否则编译器找寻不
到它。
加上&是为了效率，加上const是为了不被改变。 
******************************************************************************/
ostream & operator << (ostream & out,const bflags & flag);

typedef int BN_int;
typedef double BN_double;

/*****************************************************************************
类BasedNum的定义。它可完成从任意进制到任意进制（2进制一直到36进制都可以处理，
这仅仅是受到了英文字母个数的限制，A或a表示10，以此类推，Z或z表示35）的储存、容
错处理、转换、显示控制、以及四则运算。
******************************************************************************/
class BasedNum
{
    public:
    
        /**********************************************************************
        构造函数。用string来构造，这是照顾到10以上进制的构造。 
        后两个参数有默认值：默认该数为10进制数，最多保留到小数点后30位。这里写
        了一次默认值，实现时就不要再写了。
        **********************************************************************/ 
        BasedNum(string initNum,int initBase = 10,int precision = 30);
        
        /**********************************************************************
        构造函数。用一个10进制double数来构造，这是为四则运算铺路。 
        **********************************************************************/ 
        BasedNum(BN_double initNum);
        
        //BasedNum(const BasedNum & b);
        //~BasedNum();
 
        
        /**********************************************************************
        公共接口，给BasedNum换进制。
        除非使用本函数，BasedNum会一直保留着被构造时的进制和形态。用函数me_Ios
        ::setBase显示为其他进制时，只是假换。
        这么安排的原因是，如果原先输入的结果换成了其它进制之后再换回来结果会出
        现微小的偏差，比如3.6变成3.599999999。这是不希望出现的。
        **********************************************************************/ 
        BasedNum setBase(int base_wanted);
        
        /**********************************************************************
        公共接口，给BasedNum换精度。
        因为BasedNum对象本身只保存构造时的进制、形态和精度，只有当setBase被调
        用时Precision才会被派上用场，所以setPrecision并不企图update任何东西。
        若想将当前进制以更高的精度保存，请先setPrecision再setBase(getBase())。 
        **********************************************************************/ 
        BasedNum setPrecision(int prec_wanted)
        {
                Precision = prec_wanted;
                return *this;
        }
        
        /**********************************************************************
        公共接口,返回BasedNum的当前进制。
        **********************************************************************/ 
        int getBase() const {return Base;}
        
        /**********************************************************************
        公共接口,返回BasedNum的当前精度。
        **********************************************************************/ 
        int getPrecision() const {return Precision;}
        
        /**********************************************************************
        公共接口，实现从BasedNum到double的隐式转换。 
        **********************************************************************/
        operator double () const {return it_by10;} 
        //double getVal() const {return it_by10;}     

        
        /**********************************************************************
        公共接口，重载四则运算（+、-、*、/、%）及其赋值简写。 
        并不作上溢、下溢以及被0除检查。 
        **********************************************************************/
        BasedNum operator + (BasedNum num2)
        {
            if(Base != num2.Base)
                return BasedNum(double(*this)+ double(num2));
            else
                return plain(*this,num2,true);
        }
        
        BasedNum operator - (BasedNum num2)
        {
            if(Base != num2.Base)
                return BasedNum(double(*this) - double(num2));
            else
                return plain(*this,num2,false);
        }
        
        BasedNum operator * (BasedNum num2)
        {
            return BasedNum(double(*this) * double(num2));
        }
        
        BasedNum operator / (BasedNum num2)
        {
            return BasedNum(double(*this) / double(num2));
        }
        
        BasedNum operator % (BasedNum num2)
        {
            return BasedNum(fmod(double(*this),double(num2)));
        }
        
        BasedNum operator += (BasedNum num2)
        {
            *this = *this + num2;
            return *this;
        }
        
        BasedNum operator -= (BasedNum num2)
        {
            *this = *this - num2;
            return *this;
        }
        
        BasedNum operator *= (BasedNum num2)
        {
            *this = *this * num2;
            return *this;
        }
        
        BasedNum operator /= (BasedNum num2)
        {
            *this = *this / num2;
            return *this;
        }
        
        BasedNum operator %= (BasedNum num2)
        {
            *this = *this % num2;
            return *this;
        }
        
        /**********************************************************************
        公共接口，重载各种比较。 
        **********************************************************************/
        bool operator > (BasedNum num2)
        {
            return double(*this) > double(num2);
        }
        
        bool operator < (BasedNum num2)
        {
            return double(*this) < double(num2);
        }
        
        bool operator >= (BasedNum num2)
        {
            return double(*this) >= double(num2);
        }
        
        bool operator <= (BasedNum num2)
        {
            return double(*this) <= double(num2);
        }
        
        bool operator == (BasedNum num2)
        {
            return double(*this) == double(num2);
        }
        
        bool operator != (BasedNum num2)
        {
            return double(*this) != double(num2);
        }
        
        /**********************************************************************
        这里有几个友元。分别用于改变BasedNum的显示的进制、用于改变BasedNum的显
        示的精度、用于BasedNum对象的输出、用于控制BasedNum对象的输出格式（参见
        名称空间me_Ios里对各格式的控制符的注释）。 
        **********************************************************************/
        friend bflags me_Ios::setBase(int base_wanted);
        friend bflags me_Ios::setPrecision(int prec_wanted);
        friend ostream & operator << (ostream & out,BasedNum num);
        friend ostream & operator << (ostream & out,const bflags & flag); 
        
        
    private:
    
        /**********************************************************************
        以下几个是静态成员，属于整个类而不属于任何一个单独的对象。那些控制Based
        Num对象显示格式的控制符，它们最终就作用在这几个成员身上。分别是显不显示
        是什么进制、显不显示正号、是否以大写字母显示10以上进制的数（如显示为5f7
        e还是5F7E）、以什么进制显示、以什么精度显示。
        **********************************************************************/       
        static bool show_base;
        static bool show_pos;
        static bool upper_case;
        static int base_to_be_displayed;
        static int prec_to_be_displayed;
    
        /**********************************************************************
        it_by10存有BasedNum的十进制数值，有正负。它是转成一切进制的基础。构造的
        时候如果是非10进制的，就要先转成它
        **********************************************************************/
        BN_double it_by10;
        
        /**********************************************************************
        以下4个是对it_by10的一种拆分。正负、整数部份、是否整数、小数部分。用于
        显示和换进制。
        **********************************************************************/
        bool positive; //0按正数处理。 
        BN_int Int_part;//只保存整数部份的绝对值。第一个字母是大写
        bool aint;
        BN_double Fract_part;//只保存小数部份的绝对值。第一个字母是大写
        
        /**********************************************************************
        以下3个又是一组。是BasedNum的进制、相应进制下的样子，以及是否被强加了一
        个小于2的基（从而出错）。先是保持构造时的进制，直到被BasedNum::setBase
        改变进制。
        **********************************************************************/        
        int Base;//第一个字母是大写
        string BasedForm;//这个是绝对值。正负号已经被去除。
        bool Base_Error;
        
        /**********************************************************************
        在处理小数的时候，可能会出现无限小数的情况，这个时候，就只显示Precision
        位。
        **********************************************************************/
        int Precision; //第一个字母是大写。
        
        /**********************************************************************
        初始化和更改形态时被调用的实干派函数们:（具体说明参见定义处的注释） 
        **********************************************************************/ 
        
        /*将string拆分，并生成10进制数。*/ 
        void num_to10(string & input,int & base); 
        
        /*换进制时处理整数部份。必须不用 &，否则会改变Int_part，而且用了终究还
        是要另设一个中间变量。*/ 
        string int_10to(BN_int int_part,const int & base);
        
        /*换进制时处理整数部份。必须不用 &，否则会改变Fract_part，而且用了终究
        还是要另设一个中间变量。*/ 
        string fract_10to(BN_double fract_part,const int & base); 
        
        /*根据upper_or_not的真假，对10以上进制的数，在大小写形态之间转换。作用
        于BasedForm。*/
        void up_or_down(bool upper_or_not);
        
        /**********************************************************************
        四则运算时被调用的实干派函数们:（具体说明参见定义处的注释）  
        **********************************************************************/ 
        /*同进制加减法*/ 
        BasedNum plain(BasedNum & b1,BasedNum & b2,bool plus_or_minus);
};


/*****************************************************************************
为BasedNum类重载运算符<<，完成BasedNum对象的输出。
处理了进制错误、是否显示正号、是否显示进制、以什么进制显示等等。
这里有一点效率上的问题，我设计BasedNum类的本意，是要BasedForm一直保存着最初输
入时的样子不丢失，所以每次显示时，如果要换进制，都是假换：注意函数第二个参数既
没有const也没有&，我是将它复制了一份并改动了那个临时复制的对象。所以这实际上有
效率的浪费。但为了功能，这也是必须的浪费。 
*****************************************************************************/
ostream & operator << (ostream & out,BasedNum num);

#endif
```

BasedNum.cpp
---------------

```cpp
#include "BasedNum.h"

/*****************************************************************************
几个静态成员的初始化，千万不能放头文件里面。默认显示进制、不显示正号、以小写字
母显示显示10以上进制的数（如显示为5f7e而非5F7E）、以10进制形态显示，最多显示到
小数点后30位。
*****************************************************************************/
bool BasedNum::show_base(true);
bool BasedNum::show_pos(false);
bool BasedNum::upper_case(false);
int BasedNum::base_to_be_displayed(10);
int BasedNum::prec_to_be_displayed(30);


/*****************************************************************************
构造函数。用string来构造，这是照顾到10以上进制的构造。
后两个参数有默认值：默认该数为10进制数，最多保留到小数点后30位。

调用成员函数num_to10。 
*****************************************************************************/ 
BasedNum::BasedNum(string initNumStr,int initBase,int precision)
: Precision(precision)
{
    
    if(initBase < 2 || 36 < initBase)
    {
        cerr
        << "\n[Error:The base must be between 2 and 36!"
        << "Failed to initialize BasedNum " << initNumStr
        << " by base " << initBase << ".\n";
    }
    else
    {
        Base_Error = false;
        Base = initBase;
        BasedForm = initNumStr;
        
        it_by10 = 0;
        
        positive = true;
        Int_part = 0;
        aint = false;
        Fract_part = 0;
        
        num_to10(initNumStr,initBase); //将string拆分，并生成10进制数。
    }
    
}

/**********************************************************************
构造函数。用一个10进制double数来构造，这是为四则运算铺路。 
**********************************************************************/ 
BasedNum::BasedNum(double initNum)
: Precision(30),Base(10),it_by10(initNum),Base_Error(false)
{
    positive = (it_by10 >= 0); 
    
    Int_part = static_cast<BN_int>(fabs(it_by10));
    Fract_part = fabs(it_by10) - Int_part;
        
    aint = (Fract_part == 0);
    stringstream iostr;
    iostr << initNum;
    iostr >> BasedForm; //将double转成string，如果有负号，并不会丢失

    if(BasedForm.at(0) == '+' || BasedForm.at(0) == '-')
        BasedForm.erase(BasedForm.begin());
}
 
/*****************************************************************************
将string拆分，并生成10进制数。
这个函数的基本思路是先找小数点，没有小数点就是整数，有的话前后分割成整数部份和
小数部份两个分别处理。这个中途还处理了正负号、正负号前多打了数字、多打了小数点
等可能出现的情况。
将其他进制的数转为10进制其实很简单，只是一个按权求值过程。一个位置上的字符的
ASCII码为cur_num，这个位置的单位cur_seat是Base的相应倍数。
*****************************************************************************/ 
void BasedNum::num_to10(string & input,int & base)
{   
    if(base < 2 || 36 < base)
    {
        Base_Error = true;
        return;
    }
    else
    {
        Base_Error = false;
    }
    
    //预处理，生成整数部份和小数部份的string。 
    string int_string;
    string fract_string;
    
    int dotpos = input.find_first_of('.');
    if( dotpos == string::npos || dotpos == input.length() - 1)
    {
        int_string = input;
        fract_string = "";
        aint = true;
        dotpos = input.length();
    }
    else
    {
        aint = false;
        int_string.assign(input,0,dotpos);
        fract_string.assign(input,dotpos+1,input.length()-dotpos-1);
    }
    
    //整数部份处理
    int cur_num;
    
    int cur_seat = 1;
    for(int i = dotpos-1 ; i >= 0 ; i-- )
    {
        cur_num = int_string[i];
        if('0' <= cur_num && cur_num <= '9')
        {
                Int_part += (cur_num - '0')*cur_seat;
                cur_seat *= base;
                continue;
        }
        if('a' <= cur_num && cur_num <= 'z')
        {
                Int_part += (cur_num - 'a' + 10)*cur_seat;
                cur_seat *= base;
                continue;
        }
        if('A' <= cur_num && cur_num <= 'Z')
        {
                Int_part += (cur_num - 'A' + 10)*cur_seat;
                cur_seat *= base;
                continue;
        }
        if(cur_num == '+')
        {
                positive = true;
                BasedForm.erase(0,i+1); //正号之前如果还有东西，删无赦
                dotpos -= i+1;
                break;
        }
        if(cur_num == '-')
        {
                positive = false;
                BasedForm.erase(0,i+1);//负号之前如果还有东西，删无赦
                dotpos -= i+1;
                break;
        }        
    }
    
    //小数部份处理
    double cur_seat_d = 1;    
    for(int j = 0 ; j <= fract_string.length()-1 ; j++ )
    {
        if(aint) break;
        
        cur_num = fract_string[j];
        if('0' <= cur_num && cur_num <= '9')
        {
                cur_seat_d /= base;
                Fract_part += (cur_num - '0')*cur_seat_d;
                continue;
        }
        if('A' <= cur_num && cur_num <= 'Z')
        {
                cur_seat_d /= base;
                Fract_part += (cur_num - 'A' + 10)*cur_seat_d;
                continue;
        }     
        if('a' <= cur_num && cur_num <= 'z')
        {
                cur_seat_d /= base;
                Fract_part += (cur_num - 'a' + 10)*cur_seat_d;
                continue;
        }
        
        if(cur_num == '.')
        {
                //形如56.12.34或56..1234都被当作56.1234处理
                BasedForm.erase(dotpos+1+j,1);                
        }

    }
    it_by10 = (Int_part + Fract_part)*(positive?1:(-1));
    
    //删去多余的0 
    int Not0pos = BasedForm.find_first_not_of('0');
    if(Int_part != 0)
        BasedForm.erase(0,Not0pos);
    else
        BasedForm.erase(0,Not0pos-1);
}

/******************************************************************************
改变BasedNum对象的进制。
除非使用本函数，BasedNum会一直保留着被构造时的进制和形态。用函数me_Ios::setBase
显示为其他进制时，只是假换。
这么安排的原因是，如果原先输入的结果换成了其它进制之后再换回来结果会出现微小的
偏差，比如3.6变成3.599999999。这是不希望出现的。

写完后很久我才看见《C++数据结构导引》里面有用Stack来写类似程序的例子，只不过它
只能做10进制到2进制的转换，其实大家的原理是一样的。我用的是string流和<<，实际
上，用string和+=也能工作得一样好，只不过我还是偏爱流。

调用成员函数int_10to和fract_10to。 
******************************************************************************/ 
BasedNum BasedNum::setBase(int base_wanted)  
{
    if(base_wanted < 2 || 36 < base_wanted)
    {
        Base_Error = true;
        return *this;
    }
    else
    {
        Base_Error = false;
    }
    BasedForm = int_10to(Int_part,base_wanted)
     + (aint?"":".")+(aint?"":fract_10to(Fract_part,base_wanted));
    Base = base_wanted;
    return *this;
}


/******************************************************************************
整数部份的处理：除以进制，要商，余数继续处理。
******************************************************************************/
string BasedNum::int_10to(int int_part,const int & base)
{
    ostringstream ostr;
    if(Int_part==0) 
    {
        ostr << 0;
        return ostr.str();
    }
    
    int seats = static_cast<int>(log(int_part+0.0)/log(base+0.0));
    int base_n;
    int seat_n;
    
    for(int n = seats; n >= 0;n--)
    {
        base_n = static_cast<int>(pow(base+0.0,n+0.0));
        seat_n=int_part/base_n;
        if(seat_n < 10)
        ostr << seat_n;
        else
        {
                ostr << static_cast<char>((upper_case?'A':'a')+seat_n-10);
        }
        int_part %= base_n;
    }
    return ostr.str();
}

/******************************************************************************
小数部份的处理：乘以进制，要整数部份，小数部份继续处理
******************************************************************************/
string BasedNum::fract_10to(double fract_part,const int & base)
{
    ostringstream ostr;
        
    int seats = static_cast<int>(log(fract_part+0.0)/log(base+0.0));
    int seat_n;
    int n = -1;
    while(fract_part != 0 && -Precision <= n )
    {
        seat_n = static_cast<int>(fract_part*base);
        fract_part = fract_part*base - seat_n;
              
        if(seat_n < 10)
        ostr << seat_n;
        else
        {
                ostr << static_cast<char>((upper_case?'A':'a')+seat_n-10);
        }
        
        n--;        
    }
    return ostr.str();
}

/******************************************************************************
根据upper_or_not的真假，对10以上进制的数，在大小写形态之间转换。作用
于BasedForm。
******************************************************************************/
void BasedNum::up_or_down(bool upper_or_not)
{
    int cur_num;
    const int delta = 'a' - 'A';
    
    for(int i = 0 ; i < BasedForm.length() ; i++ )
    {
        cur_num = BasedForm[i];
        if('0' <= cur_num && cur_num <= '9')
        {
                continue;
        }
        if('a' <= cur_num && cur_num <= 'z')
        {
                if(upper_or_not)
                BasedForm[i] = static_cast<char>(cur_num - delta);
                continue;
        }
        if('A' <= cur_num && cur_num <= 'Z')
        {
                if(!upper_or_not)
                BasedForm[i] = static_cast<char>(cur_num + delta); 
                continue;
        }
      
    }
}

inline int max(int n1,int n2)
{
    return (n1>=n2?n1:n2);
}

/*****************************************************************************
同进制加减法。
函数中有一些注释掉的语句，是调试过程中留下的，可以更清晰地看出每一步的进行。 
*****************************************************************************/
BasedNum BasedNum::plain(BasedNum & b1,BasedNum & b2,bool plus_or_minus)
{
    int base = b1.Base;
    
    /*决定最终结果的正负*/ 
    bool positive = 
    b1.it_by10 + b2.it_by10 * (plus_or_minus?1:-1) >= 0 ;
    
    /*下面这个异或运算，两操作数异号时值为true，同号时为false。
    整个语句的意思是如果两操作数异号，就把原来要进行相加的变为相减，原来要相减
    的变为相加*/ 
    if(b1.positive ^ b2.positive) 
        plus_or_minus = (plus_or_minus?false:true); 
        
    /*下面这一段保证了永远是绝对值大的减绝对值小的。*/
    
    string Larger;
    string Smaller;
    string Result; 
    
    if(fabs(b1.it_by10) >= fabs(b2.it_by10))
    {
        Larger = b1.BasedForm;
        Smaller = b2.BasedForm; 
    }
    else
    {
        Larger = b2.BasedForm;
        Smaller = b1.BasedForm;
    }
    
    //cout << "[" << Larger << "]";
    //cout << "[" << Smaller << "]";

    /*下面一段对齐小数点*/ 
    
    int Ldotpos = Larger.find_first_of('.');
    int Sdotpos = Smaller.find_first_of('.');
    
    //cout << "[" << Ldotpos << "]";
    //cout << "[" << Sdotpos << "]";

    
    int L_int_size,S_int_size;
    int L_frc_size,S_frc_size;
    int final_size;    
    
    if(Ldotpos == string::npos)
    {
        L_int_size = Larger.length();
        L_frc_size = -1;
    }
    else
    {
        L_int_size = Ldotpos;
        L_frc_size = Larger.length()-1 - Ldotpos;
    }
    if(Sdotpos == string::npos)
    {
        S_int_size = Smaller.length();
        S_frc_size = -1;
    }
    else
    {
        S_int_size = Sdotpos;
        S_frc_size = Smaller.length()-1 - Sdotpos;
    }
    
    final_size = max(L_int_size,S_int_size) + 1 + max(L_frc_size,S_frc_size);
    Larger.resize(final_size,'0');
    Smaller.resize(final_size,'0');
    Result.resize(final_size+1,'0');
    int Rdotpos = max(L_int_size,S_int_size)+1;
    
    /*cout << "[" << L_int_size << "]";
    cout << "[" << L_frc_size << "]";
    cout << "[" << S_int_size << "]";
    cout << "[" << S_frc_size << "]";
    cout << "[" << final_size << "]";
    cout << "[" << Larger.size() << "]";
    cout << "[" << Smaller.size() << "]";
    cout << "[" << Result.capacity() << "]";
    cout << "[" << Rdotpos << "]";
    cout << endl;*/

    
    /*下面一段进行按位加减*/ 
    enum {L,S,R};
    int cur_num[3];
    int adv = 0; //进位和借位
    
    for(int i = final_size-1 ; i >= 0 ; i-- )
    {
        //ASCII码阶段 
        cur_num[L] = Larger[i];
        cur_num[S] = Smaller[i];
        
        //cout << "[" << static_cast<char>(cur_num[L]) << "]";
        //cout << "[" << static_cast<char>(cur_num[S]) << "]";
        
        //变为数值 
        for(int j = L;j <= S;j++)
        {
            if('0' <= cur_num[j] && cur_num[j] <= '9')
            {
                cur_num[j] -= '0';
                continue;
            }
            if('a' <= cur_num[j] && cur_num[j] <= 'z')
            {
                cur_num[j] -= 'a';
                cur_num[j] += 10;
                continue;
            }
            if('A' <= cur_num[j] && cur_num[j] <= 'Z')
            {
                cur_num[j] -= 'A';
                cur_num[j] += 10;
                continue;
            }
            if(cur_num[j] == '.')
            {
                cur_num[R] = '.';
                break;
            }
            cur_num[R] = 0;
        }
        
        //cout << "[" << cur_num[L] << "]";
        //cout << "[" << cur_num[S] << "]";
        
        //如果当前位是小数点，忽略此位的计算。 
        if(cur_num[R] == '.') 
        {
            Result[i+1] = '.';
            cur_num[R] = '0'; 
            cout << endl;
            continue;
        }
        
        //进行当前位的计算 
        cur_num[R] = cur_num[L] + cur_num[S] * (plus_or_minus?1:-1) + adv;
        
        if(cur_num[R] >= 0)  //进位 
        {
            adv = cur_num[R] / base ;
            cur_num[R] %= base;
        }
        else //借位 
        {
            adv = cur_num[R] / base - 1;
            cur_num[R] = cur_num[R]%base + base;
        }
        
        //cout << "[" << adv << "]";
        
        //变回ASCII码 
        if(0 <= cur_num[R] && cur_num[R] <= 9)
        {
            cur_num[R] += '0'; 
        }
        else
        {
            cur_num[R] += (upper_case?'A':'a') - 10;
        }
        
        //cout << "[" << static_cast<char>(cur_num[R]) << "]";
        
        //赋给Result的相应位置 
        Result[i+1] = static_cast<char>(cur_num[R]);
        
        //cout << endl;
    }
     
    Result[0] = '0' + adv;
    
    if(Rdotpos <= Result.size()) Result[Rdotpos] = '.';
    
    //处理最终结果的正负 
    if(positive)
    {
        if(adv == 0) Result[0] = '+';
        return BasedNum(Result,base);
    }
    else
    {
        if(adv == 0)
        {
            Result[0] = '-';
            return BasedNum(Result,base);
        }
        else
            return BasedNum("-" + Result,base);
    }
    
}


/*****************************************************************************
为BasedNum类重载运算符<<，完成BasedNum对象的输出。
处理了进制错误、是否显示正号、是否显示进制、以什么进制显示等等。
这里有一点效率上的问题，我设计BasedNum类的本意，是要BasedForm一直保存着最初输
入时的样子不丢失，所以每次显示时，如果要换进制，都是假换：注意函数第二个参数既
没有const也没有&，我是将它复制了一份并改动了那个临时复制的对象。所以这实际上有
效率的浪费。
*****************************************************************************/
ostream & operator << (ostream & out,BasedNum num)
{
    if(num.Base_Error)
    {
        out << "\n[Error:The base can't be smaller than 2 !]\n";
        return out;
    }
    
    out << (num.positive?(BasedNum::show_pos?"+":""):"-");
    
    if(BasedNum::prec_to_be_displayed != num.Precision)
        num.setPrecision(BasedNum::prec_to_be_displayed);
        
    if(BasedNum::base_to_be_displayed != num.Base)
    {
        num.setBase(BasedNum::base_to_be_displayed);
    }
    
    num.up_or_down(BasedNum::upper_case);
          
    out << num.BasedForm; 
    
    if(BasedNum::show_base)
        out << " @ " << num.Base;
        
    return out;
}

/*****************************************************************************
me_Ios::setBase完成对类BasedNum的静态成员base_to_be_displayed的更改，并返回成
功与否。 
*****************************************************************************/
bflags me_Ios::setBase(int base_wanted)
{
    if(base_wanted < 2 || 36 < base_wanted) return me_Ios::base_failed;
    BasedNum::base_to_be_displayed = base_wanted;
    return me_Ios::base_changed;
}

/*****************************************************************************
me_Ios::setPrecision完成对类BasedNum的静态成员prec_to_be_displayed的更改
，并返回成功与否。如果输入小于0的精度，则原有精度保持不变。 
*****************************************************************************/ 
bflags me_Ios::setPrecision(int prec_wanted)
{
    if(prec_wanted < 0) return me_Ios::prec_remained;
    BasedNum::prec_to_be_displayed = prec_wanted;
    return me_Ios::prec_changed;
}
 
/*****************************************************************************
对名称空间me_Ios的枚举类bflag重载运算符<<，用于BasedNum对象的显示控制。

例：BasedNum num("A.8",16,30);
cout << num << endl << me_Ios::noshowbase << num << endl << me_Ios::showpos << num <<endl
<< me_Ios::setBase(10) << num <<endl; 
将输出：
A.8 @ 16
A.8 
+A.8
+10.5
在本类的后继版本中，还将继续扩展这部份功能，使其有更多花样。
 
它是类BasedNum的友元，因为它需要访问几个用于控制BasedNum对象显示的静态私有成员。
因为它的参数里没有类BasedNum的对象。所以必须在当前作用域声明，否则编译器找寻不
到它。
加上&是为了效率，加上const是为了不被改变。 
******************************************************************************/
ostream & operator << (ostream & out,const bflags & flag)
{
    if(flag == me_Ios::showbase) 
        {BasedNum::show_base = true;return out;}
    if(flag == me_Ios::noshowbase)
        {BasedNum::show_base = false;return out;}
    if(flag == me_Ios::showpos) 
        {BasedNum::show_pos = true;return out;}
    if(flag == me_Ios::noshowpos) 
        {BasedNum::show_pos = false;return out;}
    if(flag == me_Ios::uppercase) 
        {BasedNum::upper_case = true;return out;}
    if(flag == me_Ios::nouppercase) 
        {BasedNum::upper_case = false;return out;}
    if(flag == me_Ios::base_changed) 
    {
        //out << "[b]";
        return out;
    }
    if(flag == me_Ios::base_failed)
    {
        out << "\n[Error:The base must be between 2 and 36!]\n";
        return out;
    }
    if(flag == me_Ios::prec_changed)
    {
        //out << "[p]";
        return out;
    }
    if(flag == me_Ios::prec_remained)
    {
        out
        << "\n[Error:The precision can't be smaller than 0 !]"
        << "\n[The precision will be remained!]\n";
        return out;
    }
}
```

main.cpp
------------

```cpp
#include "BasedNum.h" 
#include <cstdlib>
#include <fstream>

/*****************************************************************************
用于输出BasedNum对象从2进制到16进制的全部形态。先声明这个函数，后面才定义。
为了修改遍布全程序，调用alltypes。 
*****************************************************************************/
void allbases(const BasedNum & num);

/*****************************************************************************
用于输出BasedNum对象格式控制的全部形态。先声明这个函数，后面才定义。
*****************************************************************************/
void alltypes(const BasedNum & num);

/*****************************************************************************
主程序。这个程序有三种运行模式：I/O交互式、只写模式与只读模式。

[I/O交互式]直接将用户输入的数以全部形态输出到屏幕。
[只写模式]将用户输入的数和进制写入文件。
[只读模式]读取已写好的文件并输出这些数以全部形态输出到屏幕。
以上所谓全部形态，依测试目的而定。在本版本，是指从2进制到16进制及格式控制的全
部形态。

之所以有后两种模式，主要是因为，想把一些典型的测试例子以文件的形式保留下来。

三个模式由命令行参数启动。默认启动I/O交互式。
设最后生成的可执行文件名为Btest，则

Btest 或 Btest 0
启动I/O交互式；

Btest 1 PATH
启动只写模式，并且是写入路径PATH，如果该文件不存在，则会创建。路径可省略，默认
在Windows下输出到D:/BasedNumData.txt，在Linux下输出到/var/BasedNumData.txt。
 
Btest 2 PATH
启动只读模式，并且是读取路径PATH，如果该文件不存在，则会创建。路径可省略，默认
在Windows下读取D:/BasedNumData.txt，在Linux下读取/var/BasedNumData.txt。
*****************************************************************************/  
int main(int argc,char * argv[])
{
    enum {no_file = '0', O_file = '1',I_file = '2'};
    char mode;
    char *win_filename;
    char *nix_filename;
    char def_win_filename[] = "D://BaseNumData.txt"; 
    char def_nix_filename[] = "/var/BaseNumData.txt";
    
    /*处理命令行参数*/ 
    switch(argc)
    {
        case 1 :
                mode = no_file;
                break;
        case 2 :
                mode = *argv[1];
                win_filename = def_win_filename;
                nix_filename = def_nix_filename;
                break;
        case 3 :
                mode = *argv[1];
                win_filename = argv[2];
                nix_filename = argv[2];
                break;
        default :
                cout << "Too many arguments!\n";
                if(system("pause")) system("sleep 3");
                exit(-1);
    }
   
    
    string input;
    int base;
    
    ofstream to;
    ifstream from;    
    
    char tmpch;
    BasedNum * ptb;
    
    /*只写模式的预处理：文件的打开*/
    if(mode == O_file)      
    {
        to.open(win_filename,ios::app);
        if(to.is_open())
                cout << "Writing to File " << win_filename << "...\n";
        
        else
        {
                to.open(nix_filename,ios::app);
                if(to.is_open())
                       cout << "Writing to File " << nix_filename << "...\n";
                else
                {
                       cout << "Error!Cannot open file!\n";
                       if(system("pause")) system("sleep 3");
                       exit(-1);
                }
        }
    }
    
    /*只读模式的预处理：文件的打开*/
    if(mode == I_file)
    {
        from.open(win_filename,ios::in);
        if(from.is_open())
                cout << "Reading File " << win_filename << "...\n";
        
        else
        {
                from.open(nix_filename,ios::in);
                if(from.is_open())
                       cout << "Reading File " << nix_filename << "...\n";
                else
                {
                       cout << "Error!Cannot open file!\n";
                       if(system("pause")) system("sleep 3");
                       exit(-1);
                }
        }
    }
    
      
    /*只写模式的实际运行是在一个无穷循环里，输入小于2的基结束循环*/
    while(mode == O_file)  
    {
        cout
        << "\nEnter a number:";  
        cin
        >> input;
        
        
        cout
        << "\nEnter its base:";
        cin
        >> base;
        
        if(base < 2) 
        {
                cout
                << endl
                << "The base is smaller than 2.\n"
                << "We assume that you wanna leave this programme.\n";
                to.close();
                if(system("pause")) system("sleep 3");
                exit(0);
        }
        //注意下面这行，这是数据在文件中的存在形态
        to << input << '\t' << base << '\n';
    }
    
    /*只读模式的实际运行是在一个无穷循环里，读到文件结尾结束循环*/ 
    while(mode == I_file) 

    {
        //多读一个，如果马上就是结尾了，就会诱发END_OF_FILE状态。
        from.get(tmpch); 
        if(from.eof())
        {
                if(system("pause")) system("sleep 3");
                exit(0);
        }
        from.unget();//把多读的这个放回去
        from >> input;
        from.get(tmpch);//丢弃\t
        from >> base;
        from.get(tmpch);//丢弃\n
        
        ptb = new BasedNum(input,base,30);
        allbases(*ptb);
        delete ptb;
        
    }
    
    /*交互模式的实际运行是在一个无穷循环里，输入小于2的基结束循环*/
    while(mode == no_file)

    {
        cout
        << "Enter a number:";  
        cin
        >> input;
        
        
        cout
        << "\nEnter its base:";
        cin
        >> base;
        
        if(base < 2) 
        {
                cout
                << endl
                << "The base is smaller than 2.\n"
                << "We assume that you wanna leave this programme.\n";
                
                if(system("pause")) system("sleep 3");
                exit(0);
        }
        
        ptb = new BasedNum(input,base,30);
        allbases(*ptb);
        delete ptb;
    }
    
    if(system("pause")) system("sleep 3");
    return 0;
}


/*****************************************************************************
allbases用于输出BasedNum对象从2进制到16进制的全部形态。
为了修改遍布全程序，调用alltypes。 
*****************************************************************************/
void allbases(const BasedNum & num)
{
    for(int b = 2; b <= 16; b++)
    {
        cout << endl << me_Ios::setBase(b) << num; 
    }
    cout << endl;
    alltypes(num);
    if(system("pause")) system("sleep 3");
}

/*****************************************************************************
用于输出BasedNum对象格式控制的全部形态，以及测试四则运算。 
*****************************************************************************/
void alltypes(const BasedNum & num)
{
    cout
    << endl
    << me_Ios::setBase(num.getBase()) << "setBase:"<< num.getBase() << endl
    << num << me_Ios::noshowbase << '\t'<< num
    << endl
    << me_Ios::showbase
    ; 
    
    cout
    << num << me_Ios::showpos << '\t' << num
    << endl
    << me_Ios::noshowpos
    ;
    
    cout
    << num << me_Ios::uppercase << '\t' << num
    << endl
    << me_Ios::nouppercase
    ;
    
    cout
    << me_Ios::setBase(2)<< "setBase:2\n"
    << num << endl
    ;
    
    cout
    << me_Ios::setPrecision(50)<< num
    << endl
    ;
    
    
    cout << me_Ios::setBase(36)
    << BasedNum("exam",36).setBase(10).setBase(36)<<endl;
    
    cout << me_Ios::setBase(16) 
    << BasedNum("abcdef.1",16).setBase(10).setBase(16)<<endl;
    
    cout << me_Ios::setBase(10)
    << BasedNum("3.141592653589793238462643383279",10).setBase(16).setBase(10)<<endl;
    
    cout << me_Ios::setBase(36)
    << BasedNum("exam",36)+BasedNum(1)<<endl;
    
    cout << me_Ios::setBase(16)
    << BasedNum("4f.a1",16)-BasedNum("4e.c7",16)<<endl;
    
    cout << me_Ios::setBase(16)
    << BasedNum("-3f",16)+BasedNum("4e",16)<<endl;
    
    cout << me_Ios::setBase(16)
    << BasedNum("exam",36).setBase(36)<<endl;
    
    cout
    << me_Ios::setPrecision(30) << me_Ios::setBase(10)
    ;
    
    
}
```