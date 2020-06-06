angular核心：ts，di，rs，zorro

目录
17:00

18:00
vue-rx
vuex 基于flax的机制

23:00
vue/src

29:00
redirect：算法，重写virtual-dom，dom-diff

30:00
双向数据绑定      
observer:{getter,setter}:观察者，观察注册数据的位置      
dep:订阅收集和发布者，负责事务处理？        
watcher:订阅者，为dep和dom解耦合             
directive:创建watcher         

⚠️36:00
vue用object.defineProperty，ie9+      
san.js用 __defineSetter__ 、__defineSetter__      
VBScript，微软出的一套可以直接操作打印设备，active那个控件

1:10:00
正则
        


1:43:00
宏任务、微任务
##1.同步执行栈
##2.异步队列：
|宏任务|微任务|
|-----|-----|
|setTimeout|promise|
|postMessage|then|
|ajax|catch|
|event|final| 
|js多线程|observer|
| |message|
执行过程：同步执行栈执行完，再执行异步队列
在异步队列中，微任务在前，宏任务在后
这是浏览器端的event loop
nodejs是靠libua

1:40:00
vue的任务流程，先变数据，然后把主ui线程推迟。vue把操作dom放到微任务里，如果不支持微任务，放到宏任务里。


vue源码分析（2）
6:00
为什么数组深了监听不到
解决：vue把数据按下标切割成0,1,2的key了

还有源码2




##我的总结：     
vue源码，整个代码，都贯穿了vue实例。
#### 1.vue的数据驱动原理      
先分析data，然后把data里的key都注册成defineProperty，get，set这种东西，并且挂载到vue实例上。      
当我分析html的时候，分析模板{{}}和v-model这些指令，并且把这些指令所在的元素注册上观察者watcher。     
对于任何一个data里的key -> xxx来说，我可能在html模板中有无数次用到xxx，所以我需要一个list来存放这些不同的xxx的watcher。   
这个list所在的类 -> Dep 是我的发布者，list里的东西是我的订阅者。    
当我有任何数据改变的时候，总是尝试改变vm.xxx，也就是在最一开始注册到vm实例上的key，在DefineProperty里的set里的有dep实例的notify，遍历dep的list，通知所有人。        
实际list的形成，是每分析到一个html模板里有xxx，就往里push一个他的watcher。








