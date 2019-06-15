export  default  {
    totalCount(state){
        return state.cartFoods.reduce((total,next)=>total+next.count,0)
    },
    totalPrice(state){
        return state.cartFoods.reduce((total,next)=>total+next.count*next.price,0)
    }
}