import person from './helloWorld.js'

const man = person("John", " Doe" , 18);

console.log(man.fullName(), man.isAdult() ? " Is an adult" : "Is not an adult");
