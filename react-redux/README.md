## react-redux

通过 react 新的 Context API 实现一个迷你的 react-redux

> react-redux 主要是提供 2 个 api，Provider 和 connect。Provider 是将 redux 生成的 Store 通过 props 传递进去，然后通过 Context 传递下去，connect 方法为 Component 拿到 Context 中的 Store 数据，通过 store 的订阅，来更新 Component 的 props

老的 react Context 的使用方式是(这里只展示示例代码)：

```
export const connect = (mapStateToProps = state => state, mapDispatchToProps = {}) => (WrapComponent) => {
  return class ConnectComponent extends React.Component{
    static contextTypes = {
      store: PropTypes.object
    }

    constructor(props, context){
      super(props, context)
      this.state = {
        props: {}
      }
    }

    componentDidMount(){
      const {store} = this.context
      // 因为这里是老的context api，导致每个组件都需要订阅store
      store.subscribe(()=> this.update())

      this.update()
    }

    update(){
      const {store} = this.context
      const stateProps = mapStateToProps(store.getState())
      const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch)

      this.setState({
        props: {
          ...this.state.props,
          ...stateProps,
          ...dispatchProps
        }
      })
    }

    render(){
      return <WrapComponent {...this.state.props} />
    }
  }

}
```
