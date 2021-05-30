<template>
  <div class="wrapper">
    <ul class="content">
      <!-- 1.无论是否设置click true还是false,button都可以点击 -->
      <!-- <button class="btn" @click="btnClick">按钮</button> -->

      <!-- 2.必须设置click：true,div才可以监听点击 -->
      <div class="div" @click="divClick">hhhh</div>

      <li>分类列表1</li>
      <li>分类列表2</li>
      <li>分类列表3</li>
      <li>分类列表4</li>
      <li>分类列表5</li>
      <li>分类列表6</li>
      <li>分类列表7</li>
      <li>分类列表8</li>
      <li>分类列表9</li>
      <li>分类列表10</li>
      <li>分类列表11</li>
      <li>分类列表12</li>
      <li>分类列表13</li>
      <li>分类列表14</li>
      <li>分类列表15</li>
      <li>分类列表16</li>
      <li>分类列表17</li>
      <li>分类列表18</li>
      <li>分类列表19</li>
      <li>分类列表20</li>
      <li>分类列表21</li>
      <li>分类列表22</li>
      <li>分类列表23</li>
      <li>分类列表24</li>
      <li>分类列表25</li>
      <li>分类列表26</li>
      <li>分类列表27</li>
      <li>分类列表28</li>
      <li>分类列表29</li>
      <li>分类列表30</li>
      <li>分类列表31</li>
      <li>分类列表32</li>
      <li>分类列表33</li>
      <li>分类列表34</li>
      <li>分类列表35</li>
      <li>分类列表36</li>
      <li>分类列表37</li>
      <li>分类列表38</li>
      <li>分类列表39</li>
      <li>分类列表40</li>
      <li>分类列表41</li>
      <li>分类列表42</li>
      <li>分类列表43</li>
      <li>分类列表44</li>
      <li>分类列表45</li>
      <li>分类列表46</li>
      <li>分类列表47</li>
      <li>分类列表48</li>
      <li>分类列表49</li>
      <li>分类列表50</li>
      <li>分类列表51</li>
      <li>分类列表52</li>
      <li>分类列表53</li>
      <li>分类列表54</li>
      <li>分类列表55</li>
      <li>分类列表56</li>
      <li>分类列表57</li>
      <li>分类列表58</li>
      <li>分类列表59</li>
      <li>分类列表60</li>
      <li>分类列表61</li>
      <li>分类列表62</li>
      <li>分类列表63</li>
      <li>分类列表64</li>
      <li>分类列表65</li>
      <li>分类列表66</li>
      <li>分类列表67</li>
      <li>分类列表68</li>
      <li>分类列表69</li>
      <li>分类列表70</li>
      <li>分类列表71</li>
      <li>分类列表72</li>
      <li>分类列表73</li>
      <li>分类列表74</li>
      <li>分类列表75</li>
      <li>分类列表76</li>
      <li>分类列表77</li>
      <li>分类列表78</li>
      <li>分类列表79</li>
      <li>分类列表80</li>
      <li>分类列表81</li>
      <li>分类列表82</li>
      <li>分类列表83</li>
      <li>分类列表84</li>
      <li>分类列表85</li>
      <li>分类列表86</li>
      <li>分类列表87</li>
      <li>分类列表88</li>
      <li>分类列表89</li>
      <li>分类列表90</li>
      <li>分类列表91</li>
      <li>分类列表92</li>
      <li>分类列表93</li>
      <li>分类列表94</li>
      <li>分类列表95</li>
      <li>分类列表96</li>
      <li>分类列表97</li>
      <li>分类列表98</li>
      <li>分类列表99</li>
      <li>分类列表100</li>
    </ul>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";

BScroll.use(Pullup);

export default {
  name: "Category",
  components: {},
  data() {
    return {};
  },
  mounted() {
    //默认情况下，bscroll是不可以实时监听滚动的位置，需要传递参数
    // new BScroll(document.querySelector('.wrapper'))
    //probeType--->侦测
    const bscroll = new BScroll(".wrapper", {
      probeType: 3,
      //0，1都是不侦测实时位置 0为默认
      // 2:在手指滚动的过程中侦测，手指离开的过程中不侦测
      // 3:在手指滚动和离开的过程中都进行侦测
      click: true,
      pullUpLoad: true,
    });

    bscroll.on("scroll", () => {
      // console.log(position);
    });

    // document.querySelector('.btn').addEventListener('click',(p) => {
    //     console.log(p);
    // })
    // document.querySelector('div').addEventListener('click', (p) => {
    //     console.log(p);
    // })
    bscroll.on("pullingUp", () => {
      console.log("上拉加载更多");
      // 发送网络请求，请求更多页的数据

      // 等这一次数据请求完成，并且将新的数据展示出来
      setTimeout(() => {
        bscroll.finishPullUp();
      }, 2000);
    });
  },
  methods: {
    // btnClick(){
    //     console.log('我是按钮');
    // },
    divClick() {
      console.log("hhhh");
    },
  },
};
</script>

<style lang="less" scoped>
// .content{
//     height: 150px;
//     background-color: red;

//     // overflow: hidden;
//     // overflow-y: scroll; //纵向滚动
// }

.wrapper {
  height: 150px;
  background-color: red;

  overflow: hidden;
}
</style>