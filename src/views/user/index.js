export { default as Add } from './Add';

//也可以这么写，但是引入方式不能使用解构的方式，也就是不能这种`import { Add } from '@/views/user'`，
//可以这么引用`import user from '@views/user'`,然后通过解构`const { Add } = user;`或者`user.Add`来使用；
// import Add from './Add';
// export default{
// 	Add
// }