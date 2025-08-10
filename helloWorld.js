//module.exports = function (firstName,lastName,age)

function multiply (x,y){
    return x*y;
}
export default function(firstName, lastName, age){
    return{
         firstName: firstName,
        lastName : lastName,
        age: age,
    fullName: function(){
        return this.firstName + " "  + this.lastName
    },
    isAdult : () => {
        return age >= 18;
    }
    }
   
}

