---
title: ofstream与ate的故事 
tags: cpp
date: 2009-04-21 17:00:00 +0800
---

很久之前，我和Swalky在写Huffman Tree压缩的时候，遇到了一个问题：我们想在一个已经写入了一些内容的文件中部（或头部）写一些内容（用于修改文件的一些meta信息），结果发现总是 不行。如果用ofstream的默认构造函数，文件原有内容就不会保留下来，如果用了ios::app，无论怎么用seekp来定位，所写的内容都会跟在 文件原有内容的最后面。怎么办呢？

本着RTFM的心态，他去看C++ Primer，我则去看TCPL，以及网上的C++ Reference( http://www.cplusplus.com/reference/ )：

> mode

> Flags describing the requested i/o mode for the file. This is an object of type ios_base::openmode, which consists on a combination of one or more of the following flags defined as member constants:

> * app (app end) Set the stream's position indicator to the end of the stream before each output operation.
> * ate (at e nd) Set the stream's position indicator to the end of the stream on opening.
> * binary  (binary ) Consider stream as binary rather than text.
> * in  (in put) Allow input operations on the stream.
> * out (out put) Allow output operations on the stream.
> * trunc (trunc ate) Any current content is discarded, assuming a length of zero on opening.

我们注意到一个重要的区别：app会在每次写操作之前都把写指针置于文件末尾，而ate模式则只在打开时才将写指针置于文件末尾。于是我们非常兴奋地将ofstream置于ios::ate，结果发现seekp仍然不能正常工作。

于是我把TCPL的《流》一章反复读了几遍，尤其很认真地看了流的缓冲区streambuf的实现，我突然意识到，如果不赋予流读文件的能力，没有读的缓冲区，流就无法seekp到文件的中部。
我试着改用这段代码来构造流：

```cpp
fstream(filename, ios::in|ios::out|ios::ate) 
```

程序的运行成功了！我很兴奋，因为当时是通过对流的实现的分析推断出这个结论的。
后来有一次有人在群上问C中如何这么做，我经过一番实验，发现只有以r+模式打开文件，fseek才起作用。这其实仍是基于同样的原理。这里把C的fopen文档贴出来：

> mode
> 
> C string containing a file access modes. It can be:
> 
> * "r" Open a file for reading. The file must exist.
> * "w" Create an empty file for writing. If a file with the same name already exists its content is erased and the file is treated as a new empty file.
> * "a" Append to a file. Writing operations append data at the end of the file. The file is created if it does not exist.
> * "r+"  Open a file for update both reading and writing. The file must exist.
> * "w+"  Create an empty file for both reading and writing. If a file with the same name already exists its content is erased and the file is treated as a new empty file.
> * "a+"  Open a file for reading and appending. All writing operations are performed at the end of the file, protecting the previous content to be overwritten. You can reposition (fseek , rewind ) the internal pointer to anywhere in the file for reading, but writing operations will move it back to the end of file. The file is created if it does not exist

r+的意思是同时读写，而且该文件必须已经存在。用w+是错误的，因为它会把现存文件的所有内容清空。
最后附上当时的测试代码（用一个宏开关来分别测试C和C++）：

```cpp
#include <iostream>  
#include <fstream>  
#include <string>  
#include <cstdio>  
  
using namespace std;  
  
int main()  
{  
    const char * original = "012345678901234567890123456789"; //30 chars  
    const char * overwrite = "abcdeabcde";  
    const char * filename = "test.txt";  
  
    fstream fout;  
  
    fout.open(filename, ios::out|ios::trunc); //destroy any current content  
  
    fout << original;  
  
    fout.close();  
  
#define TESTING_CPP 1  
#if TESTING_CPP  
    fout.open(filename, ios::in|ios::out|ios::ate);  
  
    fout.seekp(7);  
  
    fout << overwrite;  
    fout.close();  
#else  
    FILE * fout_c;  
  
    if(fout_c = fopen(filename, "r+"))  
    {  
        fseek(fout_c, 7, SEEK_SET);  
        fprintf(fout_c, overwrite);  
        fclose(fout_c);  
    }  
#endif //TESTING_CPP  
  
    fout.open(filename, ios::in);  
  
    while(!fout.eof())  
    {  
        cout << static_cast<char>(fout.get());  
    }  
  
    return 0;  
}
```  