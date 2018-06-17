import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Button } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '搭伙订餐计算器'
  }
  constructor(props) {
    super(props);
    this.state = {
      singlePrice: '26,28,29',
      tureTotalPrice: '55',
      result: '此处展示计算结果'
    };
  }
  componentDidMount () {

  }
  setSinglePrice (e) {
    this.setState({
      singlePrice: e.target.value
    });
  }
  setTureTotalPrice (e) {
    this.setState({
      tureTotalPrice: e.target.value
    });
  }
  calcHandler() {
    let {singlePrice, tureTotalPrice} = this.state;
    let totalPrice = 0;
    // 前置判断
    if(singlePrice.includes('，')) {
      Taro.showToast({
        title: '请输入英文逗号 "," ',
        icon: 'none'
      });
      return;
    }
    let singlePriceArr = singlePrice.split(',');
    // 计算订餐总价
    singlePriceArr.forEach((item) => {
      totalPrice += Number(item);
    })
    // 计算订餐总人数
    let peopleNum = singlePriceArr.length;
    // 计算单人实际需要支付价格
    let result = singlePriceArr.map((item) => {
        // return parseInt((item/totalPrice*totalPrice)*100)/100;
        // 修改价格显示方式, 价钱计算改成四舍五入, 保留一位小数
        return Number((item / totalPrice * tureTotalPrice)).toFixed(1);
    });
    this.setState({
      result: result.join(',')
    });
  }

  render () {
    return (
      <View className='index-container'>
        <View className="calc-wrap">
          <View>
            <Label>每人需支付(优惠前):</Label>
            <Input
              placeholder="26,28,29"
              onBlur={this.setSinglePrice}>
            </Input>
          </View>
          <View>
            <Label>实际支付(总额):</Label>
            <Input
              placeholder="55"
              onBlur={this.setTrueTotalPrice}>
            </Input>
          </View>
          <View>
            <Label>每人实际需支付:</Label>
            <Input
              value={this.state.result}
              disabled="disabled">
            </Input>
          </View>
          <View>
            <Button onClick={this.calcHandler}>计算</Button>
          </View>
        </View>
      </View>
    )
  }
}

