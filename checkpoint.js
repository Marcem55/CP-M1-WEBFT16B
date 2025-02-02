// ----- IMPORTANTE -----

// IMPORTANTE!: Para este checkpoint tendrán en el archivo DS.js las implementaciones ya realizadas en las
// homeworks de Queue, LinkedLis y BinarySearchTree. Sobre dicha implementación van a tener que agregar nuevos
// métodos o construir determinadas funciones explicados más abajo. Pero todos los métodos ya implementados
// en las homeowrks no es necesario que los vuelvan a definir.
// NO DEBEN MODIFICAR EL ARCHIVO DS.js SINO QUE TODO SU CÓDIGO TENDRÁ QUE ESTAR EN ESTE ARCHIVO checkpoint.js

const {
  Queue,
  Node,
  LinkedList,
  BinarySearchTree
} = require('./DS.js');

// ----------------------

// ----- Recursión -----

// EJERCICIO 1
// Implementar la función isAncestor: debe determinar si dado dos nombres de personas las mismas
// son parientes o no (La primera debe ser ancestro de la segunda). La función recibira un objeto
// que va a representar sólo la parte femenina del "arbol genealogico" familiar y será de la siguiente forma:
// const genealogyTree = {
//   "Mona Simpson": [],
//   "Marge Simpson": ["Lisa Simpson", "Maggie Simpson"],
//   "Jacqueline Bouvier": [ "Patty Bouvier", "Marge Simpson", "Selma Bouvier"],
//   "Patty Bouvier": [],
//   "Selma Bouvier": ["Ling Bouvier"],
//   "Edwina": ["Abigail Simpson"],
//   "Lisa Simpson": [],
//   "Maggie Simpson": [],
//   "Ling Bouvier": []
// }
// Ejemplo:
//  - Caso que devuelve true --> isAncestor(genealogyTree, "Jacqueline Bouvier", "Maggie Simpson")
//  - Caso que devuelve false --> isAncestor(genealogyTree, "Jacqueline Bouvier", "Abigail Simpson")
//  [Observar los tests para otros casos]

var isAncestor = function (genealogyTree, ancestor, descendant) {
  // Tu código aca:
  // Si el ancestro no tiene elementos, osea, descendientes:
  if (genealogyTree[ancestor].length <= 0) {
    return false;
  }
  // Si tiene elementos, recorrer y comparar si es el descendiente
  for (let i = 0; i < genealogyTree[ancestor].length; i++) {
    let nuevoAncestor = genealogyTree[ancestor][i];
    if (nuevoAncestor === descendant) {
      return true;
    }
    // Si no es, guardar ese descendiente en una nueva variable para ver si de descendiente tiene el descendiente original llamando de nuevo a la funcion.
    if (genealogyTree[nuevoAncestor].length > 0) {
      return isAncestor(genealogyTree, nuevoAncestor, descendant);
    }
  }
  return false;
}


// EJERCICIO 2
// Secuencia inventada: f(n) = f(n-1) x f(n-2) - f(n-2)
// Siendo f, secuenciaHenry.
// Donde las primeras dos posiciones son dadas por el parametro recibidos y a partir de
// la siguiente se calcula como la multiplicación de los 2 números anteriores restados al número anterior.
// object es un objeto del cual debemos obtener f(0) y f(1) siguiendo la siguiente lógica:
// f(0) será el valor de la propiedad llamada 'first'
// f(1) será un número igual a la cantidad de propiedades de obj
// Por ejemplo si recibimos: 
// var obj = {
//   1: true,
//   first: 2,
//   7: ['F','r','a','n','c','o!'],
//   h: {a: 1},
//   z: [],
//   a: 1,
//   b: 2,
//   c: 3,
//   d: 4
// }
// deberíamos tener los siguientes 2 valores iniciales
// secuenciaHenry(0) = 2 y secuenciaHenry(1) = 9
// A partir de ahí la tercera posición sería  9 x 2 - 2 = 16 y así sucesivamente
// La función secuenciaHenry debe devolver el enésimo numero de la serie, por ejemplo para el objeto
// antes mencionado:
// secuencia: 2, 9, 16, 135, 2144, 289305
// secuenciaHenry(0) // 2  ya que el elemento de la posición 0 es cero
// secuenciaHenry(1) // 9 ya que el elemento de la posición 1 es 1
// secuenciaHenry(5) // 289305 ya que el elemento de la posición 5 es 289305
// Para números negativos de n debe devolver null
// PISTA: Pueden utilizar el método Object.keys() para f(1)

function secuenciaHenry(obj, n) {
  // Tu código aca:
  let valorDeN = n;
  if (valorDeN < 0) { // Si son negativos tiene que retornar null.
    return null;
  } else if (valorDeN === 0) { // Si es 0, tiene que retornar el valor de la propiedad first del objeto.
    return obj.first;
  } else if (valorDeN === 1) { // Si es 1, tiene que retornar cuantas propiedades tiene el objeto.
    return Object.keys(obj).length // El .length va porque ese metodo mete las propiedades en un array.
  }

}

// ---------------------

// ----- LinkedList -----

// EJERCICIO 3
// Implementar el método size dentro del prototype de LinkedList que deberá retornar el tamaño actual de
// la LinkedList. En el caso de que la lista se encuentre vacía deberá retornar cero.
// Ejemplo:
//    var lista = new LinkedList();
//    lista.size(); --> 0
//    lista.add(1);
//    lista.size(); --> 1
//    lista.add(2);
//    lista.add(3);
//    lista.size(); --> 3

LinkedList.prototype.size = function () {
  // Tu código aca:
  let size = 0;
  // Si Head es null, no tiene size
  if (this.head === null) {
    return 0;
  } else {
    let current = this.head;
    // Si no es null, que recorra hasta que el next sea null y vaya agregando 1 al size.
    while (current.next !== null) {
      size++;
      current = current.next;
    }
    //Le retorno size + 1 porque size solo no cuenta el head.
    return size + 1;
  }
}


// EJERCICIO 4
// Implementar el método switchPos dentro del prototype de LinkedList que deberá intercambiar
// el elemento que se encuentre en pos1 con el elemento en pos2
// En el caso de que alguna de las dos posiciones no sea válida (Supere el tamaño de la lista actual 
// o sea un número negativo) debe devolver false.
// Si los nodos fueron removidos correctamente devolver true.
// Aclaración: la posición cero corresponde al head de la LinkedList
// Ejemplo 1:
//    Suponiendo que la lista actual es: Head --> [1] --> [2] --> [3] --> [4] --> [5]
//    lista.switchPos(1,3);
//    Ahora la lista quedaría: Head --> [1] --> [4] --> [3] --> [2] --> [5]
//    y la función debería haber devuelto true
// Ejemplo 2:
//    Suponiendo que se pide una posición inválida: removeFromPos(8) --> false

LinkedList.prototype.switchPos = function (pos1, pos2) {
  // Tu código aca:

}

// EJERCICIO 5
// Implementar la función mergeLinkedLists que, a partir de dos listas simplemente enlazadas 
// del mismo tamaño retorne una nueva lista con los elementos de ambas listas
// Ejemplo:
//    Lista 1: Head --> 1 --> 7 --> 20 --> null
//    Lista 2: Head --> 4 --> 13 --> 2 --> null
//    Lista nueva luego de aplicar mergeLinkedLists:
//             Head --> 1 --> 4 --> 7 --> 13 --> 20 --> 2 --> null
// Nota: las listas enlazadas mergeadas intercalandose.
// El nodo 1 de la lista 1, se conecta con el nodo 1 de la lista 2.
// Continuando con el nodo 2 de la lista 2, conectandose con el nodo 2 de la lista 2.
var mergeLinkedLists = function (linkedListOne, linkedListTwo) {
  // Tu código aca:
  // Creo una lista nuevo para ir insertando los valores de las otras listas
  let list = new LinkedList();
  //Guardo sus valores en una variable
  let current1 = linkedListOne.head;
  let current2 = linkedListTwo.head;
  // Mientras que haya current, iterar el while que va agregando cada elemento de cada lista y va moviendo el current a current.next
  while (current1 || current2) {
    list.add(current1.value);
    list.add(current2.value);
    current1 = current1.next;
    current2 = current2.next;
  }
  return list;
}


// ----------------------


// ----- QUEUE -----

// EJERCICIO 6
// Implementar la función cardGame: a partir de dos Queues que va a recibir como paráemtro que
// van a representar mazos de cartas de dos jugadores debemos determinar quien va a ser el ganador
// de este juego que va a tener la siguiente dinámica:
// - Los jugadores tendrán que defender su "Castillo" que contiene un total de 100 puntos de resistencia
// - Cada carta tendrá puntos de ataque (attack) y puntos de defensa (defense)
// - Ambos jugadores van a sacar las dos primeras cartas de su mazo
//      * La primera carta será su carta asignada para atacar
//      * La segunda carta será su carta asignada para defender
// - La carta asignada para atacar del jugador uno se enfrentará contra la carta asignada para defender
//   del jugador dos y viceversa. Si el ataque supera los puntos de defensa el daño sobrante será aplicado
//   sobre el castillo.
// - El juego finaliza cuando alguno de los dos castillos se quede sin puntos de resistencia o cuando los mazos
//   se acaben. En este último caso ganará aquel jugador que tenga mayor cantidad de puntos de resistencia
//   restantes en su castillo.
// La función deberá devolver un string indicando al ganador: 'PLAYER ONE' o 'PLAYER TWO' (Respetar mayúsculas) o
// 'TIE' en el caso de empate
// NOTA: Ambos mazos contienen la misma cantidad de cartas
//
// Ejemplo:
// Los jugadores levantan 2 cartas cada uno.
// La primera carta del jugador uno va a atacar a la segunda carta del jugador dos
// La primer carta del jugador dos va a atacar a la segunda carta del jugador uno
//
// Primer carta del jugador 1 (ATAQUE) vs Segunda carta del jugador 2 (DEFENSA): 
// {attack: 5, defense: 5} vs {attack: 5, defense: 26}
// Ataque 5 vs Defensa 20 --> 5 no supera 20 --> No hay daño sobre el castillo
//
// Primer carta del jugador 2 (ATAQUE) vs Segunda carta del jugador 1 (DEFENSA): 
// {attack: 20, defense: 26} vs {attack: 15, defense: 10}
// Ataque 20 vs Defensa 10 --> 20 supera a 10 --> Como hay 10 puntos de diferencia esa cantidad de daño es aplicada
// al castillo del jugador 1 
//
// Una vez terminada la ronda, se procede a repetir lo mismo con las siguientes 2 cartas de cada jugaodr hasta
// finalizar el juego.


var cardGame = function (playerOneCards, playerTwoCards) {
  // Tu código aca:
  // Declaro la resistencia de los castillos
  let castillo1 = 100;
  let castillo2 = 100;
  // Que vaya sacando 2 cartas(cada carta es un objeto) de cada mazo de cada jugador y haga el ataque/defensa(son propiedades) como dice el enunciado.
  do {
    let cartaAtaquePlayer1 = playerOneCards.dequeue();
    let cartaDefensaPlayer1 = playerOneCards.dequeue();
    let cartaAtaquePlayer2 = playerTwoCards.dequeue();
    let cartaDefensaPlayer2 = playerTwoCards.dequeue();
    if (cartaAtaquePlayer1.attack > cartaDefensaPlayer2.defense) {
      castillo2 -= (cartaAtaquePlayer1.attack - cartaDefensaPlayer2.defense);
      //Si el valor de ataque de la carta1 del player1 es mayor a la defensa de la carta2 del player2, se le resta al castillo2 la diferencia que sobra.
    }
    if (cartaAtaquePlayer2.attack > cartaDefensaPlayer1.defense) {
      castillo1 -= (cartaAtaquePlayer2.attack - cartaDefensaPlayer1.defense);
      //Lo mismo pero al reves.
    }
    // Si en el proceso de ataque/defensa de las cartas, el castillo de alguno de los 2 jugadores queda en 0 o menos, pierde.
    if (castillo1 <= 0) {
      return 'PLAYER TWO';
    }
    if (castillo2 <= 0) {
      return 'PLAYER ONE';
    }
    // Que todo esto se haga mientras haya cartas en el mazo, que se van a terminar al mismo tiempo ya que tienen la misma cantidad.
  } while (playerOneCards.size() > 0);
  // Si se termina el mazo y ningun castillo queda en 0, hay que ver cual quedo con menos cantidad de resistencia.
  if (castillo1 > castillo2) { // Si el cast1 tiene mas resis, gana el Player One
    return 'PLAYER ONE';
  } else if (castillo2 > castillo1) { // Si el cast2 tiene mas resis, gana el Player Two
    return 'PLAYER TWO';
  } else {
    return 'TIE'; // Si quedaron con la misma resis, es empate.
  }
}

// ---------------


// ----- BST -----

// EJERCICIO 7
// Implementar la función height dentro del prototype de BinarySearchTree que debe devolver la "altura"
// máxima del arbol recibido por parámetro.
// Ejemplo:
//             16             ---> Nivel 1
//          /      \
//        6         23        ---> Nivel 2
//      /  \       /   \
//     2    14    17    31    ---> Nivel 3
//      \
//       5                    ---> Nivel 4
// Este arbol tiene una altura de 4
// PISTA: Una forma de resolverlo es pensarlo recursivamente y usando Math.max

BinarySearchTree.prototype.height = function () {
  // Tu código aca:
  if (this.value === null) {
    return 0;
  }
  if(this.left === null && this.right === null){ // Retorna 1 por el nivel del head.
    return 1;
  }
  if(this.left !== null & this.right === null){ // Retorna 1 por el nivel del head + misma funcion en los distintos niveles (si es que encuentra).
    return 1 + this.left.height();
  }
  if(this.left === null && this.right !== null){
    return 1 + this.right.height();
  }
  return 1 + Math.max(this.left.height(), this.right.height()); //Retorna el mayor de los 2 resultados de niveles de cada lado del arbol.
}


// ---------------


// Ejercicio 8
// Dado un arreglo ordenado, encontrar el índice de un elemento específico pasado como parámetro
// utilizando el método conocido como búsqueda binaria. En el caso de que el número buscado no se encuentre
// en el array devolver -1.
// Para mayor información sobre dicho método:
//    - https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search
//    - https://en.wikipedia.org/wiki/Binary_search_algorithm
// Ejemplo:
//    array = [1,2,3,4,5,6,7,8,9,10];
//    binarySearch(array, 2) --> Devolvería 1 ya que array[1] = 2
//    [Donde 2 sería el número sobre el cuál queremos saber su posición en el array]


var binarySearch = function (array, target) {
  // Tu código aca:
  let indexTarget = array.indexOf(target); // Busco el index de target y lo retorno. No necesito una condicion que me retorne -1 porque si no lo encuentra retorna -1 por defecto.
  return indexTarget;
  // No pude realizar el metodo binario de busqueda binario, por eso lo dejo con el IndexOf/
}


// EJERCICIO 9
// Ordená un arreglo de objetos usando un bubble sort pero con algunas particularidades.
// Además del arreglo a ordenar (array) la función va a recibir como parámetro una función
// que va a ser quien va a determinar si un elemento es "mayor" al otro para determinar su
// posición final
// Ejemplo:
// var array = [
//   {name: 'Franco', age: 26, height: 1.85},
//   {name: 'Toni', age: 30, height: 1.75},
//   {name: 'Mati', age: 25, height: 1.77},
//   {name: 'Leo', age: 40, height: 1.83}
// ]
//
// orderFunction(array[0], array[1]) --> Devolvera 1 si están bien ordenados o -1 si hay que intercambiarlos
// Suponiendo que la orderFunction devuelve -1 si la edad del segundo elemento es menor que la del primero
// specialSort(array, orderFunction) --> Retornaría el siguiente array:
// [
//   {name: 'Mati', age: 25, height: 1.77},
//   {name: 'Franco', age: 26, height: 1.85},
//   {name: 'Toni', age: 30, height: 1.75},
//   {name: 'Leo', age: 40, height: 1.83}
// ]

var specialSort = function (array, orderFunction) {
  // Tu código aca:
  // Aplico bubbleSort con la diferencia de la recursividad de orderFunction().
  let cambio = true;
  while (cambio) {
    cambio = false;
    for (let i = 0; i < array.length - 1; i++) {
      if (orderFunction(array[i], array[i + 1]) === -1) {
        let auxiliar = array[i];
        array[i] = array[i + 1];
        array[i + 1] = auxiliar;
        cambio = true;
      }
    }
  }
  return array;
}


// ----- Closures -----

// EJERCICIO 10
// Implementar la función closureDetect que recibe como parámetro:
//  - Un array (symptoms) que va a contener en cada posición un string representando un
//    síntoma médico de alguna enfermedad
//  - Un número (min) que va a indicar la cantidad mínima de síntomas que debe tener un
//    paciente para considerar que posee la enfermedad
// Ejemplos:
//   var symptoms = ['fever', 'dry cough', 'tiredness', 'sore throat', 'diarrhoea', 'loss of taste', 'loss of smell'];
//   var covidDetector = closureDetect(symptoms, 3);
//
//   var personOne = {
//     name: 'Franco',
//     age: 26,
//     symptoms: ['fever', 'congestion', 'loss of taste', 'tiredness']
//   }
//
//   var personTwo = {
//     name: 'Toni',
//     age: 30,
//     symptoms: ['congestion', 'tiredness']
//   }
//
//   covidDetector(personOne); --> true
//   covidDetector(personTwo); --> false
//  [Observar los tests para otros casos]

function closureDetect(symptoms, min) {
  // Tu código aca:
  //Se llama a la funcion que toma a las personas como parametro.
  return function (persona) {
      //Inicializo el contador de sintomas
    let sintomas = 0;
    for (let i = 0; i < symptoms.length; i++) {
      if (symptoms.includes(persona.symptoms[i])) { //Pregunto por los sintomas de cada persona.
        sintomas++;
      }
    }
    return sintomas >= min 
      ? true 
      : false;
  }
}

// -------------------

module.exports = {
  isAncestor,
  secuenciaHenry,
  LinkedList,
  Queue,
  cardGame,
  binarySearch,
  specialSort,
  closureDetect,
  BinarySearchTree,
  mergeLinkedLists
}