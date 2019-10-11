## <font color=#1890ff size=72>在 vue 中使用 typescript</font>

### <font color=#1890ff>vue-property-decorator</font>

```
import { Vue, Component, Inject, Provide, Prop, Model, Watch, Emit, Mixins } from 'vue-property-decorator'
```

- <font color=#1890ff>组件声明</font>

  创建组件的方式变成如下

  ```
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

    @Component
    export default class Test extends Vue {

    }

  ```

- <font color=#1890ff>data 对象</font>

  ```
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

    @Component
    export default class Test extends Vue {
        private name: string;
    }
  ```

- <font color=#1890ff>Prop 声明</font>

  ```
    @Prop({ default: false }) private isCollapse!: boolean;
    @Prop({ default: true }) private isFirstLevel!: boolean;
    @Prop({ default: "" }) private basePath!: string;
  ```

  - !: 表示一定存在，?: 表示可能不存在。这两种在语法上叫赋值断言
  - @Prop(options: (PropOptions | Constructor[] | Constructor) = {})
  - PropOptions，可以使用以下选项：type，default，required，validator
  - Constructor[]，指定 prop 的可选类型
  - Constructor，例如 String，Number，Boolean 等，指定 prop 的类型

- <font color=#1890ff>method</font>

  js 下是需要在 method 对象中声明方法，现变成如下

  ```
    public clickFunc(): void {
        console.log(this.name)
        console.log(this.msg)
    }
  ```

- <font color=#1890ff>Watch 监听属性</font>

  ```
    @Watch("$route", { immediate: true })
    private onRouteChange(route: Route) {
        const query = route.query as Dictionary<string>;
        if (query) {
        this.redirect = query.redirect;
        this.otherQuery = this.getOtherQuery(query);
        }
    }
  ```

  - @Watch(path: string, options: WatchOptions = {})
  - options 包含两个属性 immediate?:boolean 侦听开始之后是否立即调用该回调函数 / deep?:boolean 被侦听的对象的属性被改变时，是否调用该回调函数
  - @Watch('arr', { immediate: true, deep: true })
  - onArrChanged(newValue: number[], oldValue: number[]) {}

* <font color=#1890ff>computed 计算属性</font>

  ```
    public get allname() {
        return 'computed ' + this.name;
    }
  ```

  allname 是计算后的值，name 是被监听的值

- <font color=#1890ff>生命周期函数</font>

  ```
    public created(): void {
        console.log('created');
    }

    public mounted():void{
        console.log('mounted')
    }

  ```

- <font color=#1890ff>emit 事件</font>

  ```
    import { Vue, Component, Emit } from 'vue-property-decorator'
    @Component
    export default class MyComponent extends Vue {
        count = 0
        @Emit()
        addToCount(n: number) {
            this.count += n
        }
        @Emit('reset')
        resetCount() {
            this.count = 0
        }
        @Emit()
        returnValue() {
            return 10
        }
        @Emit()
        onInputChange(e) {
            return e.target.value
        }
        @Emit()
        promise() {
            return new Promise(resolve => {
            setTimeout(() => {
                resolve(20)
            }, 0)
            })
        }
    }

  ```

  使用 js 写法

  ```
    export default {
        data() {
            return {
            count: 0
            }
        },
        methods: {
            addToCount(n) {
            this.count += n
            this.$emit('add-to-count', n)
            },
            resetCount() {
            this.count = 0
            this.$emit('reset')
            },
            returnValue() {
            this.$emit('return-value', 10)
            },
            onInputChange(e) {
            this.$emit('on-input-change', e.target.value, e)
            },
            promise() {
            const promise = new Promise(resolve => {
                setTimeout(() => {
                resolve(20)
                }, 0)
            })
            promise.then(value => {
                this.$emit('promise', value)
            })
            }
        }
    }

  ```

  - @Emit(event?: string)
  - @Emit 装饰器接收一个可选参数，该参数是\$Emit 的第一个参数，充当事件名。如果没有提供这个参数，\$Emit 会将回调函数名的 camelCase 转为 kebab-case，并将其作为事件名
  - @Emit 会将回调函数的返回值作为第二个参数，如果返回值是一个 Promise 对象，\$emit 会在 Promise 对象被标记为 resolved 之后触发
  - @Emit 的回调函数的参数，会放在其返回值之后，一起被\$emit 当做参数使用

### <font color=#1890ff>vuex-module-decorators</font>

在使用 store 装饰器之前，先过一下传统的 store 用法吧

```
export default  {
    namespaced:true,
    state:{
        foo:""
    },
    getters:{
        getFoo(state){ return state.foo}
    },
    mutations:{
        setFooSync(state,payload){
            state.foo = payload
        }
    },
    actions:{
        setFoo({commit},payload){
            commot("getFoo",payload)
        }
    }
}

```

然后开始使用<font color=#1890ff>vuex-module-decorators</font>

```
import {
  VuexModule,
  Mutation,
  Action,
  getModule,
  Module
} from "vuex-module-decorators";
```

- <font color=#1890ff>VuexModule</font> 用于基本属性

  ```
  export default class TestModule extends VuexModule { }
  ```

  VuexModule 提供了一些基本属性，包括 namespaced,state,getters,modules,mutations,actions,context

- <font color=#1890ff>@Module</font> 标记当前为 module

  ```
  @Module({ dynamic: true, store, name: "settings" })
  class Settings extends VuexModule implements ISettingsState {

  }
  ```

  module 本身有几种可以配置的属性:

  - namespaced:boolean 启/停用 分模块
  - stateFactory:boolean 状态工厂
  - dynamic:boolean 在 store 创建之后，再添加到 store 中。 开启 dynamic 之后必须提供下面的属性
  - name:string 指定模块名称 \* store:Vuex.Store 实体 提供初始的 store

* <font color=#1890ff>@Mutation</font> 标注为 mutation

  ```
  @Mutation
  private SET_NAME(name: string) {
  // 设置用户名
  this.name = name;
  }
  ```

* <font color=#1890ff>@Action</font> 标注为 action

  ```
  @Action
  public async Login(userInfo: { username: string; password: string }) {
    // 登录接口，拿到token
    let { username, password } = userInfo;
    username = username.trim();
    const { data } = await login({ username, password });
    setToken(data.accessToken);
    this.SET_TOKEN(data.accessToken);
  }
  ```

* <font color=#1890ff>getModule</font> 得到一个类型安全的 store，module 必须提供 name 属性

  ```
  export const UserModule = getModule(User);
  ```
