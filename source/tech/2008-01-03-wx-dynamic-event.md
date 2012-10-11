---
title: wxWidgets动态事件表爱好者备查手册
tags: cpp, wx
---

> 使用动态事件映射方法的原因，可能是你想在程序运行的不同时刻使用不同的映射关系，或者因为你使用的那种语言(例如python)不支持静态映射，或者仅仅是因为你更喜欢动态映射。因为动态映射的方法可以使你更精确的控制事件表的细节，你甚至可以单独的将事件表中的某一个条目在运行期打开或者关闭，而前面说的PushEventHandler和PopEventHandler的方法只能针对整个事件表进行处理。除此以外，动态事件处理还允许你在不同的类之间共享事件函数。
> ——《WxWidgets跨平台GUI开发》

导言
-------

在wxWidgets中，相对于静态事件表那种僵死并且不知其所以然的方法,我更喜欢动态事件表,亲自Connect，还可以随时Disconnect。
但是，在写动态事件表时，会遇到一个问题，wxWidgets的官方文档中的事件处理部份，对于静态事件表所需的各种事件类型的宏叙述详尽，却对动态事件表所需的事件类型语焉不详，这给我们的使用带来了麻烦。需要的知识一方面零星分布于wx文档中，另一方面被冗长的代码掩映在`<wx/event.h>`中。此文的目的，就是为动态事件表的爱好者提供一个方便查询的手册，希望能给大家帮助。
大部份写GUI常用的wx类（包括窗口、对话框、控件）都继承于三个类：`wxWindow`、`wxEvtHandler`、`wxObject`。因此，大多数情况下，这三个类的成员函数是我们可以顺手牵过来用的。动态事件表的使用中，最为重要的函数Connect和Disconnect就是`wxEvtHandler`的成员函数，我们可以牵过来给我们手头这个要处理事件的wx类用。
 
先看看官方文档里对Connect函数的介绍（我对其进行了翻译、精简，有时，为了解释的明晰，作一些补充说明）：

### wxEvtHandler::Connect

Connect函数被重载了三次，各有各的用途。

第一个版本：范围捕杀 （ [id, lastid] 且 eventType）

```cpp
void Connect(int id, int lastId, wxEventType eventType, wxObjectEventFunction function, wxObject* userData = NULL, wxEvtHandler* eventSink = NULL)
```

第二个版本：精确狙击（id 且 eventType）

```cpp
void Connect(int id, wxEventType eventType, wxObjectEventFunction function, wxObject* userData = NULL, wxEvtHandler* eventSink = NULL)
```

第三个版本：分门别类 （仅 eventType）

```cpp
void Connect(wxEventType eventType, wxObjectEventFunction function, wxObject* userData = NULL, wxEvtHandler* eventSink = NULL)
```

该函数动态地将所给事件处理函数 与 EventHandler、ID 甚至事件类型联系起来。这是静态事件表的一种替代选择。

参数意义：

#### id
 
你要和事件处理函数联系起来的ID（可以是窗口ID、菜单ID、控件ID）。对于没有这个参数的重载版本，id被默认设为`wxID_ANY`。

当和lastid连用时，表达的是一个ID范围，即大小介于id和last id之间的所有ID，都会被Connect函数与事件处理函数联系起来。

> 按：实在没必要连“ID”都译成“标识符”……其实看技术文档时，我最头痛的是一堆汉字堆在那里，包括看数学书时……

#### lastId

参见id中的介绍。

#### eventType

你要和事件处理函数联系起来的Event Type。 按：Event Type直译为“事件类型”并不恰当，因为事件类型是指形如`wxMouseEvent`这样的东西，而这里所指，是形如wxEVT_MOTION这样的东西。 准确地说，应该称之为“事件标识符”或“事件ID”。下文使用“事件ID”。 一个事件类型里，会有若干事件ID，比`wxMouseEvent`里除了`wxEVT_MOTION`，还有`wxEVT_LEFT_DOWN`等等等事件ID。 因此可以把事件ID作为对事件类型的一个细分。

#### function

事件处理函数。注意这个函数应当被显式转换为正确的类型。 对于类型为`wxFooEvent`的事件，转换使用宏`wxFooEventHandler`。

#### userData
 
你要和事件表项联系起来的数据。（暂时我还不知道这个有什么用）

#### eventSink

告诉Connect函数，你要调用的事件处理函数是谁的成员函数。 如果该参数为NULL, 那么Connect函数将使用this指针。

> 按：正是这个参数允许了我们在不同类中共享事件处理函数。

例子：

```cpp
  frame->Connect( wxID_EXIT,
                  wxEVT_COMMAND_MENU_SELECTED,
                  wxCommandEventHandler(MyFrame::OnQuit) );
```

对例子的解释：

`wxID_EXIT`是之前赋给了某一个菜单项的ID。

当该菜单被选择时，会产生一个ID为`wxEVT_COMMAND_MENU_SELECTED`的事件。

因此`MyFrame::OnQuit`在被显式转换为`wxCommandEventHandler`型的事件Handler之后，被Connect拉过来处理该事件。

就不再翻译Disconnect函数的文档了，因为除了函数名不同，它的所有参数和Connect是一模一样的。它的用途就是断开Connect所建立起来的联系。

实践中写事件处理的时候，通常使用的是Connect的后两种重载版本。参数userData和eventSink的使用是比较少的，而且也有默认值，一般不去理它就可以了。

参数id是你赋给产生了这个事件的窗口、菜单或控件的，你自己心里是清楚的。问题顶多是，你需要使用系统默认的那些ID（比如上面例子里的`wxID_EXIT`），而你不知道哪个还哪个。那些ID的列表在官方文档里是有的，不过为了本文作为手册的完整性，将在本文最后给出。

有时是不需要id的，比如鼠标移动的事件：

```cpp
frame->Connect(wxEVT_MOTION,wxMouseEventHandler(MyFrame::OnMouseMove));
```

直接把事件ID与事件Handler联系起来。

参数function的问题大一些，就是这个显式强制类型转换的这个Handler，具体叫wx什么EventHandler呢？这个问题也好解决，因为官方文档里的Classes By Category里的Event小节已经给出了形如wxFooEvent这样的事件类型的列表，只需要在相应的事件类型后面加上Handler就可以了。同样为了本文作为手册的完整性，将在本文后面给出全部Handler的列表。

最大的问题出在参数eventType上。形如`wxEVT_MOTION`、`wxEVT_COMMAND_MENU_SELECTED`这样的事件ID的名字，我们从何得知？这些奇形怪状的名字，纵然我们英语很强，也未必能造出和wxWidgets定义的一模一样的名字啊。比如写惯MFC的同好们很容易将鼠标移动事件ID写为`wxMOUSEMOVE`或`wxMOUSE_MOVE`，可这却是错的。最糟糕的是，文档中没有提供这些名字的列表！

有些同好可能发现了，对大部份事件类型的静态事件表的宏的说明中，包含了这方面的重要信息，例如`wxPaintEvent`里：

> EVT_PAINT(func)    Process a wxEVT_PAINT event.

左边是静态事件表需要的，右边是动态事件表需要的。左手静态，右手动态，好潇洒啊！然而，倘若你要处理窗口关闭事件（假设该事件的产生不是通过菜单选择，而是点窗口右上角的红叉叉），你跑到`wxCloseEvent`那里一看：

> EVT_CLOSE(func)       Process a close event, supplying the member function. This event applies to wxFrame and wxDialog classes.

你晕了……为什么文档编写者连这都不肯告诉你？！于是你尝试着用`wxEVT_CLOSE`，编译器告诉你不对。已经习惯了没事翻翻头文件的你就跑到`<wx/event.h>`里去找了，一搜索就出来了。 原来是`wxEVT_CLOSE_WINDOW`，这可真是情理之中意料之外啊，反正我当时是接近吐血了……

所幸这个情况并没有出现在大多数基本的事件里，但实际中总会需要处理那些不那么基本的事件的，每次都在这个细节上卡这么久的壳太不划算了。所以我把事件ID列表从`<wx/event.h>`中抽出来并加以翻译，大家放在手边备查吧。这是本文的主要写作目的。

说了一堆稀哩哗啦的废话，下面进入手册正文。

> 按： 考虑到当年写的完整列表到现在已经不完整了，将内容删除，只留下第一段和每段的标题作为demo

事件ID列表
------------

### 命令事件

* wxEVT_COMMAND_BUTTON_CLICKED, 1
* wxEVT_COMMAND_CHECKBOX_CLICKED, 2
* wxEVT_COMMAND_CHOICE_SELECTED, 3
* wxEVT_COMMAND_LISTBOX_SELECTED, 4
* wxEVT_COMMAND_LISTBOX_DOUBLECLICKED, 5
* wxEVT_COMMAND_CHECKLISTBOX_TOGGLED, 6

### 鼠标事件

### 非客户区（Non-client）鼠标事件

### 字符输入事件

### 设置焦点（Cursor）事件

### 来自wxScrollBar控件和wxSlider控件的滚动事件

### 来自wxWindow的滚动事件

### 系统事件

### 剪贴板事件

### 通用命令事件（注意，一个Click事件是比button down/up优先级更高的。）

### 帮助事件

事件Handler列表
----------------------

* wxCommandEventHandler
* wxScrollEventHandler
* wxScrollWinEventHandler
* wxSizeEventHandler
* wxMoveEventHandler
* wxPaintEventHandler
* wxNcPaintEventHandler
* wxEraseEventHandler
* wxMouseEventHandler
* wxCharEventHandler
* wxKeyEventHandler
* wxCharEventHandler
* wxFocusEventHandler
* wxChildFocusEventHandler
* wxActivateEventHandler
* wxMenuEventHandler
* wxJoystickEventHandler
* wxDropFilesEventHandler
* wxInitDialogEventHandler
* wxSysColourChangedEventHandler
* wxDisplayChangedEventHandler
* wxUpdateUIEventHandler
* wxIdleEventHandler
* wxCloseEventHandler
* wxShowEventHandler
* wxIconizeEventHandler
* wxMaximizeEventHandler
* wxNavigationKeyEventHandler
* wxPaletteChangedEventHandler
* wxQueryNewPaletteEventHandler
* wxWindowCreateEventHandler
* wxWindowDestroyEventHandler
* wxSetCursorEventHandler
* wxNotifyEventHandler
* wxHelpEventHandler
* wxContextMenuEventHandler
* wxMouseCaptureChangedEventHandler
* wxMouseCaptureLostEventHandler
* wxClipboardTextEventHandler* 