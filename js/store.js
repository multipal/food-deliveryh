const KEY='lfd_cart_v12';
const COUPON_KEY='lfd_coupon_v12';
const restaurants=[
 {id:1,name:'Pizza House',rating:4.5,time:'30–40 min',tags:'Pizza Burger Drinks',offer:'20% OFF',items:[{id:101,name:'Margherita Pizza',price:199,category:'Pizza',veg:true},{id:102,name:'Farmhouse Pizza',price:299,category:'Pizza',veg:true},{id:103,name:'Veg Burger',price:129,category:'Burger',veg:true},{id:104,name:'Cold Drink',price:49,category:'Drinks',veg:true}]},
 {id:2,name:'Royal Biryani',rating:4.6,time:'35–45 min',tags:'Biryani Chicken Pizza',offer:'₹50 OFF',items:[{id:201,name:'Chicken Biryani',price:229,category:'Biryani',veg:false},{id:202,name:'Veg Biryani',price:179,category:'Biryani',veg:true},{id:203,name:'Chicken Pizza',price:269,category:'Pizza',veg:false}]},
 {id:3,name:'City Food Corner',rating:4.3,time:'25–35 min',tags:'Burger Pizza Chinese',offer:'10% OFF',items:[{id:301,name:'Cheese Burger',price:149,category:'Burger',veg:true},{id:302,name:'Paneer Pizza',price:239,category:'Pizza',veg:true},{id:303,name:'Chowmein',price:139,category:'Chinese',veg:true}]}
];
const coupons={SAVE50:{type:'flat',value:50,min:299},WELCOME10:{type:'percent',value:10,min:199},FOOD20:{type:'percent',value:20,min:499}};
function getCart(){return JSON.parse(localStorage.getItem(KEY)||'[]')}
function saveCart(c){localStorage.setItem(KEY,JSON.stringify(c));window.dispatchEvent(new Event('cartchange'))}
function addItem(rid,item){let c=getCart();if(c.length&&c[0].restaurantId!==rid){if(!confirm('Cart has items from another restaurant. Replace cart?'))return; c=[]}let x=c.find(a=>a.item.id===item.id);if(x)x.qty++;else c.push({restaurantId:rid,item,qty:1});saveCart(c)}
function cartCount(){return getCart().reduce((s,x)=>s+x.qty,0)}
function cartSubtotal(){return getCart().reduce((s,x)=>s+x.item.price*x.qty,0)}
function getCoupon(){return localStorage.getItem(COUPON_KEY)||''}
function setCoupon(code){if(code)localStorage.setItem(COUPON_KEY,code);else localStorage.removeItem(COUPON_KEY);window.dispatchEvent(new Event('cartchange'))}
function couponDiscount(){let c=getCart(),sub=cartSubtotal(),code=getCoupon().toUpperCase(),x=coupons[code];if(!x||sub<x.min)return 0;return x.type==='flat'?Math.min(x.value,sub):Math.round(sub*x.value/100)}
function deliveryFee(){return cartCount()?30:0}
function cartTotal(){return Math.max(0,cartSubtotal()+deliveryFee()-couponDiscount())}
function findRestaurant(id){return restaurants.find(r=>r.id===Number(id))||restaurants[0]}
function updateCartBadges(){document.querySelectorAll('[data-cart-count]').forEach(e=>e.textContent=cartCount())}
window.addEventListener('storage',updateCartBadges);window.addEventListener('cartchange',updateCartBadges);document.addEventListener('DOMContentLoaded',updateCartBadges);
