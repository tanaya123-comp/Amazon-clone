export const initialState={
    basket: [],
    user:null
};

//selector
export const getBasketTotal=(basket)=>
    basket?.reduce((amount,item)=>Number(item.price)*Number(item.quantity)+amount,Number(0));

//?. optional chaining

const reducer=(state,action)=>{
  //  console.log(action);
    switch(action.type){
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket:[...state.basket,action.item],
            };

        case "REMOVE_FROM_BASKET":
            //console.log(action.id)
            const index=state.basket.findIndex(
                (basketItem)=>basketItem.id===action.id
            );
            let newBasket=[...state.basket];
            if(index>=0){
                newBasket.splice(index,1);

            }else{
                console.warn(`can't remove the product with id ${action.id}`)
            }
             
            let newBasket2=state.basket.filter(b=>(b.id!==action.id))
            //for removing by id

            return {...state,basket:newBasket}

        case "SET_USER":
          //  console.log(action.user.id);
            return{
                ...state,
                user:action.user
            }

        case "ADD_USER__ADDRESS":
           // console.log("Add in reducer");
            return {
                ...state,
                user:{...state.user,address:action.address}
            }

        case "CLEAR_BASKET":
            console.log("Here in clear basket");
            return {
                ...state,
                basket:[]
            }

        default:
            return state;
    }
};

export default reducer;