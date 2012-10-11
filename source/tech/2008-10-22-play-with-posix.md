---
title: POSIX无缓冲文件I/O及可变参数小玩
tags: linux, cpp
---

这段以前写的测试程序包含了对POSIX无缓冲文件I/O、文件加解锁、进程分叉、可变参数的综合运用。没什么技术含量，纯粹记述一下，不想有一天弄丢了。

C真是又小巧又灵活，在语言的犄角旮旯还是存在一些之前完全想不到会有的特性，呵呵～不过，现在可能会从事的这个工作是不是只能用C不能用C++呢？难道真的得告别自己的最爱？

```cpp
//posix
#include <unistd.h>
#include <sys/types.h>   //for pid_t
#include <sys/stat.h>
#include <sys/file.h>
#include <fcntl.h>
//randoming
#include <stdlib.h> //for random
#include <time.h> //for srand with time
//variable parameter list
#include <stdarg.h>
//common
#include <stdio.h>
#include <string.h>
void my_read();
void my_write();
void lock_set(int fd, int type);
void my_lock_test(int n_tests, ...);
int main()
{
    my_read();
    my_write();
    srand( (unsigned int) time(0));
    fork();
    my_lock_test(4, F_WRLCK, F_UNLCK, F_RDLCK, F_UNLCK);
    exit(0);
}
void my_read()
{
    int fd;
    if((fd = open("/tmp/hello.c", O_CREAT|O_TRUNC|O_WRONLY, 0600)) < 0)
    {
        perror("open:");
        exit(1);
    }
    else
        printf("Open file: hello.c %d/n", fd);
    if(close(fd) < 0)
    {
        perror("close:");
        exit(1);
    }
    else
        printf("Close hello.c/n");
}
void my_write()
{
    int fd, size, len;
    char* buf = "Hello! I'm writing to this file";
    char buf_r[10];
    len = strlen(buf);
    if((fd = open("/tmp/hello.c", O_CREAT|O_TRUNC|O_RDWR, 0666)) < 0)
    {
        perror("open:");
        exit(1);
    }
    else
        printf("Open file: hello.c %d/n", fd);
    if((size = write(fd, buf, len)) < 0)
    {
        perror("write:");
        exit(1);
    }
    else
        printf("Writes: %s/n", buf);
    lseek(fd, 0, SEEK_SET);
    if((size = read(fd, buf_r, 10)) < 0)
    {
        perror("read:");
        exit(1);
    }
    else
        printf("read first 10 characters from file: %s/n", buf_r);
    if(close(fd) < 0)
    {
        perror("close:");
        exit(1);
    }
    else
        printf("Close hello.c/n");
}
void lock_set(int fd, int type)
{
    struct flock lock;
    lock.l_whence = SEEK_SET;
    lock.l_start = 0;
    lock.l_len = 0;
    while(1)
    {
        lock.l_type = type;
        if((fcntl(fd, F_SETLK, &lock)) == 0)
        {
            if(lock.l_type == F_RDLCK)
                printf("read lock set by %d/n", getpid());
            else if(lock.l_type == F_WRLCK)
                printf("write lock set by %d/n", getpid());
            else if(lock.l_type == F_UNLCK)
                printf("release lock by %d/n", getpid());
            return;
        }
        fcntl(fd, F_GETLK, &lock);
        if(lock.l_type != F_UNLCK)
        {
            if(lock.l_type == F_RDLCK)
                printf("%d: read lock already set by %d/n", getpid(), lock.l_pid);
            else if(lock.l_type == F_WRLCK)
                printf("%d: write lock already set by %d/n", getpid(), lock.l_pid);
            sleep(random() % 3);
        }
    }
}
void my_lock_test(int n_tests, ...)
{
    va_list test_cases;
    int cur;
    int fd;
    fd = open("/tmp/hello.c", O_RDWR|O_CREAT, 0666);
    if(fd < 0)
    {
        perror("lock test open:");
        exit(1);
    }
    va_start(test_cases, n_tests);
    for(cur = 0; cur < n_tests; ++cur)
    {
        lock_set(fd, va_arg(test_cases, int));
        sleep(random() % 5);
    }
    va_end(test_cases);
}
```