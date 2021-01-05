import { act } from "react-dom/test-utils";
import {createStore} from "redux";

const form = document.querySelector("form");
const input=document.querySelector("input");
const ul=document.querySelector("ul");

const ADD_TODO="ADD_TODO";
const DELETE_TODO="DELETE_TODO";

const addToDo=text=>{
  return{
    type:ADD_TODO,
    text
  };
};
const deleteToDo=id=>{
  return{
    type:DELETE_TODO,
    id
  };
};

const reducer=(state=[],action)=>{
  console.log(action);
  switch(action.type){
    case ADD_TODO:
      return [...state,{text:action.text, id:Date.now()}]; //새로운 object로 array를 만들었다. 
                                                          //원래의 state와 새로운 TODO를 갖게 된다
    case DELETE_TODO:
      return state.filter(toDo=>toDo.id!==action.id); //삭제할 id를 가지지 않는 toDo만 선택
    default:
      return state;
  }
};

const store=createStore(reducer);

store.subscribe(()=>console.log(store.getState()));

const dispatchAddToDo=text=>{
  store.dispatch(addToDo(text));
};

const dispatchDeleteToDo=(e)=>{
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
}

const paintToDos=()=>{
  const toDos=store.getState();
  ul.innerHTML="";
  toDos.forEach(toDo=>{
    const li=document.createElement("li");
    const btn=document.createElement("button");
    btn.innerText="DEL";
    btn.addEventListener("click",dispatchDeleteToDo)
    li.id=toDo.id;
    li.innerText=toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDos)

const onSubmit=e=>{
  e.preventDefault();
  const toDo=input.value;
  input.value="";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit",onSubmit);