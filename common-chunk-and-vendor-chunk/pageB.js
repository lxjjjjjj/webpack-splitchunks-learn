import vendor2 from 'vendor2';
import utility2 from './utility2';
import utility3 from './utility3';

export default ()=>{
    //懒加载
    import(/* webpackChunkName: "async1" */ './async1');
    import(/* webpackChunkName: "async2" */ './async2');
    // webpackChunkName的注释属于magic-comments的一部分
    // magic-comments的说明一系列https://webpack.docschina.org/api/module-methods#magic-comments
    // 别忘了把pageA中的 import('./async1'); 和 import('./async2');删除才能实现编译结果 因为pageA中并没有这个内联名称的修改
    // import('./async1');
    // import('./async2');
    console.log('pageB');
}